import { executeClickhouseQuery } from '@/shared/clickhouse'
import { ICallEvent } from '../domain'

export async function queryCallEvents() {
  try {
    const query = `
      SELECT *
      FROM call_events
      ORDER BY createdAt DESC
      LIMIT 10
    `
    const results = await executeClickhouseQuery<ICallEvent>(query)
    return results
  } catch (error) {
    console.error('❌ Error querying ClickHouse:', error)
    throw error
  }
}
