/**
 * Todo API integration tests
 */

import request from 'supertest';
import app from '../src/index';
import { sequelize, UserModel, TodoModel } from '../src/utils/database';

describe('Todo API', () => {
  // Clear the database before each test
  beforeEach(async () => {
    await TodoModel.destroy({ where: {} });
    await UserModel.destroy({ where: {} });
  });

  // Close database connection after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'To-Do List Service');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('POST /api/v1/todos', () => {
    it('should create a new todo', async () => {
      // Create a user first
      const user = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const todoData = {
        title: 'Test Todo',
        description: 'Test Description',
        userId: user.id,
      };
      const response = await request(app)
        .post('/api/v1/todos')
        .send(todoData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', 'Test Todo');
      expect(response.body).toHaveProperty('description', 'Test Description');
      expect(response.body).toHaveProperty('completed', false);
      expect(response.body).toHaveProperty('userId', user.id);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing title', async () => {
      // Create a user first
      const user = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const todoData = { description: 'Test Description', userId: user.id };
      const response = await request(app)
        .post('/api/v1/todos')
        .send(todoData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
    });

    it('should return 400 for missing user ID', async () => {
      const todoData = { title: 'Test Todo', description: 'Test Description' };
      const response = await request(app)
        .post('/api/v1/todos')
        .send(todoData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation error');
    });

    it('should return 404 for non-existent user', async () => {
      const todoData = {
        title: 'Test Todo',
        description: 'Test Description',
        userId: 999,
      };
      const response = await request(app)
        .post('/api/v1/todos')
        .send(todoData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });

  describe('GET /api/v1/todos', () => {
    it('should return an empty array when no todos exist', async () => {
      const response = await request(app).get('/api/v1/todos');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todos');
      expect(response.body.todos).toEqual([]);
      expect(response.body).toHaveProperty('totalCount', 0);
    });

    it('should return all todos', async () => {
      // Create a user first
      const user = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Create a todo
      await TodoModel.create({
        title: 'Test Todo',
        description: 'Test Description',
        userId: user.id,
      });

      const response = await request(app).get('/api/v1/todos');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todos');
      expect(response.body.todos).toHaveLength(1);
      expect(response.body).toHaveProperty('totalCount', 1);
      expect(response.body.todos[0]).toHaveProperty('title', 'Test Todo');
    });

    it('should filter todos by completion status', async () => {
      // Create a user first
      const user = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Create completed todo
      await TodoModel.create({
        title: 'Completed Todo',
        completed: true,
        userId: user.id,
      });

      // Create incomplete todo
      await TodoModel.create({
        title: 'Incomplete Todo',
        completed: false,
        userId: user.id,
      });

      // Get completed todos
      const completedResponse = await request(app).get(
        '/api/v1/todos?completed=true'
      );
      expect(completedResponse.status).toBe(200);
      expect(completedResponse.body.todos).toHaveLength(1);
      expect(completedResponse.body.todos[0]).toHaveProperty(
        'title',
        'Completed Todo'
      );

      // Get incomplete todos
      const incompleteResponse = await request(app).get(
        '/api/v1/todos?completed=false'
      );
      expect(incompleteResponse.status).toBe(200);
      expect(incompleteResponse.body.todos).toHaveLength(1);
      expect(incompleteResponse.body.todos[0]).toHaveProperty(
        'title',
        'Incomplete Todo'
      );
    });
  });

  describe('GET /api/v1/todos/:id', () => {
    it('should return a todo by ID', async () => {
      // Create a user first
      const user = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Create a todo
      const todo = await TodoModel.create({
        title: 'Test Todo',
        description: 'Test Description',
        userId: user.id,
      });

      const response = await request(app).get(`/api/v1/todos/${todo.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', todo.id);
      expect(response.body).toHaveProperty('title', 'Test Todo');
      expect(response.body).toHaveProperty('description', 'Test Description');
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app).get('/api/v1/todos/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Todo not found');
    });
  });

  describe('PUT /api/v1/todos/:id', () => {
    it('should update an existing todo', async () => {
      // Create a user first
      const user = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Create a todo
      const todo = await TodoModel.create({
        title: 'Original Title',
        description: 'Original Description',
        userId: user.id,
      });

      // Update the todo
      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description',
        completed: true,
      };
      const response = await request(app)
        .put(`/api/v1/todos/${todo.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('id', todo.id);
      expect(response.body).toHaveProperty('title', 'Updated Title');
      expect(response.body).toHaveProperty(
        'description',
        'Updated Description'
      );
      expect(response.body).toHaveProperty('completed', true);
    });

    it('should return 404 for non-existent todo', async () => {
      const updateData = { title: 'Updated Title' };
      const response = await request(app)
        .put('/api/v1/todos/999')
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Todo not found');
    });
  });

  describe('DELETE /api/v1/todos/:id', () => {
    it('should delete an existing todo', async () => {
      // Create a user first
      const user = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Create a todo
      const todo = await TodoModel.create({
        title: 'Test Todo',
        userId: user.id,
      });

      // Delete the todo
      await request(app).delete(`/api/v1/todos/${todo.id}`).expect(204);

      // Verify todo is deleted
      await request(app).get(`/api/v1/todos/${todo.id}`).expect(404);
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .delete('/api/v1/todos/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Todo not found');
    });
  });

  describe('PATCH /api/v1/todos/:id/complete', () => {
    it('should mark a todo as completed', async () => {
      // Create a user first
      const user = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Create a todo
      const todo = await TodoModel.create({
        title: 'Test Todo',
        userId: user.id,
      });

      // Mark todo as completed
      const response = await request(app)
        .patch(`/api/v1/todos/${todo.id}/complete`)
        .expect(200);

      expect(response.body).toHaveProperty('id', todo.id);
      expect(response.body).toHaveProperty('completed', true);
    });

    it('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .patch('/api/v1/todos/999/complete')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Todo not found');
    });
  });

  describe('GET /api/v1/users/:userId/todos', () => {
    it('should return todos for a specific user', async () => {
      // Create users
      const user1 = await UserModel.create({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const user2 = await UserModel.create({
        name: 'Jane Smith',
        email: 'jane@example.com',
      });

      // Create todos for user1
      await TodoModel.create({
        title: 'User1 Todo 1',
        userId: user1.id,
      });

      await TodoModel.create({
        title: 'User1 Todo 2',
        userId: user1.id,
      });

      // Create todo for user2
      await TodoModel.create({
        title: 'User2 Todo 1',
        userId: user2.id,
      });

      // Get todos for user1
      const response = await request(app).get(
        `/api/v1/users/${user1.id}/todos`
      );
      expect(response.status).toBe(200);
      expect(response.body.todos).toHaveLength(2);
      expect(response.body.totalCount).toBe(2);
      expect(response.body.todos[0]).toHaveProperty('title', 'User1 Todo 2'); // Default sorting is by createdAt DESC
      expect(response.body.todos[1]).toHaveProperty('title', 'User1 Todo 1');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/v1/users/999/todos');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });
});
