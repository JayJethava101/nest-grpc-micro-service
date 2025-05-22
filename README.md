# NestJS Microservices with gRPC

This project demonstrates a microservices architecture using NestJS and gRPC, consisting of an API Gateway and a User Service.

## Project Structure

```
.
├── api-gateway/         # API Gateway Service
│   ├── src/
│   │   ├── proto/      # Protocol Buffer definitions
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   └── package.json
│
└── user-service/        # User Service
    ├── src/
    │   ├── proto/      # Protocol Buffer definitions
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   └── main.ts
    └── package.json
```

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Protocol Buffers compiler (protoc)

## Installation

1. Install dependencies for both services:

```bash
# Install API Gateway dependencies
cd api-gateway
npm install

# Install User Service dependencies
cd ../user-service
npm install
```

## Running the Services

1. Start the User Service first:

```bash
cd user-service
npm run start:dev
```

2. In a new terminal, start the API Gateway:

```bash
cd api-gateway
npm run start:dev
```

## API Endpoints

The API Gateway exposes the following endpoints:

- `POST /users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

- `GET /users/:id` - Get a user by ID

## Testing the Services

You can test the services using curl or any API client:

1. Create a user:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

2. Get a user:
```bash
curl http://localhost:3000/users/1
``` 