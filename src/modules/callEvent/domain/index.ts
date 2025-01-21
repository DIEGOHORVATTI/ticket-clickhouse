import { Model, Schema } from 'mongoose'

import { collectionsData } from '@/constants/config'

import { schemaFactory } from '@/shared/schema-factory'

import { CallEventValidation } from './validation'

export type ICallEvent = typeof CallEventValidation.composition.static

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

const schema = new Schema<ICallEvent, Model<ICallEvent>>(
  {
    callId: { type: String, required: true, description: 'callId do Neo para a chamada' },
    callIdHold: { type: String, description: 'callId da chamada retida - usado quando transferência sob consulta' },
    originalCallId: {
      type: String,
      description: 'callId da chamada original - usado em transferência para poder relacionar os atendimentos'
    },
    serviceId: { type: String, description: 'id do serviço associado à chamada' },
    externalCallId: {
      type: String,
      description: 'identificador da chamada utilizado por processo externo ao Neo (ex. chave do PABX)'
    },
    media: {
      type: {
        type: String,
        required: true,
        description: 'Tipo da mídia'
      },
      submedia: {
        type: String,
        required: true,
        description: 'Subtipo da mídia'
      }
    },
    expectedServiceTime: { type: Number, description: 'tempo esperado de atendimento em segundos' },
    interlocutor: {
      type: {
        type: String,
        required: true,
        description: 'Tipo de interlocutor'
      },
      id: {
        type: String,
        required: true,
        description: 'Identificador do interlocutor'
      },
      flgSource: {
        type: Boolean,
        required: true,
        description: 'Indica se o interlocutor é a fonte principal'
      },
      identity: {
        type: String,
        required: true,
        description: 'Identidade do interlocutor'
      },
      chatIdentity: {
        type: String,
        required: true,
        description: 'Identidade do chat do interlocutor'
      }
    },
    attendant: {
      type: {
        type: String,
        required: true,
        description: 'Tipo do atendente'
      },
      id: {
        type: String,
        required: true,
        description: 'Identificador do atendente'
      },
      flgSource: {
        type: Boolean,
        required: true,
        description: 'Indica se o atendente é a fonte principal'
      },
      identity: {
        type: String,
        required: true,
        description: 'Identidade do atendente'
      }
    },
    flgConsult: { type: Boolean, default: false, description: 'indica se a interação é uma consulta' },
    flgIncoming: {
      type: Boolean,
      required: true,
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
    hookBy: { type: String, enum: hookBy, description: 'quem desligou a chamada (A, B ou I)' },
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
