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
  const now = new Date();
  const newUser: User = {
    id: nextId++,
    ...user,
    createdAt: now,
    updatedAt: now,
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
 * @param email - User email to find
 * @returns User if found, undefined otherwise
 */
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

/**
 * Gets all users
 *
 * @returns Array of all users
 */
export function findAllUsers(): User[] {
  return [...users]; // Return a copy to prevent direct modification
}

/**
 * Updates a user
 *
 * @param id - User ID to update
 * @param updates - User data updates
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

  const now = new Date();
  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: now,
  };

  return users[userIndex];
}

/**
 * Deletes a user by ID
 *
 * @param id - User ID to delete
 * @returns True if user was deleted, false otherwise
 */
export function deleteUser(id: number): boolean {
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  return users.length < initialLength;
}

/**
 * Gets the total number of users
 *
 * @returns Total number of users
 */
export function getUserCount(): number {
  return users.length;
}
