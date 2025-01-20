import { Elysia, t as Type } from 'elysia'

import { jwt } from '@/middlewares/jwt'

import { createSpecialtyService } from '@/modules/specialties/use-cases/create'
import { getAllSpecialtiesService } from '@/modules/specialties/use-cases/get-all'
import { updateSpecialtyService } from '@/modules/specialties/use-cases/update'
import { removeSpecialtyService } from '@/modules/specialties/use-cases/remove'
import { getOneSpecialtyService } from './use-cases/get-one'
import { Specialty } from './domain'

const router = new Elysia({ tags: ['Especialidade'], prefix: '/specialties' })
  .use(jwt)
  .post(
    '/',
    async ({ body }) => {
      const specialty = await createSpecialtyService(body)

      return { message: 'Especialidade cadastrada com sucesso', specialty }
    },
    {
      body: Specialty.validation.composition,
      detail: { description: 'Cadastra uma nova especialidade' }
    }
  )
  .get(
    '/:id',
    async ({ params: { id } }) => {
      const { specialty } = await getOneSpecialtyService(id)

      return { message: 'Especialidade encontrada com sucesso', specialty }
    },
    {
      detail: { description: 'Busca uma especialidade' }
    }
  )
  .put(
    '/:id',
    async ({ params: { id }, body }) => {
      const { specialty } = await updateSpecialtyService(id, body)

      return { message: 'Especialidade atualizada com sucesso', specialty }
    },
    {
      body: Specialty.validation.composition,
      detail: { description: 'Atualiza uma especialidade' }
    }
  )
  .delete(
    '/:id',
    async ({ params: { id } }) => {
      await removeSpecialtyService(id)

      return { message: 'Especialidade removida com sucesso' }
    },
    {
      type: 'text/plain',
      detail: { description: 'Remove uma especialidade ou marca como inativa se estiver em uso' }
    }
  )
  .post(
    '/filters',
    async ({ body }) => {
      const result = await getAllSpecialtiesService(body)

      return { message: 'Especialidades encontradas com sucesso', ...result }
    },
    {
      body: Specialty.filters,
      detail: { description: 'Lista todas as especialidades com filtros' }
    }
  )

export default router
