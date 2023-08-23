import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../src/assets/sass/main.scss"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/search.jsx'
import {CardProvider} from './context/card.jsx'
import {FavoritesProvider} from'./context/FavoritesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <AuthProvider>
        <SearchProvider>
          <CardProvider>
            <FavoritesProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </FavoritesProvider>
          </CardProvider>
        </SearchProvider>
      </AuthProvider>
    
  </React.StrictMode> 
    
)
