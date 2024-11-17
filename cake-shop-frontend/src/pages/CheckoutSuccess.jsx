import { Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

const CheckoutSuccess = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="text-green-500" size={64} />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Thank you for your order!
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Your order has been placed successfully. We'll send you an email confirmation with order details shortly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200"
        >
          <Home className="mr-2" size={20} />
          Return Home
        </Link>
        
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
        >
          <ShoppingBag className="mr-2" size={20} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;