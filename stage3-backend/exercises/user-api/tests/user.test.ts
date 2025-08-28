/**
 * User API integration tests
 */

import request from 'supertest';
import app from '../src/index';
import { clearUsers } from '../src/utils/database';

describe('User API', () => {
  // Clear the database before each test
  beforeEach(() => {
    clearUsers();
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'User Management API');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return an empty array when no users exist', async () => {
      const response = await request(app).get('/api/v1/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all users', async () => {
      // Create a user first
      await request(app)
        .post('/api/v1/users')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);

      const response = await request(app).get('/api/v1/users');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name', 'John Doe');
      expect(response.body[0]).toHaveProperty('email', 'john@example.com');
      expect(response.body[0]).toHaveProperty('createdAt');
      expect(response.body[0]).toHaveProperty('updatedAt');
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a user by ID', async () => {
      // Create a user first
      const createResponse = await request(app)
        .post('/api/v1/users')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);

      const userId = createResponse.body.id;

      const response = await request(app).get(`/api/v1/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('email', 'john@example.com');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/v1/users/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 404 for invalid user ID', async () => {
      const response = await request(app).get('/api/v1/users/invalid');
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user', async () => {
      const userData = { name: 'Jane Smith', email: 'jane@example.com' };
      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'Jane Smith');
      expect(response.body).toHaveProperty('email', 'jane@example.com');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body.createdAt).toBe(response.body.updatedAt);
    });

    it('should return 400 for missing name', async () => {
      const userData = { email: 'jane@example.com' };
      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
    });

    it('should return 400 for missing email', async () => {
      const userData = { name: 'Jane Smith' };
      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
    });

    it('should return 400 for invalid email format', async () => {
      const userData = { name: 'Jane Smith', email: 'invalid-email' };
      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
    });

    it('should return 409 for duplicate email', async () => {
      // Create first user
      await request(app)
        .post('/api/v1/users')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);

      // Try to create another user with the same email
      const response = await request(app)
        .post('/api/v1/users')
        .send({ name: 'John Doe 2', email: 'john@example.com' })
        .expect(409);

      expect(response.body).toHaveProperty('error', 'Duplicate email');
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update an existing user', async () => {
      // Create a user first
      const createResponse = await request(app)
        .post('/api/v1/users')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);

      const userId = createResponse.body.id;

      // Update the user
      const updateData = { name: 'John Smith', email: 'johnsmith@example.com' };
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('name', 'John Smith');
      expect(response.body).toHaveProperty('email', 'johnsmith@example.com');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body.createdAt).not.toBe(response.body.updatedAt);
    });

    it('should return 404 for non-existent user', async () => {
      const updateData = { name: 'John Smith' };
      const response = await request(app)
        .put('/api/v1/users/999')
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 for invalid email format', async () => {
      // Create a user first
      const createResponse = await request(app)
        .post('/api/v1/users')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);

      const userId = createResponse.body.id;

      const updateData = { email: 'invalid-email' };
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send(updateData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
    });

    it('should return 409 for duplicate email', async () => {
      // Create first user
      const user1 = await request(app)
        .post('/api/v1/users')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);

      // Create second user
      await request(app)
        .post('/api/v1/users')
        .send({ name: 'Jane Smith', email: 'jane@example.com' })
        .expect(201);

      // Try to update first user with second user's email
      const response = await request(app)
        .put(`/api/v1/users/${user1.body.id}`)
        .send({ email: 'jane@example.com' })
        .expect(409);

      expect(response.body).toHaveProperty('error', 'Duplicate email');
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete an existing user', async () => {
      // Create a user first
      const createResponse = await request(app)
        .post('/api/v1/users')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .expect(201);

      const userId = createResponse.body.id;

      // Delete the user
      await request(app).delete(`/api/v1/users/${userId}`).expect(204);

      // Verify user is deleted
      await request(app).get(`/api/v1/users/${userId}`).expect(404);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .delete('/api/v1/users/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });
});
