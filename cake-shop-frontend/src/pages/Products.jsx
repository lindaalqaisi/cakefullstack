import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search, Loader, ChevronRight } from 'lucide-react';
import { productService } from '../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Import images
import wedding from '../assets/wedding.webp';
import cupcake from '../assets/cupcake.webp';
import birthday from '../assets/birthday.webp';
import delight from '../assets/delight.webp';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [filters, setFilters] = useState({
    category: initialCategory,
    search: '',
    page: 1,
    limit: 12
  });

  useEffect(() => {
    if (initialCategory) {
      setFilters(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAll(filters)
  });

  const categories = ['Birthday', 'Wedding', 'Custom', 'Cupcakes'];

  const getCategoryImage = (category) => {
    switch (category?.toLowerCase()) {
      case 'wedding':
        return wedding;
      case 'cupcakes':
        return cupcake;
      case 'birthday':
        return birthday;
      case 'custom':
        return delight;
      default:
        return delight;
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-gray-600">Discover our delicious range of cakes and treats</p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search cakes..."
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }))}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none min-w-[150px]"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-pink-600" size={40} />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8 bg-white rounded-lg shadow">
          <p className="text-lg">Failed to load products</p>
          <p className="text-sm mt-2">Please try again later</p>
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow">
          <p className="text-lg">No products found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getCategoryImage(product.category)}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-300 hover:scale-110"
                />
                {product.customizable && (
                  <span className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
                    Customizable
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                {product.flavors && product.flavors.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Flavors: {product.flavors.slice(0, 2).join(', ')}
                    {product.flavors.length > 2 && '...'}
                  </p>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-pink-600 font-semibold">
                    ${product.basePrice.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleViewDetails(product._id)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-200 flex items-center"
                  >
                    View Details
                    <ChevronRight className="ml-1" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: data.pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                className={`px-4 py-2 rounded-lg transition duration-200 ${
                  filters.page === i + 1
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;