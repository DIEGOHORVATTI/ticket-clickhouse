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
