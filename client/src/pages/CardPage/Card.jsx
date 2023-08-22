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
        card?.map(item => {total = total + item.price});
        return total.toLocaleString("en-US", {
            style: "currency",
            currency:"USD"
        });
    } catch (error) {
        console.log(error)
    }
  }

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

  return (
    <Layout>
      <div className="card-page">
        <div className="card-page-container">
          <h4>
            {card?.length
              ? `You Have ${card.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : "Your Cart Is Empty"}
          </h4>
          {/* {console.log(auth)} */}
          {/* {`Hello ${auth?.token && auth?.user?.username}`} */}
          <div className="card-page-left">
            {card?.map((item) => (
              <div className="card-box">
                <div className="card-box-left">
                  <img
                    src={`http://localhost:5000/api/product/product-photo/${item._id}`}
                    alt="shop-item"
                  />
                </div>
                <div className="card-box-right">
                    <div className="card-details">
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>Price: $ {item.price}</p>
                    </div>
                    <div className="card-btn">
                        <button onClick={()=>removeFromCart(item._id)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                    
                    
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
