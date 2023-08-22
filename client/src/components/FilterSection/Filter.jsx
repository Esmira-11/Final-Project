import React, { useState, useEffect } from "react";
import "./filter.scss";
import axios from "axios";
import { Prices } from "../Prices";
import { Radio, Checkbox } from "antd";
import { withError } from "antd/es/modal/confirm";
import { useNavigate } from "react-router-dom";

function Filter() {
  let navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:5000/api/product/product-list/${page}`
      );
      // setProduct(response.data.products);
      setLoading(false)
      if (response.status == 200) {
        setProduct(response.data.products);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  // if (product.length != 0) {
  //     console.log("product", product[1])
  // }

  // useEffect(() => {
  //   if(!checked.length && !radio.length) getAllProducts();
  // }, [checked.length,radio.length]);

  // useEffect(() => {
  //   if(checked.length || radio.length) filteredProduct();
  // }, [checked,radio]);

  useEffect(() => {
    if(checked.length || radio.length){
      filteredProduct();
    } else{
      getAllProducts();
    }
  }, [checked.length,radio.length]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/category/all-categories"
      );

      if (response.status == 200) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  const getTotal = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/api/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(page === 1) return;
    loadMore();
  }, [page])
  

  const loadMore = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`http://localhost:5000/api/product/product-list/${page}`)
      setLoading(false)
      setProduct([...product, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filteredProduct = async () => {
    try {
      const {data} = await axios.post("http://localhost:5000/api/product/product-filters",{
        checked,
        radio
      })
      setProduct(data?.products)
      console.log(data.products)
      console.log(product)
    } catch (error) {
      console.log(error)
    }
  }

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
                    <Checkbox
                      key={item._id}
                      onChange={(e) => handleFilter(e.target.checked, item._id)}
                    >
                      {item.name}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="size-bar">
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
            </div> */}

            <div className="price-bar">
              <div className="price-bar-title">
                <h2>Price Range</h2>
              </div>
              <div className="price-bar-content">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((item) => (
                    <div className="price" key={item._id}>
                      <Radio value={item.array}>{item.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            
            <div className="reset-btn">
              <button onClick={() => window.location.reload()}>Reset Filters</button>
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
                    <div className="shop-item-info"  onClick={() => navigate(`/product/${item.slug}`)}>
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
              {product && product.length < total && (
                <button className="button" onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  {loading ? 'Loading ...' : 'Loadmore'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
