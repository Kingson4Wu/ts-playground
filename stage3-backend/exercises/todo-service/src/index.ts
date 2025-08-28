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
import { TodoNotFoundError, UserNotFoundError, ValidationError } from './services/todoService.js';
import { getTodosByUserService } from './services/todoService.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/todos', todoRoutes);

// User routes
app.get('/api/v1/users/:userId(\\d+)/todos', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { completed, limit, offset, sortBy, sortOrder } = req.query;

    const options: Record<string, any> = {};

    if (completed !== undefined) {
      options.completed = completed === 'true';
    }

    if (limit !== undefined) {
      const limitNum = parseInt(limit as string, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        options.limit = limitNum;
      }
    }

    if (offset !== undefined) {
      const offsetNum = parseInt(offset as string, 10);
      if (!isNaN(offsetNum) && offsetNum >= 0) {
        options.offset = offsetNum;
      }
    }

    if (
      sortBy !== undefined &&
      (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'title')
    ) {
      options.sortBy = sortBy;
    }

    if (
      sortOrder !== undefined &&
      (sortOrder === 'ASC' || sortOrder === 'DESC')
    ) {
      options.sortOrder = sortOrder;
    }

    const result = await getTodosByUserService(userId, options);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware for user routes
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof TodoNotFoundError) {
    res.status(404).json({ error: 'Todo not found', message: err.message });
  } else if (err instanceof UserNotFoundError) {
    res.status(404).json({ error: 'User not found', message: err.message });
  } else if (err instanceof ValidationError) {
    res.status(400).json({ error: 'Validation error', message: err.message });
  } else {
    console.error('Unexpected error:', err);
    res
      .status(500)
      .json({
        error: 'Internal server error',
        message: 'An unexpected error occurred',
      });
  }
});

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

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

export default app;
