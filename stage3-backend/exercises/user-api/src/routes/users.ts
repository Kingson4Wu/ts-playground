/**
 * User routes
 *
 * Implements Express routes for user management operations
 */

import { Router, Request, Response, NextFunction } from 'express';
import {
  createUserService,
  getUserByIdService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
  UserNotFoundError,
  DuplicateEmailError,
  ValidationError,
} from '../services/userService.js';
import { UserResponse } from '../models/user.js';

const router = Router();

/**
 * Converts a User entity to UserResponse
 *
 * @param user - User entity
 * @returns UserResponse
 */
function toUserResponse(user: {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

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
  next: NextFunction
): void {
  if (err instanceof UserNotFoundError) {
    res.status(404).json({ error: 'User not found', message: err.message });
  } else if (err instanceof DuplicateEmailError) {
    res.status(409).json({ error: 'Duplicate email', message: err.message });
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
 * GET /api/v1/users
 * Get all users
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = getAllUsersService();
    const userResponses = users.map(toUserResponse);
    res.status(200).json(userResponses);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/users/:id
 * Get user by ID
 */
router.get('/:id(\\d+)', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = getUserByIdService(id);
    const userResponse = toUserResponse(user);
    res.status(200).json(userResponse);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/users
 * Create a new user
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const user = createUserService({ name, email });
    const userResponse = toUserResponse(user);
    res.status(201).json(userResponse);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/v1/users/:id
 * Update an existing user
 */
router.put('/:id(\\d+)', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    const user = updateUserService(id, { name, email });
    const userResponse = toUserResponse(user);
    res.status(200).json(userResponse);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/v1/users/:id
 * Delete a user
 */
router.delete(
  '/:id(\\d+)',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      deleteUserService(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// Register error handling middleware
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorHandler(err, _req, res, _next);
});

export default router;
