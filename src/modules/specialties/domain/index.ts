import { Model, Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { schemaFactory } from '@/shared/schema-factory'

import { SpecialtyValidation } from './validation'

export type ISpecialty = typeof SpecialtyValidation.composition.static

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

export const Specialty = schemaFactory<ISpecialty, {}, typeof SpecialtyValidation>({
  schema,
  name: collectionsData.Specialty.name,
  validation: SpecialtyValidation
})
