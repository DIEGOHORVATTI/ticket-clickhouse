import { error } from 'elysia'

import { ICallEvent, CallEvent } from '@/modules/callEvent/domain'

export const createCallEventService = async (data: ICallEvent) => {
  const specialty = new CallEvent.model(data)

  await specialty.save().catch(err => {
    throw error('Internal Server Error', { error: 'Falha ao criar callEvent' })
  })

  return specialty
}
