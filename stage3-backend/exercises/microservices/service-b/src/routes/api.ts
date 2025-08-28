/**
 * API routes for Service B
 *
 * Implements Express routes for customer and product operations
 */

import { Router, Request, Response, NextFunction } from 'express';
import {
  getCustomerById,
  validateCustomer,
  getProductById,
  checkProductAvailability,
  updateProductInventory,
  createCustomer,
  createProduct,
  getAllCustomers,
  getAllProducts,
} from '../services/business.js';
import { Customer, Product } from '../models/data.js';

const router = Router();

/**
 * Error handling middleware
 *
 * @param err - Error object
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 */
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Unexpected error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred',
  });
}

/**
 * GET /customers
 * Get all customers
 */
router.get('/customers', (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = getAllCustomers();
    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /customers/:id
 * Get customer by ID
 */
router.get(
  '/customers/:id(\\d+)',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const customer = getCustomerById(id);
      if (!customer) {
        res.status(404).json({
          error: 'Customer not found',
          message: `Customer with ID ${id} not found`,
        });
        return;
      }
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /customers/validate
 * Validate customer exists
 */
router.post(
  '/customers/validate',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      if (id === undefined) {
        res.status(400).json({
          error: 'Validation error',
          message: 'Customer ID is required',
        });
        return;
      }

      const isValid = validateCustomer(id);
      res.status(200).json({ valid: isValid });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /customers
 * Create a new customer
 */
router.post('/customers', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, address } = req.body;

    // Validate input
    if (!name || !email || !address) {
      res.status(400).json({
        error: 'Validation error',
        message: 'Name, email, and address are required',
      });
      return;
    }

    // Create customer
    const customer = createCustomer({ name, email, address });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /products
 * Get all products
 */
router.get('/products', (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /products/:id
 * Get product by ID
 */
router.get(
  '/products/:id(\\d+)',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const product = getProductById(id);
      if (!product) {
        res.status(404).json({
          error: 'Product not found',
          message: `Product with ID ${id} not found`,
        });
        return;
      }
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /products/check-availability
 * Check product availability
 */
router.post(
  '/products/check-availability',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, quantity } = req.body;
      if (id === undefined || quantity === undefined) {
        res.status(400).json({
          error: 'Validation error',
          message: 'Product ID and quantity are required',
        });
        return;
      }

      const isAvailable = checkProductAvailability(id, quantity);
      res.status(200).json({ available: isAvailable });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /products
 * Create a new product
 */
router.post('/products', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, inventory } = req.body;

    // Validate input
    if (
      !name ||
      !description ||
      price === undefined ||
      inventory === undefined
    ) {
      res.status(400).json({
        error: 'Validation error',
        message: 'Name, description, price, and inventory are required',
      });
      return;
    }

    // Create product
    const product = createProduct({ name, description, price, inventory });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /products/:id/update-inventory
 * Update product inventory
 */
router.post(
  '/products/:id(\\d+)/update-inventory',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { quantity } = req.body;

      if (quantity === undefined) {
        res
          .status(400)
          .json({ error: 'Validation error', message: 'Quantity is required' });
        return;
      }

      const success = updateProductInventory(id, quantity);
      if (!success) {
        res.status(404).json({
          error: 'Product not found or insufficient inventory',
          message: `Product with ID ${id} not found or insufficient inventory`,
        });
        return;
      }

      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
);

// Register error handling middleware
router.use(errorHandler);

export default router;
