import { ICallEvent } from '../domain'
import { executeClickhouseQuery } from '@/shared/clickhouse'

// Keep track of last timestamp globally
let lastTimestamp: Date | null = null
let lastEventIds = new Set<string>()

export async function getNewEvents() {
  try {
    const query = `
      SELECT *
      FROM call_tickets
      ${lastTimestamp ? `WHERE eventDate.startDt > '${lastTimestamp.toISOString()}'` : ''}
      ORDER BY eventDate.startDt DESC
      LIMIT 100
    `
    const results = await executeClickhouseQuery<ICallEvent>(query)

    // Filter out events we've already seen
    const newEvents = results.filter(event => !lastEventIds.has(event.callId))

    // Update tracking
    if (newEvents.length > 0) {
      // Update timestamp to latest event
      lastTimestamp = new Date(
        Math.max(...newEvents.map(event => (event.eventDate ? new Date(event.eventDate.startDt).getTime() : 0)))
      )

      // Update seen event IDs (keep only last 1000 to prevent memory growth)
      newEvents.forEach(event => lastEventIds.add(event.callId))
      if (lastEventIds.size > 1000) {
        const idsArray = Array.from(lastEventIds)
        lastEventIds = new Set(idsArray.slice(idsArray.length - 1000))
      }
    }

    return newEvents
  } catch (error) {
    console.error('❌ Error querying ClickHouse for new events:', error)
    throw error
  }
}
