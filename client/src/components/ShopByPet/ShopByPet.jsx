import React from 'react'
import bird from '../../assets/images/categ-bird.png'
import cat from '../../assets/images/categ-cat.png'
import dog from '../../assets/images/categ-dog.png'
import fish from '../../assets/images/categ-fish.png'
import small from '../../assets/images/categ-small.png'
import './shopbypet.scss'

function ShopByPet() {
  return (
    <>
    <div className="shop-by-pet">
        <div className="shop-by-pet-container">
            <div className="title">
                <h1>Shop</h1>
            </div>
            <div className="shop-categories">
                <div className="shop-category-item">
                    <div className="shop-category-item-top">
                        <img src={dog} alt="" />
                    </div>
                    <div className="shop-category-item-bottom">
                        <h3>Dogs</h3>
                    </div>
                </div>
                <div className="shop-category-item">
                    <div className="shop-category-item-top">
                        <img src={cat} alt="" />
                    </div>
                    <div className="shop-category-item-bottom">
                        <h3>Cats</h3>
                    </div>
                </div>
                <div className="shop-category-item">
                    <div className="shop-category-item-top">
                        <img src={fish} alt="" />
                    </div>
                    <div className="shop-category-item-bottom">
                        <h3>Fish</h3>
                    </div>
                </div>
                <div className="shop-category-item">
                    <div className="shop-category-item-top">
                        <img src={small} alt="" />
                    </div>
                    <div className="shop-category-item-bottom">
                        <h3>Small Pets</h3>
                    </div>
                </div>
                <div className="shop-category-item">
                    <div className="shop-category-item-top">
                        <img src={bird} alt="" />
                    </div>
                    <div className="shop-category-item-bottom">
                        <h3>Birds</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ShopByPet