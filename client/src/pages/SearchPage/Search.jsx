import React from 'react'
import Layout from '../../components/Layout';
import { useSearch } from '../../context/search';
import './search.scss'

function Search() {
    const [values,setValues] = useSearch();
  return (
    <Layout>
        <div className="search-container">
            <h1>Search Results</h1>
            <h6>
                {values?.results.length < 1 
                ? 'No Products Found' 
                : `Count: ${values?.results.length}` }
            </h6>
            <div className="cards">
                {values?.results.map((item) => (
                  <div className="shop-item">
                    <div className="shop-item-img">
                      <img
                        src={`http://localhost:5000/api/product/product-photo/${item._id}`}
                        alt="shop-item"
                      />
                      <div className="shop-item-meta">
                        <div className="links">
                          <a href="#">
                            <i className="far fa-heart"></i>
                          </a>
                          <a href="#">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="shop-item-info">
                      <div className="shop-item-rate">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <a href="#">
                        <h4 className="shop-item-title">{item.name}</h4>
                      </a>
                      <div className="shop-item-price">{item.price} $</div>
                    </div>
                  </div>
                ))}
                
              </div>
        </div>
    </Layout>
  )
}

export default Search