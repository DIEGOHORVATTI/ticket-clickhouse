import { createClient } from '@clickhouse/client'

// Configuração do cliente ClickHouse
export const clickhouseClient = createClient({
  url: process.env.CLICKHOUSE_URL,
  username: process.env.CLICKHOUSE_USER,
  password: process.env.CLICKHOUSE_PASSWORD,
  database: process.env.CLICKHOUSE_DATABASE
})

export const executeClickhouseQuery = async <T>(query: string): Promise<T[]> => {
  return (await clickhouseClient.query({ query, format: 'JSONEachRow' }).then(res => res.json())) as T[]
}

const typeMapping = {
  string: 'String',
  number: 'Int32',
  boolean: 'UInt8',
  object: 'DateTime64(3)'
}

/**
 * Gera o schema de uma tabela no ClickHouse
 * @param model Modelo da tabela
 * @returns Schema da tabela
 */
export function generateClickHouseSchema<T>(model: Record<keyof T, keyof typeof typeMapping>) {
  const fields = Object.entries(model).map(([key, value]) => {
    const type = typeMapping[value as keyof typeof typeMapping] || 'String'
    return `  ${key} ${type}`
  })

  return `(\n${fields.join(',\n')}\n)`
}
