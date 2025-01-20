import { type SchemaDefinitionProperty } from 'mongoose'

type ExtractRequired<Composition, K extends keyof Composition> = Required<NonNullable<Composition[K]>>

export declare global {
  type SchemaFactoryProps<Composition> = {
    [K in keyof Composition]-?: SchemaDefinitionProperty<ExtractRequired<Composition, K>>
  }
}
