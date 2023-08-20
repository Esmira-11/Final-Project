import React, { useState, useEffect } from "react";
import "./filter.scss";
// import Card from "../Card/Card";
import { useAuth } from "../../context/auth";
import axios from "axios";
// import img from "../../assets/images/shop-item.png";


function Filter() {
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/all-products"
      );

      if (response.status ==200) {
        setProduct(response.data.products)
      }
    } catch (error) {
      console.log(error);
    }
  };
// if (product.length != 0) {
//     console.log("product", product[1])
// }
      
  useEffect(() => {
    getAllProducts();
  }, []);


  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/category/all-categories"
      );

      if (response.status ==200) {
        setCategories(response.data.category)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <div className="filter-section">
        <div className="filter-section-container">
          <div className="filter-section-container-left">
            <div className="category-bar">
              <div className="category-bar-title">
                <h2>All Categories</h2>
              </div>
              <div className="category-bar-content">
              {categories?.map((item) => (
                <div className="category">
                <a href="#">{item.name}</a>
              </div>
              ))}
                {/* <div className="category">
                  <a href="#">Food</a>
                </div>
                <div className="category">
                  <a href="#">Toys</a>
                </div>
                <div className="category">
                  <a href="#">Beds</a>
                </div>
                <div className="category">
                  <a href="#">Accessories</a>
                </div>
                <div className="category">
                  <a href="#">Health and Wellness</a>
                </div>
                <div className="category">
                  <a href="#">Grooming Supplies</a>
                </div> */}
              </div>
            </div>

            <div className="size-bar">
              <div className="size-bar-title">
                <h2>Size</h2>
              </div>
              <div className="size-bar-content">
                <div className="size">
                  <a href="#">Small</a>
                </div>
                <div className="size">
                  <a href="#">Medium</a>
                </div>
                <div className="size">
                  <a href="#">Large</a>
                </div>
              </div>
            </div>

            <div className="price-bar">
              <div className="price-bar-title">
                <h2>Price Range</h2>
              </div>
              <div className="price-bar-content">
                <div className="price">
                  <a href="#">0$ - 50$</a>
                </div>
                <div className="price">
                  <a href="#">0$ - 50$</a>
                </div>
                <div className="price">
                  <a href="#">0$ - 50$</a>
                </div>
                <div className="price">
                  <a href="#">0$ - 50$</a>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-section-container-right">
            <div className="filter-section-container-right-top">
              <div className="left">
                <h2>Results</h2>
              </div>
              <div className="right">
                <select name="price" id="price">
                  <option value="">Sort by price</option>
                  <option value="">low to high</option>
                  <option value="">high to low</option>
                </select>
              </div>
            </div>

            <div className="filter-section-container-right-bottom">
              {/* <Card/> */}
              <div className="cards">
                 {product?.map((item) => (
                  <div className="shop-item" >
                    <div className="shop-item-img">
                      <img src={`http://localhost:5000/api/product/product-photo/${item._id}`} alt="shop-item" />
                      {/* <img src={item.photo.data} alt="" /> */}
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
                 {/* <h1>esi</h1> */}
                 {/* {product && product.map((item) => (
                    <h1>{item.name}</h1>
                 ))} */}
              </div>

{/* <div className="cards">
        <div className="shop-item">
        <div className="shop-item-img">
            <img src={img} alt="shop-item" />
            <div className="shop-item-meta">
                <div className="links">
                    <a href="#"><i className="far fa-heart"></i></a>
                    <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
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
                <h4 className="shop-item-title">Pet Modern Toy</h4>
            </a>
            <div className="shop-item-price">$800</div>
        </div>
        </div>
        </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
