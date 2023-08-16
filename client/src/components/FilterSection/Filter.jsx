import React from 'react'
import './filter.scss'
import Card from '../Card/Card'

function Filter() {
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
                        <div className="category">
                            <a href="#">Food</a>
                        </div>
                        <div className="category">
                            <a href="#">Toys</a>
                        </div>
                        <div className="category">
                            <a href="#">Beds</a>
                        </div>
                        <div className="category">
                            <a href="#">Accessories</a>
                        </div>
                        <div className="category">
                            <a href="#">Health and Wellness</a>
                        </div>
                        <div className="category">
                            <a href="#">Grooming Supplies</a>
                        </div>
                    </div>
                </div>

                <div className="size-bar">
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
                </div>

                <div className="price-bar">
                    <div className="price-bar-title">
                        <h2>Price Range</h2>
                    </div>
                    <div className="price-bar-content">
                        <div className="price">
                            <a href="#">0$ - 50$</a>
                        </div>
                        <div className="price">
                            <a href="#">0$ - 50$</a>
                        </div>
                        <div className="price">
                            <a href="#">0$ - 50$</a>
                        </div>
                        <div className="price">
                            <a href="#">0$ - 50$</a>
                        </div>
                    </div>
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
                    <Card/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Filter