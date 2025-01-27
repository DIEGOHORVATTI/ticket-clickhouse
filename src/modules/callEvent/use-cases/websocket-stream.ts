import { ICallEvent } from '../domain'
import { executeClickhouseQuery } from '@/shared/clickhouse'

let lastTimestamp: Date | null = null

export async function getNewEvents() {
  try {
    const query = `
      SELECT *
      FROM call_events
      ${lastTimestamp ? `WHERE createdAt > '${lastTimestamp.toISOString()}'` : ''}
      ORDER BY createdAt DESC
      LIMIT 100
    `
    const results = await executeClickhouseQuery<ICallEvent>(query)
    
    if (results.length > 0) {
      lastTimestamp = new Date(Math.max(...results.map(event => new Date(event.createdAt).getTime())))
    }
    
    return results
  } catch (error) {
    console.error('❌ Error querying ClickHouse for new events:', error)
    throw error
  }
}