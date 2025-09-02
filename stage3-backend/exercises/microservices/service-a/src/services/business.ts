/**
 * Business logic for Service A
 *
 * Implements business logic for order operations and service-to-service communication
 */

import axios from 'axios';
import { Order, OrderStatus } from '../models/data.js';

/**
 * In-memory storage for orders
 */
let orders: Order[] = [];
let nextOrderId = 1;

/**
 * Axios instance for service-to-service communication
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:3002/api/v1', // Service B base URL
  timeout: 5000,
});

/**
 * Creates a new order
 *
 * @param orderData - Order data to create
 * @returns Created order
 * @throws {Error} If customer validation or product availability check fails
 */
export async function createOrder(
  orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<Order> {
  const { customerId, productId, quantity } = orderData;

  // Validate customer with Service B
  try {
    const customerResponse = await apiClient.post('/customers/validate', {
      id: customerId,
    });
    if (!customerResponse.data.valid) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to validate customer: ${error.message}`);
    }
    throw error;
  }

  // Check product availability with Service B
  try {
    const availabilityResponse = await apiClient.post(
      '/products/check-availability',
      {
        id: productId,
        quantity,
      }
    );
    if (!availabilityResponse.data.available) {
      throw new Error(
        `Product with ID ${productId} is not available in quantity ${quantity}`
      );
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to check product availability: ${error.message}`);
    }
    throw error;
  }

  // Create order
  const newOrder: Order = {
    id: nextOrderId++,
    customerId,
    productId,
    quantity,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  orders.push(newOrder);
  return newOrder;
}

/**
 * Retrieves an order by ID
 *
 * @param id - Order ID to retrieve
 * @returns Order if found
 * @throws {Error} If order is not found
 */
export function getOrderById(id: number): Order {
  const order = orders.find(order => order.id === id);
  if (!order) {
    throw new Error(`Order with ID ${id} not found`);
  }
  return order;
}

/**
 * Updates order status
 *
 * @param id - Order ID to update
 * @param status - New status
 * @returns Updated order
 * @throws {Error} If order is not found
 */
export function updateOrderStatus(id: number, status: OrderStatus): Order {
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex === -1) {
    throw new Error(`Order with ID ${id} not found`);
  }

  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date();
  return orders[orderIndex];
}

/**
 * Retrieves all orders
 *
 * @returns Array of all orders
 */
export function getAllOrders(): Order[] {
  return [...orders];
}

/**
 * Updates product inventory after order is processed
 *
 * @param orderId - Order ID to process
 * @returns True if inventory was updated, false otherwise
 */
export async function processOrder(orderId: number): Promise<boolean> {
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    return false;
  }

  try {
    // Update product inventory in Service B
    const response = await apiClient.post(
      `/products/${order.productId}/update-inventory`,
      {
        quantity: order.quantity,
      }
    );

    if (response.data.success) {
      // Update order status to processing
      updateOrderStatus(orderId, 'processing');
      return true;
    }
    return false;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(`Failed to update product inventory: ${error.message}`);
    }
    return false;
  }
}

/**
 * Cancels an order
 *
 * @param id - Order ID to cancel
 * @returns True if order was cancelled, false otherwise
 */
export async function cancelOrder(id: number): Promise<boolean> {
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex === -1) {
    return false;
  }

  // If order was already processed, we might need to restock the product
  const order = orders[orderIndex];
  if (order.status === 'processing' || order.status === 'shipped') {
    try {
      // Restock the product in Service B
      await apiClient.post(`/products/${order.productId}/update-inventory`, {
        quantity: -order.quantity, // Negative quantity to add back to inventory
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(`Failed to restock product: ${error.message}`);
      }
      // Even if restocking fails, we still cancel the order
    }
  }

  // Remove order from storage
  orders.splice(orderIndex, 1);
  return true;
}
