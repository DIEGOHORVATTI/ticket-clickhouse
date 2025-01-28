import { clickhouseClient } from '@/shared/clickhouse'

const formatDateTime = (date: Date) => {
  const pad = (num: number, size: number) => num.toString().padStart(size, '0')
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)} ` +
    `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}.${pad(
      date.getMilliseconds(),
      3
    )}`
  )
}

const generateRandomData = () => {
  return {
    _id: crypto.randomUUID(),
    domain: 'devpl3',
    event: 'tktNewCall',
    callId: crypto.randomUUID(),
    externalCallId: Math.floor(Math.random() * 100000000),
    iterationLevel: Math.floor(Math.random() * 10) + 1,
    serviceId: crypto.randomUUID(),
    expectedServiceTime: Math.floor(Math.random() * 1000),
    media_type: 'VOICE',
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

const runLoadTest = async () => {
  try {
    console.log('Creating table...')
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS call_tickets (
        _id String,
        domain String,
        event String,
        callId String,
        externalCallId String,
        iterationLevel Int32,
        serviceId String,
        expectedServiceTime Int32,
        media_type String,
        interlocutor_identity String,
        flgConsult UInt8,
        flgIncoming UInt8,
        associatedData String,
        protocol String,
        eventDate_startDt DateTime64(3),
        contact String
      ) ENGINE = MergeTree() ORDER BY (_id)
    `

    await clickhouseClient.exec({ query: createTableQuery })
    console.log('🟢 Table created successfully.\n')

    console.log('🟢 Generating and inserting data...\n')
    const rows = Array.from({ length: 1000 }, generateRandomData)

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
