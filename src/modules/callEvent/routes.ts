import { Elysia } from 'elysia'

import { CallEvent } from './domain'

import { createCallEventService } from './use-cases/create'
import { getAllSpecialtiesService } from './use-cases/get-all'
import { removeCallEventService } from './use-cases/remove'
import { getOneCallEventService } from './use-cases/get-one'
import { getNewEvents } from './use-cases/websocket-stream'

import { createCallEventsTable } from '@/shared/clickhouse/schema'
import { executeClickhouseQuery } from '@/shared/clickhouse'

import { ICallEvent } from './domain'

export async function queryCallEvents() {
  const query = `
    SELECT *,  
      JSONExtractString(eventDate, 'startDt') AS start_time, 
      JSONExtractInt(eventDate, 'duration') AS duration 
    FROM call_tickets
    ORDER BY start_time DESC
    LIMIT 10
  `
  return await executeClickhouseQuery<ICallEvent>(query)
}

const router = new Elysia({ tags: ['CallEvent'], prefix: '/call-event' })
  .ws('/ws', {
    async message(ws, message) {
      if (message === 'subscribe') {
        const initialEvents = await queryCallEvents()

        ws.send({ type: 'initial', data: initialEvents })

        const interval = setInterval(async () => {
          try {
            const newEvents = await getNewEvents()

            if (newEvents.length > 0) {
              ws.send({ type: 'update', data: newEvents })
            }
          } catch (error) {
            console.error('Error fetching new events:', error)

            ws.send({ type: 'error', message: 'Error fetching new events' })
          }
        }, 1000)

        ws.close = () => {
          clearInterval(interval)
        }
      }
    }
  })

  .post(
    '/',
    async ({ body }) => {
      const callEvent = await createCallEventService(body)

      return { message: 'CallEvent cadastrada com sucesso', callEvent }
    },
    {
      body: CallEvent.validation.composition,
      detail: { description: 'Cadastra uma nova callEvent' }
    }
  )

  .get(
    '/clickhouse',
    async () => {
      const events = await queryCallEvents()

      return { message: 'CallEvents from ClickHouse retrieved successfully', events }
    },
    { detail: { description: 'Lista todos os eventos do ClickHouse' } }
  )

  .get(
    '/analytics/by-service',
    async () => {
      const query = `
        SELECT 
          serviceId,
          count(*) as total_calls,
          countIf(endReason = 'FINISHED_HANDLED') as handled_calls,
          countIf(endReason = 'ABANDONED') as abandoned_calls,
          avg(expectedServiceTime) as avg_service_time,
          max(eventDate.duration) as max_duration,
          min(eventDate.duration) as min_duration
        FROM call_tickets
        GROUP BY serviceId
        ORDER BY total_calls DESC
      `

      const stats = await executeClickhouseQuery(query)

      return { message: 'Service statistics retrieved successfully', stats }
    },
    { detail: { description: 'Get call statistics grouped by service' } }
  )

  .get(
    '/analytics/hourly-distribution',
    async () => {
      const query = `
        SELECT 
          toHour(parseDateTimeBestEffort(JSONExtractString(eventDate, 'startDt'))) as hour,
          count(*) as total_calls,
          countIf(endReason = 'FINISHED_HANDLED') as handled_calls,
          countIf(endReason = 'ABANDONED') as abandoned_calls,
          avg(JSONExtractFloat(eventDate, 'duration')) as avg_duration
        FROM call_tickets
        GROUP BY hour
        ORDER BY hour
      `

      const distribution = await executeClickhouseQuery(query)

      return { message: 'Hourly distribution retrieved successfully', distribution }
    },
    { detail: { description: 'Get hourly call distribution' } }
  )

  .get(
    '/setup-clickhouse',
    async () => {
      await createCallEventsTable()

      return { message: 'ClickHouse table created successfully' }
    },
    { detail: { description: 'Creates ClickHouse table structure' } }
  )

  .get(
    '/:id',
    async ({ params: { id } }) => {
      const { specialty } = await getOneCallEventService(id)

      return { message: 'CallEvent encontrada com sucesso', specialty }
    },
    { detail: { description: 'Busca uma callEvent' } }
  )

  .delete(
    '/:id',
    async ({ params: { id } }) => {
      await removeCallEventService(id)

      return { message: 'CallEvent removida com sucesso' }
    },
    {
      detail: { description: 'Remove uma callEvent' }
    }
  )

  .post(
    '/filters',
    async ({ body }) => {
      const result = await getAllSpecialtiesService(body)

      return { message: 'CallEvents encontradas com sucesso', ...result }
    },
    {
      body: CallEvent.filters,
      detail: { description: 'Lista todas as callEvents com filtros' }
    }
  )

export default router
