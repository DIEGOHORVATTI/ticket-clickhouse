import { Elysia } from 'elysia'

import { CallEvent } from './domain'

import { createCallEventService } from './use-cases/create'
import { getAllSpecialtiesService } from './use-cases/get-all'
import { removeCallEventService } from './use-cases/remove'
import { getOneCallEventService } from './use-cases/get-one'

import { insertCallEventClickhouse } from './use-cases/insert-clickhouse'
import { queryCallEvents } from './use-cases/query-clickhouse'
import { getNewEvents } from './use-cases/websocket-stream'

import { createCallEventsTable } from '@/shared/clickhouse/schema'

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
      const specialty = await createCallEventService(body)

      await insertCallEventClickhouse(body)

      return { message: 'CallEvent cadastrada com sucesso', specialty }
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
