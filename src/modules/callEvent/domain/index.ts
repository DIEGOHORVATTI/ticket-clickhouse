import { Model, Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { schemaFactory } from '@/shared/schema-factory'

import { CallEventValidation, callbackRegState, causedBy, endReason } from './validation'

export type ICallEvent = typeof CallEventValidation.composition.static

const schema = new Schema<ICallEvent, Model<ICallEvent>>(
  {
    callId: { type: String, description: 'callId do Neo para a chamada' },
    callIdHold: { type: String, description: 'callId da chamada retida - usado quando transferência sob consulta' },
    originalCallId: {
      type: String,
      description: 'callId da chamada original - usado em transferência para poder relacionar os atendimentos'
    },
    serviceId: { type: String, description: 'id do serviço associado à chamada' },
    externalCallId: {
      type: Number,
      description: 'identificador da chamada utilizado por processo externo ao Neo (ex. chave do PABX)'
    },
    media: {
      type: {
        type: String,
        description: 'Tipo da mídia'
      },
      submedia: {
        type: String,
        description: 'Subtipo da mídia'
      }
    },
    expectedServiceTime: { type: Number, description: 'tempo esperado de atendimento em segundos' },
    interlocutor: {
      type: {
        type: String,
        description: 'Tipo de interlocutor'
      },
      id: {
        type: String,
        description: 'Identificador do interlocutor'
      },
      flgSource: {
        type: Boolean,
        description: 'Indica se o interlocutor é a fonte principal'
      },
      identity: {
        type: String,
        description: 'Identidade do interlocutor'
      },
      chatIdentity: {
        type: String,
        description: 'Identidade do chat do interlocutor'
      }
    },
    attendant: {
      type: {
        type: String,
        description: 'Tipo do atendente'
      },
      id: {
        type: String,
        description: 'Identificador do atendente'
      },
      flgSource: {
        type: Boolean,
        description: 'Indica se o atendente é a fonte principal'
      },
      identity: {
        type: String,
        description: 'Identidade do atendente'
      }
    },
    flgConsult: { type: Boolean, default: false, description: 'indica se a interação é uma consulta' },
    flgIncoming: {
      type: Boolean,
      default: true,
      description: 'indica a direção, true é Entrante, false é Sainte'
    },
    associatedData: { type: String, description: 'dados associados da chamada' },
    protocol: { type: String, description: 'Protocolo da chamada' },
    callbackId: {
      type: String,
      description: 'id do contato do callback, indica que foi uma chamada gerada pelo callback'
    },
    flgMonitoring: {
      type: String,
      description: 'indica se a chamada está sendo monitorada enviando qual ramal está sendo monitorado'
    },
    queuePosition: {
      type: Number,
      description: 'registra a posição que o interlocutor estava na fila (abandono, transbordo)'
    },
    fidelization: { type: Boolean, description: 'indica se a chamada é de fidelização' },
    flgPickUp: { type: Boolean, description: 'indica se o agente atendeu a chamada' },
    flgRecord: { type: Boolean, description: 'indica se a interação foi gravada' },
    tokenAi: { type: String, description: 'uuid com token referente à integração com IA no atendimento' },
    hookBy: { type: String, enum: ['A', 'B', 'I'], description: 'quem desligou a chamada (A, B ou I)' },
    callbackRegState: {
      type: String,
      enum: callbackRegState,
      description: 'status do registro do callback'
    },
    endReason: {
      type: String,
      enum: endReason,
      description: 'condição de término da interação'
    },
    causedBy: {
      type: String,
      enum: causedBy,
      description: 'causa da condição de término da interação'
    },
    domain: {
      type: String,
      description: 'domínio do evento'
    },
    event: {
      type: String,
      description: 'evento associado'
    },
    iterationLevel: {
      type: Number,
      description: 'nível de iteração do evento'
    },
    eventDate: {
      endDt: String,
      duration: Number
    },
    contact: {
      type: String,
      description: 'id do contato'
    }
  } satisfies SchemaFactoryProps<ICallEvent>,
  {
    collection: collectionsData.CallEvent.collection,
    timestamps: true
  }
)

export const CallEvent = schemaFactory<ICallEvent, {}, typeof CallEventValidation>({
  schema,
  name: collectionsData.CallEvent.name,
  validation: CallEventValidation
})

const lapa: ICallEvent['causedBy'] = 'GENERIC'
