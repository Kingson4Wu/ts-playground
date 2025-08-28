# Customer & Product Service (Service B)

Part of a simulated microservices architecture.

## Features

- Manage customer information
- Manage product inventory
- RESTful API design
- Data validation and sanitization
- Error handling with appropriate HTTP status codes
- TypeScript type safety
- Comprehensive test coverage

## API Endpoints

### Base URL
`/api/v1`

### Customer Endpoints

| Method | Endpoint                     | Description                   |
|--------|------------------------------|-------------------------------|
| GET    | `/customers`                 | Get all customers             |
| GET    | `/customers/:id`             | Get customer by ID           |
| POST   | `/customers`                 | Create a new customer         |
| POST   | `/customers/validate`        | Validate customer exists      |

### Product Endpoints

| Method | Endpoint                           | Description                     |
|--------|------------------------------------|---------------------------------|
| GET    | `/products`                        | Get all products                |
| GET    | `/products/:id`                    | Get product by ID               |
| POST   | `/products`                        | Create a new product            |
| POST   | `/products/check-availability`     | Check product availability      |
| POST   | `/products/:id/update-inventory`  | Update product inventory        |

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kingson4Wu/ts-playground.git
   ```

2. Navigate to the service directory:
   ```bash
   cd ts-playground/stage3-backend/exercises/microservices/service-b
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

The service will be available at `http://localhost:3002` by default.

## API Documentation

### Get All Customers
```
GET /api/v1/customers
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, State",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### Get Customer by ID
```
GET /api/v1/customers/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St, City, State",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Create Customer
```
POST /api/v1/customers
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "address": "456 Oak Ave, Town, State"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "address": "456 Oak Ave, Town, State",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Validate Customer
```
POST /api/v1/customers/validate
```

**Request Body:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "valid": true
}
```

### Get All Products
```
GET /api/v1/products
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "inventory": 10,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### Get Product by ID
```
GET /api/v1/products/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "inventory": 10,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Create Product
```
POST /api/v1/products
```

**Request Body:**
```json
{
  "name": "Mouse",
  "description": "Wireless optical mouse",
  "price": 29.99,
  "inventory": 50
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Mouse",
  "description": "Wireless optical mouse",
  "price": 29.99,
  "inventory": 50,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Check Product Availability
```
POST /api/v1/products/check-availability
```

**Request Body:**
```json
{
  "id": 1,
  "quantity": 5
}
```

**Response:**
```json
{
  "available": true
}
```

### Update Product Inventory
```
POST /api/v1/products/:id/update-inventory
```

**Request Body:**
```json
{
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true
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
|-------------|-----------------------|
| 200         | OK                    |
| 201         | Created               |
| 400         | Bad Request           |
| 404         | Not Found             |
| 500         | Internal Server Error |

## Testing

Run the test suite:
```bash
npm test
```

## Implementation Details

This service demonstrates:
- Microservices architecture concepts
- RESTful API design principles
- Data modeling with TypeScript interfaces
- Business logic implementation
- Error handling in backend services
- TypeScript type safety across the stack
- Comprehensive test coverage with Jest and Supertest

## License

MIT