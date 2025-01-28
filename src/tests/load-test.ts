import { ICallEvent } from '@/modules/callEvent/domain'
import { clickhouseClient } from '@/shared/clickhouse'

const formatDateTime = (date: Date): string => {
  const pad = (num: number, size: number) => num.toString().padStart(size, '0')
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)} ` +
    `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}.${pad(
      date.getMilliseconds(),
      3
    )}`
  )
}

const generateRandomData = (): ICallEvent => {
  return {
    _id: crypto.randomUUID(),
    domain: 'devpl3',
    event: 'tktNewCall',
    callId: crypto.randomUUID(),
    externalCallId: Math.floor(Math.random() * 100000000),
    iterationLevel: Math.floor(Math.random() * 10) + 1,
    serviceId: crypto.randomUUID(),
    expectedServiceTime: Math.floor(Math.random() * 1000),
    interlocutor_identity: (Math.floor(Math.random() * 1000000) + 1000000).toString(),
    flgConsult: Math.random() < 0.5,
    flgIncoming: Math.random() < 0.5,
    associatedData: '',
    protocol: `2025${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')}`,
    eventDate_startDt: formatDateTime(new Date()),
    contact: crypto.randomUUID()
  }
}

const typeMapping = {
  string: 'String',
  number: 'Int32',
  boolean: 'UInt8',
  object: 'DateTime64(3)'
}

function generateClickHouseSchema<T>(model: Record<keyof T, keyof typeof typeMapping>) {
  const fields = Object.entries(model).map(([key, value]) => {
    const type = typeof value

    const dbType = typeMapping[type as keyof typeof typeMapping] || 'String'
    return `  ${key} ${dbType}`
  })

  return fields.join(',\n')
}

const runLoadTest = async () => {
  try {
    console.log('Creating table...')
    const newLocal = generateClickHouseSchema<ICallEvent>({
      domain: 'string',
      event: 'string',
      callId: 'string',
      externalCallId: 'string',
      iterationLevel: 'number',
      serviceId: 'string',
      expectedServiceTime: 'number',
      flgConsult: 'boolean',
      flgIncoming: 'boolean',
      associatedData: 'string',
      protocol: 'string',
      contact: 'string',
      eventDate: 'string',
      callIdHold: 'string',
      originalCallId: 'string',
      media: 'string',
      interlocutor: 'string',
      attendant: 'string',
      callbackId: 'string',
      flgMonitoring: 'string',
      queuePosition: 'string',
      fidelization: 'string',
      flgPickUp: 'string',
      flgRecord: 'string',
      tokenAi: 'string',
      hookBy: 'string',
      callbackRegState: 'string',
      endReason: 'string',
      causedBy: 'string'
    })

    await clickhouseClient.exec({
      query: `CREATE TABLE IF NOT EXISTS call_tickets (${newLocal}) ENGINE = MergeTree() ORDER BY (_id)`
    })
    console.log('🟢 Table created successfully.\n')

    console.log('🟢 Generating and inserting data...\n')
    const rows = Array.from({ length: 1000 }, () => generateRandomData())

    await clickhouseClient.insert({
      table: 'call_tickets',
      values: rows,
      format: 'JSONEachRow'
    })

    console.log('🟢 Data successfully inserted.')
  } catch (error) {
    console.error('🔴 Error during the load test:', error)
  }
}

runLoadTest()
