import { ClickHouse } from 'clickhouse'
import { ICallEvent } from '../domain'

export class ClickHouseService {
  private client: ClickHouse

  constructor() {
    this.client = new ClickHouse({
      url: process.env.CLICKHOUSE_URL, // URL do ClickHouse
      debug: false, // Define se o modo debug está ativo
      basicAuth: {
        username: process.env.CLICKHOUSE_USER, // Usuário do ClickHouse
        password: process.env.CLICKHOUSE_PASSWORD // Senha do ClickHouse
      },
      isUseGzip: true, // Ativa compressão
      format: 'json', // Define o formato como JSON
      raw: false // Resposta processada
    })

    this.initializeClickHouse()
  }

  private async initializeClickHouse() {
    await this.client
      .query(
        `
        CREATE TABLE IF NOT EXISTS call_events (
          call_id String,
          service_id String,
          external_call_id String,
          media_type String,
          media_submedia String,
          expected_service_time UInt32,
          interlocutor_type String,
          interlocutor_id String,
          interlocutor_identity String,
          attendant_type String,
          attendant_id String,
          is_consult UInt8,
          is_incoming UInt8,
          protocol String,
          queue_position UInt32,
          is_pickup UInt8,
          is_record UInt8,
          hook_by String,
          end_reason String,
          caused_by String,
          timestamp DateTime DEFAULT now(),
          date Date MATERIALIZED toDate(timestamp)
        )
        ENGINE = MergeTree()
        PARTITION BY toYYYYMM(date)
        ORDER BY (date, call_id)
      `
      )
      .toPromise()
  }

  async syncCallEvent(event: ICallEvent) {
    const values = {
      call_id: event.callId,
      service_id: event.serviceId || '',
      external_call_id: event.externalCallId || '',
      media_type: event.media?.type || '',
      media_submedia: event.media?.submedia || '',
      expected_service_time: event.expectedServiceTime || 0,
      interlocutor_type: event.interlocutor?.type || '',
      interlocutor_id: event.interlocutor?.id || '',
      interlocutor_identity: event.interlocutor?.identity || '',
      attendant_type: event.attendant?.type || '',
      attendant_id: event.attendant?.id || '',
      is_consult: event.flgConsult ? 1 : 0,
      is_incoming: event.flgIncoming ? 1 : 0,
      protocol: event.protocol || '',
      queue_position: event.queuePosition || 0,
      is_pickup: event.flgPickUp ? 1 : 0,
      is_record: event.flgRecord ? 1 : 0,
      hook_by: event.hookBy || '',
      end_reason: event.endReason || '',
      caused_by: event.causedBy || ''
    }

    const fields = Object.keys(values).join(', ')

    const placeholders = Object.keys(values)
      .map(k => `'${values[k as keyof typeof values]}'`)
      .join(', ')

    await this.client
      .query(
        `
        INSERT INTO call_events (${fields})
        VALUES (${placeholders})
      `
      )
      .toPromise()
  }

  async getCallMetrics(startDate: Date, endDate: Date) {
    return this.client
      .query(
        `
        SELECT
          end_reason,
          count() as total_calls,
          countIf(is_pickup = 1) as answered_calls,
          countIf(is_record = 1) as recorded_calls,
          avg(queue_position) as avg_queue_position
        FROM call_events
        WHERE timestamp BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
        GROUP BY end_reason
      `
      )
      .toPromise()
  }

  async getAgentPerformance(startDate: Date, endDate: Date) {
    return this.client
      .query(
        `
        SELECT
          attendant_id,
          attendant_type,
          count() as total_calls,
          countIf(is_pickup = 1) as answered_calls,
          countIf(is_record = 1) as recorded_calls,
          avg(queue_position) as avg_queue_position
        FROM call_events
        WHERE 
          timestamp BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
          AND attendant_id != ''
        GROUP BY attendant_id, attendant_type
      `
      )
      .toPromise()
  }
}
