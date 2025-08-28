# To-Do List Service

A RESTful API for a to-do list service with database integration.

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Filter, paginate, and sort todos
- User-specific todo management
- Data validation and sanitization
- Error handling with appropriate HTTP status codes
- RESTful API design principles
- Comprehensive test coverage
- TypeScript type safety
- SQLite database integration with Sequelize ORM

## API Endpoints

### Base URL

`/api/v1`

### Todo Endpoints

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/todos`               | Get all todos                 |
| GET    | `/todos/:id`           | Get todo by ID                |
| POST   | `/todos`               | Create a new todo             |
| PUT    | `/todos/:id`           | Update an existing todo       |
| DELETE | `/todos/:id`           | Delete a todo                 |
| PATCH  | `/todos/:id/complete`  | Mark todo as completed        |
| GET    | `/users/:userId/todos` | Get todos for a specific user |

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Kingson4Wu/ts-playground.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ts-playground/stage3-backend/exercises/todo-service
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Service

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

The service will be available at `http://localhost:3000` by default.

## API Documentation

### Get All Todos

```
GET /api/v1/todos
```

**Query Parameters:**

- `completed` (boolean) - Filter by completion status
- `limit` (number) - Number of items to return
- `offset` (number) - Number of items to skip
- `sortBy` (string) - Field to sort by (createdAt, updatedAt, title)
- `sortOrder` (string) - Sort order (ASC, DESC)
- `userId` (number) - Filter by user ID

**Response:**

```json
{
  "todos": [
    {
      "id": 1,
      "title": "Test Todo",
      "description": "Test Description",
      "completed": false,
      "userId": 1,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "totalCount": 1
}
```

### Get Todo by ID

```
GET /api/v1/todos/:id
```

**Response:**

```json
{
  "id": 1,
  "title": "Test Todo",
  "description": "Test Description",
  "completed": false,
  "userId": 1,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Create Todo

```
POST /api/v1/todos
```

**Request Body:**

```json
{
  "title": "New Todo",
  "description": "Todo Description",
  "userId": 1
}
```

**Response:**

```json
{
  "id": 2,
  "title": "New Todo",
  "description": "Todo Description",
  "completed": false,
  "userId": 1,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Update Todo

```
PUT /api/v1/todos/:id
```

**Request Body:**

```json
{
  "title": "Updated Todo",
  "description": "Updated Description",
  "completed": true
}
```

**Response:**

```json
{
  "id": 2,
  "title": "Updated Todo",
  "description": "Updated Description",
  "completed": true,
  "userId": 1,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### Delete Todo

```
DELETE /api/v1/todos/:id
```

**Response:**

```
204 No Content
```

### Mark Todo as Completed

```
PATCH /api/v1/todos/:id/complete
```

**Response:**

```json
{
  "id": 2,
  "title": "Updated Todo",
  "description": "Updated Description",
  "completed": true,
  "userId": 1,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### Get Todos for User

```
GET /api/v1/users/:userId/todos
```

**Query Parameters:**

- `completed` (boolean) - Filter by completion status
- `limit` (number) - Number of items to return
- `offset` (number) - Number of items to skip
- `sortBy` (string) - Field to sort by (createdAt, updatedAt, title)
- `sortOrder` (string) - Sort order (ASC, DESC)

**Response:**

```json
{
  "todos": [
    {
      "id": 1,
      "title": "User Todo",
      "description": "User Description",
      "completed": false,
      "userId": 1,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "totalCount": 1
}
```

## Error Responses

All error responses follow the same format:

```json
{
  "error": "Error type",
  "message": "Error description"
}
```

### Common HTTP Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | OK                    |
| 201         | Created               |
| 204         | No Content            |
| 400         | Bad Request           |
| 404         | Not Found             |
| 500         | Internal Server Error |

## Database Schema

### Users Table

| Column    | Type    | Description           |
| --------- | ------- | --------------------- |
| id        | INTEGER | Primary key           |
| name      | STRING  | User's name           |
| email     | STRING  | User's email (unique) |
| createdAt | DATE    | Creation timestamp    |
| updatedAt | DATE    | Last update timestamp |

### Todos Table

| Column      | Type    | Description           |
| ----------- | ------- | --------------------- |
| id          | INTEGER | Primary key           |
| title       | STRING  | Todo title            |
| description | TEXT    | Todo description      |
| completed   | BOOLEAN | Completion status     |
| userId      | INTEGER | Foreign key to Users  |
| createdAt   | DATE    | Creation timestamp    |
| updatedAt   | DATE    | Last update timestamp |

## Testing

Run the test suite:

```bash
npm test
```

## Implementation Details

This service demonstrates:

- Building RESTful APIs with Express
- Database integration with Sequelize ORM
- SQLite for development database
- Data modeling with relationships (users and todos)
- Querying and filtering data
- Pagination and sorting
- Error handling in backend services
- TypeScript type safety across the stack
- Comprehensive test coverage with Jest and Supertest

## License

MIT
