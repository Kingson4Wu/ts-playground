/**
 * API tests for Service A
 *
 * Tests for order API endpoints
 */

// Mock the axios calls to Service B before importing anything else
const mockPost = jest.fn();
const mockCreate = jest.fn().mockReturnValue({
  post: mockPost,
});

jest.mock('axios', () => ({
  default: {
    create: mockCreate,
    isAxiosError: jest.fn().mockReturnValue(false),
  },
  create: mockCreate,
  isAxiosError: jest.fn().mockReturnValue(false),
}));

import request from 'supertest';
import app from '../src/index';

describe('Order Management Service API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /api/v1/orders', () => {
    it('should return all orders', async () => {
      // Set up mock responses for order creation
      mockPost
        .mockResolvedValueOnce({ data: { valid: true } }) // Customer validation
        .mockResolvedValueOnce({ data: { available: true } }); // Product availability

      // Create an order first to ensure we have data
      await request(app)
        .post('/api/v1/orders')
        .send({ customerId: 1, productId: 1, quantity: 1 })
        .expect(201);

      // Now test getting all orders
      const response = await request(app).get('/api/v1/orders').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/orders/:id', () => {
    it('should return an order by ID', async () => {
      // Set up mock responses for order creation
      mockPost
        .mockResolvedValueOnce({ data: { valid: true } }) // Customer validation
        .mockResolvedValueOnce({ data: { available: true } }); // Product availability

      // Create an order first
      const createResponse = await request(app)
        .post('/api/v1/orders')
        .send({ customerId: 1, productId: 1, quantity: 1 })
        .expect(201);

      const orderId = createResponse.body.id;

      // Now test getting the order by ID
      const response = await request(app)
        .get(`/api/v1/orders/${orderId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', orderId);
      expect(response.body).toHaveProperty('customerId', 1);
      expect(response.body).toHaveProperty('productId', 1);
      expect(response.body).toHaveProperty('quantity', 1);
    });

    it('should return 404 for non-existent order', async () => {
      await request(app).get('/api/v1/orders/999').expect(404);
    });
  });

  describe('POST /api/v1/orders', () => {
    it('should create a new order with valid customer and product', async () => {
      // Set up mock responses
      mockPost
        .mockResolvedValueOnce({ data: { valid: true } }) // Customer validation
        .mockResolvedValueOnce({ data: { available: true } }); // Product availability

      const newOrder = {
        customerId: 1,
        productId: 1,
        quantity: 2,
      };

      const response = await request(app)
        .post('/api/v1/orders')
        .send(newOrder)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('customerId', newOrder.customerId);
      expect(response.body).toHaveProperty('productId', newOrder.productId);
      expect(response.body).toHaveProperty('quantity', newOrder.quantity);
      expect(response.body).toHaveProperty('status', 'pending');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');

      // Verify that the mock was called
      expect(mockPost).toHaveBeenCalledTimes(2);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteOrder = {
        customerId: 1,
        // Missing productId and quantity
      };

      await request(app)
        .post('/api/v1/orders')
        .send(incompleteOrder)
        .expect(400);
    });

    it('should return 400 when customer validation fails', async () => {
      // Set up mock response for invalid customer
      mockPost.mockResolvedValueOnce({ data: { valid: false } }); // Customer validation

      const newOrder = {
        customerId: 999,
        productId: 1,
        quantity: 2,
      };

      await request(app).post('/api/v1/orders').send(newOrder).expect(400);
    });

    it('should return 400 when product availability check fails', async () => {
      // Set up mock responses
      mockPost
        .mockResolvedValueOnce({ data: { valid: true } }) // Customer validation
        .mockResolvedValueOnce({ data: { available: false } }); // Product availability

      const newOrder = {
        customerId: 1,
        productId: 1,
        quantity: 1000,
      };

      await request(app).post('/api/v1/orders').send(newOrder).expect(400);
    });
  });

  describe('PUT /api/v1/orders/:id/status', () => {
    it('should update order status', async () => {
      // Set up mock responses for order creation
      mockPost
        .mockResolvedValueOnce({ data: { valid: true } }) // Customer validation
        .mockResolvedValueOnce({ data: { available: true } }); // Product availability

      // Create an order first
      const createResponse = await request(app)
        .post('/api/v1/orders')
        .send({ customerId: 1, productId: 1, quantity: 1 })
        .expect(201);

      const orderId = createResponse.body.id;

      // Update the order status
      const response = await request(app)
        .put(`/api/v1/orders/${orderId}/status`)
        .send({ status: 'processing' })
        .expect(200);

      expect(response.body).toHaveProperty('status', 'processing');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 404 for non-existent order', async () => {
      await request(app)
        .put('/api/v1/orders/999/status')
        .send({ status: 'processing' })
        .expect(404);
    });

    it('should return 400 for missing status', async () => {
      await request(app).put('/api/v1/orders/1/status').send({}).expect(400);
    });
  });

  describe('POST /api/v1/orders/:id/process', () => {
    it('should process an order', async () => {
      // Set up mock responses for order creation
      mockPost
        .mockResolvedValueOnce({ data: { valid: true } }) // Customer validation
        .mockResolvedValueOnce({ data: { available: true } }) // Product availability
        .mockResolvedValueOnce({ data: { success: true } }); // Inventory update

      // Create an order first
      const createResponse = await request(app)
        .post('/api/v1/orders')
        .send({ customerId: 1, productId: 1, quantity: 1 })
        .expect(201);

      const orderId = createResponse.body.id;

      // Process the order
      const response = await request(app)
        .post(`/api/v1/orders/${orderId}/process`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty(
        'message',
        'Order processed successfully'
      );
    });

    it('should return 404 for non-existent order', async () => {
      await request(app).post('/api/v1/orders/999/process').expect(404);
    });
  });

  describe('DELETE /api/v1/orders/:id', () => {
    it('should cancel an order', async () => {
      // Set up mock responses for order creation
      mockPost
        .mockResolvedValueOnce({ data: { valid: true } }) // Customer validation
        .mockResolvedValueOnce({ data: { available: true } }); // Product availability

      // Create an order first
      const createResponse = await request(app)
        .post('/api/v1/orders')
        .send({ customerId: 1, productId: 1, quantity: 1 })
        .expect(201);

      const orderId = createResponse.body.id;

      // Cancel the order
      await request(app).delete(`/api/v1/orders/${orderId}`).expect(204);
    });

    it('should return 404 for non-existent order', async () => {
      await request(app).delete('/api/v1/orders/999').expect(404);
    });
  });
});
