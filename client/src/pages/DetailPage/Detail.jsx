import React, { useState, useEffect } from "react";
import "./detail.scss";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import StarRating from "../../components/StarRating";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/auth";

function Detail() {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [auth,setAuth] = useAuth();
  const { cart, addToCart, removeFromCart } = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setcomments] = useState([]);

  const handleFavoriteClick = (item) => {
    if (!auth.user) {
      toast.error("Please sign in to add to favorites");
      return;
    }
    if (favorites.includes(item?._id)) {
      removeFromFavorites(item?._id);
      toast.success("Removed From Favorites");
    } else {
      addToFavorites(item?._id);
      toast.success("Added to Favorites");
    }
  };

  const handleAddToCart = (item) => {
    if (!auth.user) {
      toast.error("Please sign in to add to cart");
      return;
    }
    if (cart.includes(item._id)) {
      removeFromCart(item._id);
      toast.success("Removed From Cart");
    } else {
      addToCart(item._id);
      toast.success("Added to Cart");
    }
  };

  const getComments = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/comments/${id}`
      );
      if (data?.success) {
        setcomments(data.comments);
      } else {
        console.log("announcement undefined");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product-by-slug/${params.slug}`
      );
      // console.log(data);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
      getComments(data?.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      productId: product._id,
      text: comment,
      rating: rating,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/add-comment-and-rating",
        data
      );

      if (response.data.success) {
        console.log(response.data);
        toast.success("Comment Created Successfully");
        const updatedProduct = {
          ...product,
          comments: [...product.comments, response.data.comment],
        };
        updatedProduct.comments.push({
          user: userId,
          text: comment,
          rating: rating,
        });
        setProduct(updatedProduct);
        getComments(product._id);
      }
      setComment("");
      setRating(0);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleStarClick = (clickedRating) => {
    // Set the rating based on the clicked star
    setRating(clickedRating);
  };

  return (
    <>
      <Layout>
        <div className="detail-page">
          <div className="detail-page-container">
            <div className="detail-page-container-top">
              <div className="detail-left">
                <img
                  src={`http://localhost:5000/api/product/product-photo/${product._id}`}
                  alt="shop-item-img"
                />
              </div>

              <div className="detail-right">
                <div className="shop-item-name">
                  <h1>{product.name}</h1>
                </div>
                <div className="shop-item-rate">
                  <StarRating rating={product.averageRating} />
                </div>
                <div className="shop-item-price">
                  <h2>$ {product.price}</h2>
                </div>
                <div className="shop-item-description">
                  <p> Description : {product?.description?.substring(0,40)}...</p>
                  <p>Category : {product?.category?.name}</p>
                  <p>Pet Category : {product?.petcategory?.name}</p>
                </div>
                <div className="btns">
                  <div className="btns-center left">
                    <button
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className="btns-right">
                    <button
                      className="heart"
                      onClick={() => handleFavoriteClick(product)}
                    >
                      <i
                        className={`${
                          favorites.includes(product._id)
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }`}
                      ></i>
                    </button>
                    {/* <a href="#">
                      <i className="far fa-heart"></i>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-page-container-bottom">
              <Tabs className="tabs">
                <TabList className="tablist">
                  <Tab className="tab">Description</Tab>
                  <Tab className="tab">Reviews ({comments.length})</Tab>
                </TabList>

                <TabPanel className="tabpanel first">
                  <h2>{product.description}</h2>
                </TabPanel>
                <TabPanel className="tabpanel review">
                  <div className="comment-form">
                    {/* <h2>Add Your Comment</h2> */}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        {/* <label htmlFor="comment">Comment:</label> */}
                        <textarea
                          placeholder="Your review *"
                          id="comment"
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <div className="form-group rating">
                        <label htmlFor="rating" className="ratlabel">
                          Rating:
                        </label>
                        <div className="star-rating-input">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`star ${
                                star <= rating ? "selected" : ""
                              }`}
                              onClick={() => handleStarClick(star)}
                            >
                              {star}
                            </span>
                          ))}
                          {/* {console.log(rating)} */}
                        </div>
                      </div>
                      <StarRating rating={rating} />
                      <button className="form-btn" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                  {comments.length > 0 ? <>
                    <div className="comment-section">
                    <h2>All Comments</h2>
                    {comments &&
                      comments.map((comment) => (
                        <div
                          className="comment-body"
                          style={{ display: "flex", borderRadius: "8px" }}
                        >
                          <div className="comment-body-left">
                            <div style={{ paddingTop: "5px" }}>
                              <Avatar
                                className="avatar"
                                alt={comment.user.username}
                                src={`data:${comment.user.avatar.contentType};base64,${comment.user.avatar.data}`}
                              />
                            </div>
                            <div>
                              <p
                                style={{ fontSize: "17px", fontWeight: "700" }}
                              >
                                {comment.user.username}
                              </p>
                              <p style={{ textAlign: "justify" }}>
                                {comment.text}
                              </p>
                            </div>
                          </div>
                          <div className="comment-rating">
                            <StarRating rating={comment.rating} />
                          </div>
                        </div>
                      ))}
                  </div>
                  </> : <>
                  <div className="comment-section">
                    <h3>There are no reviews yet.</h3>
                  </div>
                  </>}
                  
                </TabPanel>
              </Tabs>
            </div>
            <hr />
            <div className="detail-page-similar-products">
              <h1>Similar Products</h1>
              {relatedProducts.length < 1 && <p>No Similar Products Found</p>}
              <div className="cards">
                {relatedProducts?.map((item) => (
                  <div
                    className="shop-item"
                    onClick={() => navigate(`/product/${item.slug}`)}
                  >
                    <div className="shop-item-img">
                      <img
                        src={`http://localhost:5000/api/product/product-photo/${item?._id}`}
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
            </div>
          </div>
        </div>
      </Layout>
      <Toaster position="bottom-right" />
    </>
  );
}

export default Detail;
