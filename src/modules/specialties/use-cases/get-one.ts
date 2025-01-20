import { error } from 'elysia'

import { CallEvent } from '@/modules/specialties/domain'

export const getOneSpecialtyService = async (id: string) => {
  const specialty = await CallEvent.model.findById(id)

  if (!specialty) {
    error('Not Found', 'Especialidade não encontrada')
  }

  return { specialty }
}
