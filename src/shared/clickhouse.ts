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

const typeMapping = ['String', 'Int32', 'UInt8', 'DateTime64(3)', 'Map(String, String)'] as const
/**
 * Gera o schema de uma tabela no ClickHouse
 * @param model Modelo da tabela
 * @returns Schema da tabela
 */
export function generateClickHouseSchema<T>(model: Record<keyof T, (typeof typeMapping)[number]>): string {
  const fields = Object.entries(model).map(([key, value]) => {
    return `  ${key} ${value}`
  })

  return `(\n${fields.join(',\n')}\n)`
}
