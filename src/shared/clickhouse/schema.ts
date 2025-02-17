import { ICallEvent } from '../../modules/callEvent/domain'
import { clickhouseClient, generateClickHouseSchema } from '../clickhouse'

/* 
CREATE TABLE IF NOT EXISTS call_tickets (
  _id String,
  callId String,
  callIdHold String,
  originalCallId String,
  serviceId String,
  externalCallId String,
  media Nested(
    type String,
    submedia String
  ),
  expectedServiceTime Int32,
  interlocutor Nested(
    type String,
    id String,
    flgSource Bool,
    identity String,
    chatIdentity String
  ),
  attendant Nested(
    type String,
    id String,
    flgSource Bool,
    identity String
  ),
  flgConsult Bool,
  flgIncoming Bool,
  associatedData String,
  protocol String,
  callbackId String,
  flgMonitoring String,
  queuePosition Int32,
  fidelization Bool,
  flgPickUp Bool,
  flgRecord Bool,
  tokenAi String,
  hookBy String,
  callbackRegState String,
  endReason String,
  causedBy String,
  createdAt DateTime
)
ENGINE = MergeTree()
ORDER BY (callId, createdAt)
*/
export async function createCallEventsTable() {
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
}

createCallEventsTable()
