import { ICallEvent } from '../domain'
import { clickhouseClient } from '@/shared/clickhouse'

export async function insertCallEventClickhouse(event: ICallEvent) {
  try {
    await clickhouseClient.insert({
      table: 'call_events',
      values: [{
        ...event,
        createdAt: new Date(),
        // Flatten nested objects for ClickHouse
        'media.type': event.media?.type,
        'media.submedia': event.media?.submedia,
        'interlocutor.type': event.interlocutor?.type,
        'interlocutor.id': event.interlocutor?.id,
        'interlocutor.flgSource': event.interlocutor?.flgSource,
        'interlocutor.identity': event.interlocutor?.identity,
        'interlocutor.chatIdentity': event.interlocutor?.chatIdentity,
        'attendant.type': event.attendant?.type,
        'attendant.id': event.attendant?.id,
        'attendant.flgSource': event.attendant?.flgSource,
        'attendant.identity': event.attendant?.identity
      }],
      format: 'JSONEachRow'
    })
    console.log('✅ Data inserted into ClickHouse successfully')
  } catch (error) {
    console.error('❌ Error inserting into ClickHouse:', error)
    throw error
  }
}