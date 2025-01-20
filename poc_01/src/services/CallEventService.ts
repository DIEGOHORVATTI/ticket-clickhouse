import { CallEvent } from '../models/CallEvent';
import { CallStatus, CallEvent as ICallEvent } from '../types/call';
import { ClickHouseService } from './ClickHouseService';

export class CallEventService {
  constructor(private clickHouseService: ClickHouseService) {}

  async createCallEvent(eventData: ICallEvent) {
    // Create new call event in MongoDB
    const callEvent = await CallEvent.create(eventData);
    
    // Sync to ClickHouse for analytics
    await this.clickHouseService.syncCallEvent(callEvent);
    
    return callEvent;
  }

  async updateCallStatus(callId: string, status: CallStatus, data: Partial<ICallEvent>) {
    const eventData = {
      callId,
      status,
      timestamp: new Date(),
      ...data
    };

    return this.createCallEvent(eventData);
  }

  async getCallHistory(callId: string) {
    return CallEvent.find({ callId }).sort({ timestamp: 1 });
  }
}