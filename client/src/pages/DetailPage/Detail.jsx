import React from 'react'
import './detail.scss'
import img from '../../assets/images/shop-item.png'
function Detail() {
  return (
    <>
    <div className="detail-page">
        <div className="detail-page-container">
            <div className="detail-page-container-top">
                <div className="detail-left">
                    <img src={img} alt="shop item" />
                </div>

                <div className="detail-right">
                    <div className="shop-item-name">
                        <h1>Pet Modern Toy</h1>
                    </div>
                    <div className="shop-item-rate">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <div className="shop-item-price">
                        <h2>$800</h2>
                    </div>
                    <div className="shop-item-description">
                        <p>When you have a birdcage with wheels, any part of your house can be a home for your feathered friends!</p>
                    </div>
                    <div className="btns">
                        <div className="btns-left">
                            <button><i class="fa-solid fa-minus"></i></button>
                            <input type="number" value="1" max min="1" step="1" placeholder inputmode="numeric" autocomplete="off"/>
                            <button><i class="fa-solid fa-plus"></i></button>
                        </div>
                        {/* <div className="btns-center">
                            <select name="size" id="size">
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                            </select>
                        </div> */}
                        <div className="btns-right">
                            <a href="#"><i className="far fa-heart"></i></a>
                        </div>
                    </div>
                    <div className="submit">
                        <button>Add To Cart</button>
                    </div>
                </div>
            </div>
            <div className="detail-page-container-bottom">
                <div className="detail-page-container-bottom-title">
                    <h1>Customer Reviews 0 </h1>
                    <div className="write">
                        <h3>Write A Review</h3>
                    </div>
                </div>
                <div className="detail-page-container-bottom-main">
                    <div className="review">
                        <p>.........</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Detail