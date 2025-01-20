import { Elysia } from 'elysia';
import { ClickHouseService } from '../services/ClickHouseService';

export function setupWebSocketController(app: Elysia, clickHouseService: ClickHouseService) {
  return app.ws('/ws/analytics', {
    open(ws) {
      console.log('WebSocket connection opened');
      
      // Start sending real-time updates
      const interval = setInterval(async () => {
        try {
          const now = new Date();
          const startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Last 24 hours
          
          const [metrics, performance] = await Promise.all([
            clickHouseService.getCallMetrics(startDate, now),
            clickHouseService.getAgentPerformance(startDate, now)
          ]);

          ws.send({
            type: 'analytics_update',
            data: {
              metrics,
              performance
            }
          });
        } catch (error) {
          console.error('Error sending WebSocket update:', error);
        }
      }, 5000); // Update every 5 seconds

      // Store interval ID for cleanup
      ws.data = { updateInterval: interval };
    },
    
    close(ws) {
      console.log('WebSocket connection closed');
      // Clean up interval on connection close
      if (ws.data?.updateInterval) {
        clearInterval(ws.data.updateInterval);
      }
    },

    message(ws, message) {
      // Handle incoming messages if needed
      console.log('Received message:', message);
    }
  });
}