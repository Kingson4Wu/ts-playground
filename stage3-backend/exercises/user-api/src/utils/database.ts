/**
 * Database utilities
 *
 * Implements an in-memory database simulation for user management
 */

import { User } from '../models/user.js';

/**
 * In-memory storage for users
 */
let users: User[] = [];
let nextId = 1;

/**
 * Creates a new user
 *
 * @param user - User data to create
 * @returns Created user
 */
export function createUser(
  user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
): User {
  const newUser: User = {
    id: nextId++,
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(newUser);
  return newUser;
}

/**
 * Finds a user by ID
 *
 * @param id - User ID to find
 * @returns User if found, undefined otherwise
 */
export function findUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}

/**
 * Finds a user by email
 *
 * @param email - Email to find
 * @returns User if found, undefined otherwise
 */
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

/**
 * Finds all users
 *
 * @returns Array of all users
 */
export function findAllUsers(): User[] {
  return [...users];
}

/**
 * Updates a user
 *
 * @param id - User ID to update
 * @param updates - Updates to apply
 * @returns Updated user if found, undefined otherwise
 */
export function updateUser(
  id: number,
  updates: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
): User | undefined {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return undefined;
  }

  const updatedUser = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date(),
  };

  users[userIndex] = updatedUser;
  return updatedUser;
}

/**
 * Deletes a user
 *
 * @param id - User ID to delete
 * @returns True if user was deleted, false otherwise
 */
export function deleteUser(id: number): boolean {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);
  return true;
}

/**
 * Gets the number of users
 *
 * @returns Number of users
 */
export function getUserCount(): number {
  return users.length;
}

/**
 * Clears all users from the database
 *
 * Used for testing purposes
 */
export function clearUsers(): void {
  users = [];
  nextId = 1;
}
