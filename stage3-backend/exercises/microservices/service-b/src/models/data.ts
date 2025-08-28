/**
 * Customer and Product data models for Service B
 * 
 * Defines the structure and interfaces for customer and product data
 */

/**
 * Customer entity
 */
export interface Customer {
  /** Unique identifier */
  id: number;
  /** Customer name */
  name: string;
  /** Customer email */
  email: string;
  /** Customer address */
  address: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Product entity
 */
export interface Product {
  /** Unique identifier */
  id: number;
  /** Product name */
  name: string;
  /** Product description */
  description: string;
  /** Product price */
  price: number;
  /** Product inventory count */
  inventory: number;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}