import { error } from 'elysia'

import { ICallEvent, CallEvent } from '@/modules/callEvent/domain'

export const updateCallEventService = async (id: string, data: ICallEvent) => {
  const specialty = await CallEvent.model.findById(id)
  if (!specialty) {
    throw error('Not Found', { error: 'CallEvent não encontrada' })
  }

  if (data.name !== specialty.name) {
    await validateUniqueSpecialtyName()
  }

  Object.assign(specialty, data)

  await specialty.save().catch(() => {
    throw error('Internal Server Error', { error: 'Falha ao atualizar callEvent' })
  })

  return { specialty }

  async function validateUniqueSpecialtyName() {
    const existingSpecialty = await CallEvent.model.findOne({ name: data.name })

    if (existingSpecialty) {
      throw error('Conflict', { error: 'Já existe uma callEvent com este nome' })
    }
  }
}
