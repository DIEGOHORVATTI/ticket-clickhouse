import { ICallEvent } from '@/modules/callEvent/domain'
import { clickhouseClient, generateClickHouseSchema } from '@/shared/clickhouse'

const MAX_ROW_LIMIT = 100_000_000

type TicketCallEvent = ICallEvent & {
  flgConsult: number
  flgIncoming: number
}

const generateRandomData: { [key in keyof TicketCallEvent]: TicketCallEvent[key] } = {
  domain: 'devpl3',
  event: 'tktNewCall',
  callId: crypto.randomUUID(),
  externalCallId: Math.floor(Math.random() * 100000000).toString(),
  iterationLevel: Math.floor(Math.random() * 10) + 1,
  serviceId: crypto.randomUUID(),
  expectedServiceTime: Math.floor(Math.random() * 1000),
  flgConsult: Math.random() < 0.5 ? 1 : 0, // Convertendo para UInt8
  flgIncoming: Math.random() < 0.5 ? 1 : 0, // Convertendo para UInt8
  associatedData: Math.floor(Math.random() * 100000000).toString(),
  protocol: `2025${Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0')}`,
  contact: crypto.randomUUID(),
  eventDate: { startDt: new Date().toISOString(), duration: Math.floor(Math.random() * 3600) }, // Ajuste para incluir a duração
  callIdHold: crypto.randomUUID(),
  originalCallId: crypto.randomUUID(),
  media: { type: 'voice', submedia: '' },
  interlocutor: { type: 'customer', id: crypto.randomUUID() },
  attendant: { type: 'agent', id: crypto.randomUUID() },
  callbackId: crypto.randomUUID(),
  flgMonitoring: 'N',
  queuePosition: 0,
  fidelization: false,
  flgPickUp: true,
  flgRecord: true,
  tokenAi: crypto.randomUUID(),
  hookBy: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
  callbackRegState: 'OK',
  endReason: 'FINISHED_HANDLED',
  causedBy: 'AGENT'
}

const runLoadTest = async () => {
  try {
    console.log('🟢 Criando tabela no ClickHouse...\n')

    const schemaSQL = generateClickHouseSchema<ICallEvent>({
      domain: 'String',
      event: 'String',
      callId: 'String',
      externalCallId: 'String',
      iterationLevel: 'Int32',
      serviceId: 'String',
      expectedServiceTime: 'Int32',
      flgConsult: 'UInt8',
      flgIncoming: 'UInt8',
      associatedData: 'String',
      protocol: 'String',
      contact: 'String',
      eventDate: 'Map(String, String)',
      callIdHold: 'String',
      originalCallId: 'String',
      media: 'Map(String, String)',
      interlocutor: 'Map(String, String)',
      attendant: 'Map(String, String)',
      callbackId: 'String',
      flgMonitoring: 'String',
      queuePosition: 'Int32',
      fidelization: 'UInt8',
      flgPickUp: 'UInt8',
      flgRecord: 'UInt8',
      tokenAi: 'String',
      hookBy: 'String',
      callbackRegState: 'String',
      endReason: 'String',
      causedBy: 'String'
    })

    const createTableSQL = `CREATE TABLE IF NOT EXISTS call_tickets ${schemaSQL} ENGINE = MergeTree() ORDER BY callId`

    console.info(createTableSQL)

    //await clickhouseClient.exec({ query: createTableSQL })
    console.log('✅ Tabela criada com sucesso.\n')

    console.log('🟢 Gerando e inserindo dados...\n')
    const rows = Array.from({ length: MAX_ROW_LIMIT }, () => generateRandomData)

    console.log(rows)

    /* await clickhouseClient.insert({
      table: 'call_tickets',
      values: rows,
      format: 'JSONEachRow'
    }) */

    console.log('✅ Dados inseridos com sucesso.')
  } catch (error) {
    console.error('❌ Erro ao executar teste de carga:', error)
  }
}

runLoadTest()
