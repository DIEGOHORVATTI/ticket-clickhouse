import { ICallEvent } from '../domain'

export function generateFakeCallEvents(count: number = 1) {
  const callEvents: Array<ICallEvent> = []

  for (let i = 0; i < count; i++) {
    const pair = i % 2 === 0

    callEvents.push({
      callId: `callId-${i}`,
      callIdHold: `callIdHold-${i}`,
      originalCallId: `originalCallId-${i}`,
      serviceId: `serviceId-${i}`,
      externalCallId: `externalCallId-${i}`,
      media: {
        type: 'type',
        submedia: 'submedia'
      },
      expectedServiceTime: 100,
      interlocutor: {
        type: 'type',
        id: 'id',
        flgSource: true,
        identity: 'identity',
        chatIdentity: 'chatIdentity'
      },
      attendant: {
        type: 'type',
        id: 'id',
        flgSource: false,
        identity: 'identity'
      },
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
    } satisfies ICallEvent)
  }

  return callEvents
}
