import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './auth';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth.user) {
      axios.get('https://mern-project-server-oonq.onrender.com/api/cart/getcart')
      
        .then(response => setCart(response.data))
        .catch(error => console.error(error));
    }
  }, [auth.user]);

  const getCart = () => {
    axios.get('https://mern-project-server-oonq.onrender.com/api/cart/getcart')
      
    .then(response => setCart(response.data))
    .catch(error => console.error(error));
  }

  const addToCart = (productId) => {
    axios.post('https://mern-project-server-oonq.onrender.com/api/cart/add-to-cart', { productId })
      .then(response => {
        setCart([...cart, productId]);
      })
      .catch(error => console.error(error));
  };

  const removeFromCart = (productId) => {
    axios.delete(`https://mern-project-server-oonq.onrender.com/api/cart/remove-from-cart/${productId}`)
      .then(response => {
        setCart(cart.filter(id => id !== productId));
        getCart();
        
      })
      .catch(error => console.error(error));
  };

  return (
    <CartContext.Provider value={{ cart, setCart,addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };