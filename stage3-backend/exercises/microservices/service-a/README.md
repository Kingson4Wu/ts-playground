# Order Management Service (Service A)

Part of a simulated microservices architecture.

## Features

- Manage customer orders
- Communicate with Customer & Product Service (Service B)
- RESTful API design
- Data validation and sanitization
- Error handling with appropriate HTTP status codes
- TypeScript type safety
- Comprehensive test coverage

## API Endpoints

### Base URL
`/api/v1`

### Order Endpoints

| Method | Endpoint                    | Description                   |
|--------|-----------------------------|-------------------------------|
| GET    | `/orders`                   | Get all orders                |
| GET    | `/orders/:id`               | Get order by ID               |
| POST   | `/orders`                   | Create a new order            |
| PUT    | `/orders/:id/status`        | Update order status           |
| POST   | `/orders/:id/process`       | Process an order              |
| DELETE | `/orders/:id`               | Cancel an order               |

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kingson4Wu/ts-playground.git
   ```

2. Navigate to the service directory:
   ```bash
   cd ts-playground/stage3-backend/exercises/microservices/service-a
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

The service will be available at `http://localhost:3001` by default.

## Service Interaction

This service communicates with the Customer & Product Service (Service B) at `http://localhost:3002`:

1. **Customer Validation**: Before creating an order, Service A validates the customer exists in Service B
2. **Product Availability**: Before creating an order, Service A checks if the product is available in Service B
3. **Inventory Update**: After processing an order, Service A updates the product inventory in Service B
4. **Order Cancellation**: When cancelling an order, Service A restocks the product in Service B if needed

## API Documentation

### Get All Orders
```
GET /api/v1/orders
```

**Response:**
```json
[
  {
    "id": 1,
    "customerId": 1,
    "productId": 1,
    "quantity": 2,
    "status": "pending",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### Get Order by ID
```
GET /api/v1/orders/:id
```

**Response:**
```json
{
  "id": 1,
  "customerId": 1,
  "productId": 1,
  "quantity": 2,
  "status": "pending",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Create Order
```
POST /api/v1/orders
```

**Request Body:**
```json
{
  "customerId": 1,
  "productId": 1,
  "quantity": 2
}
```

**Response:**
```json
{
  "id": 1,
  "customerId": 1,
  "productId": 1,
  "quantity": 2,
  "status": "pending",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Update Order Status
```
PUT /api/v1/orders/:id/status
```

**Request Body:**
```json
{
  "status": "processing"
}
```

**Response:**
```json
{
  "id": 1,
  "customerId": 1,
  "productId": 1,
  "quantity": 2,
  "status": "processing",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Process Order
```
POST /api/v1/orders/:id/process
```

**Response:**
```json
{
  "success": true,
  "message": "Order processed successfully"
}
```

### Cancel Order
```
DELETE /api/v1/orders/:id
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
|-------------|-----------------------|
| 200         | OK                    |
| 201         | Created               |
| 204         | No Content            |
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
- HTTP communication between services
- API design for service-to-service interaction
- Error handling in distributed systems
- Data consistency across services
- TypeScript type safety in a distributed context
- Comprehensive test coverage with Jest and Supertest

## License

MIT