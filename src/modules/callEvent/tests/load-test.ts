import { generateFakeCallEvents } from '../migrations/start'
import { createCallEventService } from '../use-cases/create'
import { ClickHouseService } from '../migrations/ClickHouseService'

async function runLoadTest() {
  const clickhouse = new ClickHouseService()
  const batchSize = 1000
  const totalEvents = 10000
  const batches = Math.ceil(totalEvents / batchSize)

  console.time('Load Test')

  for (let i = 0; i < batches; i++) {
    const events = generateFakeCallEvents(batchSize)
    const promises = events.map(async event => {
      try {
        // Save to MongoDB
        const savedEvent = await createCallEventService(event)
        // Sync to ClickHouse
        await clickhouse.syncCallEvent(savedEvent)
      } catch (error) {
        console.error('Error processing event:', error)
      }
    })

    await Promise.all(promises)
    console.log(`Processed batch ${i + 1}/${batches}`)
  }

  console.timeEnd('Load Test')

  // Get metrics for the last hour
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - 60 * 60 * 1000)
  
  const metrics = await clickhouse.getCallMetrics(startDate, endDate)
  console.log('Call Metrics:', metrics)

  const performance = await clickhouse.getAgentPerformance(startDate, endDate)
  console.log('Agent Performance:', performance)
}

runLoadTest().catch(console.error)