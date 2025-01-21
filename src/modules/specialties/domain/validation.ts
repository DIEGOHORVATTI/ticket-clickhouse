import { t as Type } from 'elysia'

const callStatus = {
  missed: 'missed',
  received: 'received',
  rejected: 'rejected'
}

export const schema = {
  callId: Type.String({
    required: true,
    index: true
  }),
  timestamp: Type.Date({
    required: true,
    default: Date.now
  }),
  status: Type.String({
    required: true,
    enum: Type.Enum(callStatus)
  }),
  caller: Type.Object({
    id: Type.String(),
    name: Type.String(),
    phoneNumber: Type.String()
  }),
  agent: Type.Object({
    id: Type.String(),
    name: Type.String()
  }),
  duration: Type.Number(),
  notes: Type.String()
}

export const CallEventValidation = { schema, composition: Type.Object(schema) }
