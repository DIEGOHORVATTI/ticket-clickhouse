import { error } from 'elysia'

import { ISpecialty, CallEvent } from '@/modules/specialties/domain'

export const createSpecialtyService = async (data: ISpecialty) => {
  const existingSpecialty = await CallEvent.model.findOne({ name: data.name })
  if (existingSpecialty) {
    throw error('Conflict', { error: 'Especialidade já cadastrada' })
  }

  const specialty = new CallEvent.model(data)
  await specialty.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao criar especialidade' })
  })

  return specialty
}
