import { error } from 'elysia'

import { Specialty } from '@/modules/specialties/domain'
import { Partner } from '@/modules/partners/domain'

export const removeSpecialtyService = async (id: string) => {
  const specialty = await Specialty.model.findById(id)
  if (!specialty) {
    throw error('Not Found', { error: 'Especialidade não encontrada' })
  }

  await specialty.deleteOne().catch(() => {
    throw error('Internal Server Error', { error: 'Erro ao remover especialidade' })
  })

  await Partner.model.updateMany({ specialties: id }, { $pull: { specialties: id } }).catch(() => {
    throw error('Internal Server Error', { error: 'Erro ao remover referência da especialidade nos parceiros' })
  })
}
