/**
 * Todo service
 *
 * Implements business logic for todo management operations
 */

import { TodoModel, UserModel } from '../utils/database.js';
import { Todo } from '../models/todo.js';

/**
 * Custom error classes
 */
export class TodoNotFoundError extends Error {
  constructor(id: number) {
    super(`Todo with ID ${id} not found`);
    this.name = 'TodoNotFoundError';
  }
}

export class UserNotFoundError extends Error {
  constructor(id: number) {
    super(`User with ID ${id} not found`);
    this.name = 'UserNotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Options for querying todos
 */
export interface TodoQueryOptions {
  /** Filter by completion status */
  completed?: boolean;
  /** Number of items to return */
  limit?: number;
  /** Number of items to skip */
  offset?: number;
  /** Field to sort by */
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  /** Sort order */
  sortOrder?: 'ASC' | 'DESC';
  /** Filter by user ID */
  userId?: number;
}

/**
 * Input for creating a new todo
 */
export interface CreateTodoInput {
  /** Todo title */
  title: string;
  /** Todo description (optional) */
  description?: string;
  /** User ID */
  userId: number;
}

/**
 * Input for updating an existing todo
 */
export interface UpdateTodoInput {
  /** Todo title (optional) */
  title?: string;
  /** Todo description (optional) */
  description?: string;
  /** Completion status (optional) */
  completed?: boolean;
}

/**
 * Creates a new todo
 *
 * @param input - Todo creation input
 * @returns Created todo
 * @throws {UserNotFoundError} If user with the specified ID is not found
 * @throws {ValidationError} If input validation fails
 */
export async function createTodoService(input: CreateTodoInput): Promise<Todo> {
  // Validate input
  if (!input.title || input.title.trim() === '') {
    throw new ValidationError('Title is required');
  }

  if (!input.userId) {
    throw new ValidationError('User ID is required');
  }

  // Check if user exists
  const user = await UserModel.findByPk(input.userId);
  if (!user) {
    throw new UserNotFoundError(input.userId);
  }

  // Create todo
  const todo = await TodoModel.create({
    title: input.title.trim(),
    description: input.description ? input.description.trim() : undefined,
    userId: input.userId,
  });

  return todo.toJSON() as Todo;
}

/**
 * Gets a todo by ID
 *
 * @param id - Todo ID to retrieve
 * @returns Todo if found
 * @throws {TodoNotFoundError} If todo with the specified ID is not found
 */
export async function getTodoByIdService(id: number): Promise<Todo> {
  const todo = await TodoModel.findByPk(id);
  if (!todo) {
    throw new TodoNotFoundError(id);
  }
  return todo.toJSON() as Todo;
}

/**
 * Gets all todos with filtering, pagination, and sorting
 *
 * @param options - Query options
 * @returns Array of todos and total count
 */
export async function getAllTodosService(
  options: TodoQueryOptions = {}
): Promise<{ todos: Todo[]; totalCount: number }> {
  const { completed, limit, offset, sortBy, sortOrder, userId } = options;

  // Build where clause
  const where: Record<string, any> = {};
  if (completed !== undefined) {
    where.completed = completed;
  }
  if (userId !== undefined) {
    where.userId = userId;
  }

  // Build order clause
  const order: [string, string][] = [];
  if (sortBy && sortOrder) {
    order.push([sortBy, sortOrder]);
  } else {
    // Default sorting by createdAt DESC
    order.push(['createdAt', 'DESC']);
  }

  // Query todos
  const { count, rows } = await TodoModel.findAndCountAll({
    where,
    order,
    limit,
    offset,
  });

  return {
    todos: rows.map(row => row.toJSON() as Todo),
    totalCount: count,
  };
}

/**
 * Updates a todo
 *
 * @param id - Todo ID to update
 * @param input - Todo update input
 * @returns Updated todo
 * @throws {TodoNotFoundError} If todo with the specified ID is not found
 * @throws {ValidationError} If input validation fails
 */
export async function updateTodoService(
  id: number,
  input: UpdateTodoInput
): Promise<Todo> {
  // Validate input
  if (input.title !== undefined && input.title.trim() === '') {
    throw new ValidationError('Title cannot be empty');
  }

  // Check if todo exists
  const todo = await TodoModel.findByPk(id);
  if (!todo) {
    throw new TodoNotFoundError(id);
  }

  // Update todo
  await todo.update({
    title: input.title ? input.title.trim() : undefined,
    description: input.description ? input.description.trim() : undefined,
    completed: input.completed,
  });

  return todo.toJSON() as Todo;
}

/**
 * Deletes a todo
 *
 * @param id - Todo ID to delete
 * @throws {TodoNotFoundError} If todo with the specified ID is not found
 */
export async function deleteTodoService(id: number): Promise<void> {
  const todo = await TodoModel.findByPk(id);
  if (!todo) {
    throw new TodoNotFoundError(id);
  }

  await todo.destroy();
}

/**
 * Marks a todo as completed
 *
 * @param id - Todo ID to mark as completed
 * @returns Updated todo
 * @throws {TodoNotFoundError} If todo with the specified ID is not found
 */
export async function markTodoAsCompletedService(id: number): Promise<Todo> {
  const todo = await TodoModel.findByPk(id);
  if (!todo) {
    throw new TodoNotFoundError(id);
  }

  await todo.update({ completed: true });
  return todo.toJSON() as Todo;
}

/**
 * Gets todos for a specific user
 *
 * @param userId - User ID
 * @param options - Query options
 * @returns Array of todos and total count
 * @throws {UserNotFoundError} If user with the specified ID is not found
 */
export async function getTodosByUserService(
  userId: number,
  options: Omit<TodoQueryOptions, 'userId'> = {}
): Promise<{ todos: Todo[]; totalCount: number }> {
  // Check if user exists
  const user = await UserModel.findByPk(userId);
  if (!user) {
    throw new UserNotFoundError(userId);
  }

  // Get todos for user
  return getAllTodosService({ ...options, userId });
}
