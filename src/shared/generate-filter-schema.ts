import { t as Type } from 'elysia'

import { pageMetadata, registrationDate } from '@/utils/validations'

const resolveRequired = (schema: Record<string, any>): Record<string, any> => {
  if (Array.isArray(schema)) {
    return schema.map(resolveRequired)
  }

  if (schema && typeof schema === 'object') {
    if (schema.required && Array.isArray(schema.required)) {
      delete schema.required
    }

    Object.keys(schema).forEach(key => {
      schema[key] = resolveRequired(schema[key])
    })
  }

  return schema
}

export const generateFilterSchema = <T>(schema: Object) => {
  const filters = {
    startDate: Type.Optional(registrationDate),
    endDate: Type.Optional(registrationDate),
    ...pageMetadata,
    ...(resolveRequired(
      Object.fromEntries(Object.entries(schema).map(([key, value]) => [key, Type.Optional(value)]))
    ) as T)
  }

  return filters
}
