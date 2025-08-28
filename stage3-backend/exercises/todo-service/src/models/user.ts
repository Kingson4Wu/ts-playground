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
