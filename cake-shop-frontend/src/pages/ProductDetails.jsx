import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Minus, Plus, ShoppingCart, Loader, ArrowLeft } from 'lucide-react';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

// Import images
import wedding from '../assets/wedding.webp';
import cupcake from '../assets/cupcake.webp';
import birthday from '../assets/birthday.webp';
import delight from '../assets/delight.webp';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id)
  });

  const getCategoryImage = (category) => {
    switch (category?.toLowerCase()) {
      case 'wedding':
        return wedding;
      case 'cupcakes':
        return cupcake;
      case 'birthday':
        return birthday;
      case 'custom':
      default:
        return delight;
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedFlavor) {
      addToast('Please select size and flavor', 'error');
      return;
    }

    const customizations = {
      size: selectedSize,
      flavor: selectedFlavor,
      message: customMessage
    };

    addToCart(product.data, quantity, customizations);
    addToast('Added to cart successfully!', 'success');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-pink-600" size={40} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Failed to load product details</h2>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center text-pink-600 hover:text-pink-700"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/products')}
        className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-8"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={getCategoryImage(product.data.category)}
            alt={product.data.name}
            className="w-full h-full object-center object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.data.name}</h1>
          <p className="mt-2 text-gray-500">{product.data.description}</p>
          
          <div className="mt-4">
            <span className="text-2xl font-bold text-pink-600">
              ${product.data.basePrice.toFixed(2)}
            </span>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {product.data.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-md py-2 px-4 text-sm font-medium ${
                    selectedSize === size
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Flavor</h3>
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 py-2 px-3 focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="">Select a flavor</option>
              {product.data.flavors.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Message */}
          {product.data.customizable && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Custom Message</h3>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 py-2 px-3 focus:border-pink-500 focus:ring-pink-500"
                rows={3}
                placeholder="Enter your custom message..."
              />
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="mt-2 flex items-center space-x-3">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="text-gray-900 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-8 flex items-center justify-center w-full bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <ShoppingCart className="mr-2" size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;