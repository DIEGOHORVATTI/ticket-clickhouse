import { Elysia } from 'elysia'
import { MongoClient } from 'mongodb'
import { ClickHouse } from 'clickhouse'

// Configurações
const MONGO_URI = 'mongodb://localhost:27017' // URI do MongoDB
const MONGO_DB = 'seu_banco' // Nome do banco de dados
const MONGO_COLLECTION = 'ticket_event' // Nome da coleção

const CLICKHOUSE_HOST = 'localhost' // Host do ClickHouse
const CLICKHOUSE_DB = 'seu_banco' // Nome do banco no ClickHouse
const CLICKHOUSE_TABLE = 'ticket_events' // Nome da tabela no ClickHouse

// Conexão com o MongoDB
const mongoClient = new MongoClient(MONGO_URI)
await mongoClient.connect()
const db = mongoClient.db(MONGO_DB)
const collection = db.collection(MONGO_COLLECTION)

// Conexão com o ClickHouse
const clickhouse = new ClickHouse({
  url: CLICKHOUSE_HOST,
  port: 8123, // Porta padrão do ClickHouse
  debug: false,
  basicAuth: null, // Autenticação, se necessário
  isUseGzip: false,
  format: 'json', // Formato de saída
  raw: false,
  config: {
    database: CLICKHOUSE_DB // Banco de dados no ClickHouse
  }
})

// Função para inserir dados no ClickHouse
async function insertIntoClickHouse(event: any) {
  const query = `
    INSERT INTO ${CLICKHOUSE_TABLE} (callId, status, timestamp)
    VALUES ({callId: String}, {status: String}, {timestamp: DateTime})
  `

  await clickhouse.insert(query, [event]).toPromise()
}

// Ouvir eventos do MongoDB
async function listenToMongoEvents() {
  const changeStream = collection.watch()

  console.log('Ouvindo eventos do MongoDB...')

  for await (const change of changeStream) {
    if (change.operationType === 'insert') {
      const event = change.fullDocument // Dados do evento
      console.log('Novo evento recebido:', event)

      // Inserir no ClickHouse
      try {
        await insertIntoClickHouse(event)
        console.log('Evento inserido no ClickHouse:', event)
      } catch (error) {
        console.error('Erro ao inserir no ClickHouse:', error)
      }
    }
  }
}

// Iniciar o servidor ElysiaJS
const app = new Elysia()
  .get('/', () => 'Servidor rodando!')
  .listen(3000, () => {
    console.log('Servidor ElysiaJS rodando na porta 3000')
    // Iniciar o listener de eventos do MongoDB
    listenToMongoEvents().catch(console.error)
  })

export type App = typeof app
