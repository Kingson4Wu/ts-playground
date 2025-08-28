/**
 * API routes for Service A
 * 
 * Implements Express routes for order operations
 */

import { Router, Request, Response, NextFunction } from 'express';
import { 
  createOrder, 
  getOrderById, 
  updateOrderStatus, 
  getAllOrders,
  processOrder,
  cancelOrder
} from '../services/business.js';
import { Order } from '../models/data.js';

const router = Router();

/**
 * Error handling middleware
 * 
 * @param err - Error object
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 */
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal server error', message: 'An unexpected error occurred' });
}

/**
 * GET /orders
 * Get all orders
 */
router.get('/orders', (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /orders/:id
 * Get order by ID
 */
router.get('/orders/:id(\\d+)', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const order = getOrderById(id);
    res.status(200).json(order);
  } catch (err) {
    if (err instanceof Error && err.message.includes('not found')) {
      res.status(404).json({ error: 'Order not found', message: err.message });
    } else {
      next(err);
    }
  }
});

/**
 * POST /orders
 * Create a new order
 */
router.post('/orders', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, productId, quantity } = req.body;
    
    // Validate input
    if (customerId === undefined || productId === undefined || quantity === undefined) {
      res.status(400).json({ error: 'Validation error', message: 'Customer ID, product ID, and quantity are required' });
      return;
    }
    
    // Create order
    const order = await createOrder({ customerId, productId, quantity });
    res.status(201).json(order);
  } catch (err) {
    if (err instanceof Error && (err.message.includes('Customer') || err.message.includes('Product'))) {
      res.status(400).json({ error: 'Validation error', message: err.message });
    } else {
      next(err);
    }
  }
});

/**
 * PUT /orders/:id/status
 * Update order status
 */
router.put('/orders/:id(\\d+)/status', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;
    
    if (!status) {
      res.status(400).json({ error: 'Validation error', message: 'Status is required' });
      return;
    }
    
    const order = updateOrderStatus(id, status);
    res.status(200).json(order);
  } catch (err) {
    if (err instanceof Error && err.message.includes('not found')) {
      res.status(404).json({ error: 'Order not found', message: err.message });
    } else {
      next(err);
    }
  }
});

/**
 * POST /orders/:id/process
 * Process an order (update product inventory)
 */
router.post('/orders/:id(\\d+)/process', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await processOrder(id);
    
    if (!success) {
      res.status(404).json({ error: 'Order not found', message: `Order with ID ${id} not found` });
      return;
    }
    
    res.status(200).json({ success: true, message: 'Order processed successfully' });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /orders/:id
 * Cancel an order
 */
router.delete('/orders/:id(\\d+)', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await cancelOrder(id);
    
    if (!success) {
      res.status(404).json({ error: 'Order not found', message: `Order with ID ${id} not found` });
      return;
    }
    
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Register error handling middleware
router.use(errorHandler);

export default router;