import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import {useCart} from '../../context/CartContext'
import { useNavigate } from "react-router-dom";
import "./card.scss";

const Card = () => {
  const [auth, setAuth] = useAuth();
  const { cart,setCart, addToCart, removeFromCart } = useCart();
  let navigate = useNavigate();

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.product._id === productId) {
        return {
          ...item,
          product: {
            ...item.product,
            quantity: item.product.quantity - 1
          }
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (productId) => {
   
    const updatedCart = cart.map(item => {
      if (item.product._id === productId) {
        return {
          ...item,
          product: {
            ...item.product,
            quantity: item.product.quantity + 1
          }
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach(item => {
        total += item.product.price * item.product.quantity; 
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Layout>
      <div className="card-page">
        <div className="card-page-container">
          <div className="card-page-left">
          <h4>
            {cart?.length
              ? `You Have ${cart.length} items in your cart `
              : "Your Cart Is Empty"}
          </h4>
            {cart?.map((item) => (
              <div className="card-box" key={item._id}>
                <div className="card-box-left">
                  <img
                    src={`http://localhost:5000/api/product/product-photo/${item?.product?._id}`}
                    alt="shop-item"
                  />
                </div>
                <div className="card-box-right">
                    <p className="name">{item?.product.name}</p>
                    <p className="description">{item?.product.description}</p>
                    <p className="price">Price: $ {item?.product.price} </p>
                </div>
                <div className="btns-center">
                    <button >
                      <i className="fa-solid fa-minus" onClick={() => handleDecreaseQuantity(item.product._id)}></i>
                    </button>
                    <input
                     type="number"
                     value={item?.product.quantity}
                     max
                     min="1"
                     step="1"
                     placeholder
                     inputmode="numeric"
                     autoComplete="off"
                    />
                    <button onClick={() => handleIncreaseQuantity(item.product._id)}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                <div className="card-btn">
                    <button onClick={()=>removeFromCart(item.product._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card-page-right">
            <h3>Total: {totalPrice()}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Card;
