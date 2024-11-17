import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Cake, ShoppingCart, LogOut, UserCircle } from 'lucide-react';
import Cookies from 'js-cookie';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const isAdmin = Cookies.get('role') === 'admin';

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and main nav */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-pink-600">
                  Cake Shop
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-4">
                <NavLink to="/" icon={<Home size={18} />}>
                  Home
                </NavLink>
                <NavLink to="/products" icon={<Cake size={18} />}>
                  Products
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin/products" icon={<ShoppingCart size={18} />}>
                    Manage Products
                  </NavLink>
                )}
              </div>
            </div>

            {/* Right side - Auth buttons */}
            <div className="flex items-center">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <UserCircle size={18} className="mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

const NavLink = ({ to, children, icon }) => {
  return (
    <Link
      to={to}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
    >
      {icon}
      <span className="ml-2">{children}</span>
    </Link>
  );
};

export default Layout;