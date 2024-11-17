import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, customizations = {}) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && 
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );

      if (existingItem) {
        return prevCart.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, {
        id: product.id,
        name: product.name,
        price: product.basePrice,
        quantity,
        customizations,
        image: product.image
      }];
    });
  };

  const removeFromCart = (itemId, customizations = {}) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.id === itemId && 
      JSON.stringify(item.customizations) === JSON.stringify(customizations))
    ));
  };

  const updateQuantity = (itemId, quantity, customizations = {}) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === itemId && 
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);