# 🍰 WebWizards Cake Shop

## Overview
WebWizards Cake Shop is a comprehensive web application developed as part of COMP229 - Web Application Development course. The platform allows users to browse, customize, and order cakes while providing administrators with robust tools for managing products and orders.


## 🚀 Team Members
| Name | Role |
|------|------|
| **Maryam Khan** | Backend Lead |
| **Linda Qaisi** | Frontend/Backend Lead |
| **Matthew Kool** | Full Stack Developer |

## 🎨 Frontend Preview

### Home Page
![Home Page](./screenshots/home.png)
Our welcoming home page features:
- Hero section with featured products
- Category showcase
- Special offers section
- Custom cake designer
- Testimonials from happy customers

### Products Catalog
![Products Page](./screenshots/products.png)
Browse our extensive catalog with:
- Filter by category
- Search functionality
- Price sorting
- Responsive grid layout
- Quick view options

### Product Details
![Product Details](./screenshots/details.png)
Detailed product view includes:
- High-quality images
- Size selection
- Flavor options
- Customization choices
- Add to cart functionality

### Authentication
![Login Page](./screenshots/login.png)
Secure user authentication with:
- User registration
- Login functionality
- Password recovery
- Social media login options
- JWT-based security

## 🎨 Frontend Features
- **Modern Design**: Clean and intuitive user interface using Tailwind CSS
- **Responsive Layout**: Perfect viewing experience across all devices
- **State Management**: Efficient data handling with React Query
- **Form Handling**: Smooth form interactions with React Hook Form
- **Real-time Updates**: Dynamic content updates without page refresh
- **Error Handling**: User-friendly error messages and loading states
- **Image Optimization**: Fast loading optimized images
- **Cart Management**: Persistent shopping cart with local storage
- **Admin Dashboard**: Comprehensive product and order management

## 🛠️ Frontend Technology Stack
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Query
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Authentication**: JWT with Cookie storage

## 📱 Frontend Structure
```
cake-shop-frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/          # React context providers
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── assets/           # Images and static files
│   └── App.jsx          # Main application component
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## 🚀 Frontend Setup
```bash
# Navigate to frontend directory
cd cake-shop-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Overview of Backend Work



## 📁 Project Structure Backend
```
cake-shop/
├── cake-shop-backend/      # Backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/        # Utility functions
│   │   └── server.js     # Entry point
│   ├── postman.json       # Postman collection
│   └── api-documentation.md # API documentation
└── cake-shop-frontend/    # Frontend application (React)
```

## 🛠️ Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Documentation**: Postman, Markdown

## 📚 Documentation
- [API Documentation](/cake-shop-backend/api-documentation.md)
- [Postman Collection](/cake-shop-backend/postman.json)

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14
- MongoDB
- npm or yarn

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/lindaalqaisi/cakefullstack.git

# Navigate to backend directory
cd cake-shop/cake-shop-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update environment variables in .env
# Add your MongoDB URI and JWT secret

# Run development server
npm run dev

# Seed the database
npm run seed
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🔑 Available Scripts

### Backend
```bash
# Run development server
npm run dev

# Run production server
npm start

# Seed database
npm run seed

# Run tests
npm test
```

## 🌟 Features
- User authentication and authorization
- Product browsing and searching
- Cake customization
- Order management
- Admin dashboard
- Responsive design

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## 🔒 Security
- JWT authentication
- Password hashing
- Input validation
- Role-based access control

## 🧪 Testing
```bash
# Import Postman Collection
cake-shop/cake-shop-backend/postman.json

# Set up environment variables in Postman
baseUrl: http://localhost:5000/api
```

## 📦 Deployment
The application can be deployed using:
- Heroku
- AWS
- Greenbackend
- Digital Ocean
- Any Node.js hosting service

## 📄 License
This project is part of COMP229 - Web Application Development course at Centennial College.

## 🤝 Contributing
As this is an academic project, contributions are limited to team members.

## 👥 Team Contributions
- **Maryam Khan**: Backend development, API architecture, database design
- **Linda Qaisi**: Frontend development, UI/UX design, component development
- **Matthew Kool**: Full-stack development, testing, documentation

## 📞 Support
For support or queries, contact team members:
- Maryam Khan
- Linda Qaisi
- Matthew Kool

## 🎓 Academic Information
- **Course**: COMP229 - Web Application Development
- **Institution**: Centennial College


---
© 2024 WebWizards Team. Centennial College.