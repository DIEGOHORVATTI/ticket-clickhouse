import { v4 as uuidv4 } from 'uuid'
import { ICallEvent } from '../domain'

function isValidUUID(uuid: string): boolean {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return regex.test(uuid)
}

export function generateFakeCallEvents(count: number = 1) {
  const callEvents: Array<ICallEvent> = []

  for (let i = 0; i < count; i++) {
    const pair = i % 2 === 0

    const generatedEvent = {
      callId: uuidv4(),
      callIdHold: uuidv4(),
      originalCallId: uuidv4(),
      serviceId: uuidv4(),
      externalCallId: uuidv4(),
      media: { type: 'type', submedia: 'submedia' },
      expectedServiceTime: 100,
      interlocutor: { type: 'type', id: uuidv4(), flgSource: true, identity: 'identity', chatIdentity: 'chatIdentity' },
      attendant: { type: 'type', id: uuidv4(), flgSource: false, identity: 'identity' },
      flgConsult: pair,
      flgIncoming: !pair,
      associatedData: 'associatedData',
      protocol: 'protocol',
      callbackId: 'callbackId',
      flgMonitoring: 'flgMonitoring',
      queuePosition: 1,
      fidelization: true,
      flgPickUp: true,
      flgRecord: true,
      tokenAi: 'tokenAi',
      hookBy: 'A',
      callbackRegState: 'REGISTERED',
      endReason: 'FINISHED_HANDLED',
      causedBy: 'IN_QUEUE'
    }

    Object.keys(generatedEvent).forEach(key => {
      const value = generatedEvent[key as keyof ICallEvent]
      if (typeof value === 'string' && isValidUUID(value)) {
        console.log(`${key}: Valid UUID`)
      }
    })

    callEvents.push(generatedEvent)
  }

  return callEvents
}
