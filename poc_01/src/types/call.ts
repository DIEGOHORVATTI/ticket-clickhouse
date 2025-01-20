export interface CallEvent {
  callId: string;
  timestamp: Date;
  status: CallStatus;
  caller: {
    id: string;
    name: string;
    phoneNumber: string;
  };
  agent?: {
    id: string;
    name: string;
  };
  duration?: number;
  notes?: string;
}

export enum CallStatus {
  INITIATED = 'INITIATED',
  QUEUED = 'QUEUED',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED'
}