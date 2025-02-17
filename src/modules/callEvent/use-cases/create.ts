import { error } from 'elysia'
import { ICallEvent, CallEvent } from '@/modules/callEvent/domain'
import { clickhouseClient } from '@/shared/clickhouse'

export const createCallEventService = async (values: ICallEvent) => {
  try {
    const specialty = new CallEvent.model(values)

    await specialty.save().then(() =>
      clickhouseClient.insert({
        table: 'call_tickets',
        values,
        format: 'JSONEachRow'
      })
    )

    return specialty
  } catch (err) {
    console.error('Error creating call event:', err)
    throw error('Internal Server Error', { error: 'Falha ao criar callEvent' })
  }
}
