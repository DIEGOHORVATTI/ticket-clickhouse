import { Elysia } from 'elysia';
import { ClickHouseService } from '../services/ClickHouseService';

export function setupAnalyticsController(app: Elysia, clickHouseService: ClickHouseService) {
  return app
    .get('/analytics/metrics', async ({ query }) => {
      const { startDate, endDate } = query;
      const metrics = await clickHouseService.getCallMetrics(
        new Date(startDate),
        new Date(endDate)
      );
      return { success: true, metrics };
    })

    .get('/analytics/agent-performance', async ({ query }) => {
      const { startDate, endDate } = query;
      const performance = await clickHouseService.getAgentPerformance(
        new Date(startDate),
        new Date(endDate)
      );
      return { success: true, performance };
    });
}