import mongoose from 'mongoose';
import { CallStatus } from '../types/call';

const callEventSchema = new mongoose.Schema({
  callId: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: Object.values(CallStatus),
    required: true
  },
  caller: {
    id: String,
    name: String,
    phoneNumber: String
  },
  agent: {
    id: String,
    name: String
  },
  duration: Number,
  notes: String
}, {
  timestamps: true
});

export const CallEvent = mongoose.model('CallEvent', callEventSchema);