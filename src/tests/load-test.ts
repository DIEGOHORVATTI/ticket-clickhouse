import { ICallEvent } from '@/modules/callEvent/domain'

import { clickhouseClient, generateClickHouseSchema } from '@/shared/clickhouse'

const generateRandomData = (): ICallEvent => {
  return {
    domain: 'devpl3',
    event: 'tktNewCall',
    callId: crypto.randomUUID(),
    externalCallId: Math.floor(Math.random() * 100000000).toString(),
    iterationLevel: Math.floor(Math.random() * 10) + 1,
    serviceId: crypto.randomUUID(),
    expectedServiceTime: Math.floor(Math.random() * 1000),
    flgConsult: Math.random() < 0.5,
    flgIncoming: Math.random() < 0.5,
    associatedData: '',
    protocol: `2025${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')}`,
    contact: crypto.randomUUID()
  }
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
      eventDate: 'DateTime64(3)',
      callIdHold: 'String',
      originalCallId: 'String',
      media: 'String',
      interlocutor: 'String',
      attendant: 'String',
      callbackId: 'String',
      flgMonitoring: 'String',
      queuePosition: 'String',
      fidelization: 'String',
      flgPickUp: 'String',
      flgRecord: 'String',
      tokenAi: 'String',
      hookBy: 'String',
      callbackRegState: 'String',
      endReason: 'String',
      causedBy: 'String'
    })

    const createTableSQL = `CREATE TABLE IF NOT EXISTS call_tickets ${schemaSQL} ENGINE = MergeTree() ORDER BY _id`

    console.log(createTableSQL)

    await clickhouseClient.exec({ query: createTableSQL })
    console.log('✅ Tabela criada com sucesso.\n')

    console.log('🟢 Gerando e inserindo dados...\n')
    const rows = Array.from({ length: 1000 }, () => generateRandomData())

    await clickhouseClient.insert({
      table: 'call_tickets',
      values: rows,
      format: 'JSONEachRow'
    })

    console.log('✅ Dados inseridos com sucesso.')
  } catch (error) {
    console.error('❌ Erro ao executar teste de carga:', error)
  }
}

runLoadTest()
