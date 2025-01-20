import { t as Type } from 'elysia'

export const registrationDate = Type.String({
  format: 'date',
  default: '2017-07-21',
  pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
})

export const pageMetadata = {
  limit: Type.Optional(
    Type.Number({
      default: 10,
      description: 'Número de resultados por página (máximo recomendado: 100)',
      minimum: 1,
      maximum: 100
    })
  ),
  page: Type.Optional(
    Type.Number({
      default: 0,
      description: 'Página atual da consulta (começando de 0)',
      minimum: 0
    })
  )
}

const schema = Type.Object({
  cep: Type.String({ minLength: 8, maxLength: 8, description: 'CEP do endereço', default: '00000000' }),
  city: Type.Optional(Type.String({ maxLength: 20, description: 'Cidade do endereço', default: 'São Paulo' })),
  state: Type.Optional(
    Type.String({
      maxLength: 2,
      minLength: 2,
      pattern: '^[A-Z]{2}$',
      description: 'Estado do endereço',
      default: 'SP'
    })
  ),
  neighborhood: Type.Optional(Type.String({ maxLength: 60, description: 'Bairro do endereço', default: 'Centro' })),
  street: Type.Optional(Type.String({ maxLength: 60, description: 'Rua do endereço', default: 'Rua do Centro' })),
  number: Type.String({ minLength: 1, maxLength: 20, description: 'Número do endereço', default: '123' }),
  complement: Type.Optional(Type.String({ maxLength: 60, description: 'Complemento do endereço', default: 'Casa' })),
  locationLink: Type.Optional(
    Type.String({ description: 'Link do Google Maps ou OpenStreetMap', default: 'https://goo.gl/maps/123456' })
  )
})
export const address = {
  schema,
  model: {
    cep: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    neighborhood: { type: String },
    street: { type: String },
    number: { type: String, required: true },
    complement: { type: String },
    locationLink: { type: String }
  } satisfies SchemaFactoryProps<typeof schema.static>
}
