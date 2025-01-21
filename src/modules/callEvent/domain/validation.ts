import { t as Type } from 'elysia'

export const hookBy = ['A', 'B', 'I']
export const callbackRegState = [
  'REGISTERED',
  'REINCIDENT',
  'SCHEDULED',
  'FINAL_NOT_SUCCESS',
  'FINAL_SUCCESS',
  'ERROR',
  'FINAL_HANDLED_REINCIDENT'
]
export const endReason = [
  'FINISHED_HANDLED',
  'OUT_OF_OPERATION',
  'ABANDONED',
  'OVERFLOWED',
  'TRANSFERRED',
  'DEVIATED_FROM_QUEUE',
  'DESTINATION_BUSY',
  'DESTINATION_NO_ANSWER',
  'FAIL',
  'FINISHED_RETENTION_TIMEOUT'
]
export const causedBy = [
  'IN_QUEUE',
  'IN_DEVICE',
  'BEFORE_QUEUE',
  'IN_GENERATION',
  'INVALID_NUMBER',
  'NOT_HANDLED_BY_AGENT',
  'GENERIC',
  'TO_AGENT',
  'TO_QUEUE',
  'TO_DEVICE',
  'BY_ORIGIN',
  'TO_QUEUE_BY_RETENTION_TIMEOUT',
  'HSM_SEND_FAILURE'
]

export const schema = {
  callId: Type.String({
    description: 'callId do Neo para a chamada'
  }),
  callIdHold: Type.Optional(
    Type.String({
      description: 'callId da chamada retida - usado quando transferência sob consulta'
    })
  ),
  originalCallId: Type.Optional(
    Type.String({
      description: 'callId da chamada original - usado em transferência para poder relacionar os atendimentos'
    })
  ),
  serviceId: Type.Optional(
    Type.String({
      description: 'id do serviço associado à chamada'
    })
  ),
  externalCallId: Type.Optional(
    Type.String({
      description: 'identificador da chamada utilizado por processo externo ao Neo (ex. chave do PABX)'
    })
  ),
  media: Type.Optional(
    Type.Object(
      {
        type: Type.Optional(
          Type.String({
            description: 'Tipo da mídia'
          })
        ),
        submedia: Type.Optional(
          Type.String({
            description: 'Subtipo da mídia'
          })
        )
      },
      { description: 'tipo da mídia e submídia' }
    )
  ),
  expectedServiceTime: Type.Optional(
    Type.Number({
      description: 'tempo esperado de atendimento em segundos'
    })
  ),
  interlocutor: Type.Optional(
    Type.Object(
      {
        type: Type.Optional(
          Type.String({
            description: 'Tipo de interlocutor'
          })
        ),
        id: Type.Optional(
          Type.String({
            description: 'Identificador do interlocutor'
          })
        ),
        flgSource: Type.Optional(
          Type.Boolean({
            description: 'Indica se o interlocutor é a fonte principal'
          })
        ),
        identity: Type.Optional(
          Type.String({
            description: 'Identidade do interlocutor'
          })
        ),
        chatIdentity: Type.Optional(
          Type.String({
            description: 'Identidade do chat do interlocutor'
          })
        )
      },
      { description: 'quem está interagindo com o serviço/agente' }
    )
  ),
  attendant: Type.Optional(
    Type.Object(
      {
        type: Type.Optional(
          Type.String({
            description: 'Tipo do atendente'
          })
        ),
        id: Type.Optional(
          Type.String({
            description: 'Identificador do atendente'
          })
        ),
        flgSource: Type.Optional(
          Type.Boolean({
            description: 'Indica se o atendente é a fonte principal'
          })
        ),
        identity: Type.Optional(
          Type.String({
            description: 'Identidade do atendente'
          })
        )
      },
      { description: 'quando já tem o agente envolvido na chamada' }
    )
  ),
  flgConsult: Type.Optional(
    Type.Boolean({
      description: 'indica se a interação é uma consulta',
      default: false
    })
  ),
  flgIncoming: Type.Optional(
    Type.Boolean({
      description: 'indica a direção, true é Entrante, false é Sainte',
      default: true
    })
  ),
  associatedData: Type.Optional(
    Type.String({
      description: 'dados associados da chamada'
    })
  ),
  protocol: Type.Optional(
    Type.String({
      description: 'Protocolo da chamada'
    })
  ),
  callbackId: Type.Optional(
    Type.String({
      description: 'id do contato do callback, indica que foi uma chamada gerada pelo callback'
    })
  ),
  flgMonitoring: Type.Optional(
    Type.String({
      description: 'indica se a chamada está sendo monitorada enviando qual ramal está sendo monitorado'
    })
  ),
  queuePosition: Type.Optional(
    Type.Number({
      description: 'registra a posição que o interlocutor estava na fila (abandono, transbordo)'
    })
  ),
  fidelization: Type.Optional(
    Type.Boolean({
      description: 'indica se a chamada é de fidelização'
    })
  ),
  flgPickUp: Type.Optional(
    Type.Boolean({
      description: 'indica se o agente atendeu a chamada'
    })
  ),
  flgRecord: Type.Optional(
    Type.Boolean({
      description: 'indica se a interação foi gravada'
    })
  ),
  tokenAi: Type.Optional(
    Type.String({
      description: 'uuid com token referente à integração com IA no atendimento'
    })
  ),
  hookBy: Type.Optional(
    Type.String({
      description: 'quem desligou a chamada (A, B ou I)',
      enum: hookBy
    })
  ),
  callbackRegState: Type.Optional(
    Type.String({
      description: 'status do registro do callback',
      enum: callbackRegState
    })
  ),
  endReason: Type.Optional(
    Type.String({
      description: 'condição de término da interação',
      enum: endReason
    })
  ),
  causedBy: Type.Optional(
    Type.String({
      description: 'causa da condição de término da interação',
      enum: causedBy
    })
  )
}

export const CallEventValidation = { schema, composition: Type.Object(schema) }
