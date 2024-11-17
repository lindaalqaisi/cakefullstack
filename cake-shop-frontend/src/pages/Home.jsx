import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ChevronRight, Cake, Gift, Clock, Star, Loader } from 'lucide-react';
import { productService } from '../services/api';
import { useState, useEffect } from 'react';

// Import images
import hero from '../assets/hero.webp';
import hero2 from '../assets/hero2.webp';
import wedding from '../assets/wedding.webp';
import cupcake from '../assets/cupcake.webp';
import birthday from '../assets/birthday.webp';
import delight from '../assets/delight.webp';

const Home = () => {
  const [heroImage, setHeroImage] = useState(hero);

  // Random hero image selection on mount
  useEffect(() => {
    const heroes = [hero, hero2];
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    setHeroImage(randomHero);
  }, []);

  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productService.getAll({ limit: 4 })
  });

  // Get category image helper
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

  const features = [
    {
      icon: <Cake className="h-6 w-6" />,
      title: "Custom Designs",
      description: "Personalize your cake for any special occasion"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Perfect Gifting",
      description: "Make celebrations memorable with our special cakes"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Same day delivery for your last-minute celebrations"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Premium Quality",
      description: "Made with the finest ingredients for the best taste"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-pink-50">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Delicious Cakes for Every Occasion
            </h1>
            <p className="mt-6 text-xl text-white max-w-3xl mx-auto">
              From birthdays to weddings, make every celebration special with our handcrafted cakes.
              Custom designs available for your unique moments.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
              >
                Browse Products
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/products?category=Custom"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-gray-50"
              >
                Custom Orders
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-xl text-gray-600">
            We take pride in delivering the best cake experience
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative rounded-lg border border-gray-200 bg-white p-6 text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-pink-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
            <p className="mt-4 text-xl text-gray-600">
              Our most popular creations
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center text-pink-600 hover:text-pink-700"
          >
            View All
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-pink-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts?.data.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group relative"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={getCategoryImage(product.category)}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="mt-2 text-lg font-medium text-pink-600">
                    ${product.basePrice.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-pink-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to order your dream cake?</span>
            <span className="block text-pink-200">Start customizing today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/products?category=Custom"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-pink-50"
              >
                Start Custom Order
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;