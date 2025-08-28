/**
 * User service
 *
 * Implements business logic for user management operations
 */

import { User, CreateUserInput, UpdateUserInput } from '../models/user.js';
import {
  createUser,
  findUserById,
  findUserByEmail,
  findAllUsers,
  updateUser,
  deleteUser,
  getUserCount,
} from '../utils/database.js';

/**
 * Custom error classes
 */
export class UserNotFoundError extends Error {
  constructor(id: number) {
    super(`User with ID ${id} not found`);
    this.name = 'UserNotFoundError';
  }
}

export class DuplicateEmailError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'DuplicateEmailError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Creates a new user
 *
 * @param input - User creation input
 * @returns Created user
 * @throws {DuplicateEmailError} If a user with the same email already exists
 * @throws {ValidationError} If input validation fails
 */
export function createUserService(input: CreateUserInput): User {
  // Validate input
  if (!input.name || input.name.trim() === '') {
    throw new ValidationError('Name is required');
  }

  if (!input.email || input.email.trim() === '') {
    throw new ValidationError('Email is required');
  }

  // Simple email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    throw new ValidationError('Invalid email format');
  }

  // Check for duplicate email
  if (findUserByEmail(input.email)) {
    throw new DuplicateEmailError(input.email);
  }

  // Create user
  return createUser({
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
  });
}

/**
 * Gets a user by ID
 *
 * @param id - User ID to retrieve
 * @returns User if found
 * @throws {UserNotFoundError} If user with the specified ID is not found
 */
export function getUserByIdService(id: number): User {
  const user = findUserById(id);
  if (!user) {
    throw new UserNotFoundError(id);
  }
  return user;
}

/**
 * Gets all users
 *
 * @returns Array of all users
 */
export function getAllUsersService(): User[] {
  return findAllUsers();
}

/**
 * Updates a user
 *
 * @param id - User ID to update
 * @param input - User update input
 * @returns Updated user
 * @throws {UserNotFoundError} If user with the specified ID is not found
 * @throws {DuplicateEmailError} If a user with the same email already exists
 * @throws {ValidationError} If input validation fails
 */
export function updateUserService(id: number, input: UpdateUserInput): User {
  // Validate input
  if (input.name !== undefined && input.name.trim() === '') {
    throw new ValidationError('Name cannot be empty');
  }

  if (input.email !== undefined) {
    if (input.email.trim() === '') {
      throw new ValidationError('Email cannot be empty');
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      throw new ValidationError('Invalid email format');
    }
  }

  // Check if user exists
  const existingUser = findUserById(id);
  if (!existingUser) {
    throw new UserNotFoundError(id);
  }

  // Check for duplicate email (if email is being updated)
  if (input.email && input.email.trim().toLowerCase() !== existingUser.email) {
    if (findUserByEmail(input.email.trim().toLowerCase())) {
      throw new DuplicateEmailError(input.email.trim().toLowerCase());
    }
  }

  // Update user
  const updatedUser = updateUser(id, {
    name: input.name ? input.name.trim() : undefined,
    email: input.email ? input.email.trim().toLowerCase() : undefined,
  });

  // This should never happen since we already checked if user exists
  if (!updatedUser) {
    throw new UserNotFoundError(id);
  }

  return updatedUser;
}

/**
 * Deletes a user
 *
 * @param id - User ID to delete
 * @throws {UserNotFoundError} If user with the specified ID is not found
 */
export function deleteUserService(id: number): void {
  const userExists = findUserById(id);
  if (!userExists) {
    throw new UserNotFoundError(id);
  }

  const deleted = deleteUser(id);
  // This should never happen since we already checked if user exists
  if (!deleted) {
    throw new UserNotFoundError(id);
  }
}

/**
 * Gets the total number of users
 *
 * @returns Total number of users
 */
export function getUserCountService(): number {
  return getUserCount();
}
