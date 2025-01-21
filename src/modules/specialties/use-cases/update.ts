import { error } from 'elysia'

import { ICallEvent, CallEvent } from '@/modules/specialties/domain'

export const updateSpecialtyService = async (id: string, data: ICallEvent) => {
  const specialty = await CallEvent.model.findById(id)
  if (!specialty) {
    throw error('Not Found', { error: 'Especialidade não encontrada' })
  }

  if (data.name !== specialty.name) {
    await validateUniqueSpecialtyName()
  }

  Object.assign(specialty, data)

  await specialty.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao atualizar especialidade' })
  })

  return { specialty }

  async function validateUniqueSpecialtyName() {
    const existingSpecialty = await CallEvent.model.findOne({ name: data.name })

    if (existingSpecialty) {
      throw error('Conflict', { error: 'Já existe uma especialidade com este nome' })
    }
  }
}
