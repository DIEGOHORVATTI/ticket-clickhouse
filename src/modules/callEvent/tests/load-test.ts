import { generateFakeCallEvents } from '../migrations/start'
import { createCallEventService } from '../use-cases/create'

import { clickhouseClient, executeClickhouseQuery } from '@/shared/clickhouse'

async function runLoadTest() {
  // create database
  await clickhouseClient.query({
    query: 'CREATE DATABASE IF NOT EXISTS default',
    format: 'JSONEachRow'
  })

  // create table
  await clickhouseClient.query({
    query: `
      CREATE TABLE IF NOT EXISTS call_events (
        id UUID,
        call_id UUID,
        type String,
        timestamp DateTime,
        metadata String
      ) ENGINE = MergeTree()
      ORDER BY (id)
    `,
    format: 'JSONEachRow'
  })

  const totalEvents = 2
  const batchSize = 1

  const batches = Math.ceil(totalEvents / batchSize)

  for (let i = 0; i < batches; i++) {
    process.stdout.write(`\r⚪ Processing batch ${i + 1}/${batches} `)

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

  console.log('\n\n🟢 All batches processed successfully.')

  /*  
  // Exemplo para métricas (descomentável se necessário no futuro)
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - 60 * 60 * 1000)

  const getMetrics = executeClickhouseQuery<ICallEvent>('SELECT * FROM call_events LIMIT 10 OFFSET 10')

  console.log('\n📊 Metrics:', getMetrics) */
}

runLoadTest().catch(console.error)
