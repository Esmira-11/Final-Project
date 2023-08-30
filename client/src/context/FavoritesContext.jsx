import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './auth';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth.user) {
      axios.get('http://localhost:5000/api/favorites/getfavorites')
      
        .then(response => setFavorites(response.data))
        .catch(error => console.error(error));
    }
  }, [auth.user]);

  const getFavorites = () => {
    axios.get('http://localhost:5000/api/favorites/getfavorites')
      
    .then(response => setFavorites(response.data))
    .catch(error => console.error(error));
  }

  const addToFavorites = (productId) => {
    axios.post('http://localhost:5000/api/favorites/add-to-favorites', { productId })
      .then(response => {
        setFavorites([...favorites, productId]);
      })
      .catch(error => console.error(error));
  };

  const removeFromFavorites = (productId) => {
    axios.delete(`http://localhost:5000/api/favorites/remove-from-favorites/${productId}`)
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