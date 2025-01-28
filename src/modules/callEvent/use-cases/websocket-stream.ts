import { ICallEvent } from '../domain'
import { executeClickhouseQuery } from '@/shared/clickhouse'

let lastTimestamp: Date | null = null

export async function getNewEvents() {
  try {
    const query = `
      SELECT *
      FROM call_events
      ${lastTimestamp ? `WHERE eventDate.startDt > '${lastTimestamp.toISOString()}'` : ''}
      ORDER BY eventDate.startDt DESC
      LIMIT 100
    `
    const results = await executeClickhouseQuery<ICallEvent>(query)

    if (results.length > 0) {
      lastTimestamp = new Date(Math.max(...results.map(event => new Date(event.eventDate.startDt).getTime())))
    }

    return results
  } catch (error) {
    console.error('❌ Error querying ClickHouse for new events:', error)
    throw error
  }
}
