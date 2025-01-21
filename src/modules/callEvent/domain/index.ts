import { Model, Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { schemaFactory } from '@/shared/schema-factory'

import { CallEventValidation } from './validation'

export type ICallEvent = typeof CallEventValidation.composition.static

const schema = new Schema<ICallEvent, Model<ICallEvent>>(
  {
    callId: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    caller: {
      id: String,
      name: String,
      phoneNumber: String
    },
    agent: {
      id: String,
      name: String
    },
    duration: {
      type: Number
    },
    notes: {
      type: String
    }
  } satisfies SchemaFactoryProps<ICallEvent>,
  {
    collection: collectionsData.CallEvent.collection,
    timestamps: true
  }
)

export const CallEvent = schemaFactory<ICallEvent, {}, typeof CallEventValidation>({
  schema,
  name: collectionsData.CallEvent.name,
  validation: CallEventValidation
})
