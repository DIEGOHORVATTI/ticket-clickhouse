import { error } from 'elysia'
import { ICallEvent, CallEvent } from '@/modules/callEvent/domain'
import { insertCallEventClickhouse } from './insert-clickhouse'

export const createCallEventService = async (data: ICallEvent) => {
  try {
    // Save to MongoDB
    const specialty = new CallEvent.model(data)
    await specialty.save()

    // Save to ClickHouse
    await insertCallEventClickhouse(data)

    return specialty
  } catch (err) {
    console.error('Error creating call event:', err)
    throw error('Internal Server Error', { error: 'Falha ao criar callEvent' })
  }
}