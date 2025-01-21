import { Elysia, t as Type } from 'elysia'

import { createCallEventService } from '@/modules/callEvent/use-cases/create'
import { getAllSpecialtiesService } from '@/modules/callEvent/use-cases/get-all'
import { updateCallEventService } from '@/modules/callEvent/use-cases/update'
import { removeCallEventService } from '@/modules/callEvent/use-cases/remove'
import { getOneCallEventService } from './use-cases/get-one'
import { CallEvent } from './domain'

const router = new Elysia({ tags: ['CallEvent'], prefix: '/specialties' })
  .post(
    '/',
    async ({ body }) => {
      const specialty = await createCallEventService(body)

      return { message: 'CallEvent cadastrada com sucesso', specialty }
    },
    {
      body: CallEvent.validation.composition,
      detail: { description: 'Cadastra uma nova callEvent' }
    }
  )
  .get(
    '/:id',
    async ({ params: { id } }) => {
      const { specialty } = await getOneCallEventService(id)

      return { message: 'CallEvent encontrada com sucesso', specialty }
    },
    {
      detail: { description: 'Busca uma callEvent' }
    }
  )
  .put(
    '/:id',
    async ({ params: { id }, body }) => {
      const { specialty } = await updateCallEventService(id, body)

      return { message: 'CallEvent atualizada com sucesso', specialty }
    },
    {
      body: CallEvent.validation.composition,
      detail: { description: 'Atualiza uma callEvent' }
    }
  )
  .delete(
    '/:id',
    async ({ params: { id } }) => {
      await removeCallEventService(id)

      return { message: 'CallEvent removida com sucesso' }
    },
    {
      type: 'text/plain',
      detail: { description: 'Remove uma callEvent ou marca como inativa se estiver em uso' }
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
