/**
 * Todo routes
 *
 * Implements Express routes for todo management operations
 */

import { Router, Request, Response, NextFunction } from 'express';
import {
  createTodoService,
  getTodoByIdService,
  getAllTodosService,
  updateTodoService,
  deleteTodoService,
  markTodoAsCompletedService,
  getTodosByUserService,
  TodoNotFoundError,
  UserNotFoundError,
  ValidationError,
} from '../services/todoService.js';

const router = Router();

/**
 * Error handling middleware
 *
 * @param err - Error object
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 */
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
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
}

/**
 * GET /api/v1/todos
 * Get all todos with filtering, pagination, and sorting
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { completed, limit, offset, sortBy, sortOrder, userId } = req.query;

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

    if (userId !== undefined) {
      const userIdNum = parseInt(userId as string, 10);
      if (!isNaN(userIdNum)) {
        options.userId = userIdNum;
      }
    }

    const result = await getAllTodosService(options);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/todos/:id
 * Get todo by ID
 */
router.get(
  '/:id(\\d+)',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const todo = await getTodoByIdService(id);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/todos
 * Create a new todo
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, userId } = req.body;
    const todo = await createTodoService({ title, description, userId });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/v1/todos/:id
 * Update an existing todo
 */
router.put(
  '/:id(\\d+)',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { title, description, completed } = req.body;
      const todo = await updateTodoService(id, {
        title,
        description,
        completed,
      });
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/v1/todos/:id
 * Delete a todo
 */
router.delete(
  '/:id(\\d+)',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      await deleteTodoService(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/v1/todos/:id/complete
 * Mark todo as completed
 */
router.patch(
  '/:id(\\d+)/complete',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const todo = await markTodoAsCompletedService(id);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }
);

// Export the getTodosByUserService function for use in the main router
export { getTodosByUserService };

// Register error handling middleware
router.use(errorHandler);

export default router;
