import { error } from 'elysia'

import { CallEvent } from '@/modules/callEvent/domain'

export const removeCallEventService = async (id: string) => {
  const specialty = await CallEvent.model.findById(id)
  if (!specialty) {
    throw error('Not Found', { error: 'CallEvent não encontrada' })
  }

  await specialty.deleteOne().catch(() => {
    throw error('Internal Server Error', { error: 'Erro ao remover callEvent' })
  })
}
