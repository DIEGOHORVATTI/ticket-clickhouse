export const convertObjectToQuery = (filter: Record<string, any>, parentKey: string = ''): Record<string, any> => {
  const queryParameters = Object.entries(filter).reduce((query, [key, value]) => {
    const processed = processKey(key, value, parentKey)

    return { ...query, ...processed }
  }, {})

  return queryParameters
}

function processKey(key: string, value: any, parentKey: string): Record<string, any> {
  if (key === 'startDate' || key === 'endDate') {
    return handleDateFilters(key, value)
  }

  const isNestedObject = isStructuredObject(value)
  const newKey = parentKey ? `${parentKey}.${key}` : key

  if (isNestedObject) {
    return convertObjectToQuery(value, newKey)
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return { [newKey]: value }
  }

  return { [newKey]: new RegExp(value, 'i') }
}

function handleDateFilters(key: string, value: any): Record<string, any> {
  const dateKey = 'createdAt'
  const startDate = key === 'startDate' ? new Date(value) : null
  const endDate = key === 'endDate' ? new Date(value) : null
  const dateQuery: Record<string, any> = {}

  if (startDate) {
    dateQuery[dateKey] = { ...dateQuery[dateKey], $gte: startDate }
  }

  if (endDate) {
    dateQuery[dateKey] = { ...dateQuery[dateKey], $lte: endDate }
  }

  return dateQuery
}

function isStructuredObject(value: any): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
