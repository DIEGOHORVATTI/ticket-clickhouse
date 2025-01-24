import { generateFakeCallEvents } from '../migrations/start'
import { createCallEventService } from '../use-cases/create'
import { ClickHouseService } from '../migrations/ClickHouseService'

async function runLoadTest() {
  const totalEvents = 10_000
  const batchSize = 1_000

  const clickhouse = new ClickHouseService()
  const batches = Math.ceil(totalEvents / batchSize)

  const duckIcons = ['𓅰', '𓅬', '𓅭', '𓅮', '𓅯']
  let duckIndex = 0

  console.time('---Load Testll')

  for (let i = 0; i < batches; i++) {
    process.stdout.write(`\r⚪Processing batch ${i + 1}/${batches} ${duckIcons[duckIndex]} `)
    duckIndex = (duckIndex + 1) % duckIcons.length

    const events = generateFakeCallEvents(batchSize)
    const promises = events.map(async event => {
      try {
        // Save to MongoDB
        const savedEvent = await createCallEventService(event)
        // Sync to ClickHouse
        await clickhouse.syncCallEvent(savedEvent)
      } catch (error) {
        console.error('🔴Error processing event:', error)
      }
    })

    await Promise.all(promises)
  }

  console.timeEnd('𓆝 𓆟 𓆞 𓆝 𓆟Load Test𓆝 𓆟 𓆞 𓆝 𓆟')
  console.log('\n\n🟢All batches processed successfully.')

  // Get metrics for the last hour
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - 60 * 60 * 1000)

  const metrics = await clickhouse.getCallMetrics(startDate, endDate)
  console.log('Call Metrics:', metrics)

  const performance = await clickhouse.getAgentPerformance(startDate, endDate)
  console.log('Agent Performance:', performance)
}

runLoadTest().catch(console.error)
