# User Management RESTful API

A RESTful API for user management with full CRUD operations.

## Features

- Create, read, update, and delete users
- Data validation and sanitization
- Error handling with appropriate HTTP status codes
- RESTful API design principles
- Comprehensive test coverage
- TypeScript type safety

## API Endpoints

### Base URL

`/api/v1`

### User Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/users`     | Get all users           |
| GET    | `/users/:id` | Get user by ID          |
| POST   | `/users`     | Create a new user       |
| PUT    | `/users/:id` | Update an existing user |
| DELETE | `/users/:id` | Delete a user           |

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Kingson4Wu/ts-playground.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ts-playground/stage3-backend/exercises/user-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the API

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000` by default.

## API Documentation

### Get All Users

```
GET /api/v1/users
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### Get User by ID

```
GET /api/v1/users/:id
```

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Create User

```
POST /api/v1/users
```

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

**Response:**

```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Update User

```
PUT /api/v1/users/:id
```

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

**Response:**

```json
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### Delete User

```
DELETE /api/v1/users/:id
```

**Response:**

```
204 No Content
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
| 409         | Conflict              |
| 500         | Internal Server Error |

## Testing

Run the test suite:

```bash
npm test
```

## Implementation Details

This API demonstrates:

- Building RESTful APIs with Express
- HTTP fundamentals (GET, POST, PUT, DELETE requests)
- Data validation and sanitization
- In-memory database simulation
- API design best practices
- Error handling in backend services
- TypeScript type safety across the stack
- Comprehensive test coverage with Jest and Supertest

## License

MIT
