import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './auth';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth.user) {
      axios.get('https://mern-project-server-oonq.onrender.com/api/favorites/getfavorites')
      
        .then(response => setFavorites(response.data))
        .catch(error => console.error(error));
    }
  }, [auth.user]);

  const getFavorites = () => {
    axios.get('https://mern-project-server-oonq.onrender.com/api/favorites/getfavorites')
      
    .then(response => setFavorites(response.data))
    .catch(error => console.error(error));
  }

  const addToFavorites = (productId) => {
    axios.post('https://mern-project-server-oonq.onrender.com/api/favorites/add-to-favorites', { productId })
      .then(response => {
        setFavorites([...favorites, productId]);
      })
      .catch(error => console.error(error));
  };

  const removeFromFavorites = (productId) => {
    axios.delete(`https://mern-project-server-oonq.onrender.com/api/favorites/remove-from-favorites/${productId}`)
      .then(response => {
        setFavorites(favorites.filter(id => id !== productId));
        getFavorites();
        
      })
      .catch(error => console.error(error));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => useContext(FavoritesContext);

export { useFavorites, FavoritesProvider };