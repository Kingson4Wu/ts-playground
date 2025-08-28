/**
 * API tests for Service B
 * 
 * Tests for customer and product API endpoints
 */

import request from 'supertest';
import app from '../src/index';

describe('Customer & Product Service API', () => {
  // Customer tests
  describe('GET /api/v1/customers', () => {
    it('should return all customers', async () => {
      const response = await request(app)
        .get('/api/v1/customers')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/customers/:id', () => {
    it('should return a customer by ID', async () => {
      const response = await request(app)
        .get('/api/v1/customers/1')
        .expect(200);
      
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    it('should return 404 for non-existent customer', async () => {
      await request(app)
        .get('/api/v1/customers/999')
        .expect(404);
    });
  });

  describe('POST /api/v1/customers', () => {
    it('should create a new customer', async () => {
      const newCustomer = {
        name: 'Test Customer',
        email: 'test@example.com',
        address: '123 Test St, Test City, TS'
      };

      const response = await request(app)
        .post('/api/v1/customers')
        .send(newCustomer)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newCustomer.name);
      expect(response.body).toHaveProperty('email', newCustomer.email);
      expect(response.body).toHaveProperty('address', newCustomer.address);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteCustomer = {
        name: 'Test Customer'
        // Missing email and address
      };

      await request(app)
        .post('/api/v1/customers')
        .send(incompleteCustomer)
        .expect(400);
    });
  });

  describe('POST /api/v1/customers/validate', () => {
    it('should validate an existing customer', async () => {
      const response = await request(app)
        .post('/api/v1/customers/validate')
        .send({ id: 1 })
        .expect(200);
      
      expect(response.body).toHaveProperty('valid', true);
    });

    it('should return false for non-existent customer', async () => {
      const response = await request(app)
        .post('/api/v1/customers/validate')
        .send({ id: 999 })
        .expect(200);
      
      expect(response.body).toHaveProperty('valid', false);
    });

    it('should return 400 for missing ID', async () => {
      await request(app)
        .post('/api/v1/customers/validate')
        .send({})
        .expect(400);
    });
  });

  // Product tests
  describe('GET /api/v1/products', () => {
    it('should return all products', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/products/:id', () => {
    it('should return a product by ID', async () => {
      const response = await request(app)
        .get('/api/v1/products/1')
        .expect(200);
      
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('inventory');
    });

    it('should return 404 for non-existent product', async () => {
      await request(app)
        .get('/api/v1/products/999')
        .expect(404);
    });
  });

  describe('POST /api/v1/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Test Product',
        description: 'Test product description',
        price: 19.99,
        inventory: 100
      };

      const response = await request(app)
        .post('/api/v1/products')
        .send(newProduct)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newProduct.name);
      expect(response.body).toHaveProperty('description', newProduct.description);
      expect(response.body).toHaveProperty('price', newProduct.price);
      expect(response.body).toHaveProperty('inventory', newProduct.inventory);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteProduct = {
        name: 'Test Product'
        // Missing description, price, and inventory
      };

      await request(app)
        .post('/api/v1/products')
        .send(incompleteProduct)
        .expect(400);
    });
  });

  describe('POST /api/v1/products/check-availability', () => {
    it('should check product availability for sufficient inventory', async () => {
      const response = await request(app)
        .post('/api/v1/products/check-availability')
        .send({ id: 1, quantity: 1 })
        .expect(200);
      
      expect(response.body).toHaveProperty('available', true);
    });

    it('should check product availability for insufficient inventory', async () => {
      const response = await request(app)
        .post('/api/v1/products/check-availability')
        .send({ id: 1, quantity: 1000 })
        .expect(200);
      
      expect(response.body).toHaveProperty('available', false);
    });

    it('should return 400 for missing parameters', async () => {
      await request(app)
        .post('/api/v1/products/check-availability')
        .send({ id: 1 })
        .expect(400);
    });
  });

  describe('POST /api/v1/products/:id/update-inventory', () => {
    it('should update product inventory', async () => {
      const response = await request(app)
        .post('/api/v1/products/1/update-inventory')
        .send({ quantity: 1 })
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent product', async () => {
      await request(app)
        .post('/api/v1/products/999/update-inventory')
        .send({ quantity: 1 })
        .expect(404);
    });

    it('should return 400 for missing quantity', async () => {
      await request(app)
        .post('/api/v1/products/1/update-inventory')
        .send({})
        .expect(400);
    });
  });
});