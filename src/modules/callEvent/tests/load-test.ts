import { generateFakeCallEvents } from '../migrations/start'
import { createCallEventService } from '../use-cases/create'

import { clickhouseClient, executeClickhouseQuery } from '@/shared/clickhouse'

async function runLoadTest() {
  const totalEvents = 10_000
  const batchSize = 1_000

  const batches = Math.ceil(totalEvents / batchSize)
  const duckIcons = ['𓅰', '𓅬', '𓅭', '𓅮', '𓅯']
  let duckIndex = 0

  console.time('𓆝 Load Test Time 𓆟')

  for (let i = 0; i < batches; i++) {
    process.stdout.write(`\r⚪ Processing batch ${i + 1}/${batches} ${duckIcons[duckIndex]} `)
    duckIndex = (duckIndex + 1) % duckIcons.length

    const events = generateFakeCallEvents(batchSize)

    const promises = events.map(async event => {
      try {
        const savedEvent = await createCallEventService(event)

        await clickhouseClient.insert({
          table: 'call_events',
          values: [savedEvent],
          format: 'JSONEachRow'
        })
      } catch (error) {
        console.error('🔴 Error processing event:', error)
      }
    })

    await Promise.all(promises) // Aguarda todos os eventos do lote serem processados
  }

  console.timeEnd('𓆝 Load Test Time 𓆟')
  console.log('\n\n🟢 All batches processed successfully.')

  // Exemplo para métricas (descomentável se necessário no futuro)
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - 60 * 60 * 1000)

  const getMetrics = executeClickhouseQuery<{}>('')

  console.log('\n📊 Metrics:', getMetrics)
}

runLoadTest().catch(console.error)
