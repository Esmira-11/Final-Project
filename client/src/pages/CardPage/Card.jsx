import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from 'axios'
import Services from '../../components/Services/Services'
import "./card.scss";

const Card = () => {
  const [auth, setAuth] = useAuth();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipCode] = useState("");

  const [open, setOpen] = useState(false);
  const { cart, setCart, addToCart, removeFromCart } = useCart();
  let navigate = useNavigate();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.product.price * item.product.quantity;
    }
    return totalPrice;
  };

  const handleClose = () => setOpen(false);

  const handlePlaceOrder = () => {
    const orderData = {
      user: {
        id: auth.user._id,
        username: auth.user.username,
        email: auth.user.email,
      }, 
      products: cart.map((item) => ({
        product: item.product._id,
        quantity: item.product.quantity,
      })),
      shippingDetails: {
        country,
        city,
        street,
        zipcode,
      },
      totalPrice: calculateTotalPrice(),
    };

    axios
      .post("http://localhost:5000/api/order/add-to-order", orderData)
      .then((response) => {
        console.log("Order placed successfully");
        toast.success("Order placed successfully");
        setCart([]);
      })
      .catch((error) => {
        console.error("Failed to place the order");
        toast.error("something went wrong");
      });
      handleClose();
      setCountry("");
      setCity("");
      setStreet("");
      setZipCode("");
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.product._id === productId) {
        return {
          ...item,
          product: {
            ...item.product,
            quantity: newQuantity,
          },
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.product._id === productId) {
        return {
          ...item,
          product: {
            ...item.product,
            quantity: item.product.quantity - 1,
          },
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.product._id === productId) {
        return {
          ...item,
          product: {
            ...item.product,
            quantity: item.product.quantity + 1,
          },
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.product.price * item.product.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: "15px",
    backgroundColor: " #fffaf5",
    color: "#2f4f4f",
    boxShadow: 24,
    p: 4,
    border: "none",
  };

  return (
    <>
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
                    <button>
                      <i
                        className="fa-solid fa-minus"
                        onClick={() => handleDecreaseQuantity(item.product._id)}
                      ></i>
                    </button>
                    <input
                      type="number"
                      value={item?.product.quantity}
                      max={10}
                      min="1"
                      step="1"
                      inputMode="numeric"
                      autoComplete="off"
                      onChange={(e)=> {
                        const newValue = parseInt(e.target.value, 10); 
                        if (!isNaN(newValue)) {
                        handleQuantityChange(item.product._id, newValue);
                      }
                      }}
                    />
                    <button
                      onClick={() => handleIncreaseQuantity(item.product._id)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div className="card-btn">
                    <button onClick={() => removeFromCart(item.product._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-page-right">
              <h3>Total: {totalPrice()}</h3>
              <button onClick={() => setOpen(true)}>Buy now</button>
            </div>
          </div>
        </div>
        <Services/>
      </Layout>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center", fontSize: "20px" }}
          >
            <form className="form-section" onSubmit={(e)=>{e.preventDefault();handlePlaceOrder()}}>
              <div className="form-container">
                <div
                  className="form-title"
                  style={{
                    textAlign: "center",
                    paddingBottom: "10px",
                    fontSize: "30px",
                  }}
                >
                  <h3>Shipping Details</h3>
                </div>

                <div className="form-group" style={{ paddingTop: "8px" }}>
                  <input
                    type="text"
                    placeholder="Contry / Region *"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      padding: "15px",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      color: "#2f4f4f",
                    }}
                  />
                </div>

                <div className="form-group" style={{ paddingTop: "8px" }}>
                  <input
                    type="text"
                    placeholder="Town / City *"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      padding: "15px",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      color: "#2f4f4f",
                    }}
                  />
                </div>

                <div className="form-group" style={{ paddingTop: "8px" }}>
                  <textarea
                    value={street}
                    placeholder="Street Address *"
                    onChange={(e) => setStreet(e.target.value)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      padding: "15px",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      color: "#2f4f4f",
                      height: "150px",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div className="form-group" >
                  <input
                    type="text"
                    placeholder="Zip Code *"
                    required
                    value={zipcode}
                    onChange={(e) => setZipCode(e.target.value)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      padding: "15px",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      background: "rgba(47, 79, 79, 0.2)",
                      borderRadius: "8px",
                      color: "#2f4f4f",
                    }}
                  />
                </div>
              </div>
            </form>
          </Typography>
          <div
            className="btns"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "20px",
            }}
          >
            <Button
              className="subbtn"
              onClick={handleClose}
              variant="text"
              style={{ background: "#2f4f4f", color: "#fffaf5" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="subbtn"
              variant="text"
              style={{ background: "#2f4f4f", color: "#fffaf5" }}
              onClick={(e)=>{e.preventDefault();handlePlaceOrder()}}
            >
              Place Order
            </Button>
          </div>
        </Box>
      </Modal>
      <Toaster position="bottom-right" />

    </>
  );
};

export default Card;
