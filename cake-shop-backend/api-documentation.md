# COMP229 - Web Application Development
# Cake Shop API Documentation

## WebWizards Team
**Course:** COMP229 - Web Application Development  

### Team Members
1. **Maryam Khan**

2. **Linda Qaisi**

3. **Matthew Kool**

## Project Overview

### Description
A comprehensive cake shop management system that allows users to browse, order, and customize cakes while providing administrators with tools to manage products and orders.

### Technology Stack
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Validation: Express Validator
- Testing: Postman

## Base URL
```
http://localhost:5000/api
```

## API Endpoints

### 1. Authentication

#### 1.1 Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "user": {
            "id": "string",
            "name": "string",
            "email": "string",
            "role": "string"
        },
        "token": "string"
    }
}
```

#### 1.2 Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response:** Same as register response

### 2. Products

#### 2.1 Get All Products
```http
GET /api/products
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |
| sort | string | Sort field |
| order | string | Sort order (asc/desc) |
| page | number | Page number |
| limit | number | Items per page |
| search | string | Search term |
| minPrice | number | Minimum price |
| maxPrice | number | Maximum price |

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": "string",
            "name": "string",
            "category": "string",
            "description": "string",
            "basePrice": "number",
            "sizes": ["string"],
            "flavors": ["string"],
            "customizable": "boolean",
            "active": "boolean"
        }
    ],
    "pagination": {
        "total": "number",
        "page": "number",
        "limit": "number",
        "totalPages": "number"
    }
}
```

#### 2.2 Product Validation Rules

| Field | Validation | Required | Description |
|-------|------------|----------|-------------|
| name | max:100 chars | Yes | Product name |
| category | enum | Yes | Must be: Birthday, Wedding, Custom, or Cupcakes |
| description | max:500 chars | Yes | Product description |
| basePrice | number > 0 | Yes | Base price of product |
| sizes | array of enum | No | Valid sizes: Small, Medium, Large, Extra Large, 6 Pack, 12 Pack |
| flavors | array | No | Available flavors |
| customizable | boolean | No | Whether product can be customized |
| images | array of URLs | No | Product images |

### 3. Orders

#### 3.1 Create Order
```http
POST /api/orders
```

**Request Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
    "cakeType": "string",
    "size": "string",
    "flavor": "string",
    "message": "string",
    "specialInstructions": "string",
    "deliveryDate": "date",
    "deliveryTime": "string",
    "price": "number"
}
```

#### 3.2 Get User Orders
```http
GET /api/orders
```

**Request Headers:**
```
Authorization: Bearer {token}
```

#### 3.3 Update Order
```http
PUT /api/orders/:id
```

**Request Headers:**
```
Authorization: Bearer {token}
```

## Error Handling

### Error Response Format
```json
{
    "success": false,
    "status": "number",
    "message": "string",
    "errors": [
        {
            "field": "string",
            "message": "string"
        }
    ]
}
```

### Common Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Testing Instructions

### Setting Up Local Environment
1. Install dependencies:
```bash
npm install
npm run seed
```

2. Create `.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. Run development server:
```bash
npm run dev
```

### Running Tests
1. Import Postman collection
2. Set up environment variables in Postman
3. Run test sequences:
   - Register user
   - Login
   - Test protected endpoints

## Database Schema

### User Schema
```javascript
{
    name: String,
    email: String,
    password: String,
    role: String
}
```

### Product Schema
```javascript
{
    name: String,
    category: String,
    description: String,
    basePrice: Number,
    sizes: [String],
    flavors: [String],
    customizable: Boolean,
    active: Boolean
}
```

### Order Schema
```javascript
{
    user: ObjectId,
    cakeType: String,
    size: String,
    flavor: String,
    message: String,
    specialInstructions: String,
    deliveryDate: Date,
    deliveryTime: String,
    status: String,
    price: Number
}
```

## Security Measures
1. JWT Authentication
2. Password Hashing
3. Input Validation
4. Role-based Access Control

## References
1. Express.js Documentation
2. MongoDB Documentation
3. JWT Documentation
4. Express Validator Documentation

## Submission Details
**Course:** COMP229 - Web Application Development  
**Assignment:** Project Part 2 - First Release  

---
© 2024 WebWizards Team. Centennial College.