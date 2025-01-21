import { error } from 'elysia'

import { CallEvent } from '@/modules/callEvent/domain'

export const getOneCallEventService = async (id: string) => {
  const specialty = await CallEvent.model.findById(id)

  if (!specialty) {
    error('Not Found', 'CallEvent não encontrada')
  }

  return { specialty }
}
