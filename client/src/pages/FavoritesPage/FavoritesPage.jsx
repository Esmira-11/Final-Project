import React, { useEffect } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/auth';
import axios from 'axios'

function FavoritesPage() {
  const { favorites,setFavorites, removeFromFavorites } = useFavorites();
  const [auth] = useAuth();

//   useEffect(() => {
//     if (auth.user) {
//         axios.get('http://localhost:5000/api/favorites/getfavorites')
      
//         .then(response => setFavorites(response.data))
//         .catch(error => console.error(error));
//     }  
// }, [auth.user]);

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.map(item => (
        <>
        {console.log(item)}
        <div key={item._id}>
          <p>Product ID: {item.product.name}</p>
          <button onClick={() => {removeFromFavorites(item.product._id)}}>Remove from Favorites</button>
        </div>
        </>
      ))}
    </div>
  );
}

export default FavoritesPage;