import { Model, Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { schemaFactory } from '@/shared/schema-factory'

import { CallEventValidation } from './validation'

export type ISpecialty = typeof CallEventValidation.composition.static

const schema = new Schema<ISpecialty, Model<ISpecialty>>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    active: { type: Boolean, default: true }
  } satisfies SchemaFactoryProps<ISpecialty>,
  {
    collection: collectionsData.Specialty.collection,
    timestamps: true
  }
)

export const CallEvent = schemaFactory<ISpecialty, {}, typeof CallEventValidation>({
  schema,
  name: collectionsData.Specialty.name,
  validation: CallEventValidation
})
