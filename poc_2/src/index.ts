import { Elysia } from 'elysia';
import { websocket } from '@elysiajs/websocket';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { setupCallController } from './controllers/CallController';
import { setupAnalyticsController } from './controllers/AnalyticsController';
import { setupWebSocketController } from './controllers/WebSocketController';
import { CallEventService } from './services/CallEventService';
import { ClickHouseService } from './services/ClickHouseService';

// Load environment variables
config();

// Initialize services
const clickHouseService = new ClickHouseService();
const callEventService = new CallEventService(clickHouseService);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create Elysia app
const app = new Elysia()
  .use(websocket());

// Setup controllers
setupCallController(app, callEventService);
setupAnalyticsController(app, clickHouseService);
setupWebSocketController(app, clickHouseService);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});