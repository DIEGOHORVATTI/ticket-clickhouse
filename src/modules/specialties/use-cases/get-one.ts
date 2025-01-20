import { error } from 'elysia'

import { Specialty } from '@/modules/specialties/domain'

export const getOneSpecialtyService = async (id: string) => {
  const specialty = await Specialty.model.findById(id)

  if (!specialty) {
    error('Not Found', 'Especialidade não encontrada')
  }

  return { specialty }
}
