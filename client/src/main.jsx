import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../src/assets/sass/main.scss"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/search.jsx'
import {FavoritesProvider} from'./context/FavoritesContext.jsx'
import {CartProvider} from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <FavoritesProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </FavoritesProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    
  </React.StrictMode> 
    
)
