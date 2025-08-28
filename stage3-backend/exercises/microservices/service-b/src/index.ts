#!/usr/bin/env node

/**
 * Customer & Product Service (Service B)
 * 
 * Main application entry point for Service B
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

export const app: Application = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', apiRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Customer & Product Service', version: '1.0.0' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found', message: 'Route not found' });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal server error', message: 'An unexpected error occurred' });
});

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`Customer & Product Service is running on port ${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

export default app;