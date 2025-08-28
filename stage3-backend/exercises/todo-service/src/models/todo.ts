/**
 * Todo data model
 *
 * Defines the structure and interfaces for todo data
 */

/**
 * Todo entity
 */
export interface Todo {
  /** Unique identifier */
  id: number;
  /** Todo title */
  title: string;
  /** Todo description (optional) */
  description?: string;
  /** Completion status */
  completed: boolean;
  /** User ID (foreign key) */
  userId: number;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}
