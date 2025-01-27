import { clickhouseClient } from '../clickhouse'

export async function createCallEventsTable() {
  await clickhouseClient.query({
    query: `
      CREATE TABLE IF NOT EXISTS call_events (
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
    `
  })
}
