import { t as Type } from 'elysia'

import { Schema, Model, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { connectDB } from './connection-db'
import { generateFilterSchema } from './generate-filter-schema'

type ModelConfig = {
  name: string
}

type SchemaFactoryProps<Composition, ExtraInfo, Validation> = ModelConfig & {
  schema: Schema<Composition, Model<Composition>, ExtraInfo>
  validation: Validation
}

export function schemaFactory<Composition, ExtraInfo, Validation>({
  name,
  schema,
  validation
}: SchemaFactoryProps<
  Composition,
  ExtraInfo,
  Validation & {
    schema: Record<string, any>
    composition: Record<string, any>
  }
>) {
  schema.set('toJSON', { virtuals: true })
  schema.set('toObject', { virtuals: true })
  schema.set('versionKey', false)

  schema.plugin(paginate)

  const model = connectDB.model<Composition, PaginateModel<Composition>>(name, schema)

  /* @ts-ignore */
  const filters = Type.Object(generateFilterSchema<Validation['schema']>(validation.schema))

  return { schema, filters, model, validation }
}
