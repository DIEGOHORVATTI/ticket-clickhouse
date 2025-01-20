import { t as Type } from 'elysia'

const schema = {
  name: Type.String({
    minLength: 3,
    maxLength: 100,
    default: 'Pediatria',
    description: 'Nome da especialidade'
  }),
  description: Type.Optional(
    Type.String({
      maxLength: 500,
      default: 'Especialidade médica que cuida de crianças',
      description: 'Descrição da especialidade'
    })
  ),
  active: Type.Optional(
    Type.Boolean({
      default: true,
      description: 'Especialidade ativa'
    })
  )
}

export const SpecialtyValidation = { schema, composition: Type.Object(schema) }
