import React, { useState, useEffect } from "react";
import "./filter.scss";
import axios from "axios";
import { Prices } from "../Prices";
import { Radio, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import StarRating from "../../components/StarRating";

function Filter() {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { cart, addToCart, removeFromCart } = useCart();

  let navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortingOption, setSortingOption] = useState("");
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [selectedPetCategories, setSelectedPetCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [petCategories, setPetCategories] = useState([]);

  const handlePetCategoryFilter = (category) => {
    const updatedCategories = selectedPetCategories.includes(category)
      ? selectedPetCategories.filter((c) => c !== category)
      : [...selectedPetCategories, category];
    setSelectedPetCategories(updatedCategories);
  };

  const handleSortingChange = (value) => {
    setSortingOption(value);
  };

  const getAllPetCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/petcategory/all-petcategories"
      );

      if (response.status == 200) {
        setPetCategories(response.data.petCategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPetCategories();
  }, []);

  const handleFavoriteClick = (item) => {
    if (favorites.includes(item._id)) {
      removeFromFavorites(item._id);
      toast.success("Removed From Favorites");
    } else {
      addToFavorites(item._id);
      toast.success("Added to Favorites");
    }
  };

  const handleAddToCart = (item) => {
    if (cart.includes(item._id)) {
      removeFromCart(item._id);
      toast.success("Removed From Cart");
    } else {
      addToCart(item._id);
      toast.success("Added to Cart");
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/product/product-list/${page}`
      );
      // setProduct(response.data.products);
      setLoading(false);
      if (response.status == 200) {
        setProduct(response.data.products);
      }
    } catch (error) {
      setLoading(false);
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
    if (
      checked.length ||
      radio.length ||
      selectedPetCategories.length ||
      sortingOption
    ) {
      filteredProduct();
    } else {
      getAllProducts();
    }
  }, [
    checked.length,
    radio.length,
    selectedPetCategories.length,
    sortingOption,
  ]);

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
      const { data } = await axios.get(
        "http://localhost:5000/api/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/product/product-list/${page}`
      );
      setLoading(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
      const { data } = await axios.post(
        "http://localhost:5000/api/product/product-filters",
        {
          checked,
          radio,
          petCategories: selectedPetCategories,
          sorting: sortingOption,
        }
      );
      setProduct(data?.products);
      console.log(data.products);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="filter-section">
        <div className="filter-section-petcategory-container">
          <div className="shop-by-pet">
            <div className="shop-by-pet-container">
              <div className="title">
                <h1>Shop By Category</h1>
              </div>
              <div className="shop-categories">
                {petCategories?.toReversed().map((item) => (
                  <div
                    className={`shop-category-item ${
                      selectedPetCategories.includes(item._id) ? "selected" : ""
                    }`}
                    onClick={() => handlePetCategoryFilter(item._id)}
                    key={item._id}
                  >
                    <div className="shop-category-item-top">
                      <img
                        src={`http://localhost:5000/api/petcategory/petcategory-photo/${item._id}`}
                        alt="pet-category"
                      />
                    </div>
                    <div className="shop-category-item-bottom">
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="filter-section-container">
          <div className="filter-section-container-left">
            <div className="category-bar">
              <div className="category-bar-title">
                <h2>All Categories</h2>
              </div>
              <div className="category-bar-content">
                {categories?.map((item) => (
                  <div className="category" key={item._id}>
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
              <button onClick={() => window.location.reload()}>
                Reset Filters
              </button>
            </div>
          </div>
          <div className="filter-section-container-right">
            <div className="filter-section-container-right-top">
              <div className="left">
                <h2>Results : {product.length}</h2>
              </div>
              <div className="right">
                <select
                  name="price"
                  id="price"
                  value={sortingOption}
                  onChange={(e) => handleSortingChange(e.target.value)}
                >
                  <option className="sortoption" value="">
                    Sort by price
                  </option>
                  <option className="sortoption" value="lowToHigh">
                    low to high
                  </option>
                  <option className="sortoption" value="highToLow">
                    high to low
                  </option>
                </select>
              </div>
            </div>

            <div className="filter-section-container-right-bottom">
              <div className="cards">
                {product?.map((item) => (
                  <div className="shop-item" key={item._id}>
                    <div className="shop-item-img">
                      <img
                        src={`http://localhost:5000/api/product/product-photo/${item._id}`}
                        alt="shop-item"
                      />
                      <div className="shop-item-meta">
                        <div className="links">
                          <button
                            className="heart"
                            onClick={() => handleFavoriteClick(item)}
                          >
                            <i
                              className={`${
                                favorites.includes(item._id)
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
                              }`}
                            ></i>
                          </button>
                          <button
                            onClick={() => {
                              handleAddToCart(item);
                            }}
                          >
                            <i className="fa-solid fa-cart-shopping"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="shop-item-info"
                      onClick={() => navigate(`/product/${item.slug}`)}
                    >
                      <div className="shop-item-rate">
                        <StarRating rating={item.averageRating} />
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
                <button
                  className="load-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default Filter;
