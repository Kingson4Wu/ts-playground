/**
 * Order data model for Service A
 * 
 * Defines the structure and interfaces for order data
 */

/**
 * Order status enumeration
 */
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

/**
 * Order entity
 */
export interface Order {
  /** Unique identifier */
  id: number;
  /** Customer ID */
  customerId: number;
  /** Product ID */
  productId: number;
  /** Quantity ordered */
  quantity: number;
  /** Order status */
  status: OrderStatus;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}