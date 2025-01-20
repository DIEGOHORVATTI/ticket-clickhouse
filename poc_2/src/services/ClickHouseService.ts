import { ClickHouse } from 'clickhouse';
import { CallEvent } from '../types/call';

export class ClickHouseService {
  private client: ClickHouse;

  constructor() {
    this.client = new ClickHouse({
      url: process.env.CLICKHOUSE_URL,
      port: 8123,
      debug: false,
      basicAuth: {
        username: process.env.CLICKHOUSE_USER,
        password: process.env.CLICKHOUSE_PASSWORD,
      },
      isUseGzip: true,
      format: 'json',
      raw: false,
    });

    this.initializeClickHouse();
  }

  private async initializeClickHouse() {
    await this.client.query(`
      CREATE TABLE IF NOT EXISTS call_events (
        call_id String,
        timestamp DateTime,
        status String,
        caller_id String,
        caller_name String,
        agent_id Nullable(String),
        agent_name Nullable(String),
        duration Nullable(UInt32),
        date Date MATERIALIZED toDate(timestamp),
        hour UInt8 MATERIALIZED toHour(timestamp)
      )
      ENGINE = MergeTree()
      PARTITION BY toYYYYMM(timestamp)
      ORDER BY (date, call_id, timestamp)
    `).toPromise();
  }

  async syncCallEvent(event: CallEvent) {
    await this.client.query(`
      INSERT INTO call_events (
        call_id,
        timestamp,
        status,
        caller_id,
        caller_name,
        agent_id,
        agent_name,
        duration
      ) VALUES (
        '${event.callId}',
        '${event.timestamp.toISOString()}',
        '${event.status}',
        '${event.caller.id}',
        '${event.caller.name}',
        ${event.agent?.id ? `'${event.agent.id}'` : 'null'},
        ${event.agent?.name ? `'${event.agent.name}'` : 'null'},
        ${event.duration || 'null'}
      )
    `);
  }

  async getCallMetrics(startDate: Date, endDate: Date) {
    const metrics = await this.client.query(`
      SELECT
        status,
        count() as count,
        avg(duration) as avg_duration
      FROM call_events
      WHERE timestamp BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
      GROUP BY status
    `).toPromise();

    return metrics;
  }

  async getAgentPerformance(startDate: Date, endDate: Date) {
    const performance = await this.client.query(`
      SELECT
        agent_id,
        agent_name,
        count() as total_calls,
        avg(duration) as avg_call_duration,
        countIf(status = 'COMPLETED') as completed_calls,
        countIf(status = 'ABANDONED') as abandoned_calls
      FROM call_events
      WHERE 
        timestamp BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
        AND agent_id IS NOT NULL
      GROUP BY agent_id, agent_name
    `).toPromise();

    return performance;
  }
}