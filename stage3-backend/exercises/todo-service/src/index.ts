#!/usr/bin/env node

/**
 * To-Do List Service
 *
 * Main application entry point
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import todoRoutes from './routes/todos.js';
import { sequelize } from './utils/database.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/todos', todoRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'To-Do List Service', version: '1.0.0' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found', message: 'Route not found' });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Global error:', err);
  res
    .status(500)
    .json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
});

// Initialize database and start server
async function startServer(): Promise<void> {
  try {
    // Sync database models
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`To-Do List Service is running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('Shutting down server...');
      server.close(async () => {
        console.log('Server closed');
        await sequelize.close();
        console.log('Database connection closed');
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      console.log('Shutting down server...');
      server.close(async () => {
        console.log('Server closed');
        await sequelize.close();
        console.log('Database connection closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
