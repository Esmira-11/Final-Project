import React from "react";
import Layout from "../../components/Layout";
import { useCard } from "../../context/card";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./card.scss";

const Card = () => {
  const [auth, setAuth] = useAuth();
  const [card, setCard] = useCard();
  let navigate = useNavigate();

  
  const totalPrice = () => {
    try {
      let total = 0;
      card?.forEach(item => {
        total += item.price * item.quantity; // Multiply by quantity
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = (pid) => {
    try {
        let myCart = [...card]
        let index = myCart.findIndex(item => item._id === pid)
        myCart.splice(index, 1)
        setCard(myCart)
        localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
        console.log(error)
    }
   
  }

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCard = card.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCard(updatedCard);
    localStorage.setItem('cart', JSON.stringify(updatedCard));
  };

  return (
    <Layout>
      <div className="card-page">
        <div className="card-page-container">
          {/* {console.log(auth)} */}
          {/* {`Hello ${auth?.token && auth?.user?.username}`} */}
          <div className="card-page-left">
          <h4>
            {card?.length
              ? `You Have ${card.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : "Your Cart Is Empty"}
          </h4>
            {card?.map((item) => (
              <div className="card-box" key={item._id}>
                <div className="card-box-left">
                  <img
                    src={`http://localhost:5000/api/product/product-photo/${item._id}`}
                    alt="shop-item"
                  />
                </div>
                <div className="card-box-right">
                    <p className="name">{item.name}</p>
                    <p className="description">{item.description}</p>
                    <p className="price">Price: $ {item.price} </p>
                    
                </div>
                <div className="btns-center">
                    <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
                      <i className="fa-solid fa-minus" ></i>
                    </button>
                    <input
                     type="number"
                     value={item.quantity}
                     max
                     min="1"
                     step="1"
                     placeholder
                     inputmode="numeric"
                     autoComplete="off"
                    />
                    <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                <div className="card-btn">
                    <button onClick={()=>removeFromCart(item._id)}>Remove</button>
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
