/**
 * User data model
 *
 * Defines the structure and interfaces for user data
 */

/**
 * User entity
 */
export interface User {
  /** Unique identifier */
  id: number;
  /** User's name */
  name: string;
  /** User's email (unique) */
  email: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Input for creating a new user
 */
export interface CreateUserInput {
  /** User's name */
  name: string;
  /** User's email */
  email: string;
}

/**
 * Input for updating an existing user
 */
export interface UpdateUserInput {
  /** User's name (optional) */
  name?: string;
  /** User's email (optional) */
  email?: string;
}

/**
 * User response for API endpoints
 */
export interface UserResponse {
  /** Unique identifier */
  id: number;
  /** User's name */
  name: string;
  /** User's email */
  email: string;
  /** Creation timestamp in ISO format */
  createdAt: string;
  /** Last update timestamp in ISO format */
  updatedAt: string;
}
