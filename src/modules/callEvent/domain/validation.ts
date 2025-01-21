import { t as Type } from 'elysia'
import { callbackRegState, causedBy, endReason, hookBy } from '.'

export const schema = {
  callId: Type.String({
    required: true,
    description: 'callId do Neo para a chamada'
  }),
  callIdHold: Type.String({
    description: 'callId da chamada retida - usado quando transferência sob consulta'
  }),
  originalCallId: Type.String({
    description: 'callId da chamada original - usado em transferência para poder relacionar os atendimentos'
  }),
  serviceId: Type.String({
    description: 'id do serviço associado à chamada'
  }),
  externalCallId: Type.String({
    description: 'identificador da chamada utilizado por processo externo ao Neo (ex. chave do PABX)'
  }),
  media: Type.Object(
    {
      type: Type.String({
        required: true,
        description: 'Tipo da mídia'
      }),
      submedia: Type.String({
        required: true,
        description: 'Subtipo da mídia'
      })
    },
    { description: 'tipo da mídia e submídia' }
  ),
  expectedServiceTime: Type.Number({
    description: 'tempo esperado de atendimento em segundos'
  }),
  interlocutor: Type.Object(
    {
      type: Type.String({
        required: true,
        description: 'Tipo de interlocutor'
      }),
      id: Type.String({
        required: true,
        description: 'Identificador do interlocutor'
      }),
      flgSource: Type.Boolean({
        required: true,
        description: 'Indica se o interlocutor é a fonte principal'
      }),
      identity: Type.String({
        required: true,
        description: 'Identidade do interlocutor'
      }),
      chatIdentity: Type.String({
        required: true,
        description: 'Identidade do chat do interlocutor'
      })
    },
    { description: 'quem está interagindo com o serviço/agente' }
  ),
  attendant: Type.Object(
    {
      type: Type.String({
        required: true,
        description: 'Tipo do atendente'
      }),
      id: Type.String({
        required: true,
        description: 'Identificador do atendente'
      }),
      flgSource: Type.Boolean({
        required: true,
        description: 'Indica se o atendente é a fonte principal'
      }),
      identity: Type.String({
        required: true,
        description: 'Identidade do atendente'
      })
    },
    { description: 'quando já tem o agente envolvido na chamada' }
  ),
  flgConsult: Type.Boolean({
    description: 'indica se a interação é uma consulta',
    default: false
  }),
  flgIncoming: Type.Boolean({
    required: true,
    description: 'indica a direção, true é Entrante, false é Sainte',
    default: true
  }),
  associatedData: Type.String({
    description: 'dados associados da chamada'
  }),
  protocol: Type.String({
    description: 'Protocolo da chamada'
  }),
  callbackId: Type.String({
    description: 'id do contato do callback, indica que foi uma chamada gerada pelo callback'
  }),
  flgMonitoring: Type.String({
    description: 'indica se a chamada está sendo monitorada enviando qual ramal está sendo monitorado'
  }),
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
