import React, { useState, useEffect } from "react";
import "./detail.scss";
import Layout from "../../components/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detail() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);


  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product-by-slug/${params.slug}`
      );
      console.log(data);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const {data} = await axios.get(`http://localhost:5000/api/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
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
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <div className="shop-item-price">
                  <h2>$ {product.price}</h2>
                </div>
                <div className="shop-item-description">
                  <p>
                    {product.description}
                  </p>
                  {/* <p>{product?.category?.name}</p>
                  <p>{product.petcategory.name}</p> */}
                </div>
                <div className="btns">
                  <div className="btns-left">
                    <button>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      value="1"
                      max
                      min="1"
                      step="1"
                      placeholder
                      inputmode="numeric"
                      autocomplete="off"
                    />
                    <button>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div className="btns-center">
                  <button>Add To Cart</button>
                  </div>
                  <div className="btns-right">
                    <a href="#">
                      <i className="far fa-heart"></i>
                    </a>
                  </div>
                </div>
                <div className="submit">
                  <button>Buy Now</button>
                </div>
              </div>
            </div>
            <div className="detail-page-container-bottom">
              <Tabs className="tabs">
                <TabList className="tablist">
                  <Tab className="tab">Description</Tab>
                  <Tab className="tab">Reviews</Tab>
                </TabList>

                <TabPanel className="tabpanel first">
                  <h2>{product.description}</h2>
                </TabPanel>
                <TabPanel className="tabpanel">
                  <h2>Any content 2</h2>
                </TabPanel>
              </Tabs>
            </div>
            <hr />
            <div className="detail-page-similar-products">
              <h1>Similar Products</h1>
              {relatedProducts.length < 1 && <p>No Similar Products Found</p> }
              <div className="cards">
                {relatedProducts?.map((item) => (
                  <div className="shop-item" onClick={() => navigate(`/product/${item.slug}`)}>
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
                      {/* <div className="shop-item-rate">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div> */}
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
    </>
  );
}

export default Detail;
