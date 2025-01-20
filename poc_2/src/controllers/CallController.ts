import { Elysia } from 'elysia';
import { CallEventService } from '../services/CallEventService';
import { CallStatus } from '../types/call';

export function setupCallController(app: Elysia, callEventService: CallEventService) {
  return app
    .post('/calls', async ({ body }) => {
      const callEvent = await callEventService.createCallEvent({
        ...body,
        status: CallStatus.INITIATED,
        timestamp: new Date()
      });
      return { success: true, callEvent };
    })

    .put('/calls/:callId/status', async ({ params, body }) => {
      const { callId } = params;
      const { status, ...data } = body;
      
      const updatedEvent = await callEventService.updateCallStatus(
        callId,
        status,
        data
      );
      
      return { success: true, callEvent: updatedEvent };
    })

    .get('/calls/:callId/history', async ({ params }) => {
      const { callId } = params;
      const history = await callEventService.getCallHistory(callId);
      return { success: true, history };
    });
}