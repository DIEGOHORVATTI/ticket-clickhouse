import { error } from 'elysia'

import { CallEvent } from '@/modules/specialties/domain'

export const removeSpecialtyService = async (id: string) => {
  const specialty = await CallEvent.model.findById(id)
  if (!specialty) {
    throw error('Not Found', { error: 'Especialidade não encontrada' })
  }

  await specialty.deleteOne().catch(() => {
    throw error('Internal Server Error', { error: 'Erro ao remover especialidade' })
  })
}
