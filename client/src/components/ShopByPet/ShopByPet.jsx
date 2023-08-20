import React, { useEffect, useState } from 'react'
import axios from "axios";
// import bird from '../../assets/images/categ-bird.png'
// import cat from '../../assets/images/categ-cat.png'
// import dog from '../../assets/images/categ-dog.png'
// import fish from '../../assets/images/categ-fish.png'
// import small from '../../assets/images/categ-small.png'
import './shopbypet.scss'


function ShopByPet() {
    const [petCategories, setPetCategories] = useState([]);


    const getAllPetCategories = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/petcategory/all-petcategories"
          );
    
          if (response.status ==200) {
            setPetCategories(response.data.petCategory)
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getAllPetCategories();
      }, []);
  return (
    <>
    <div className="shop-by-pet">
        <div className="shop-by-pet-container">
            <div className="title">
                <h1>Shop By Category</h1>
            </div>
            <div className="shop-categories">
            {petCategories?.toReversed().map((item) => (
                <div className="shop-category-item">
                <div className="shop-category-item-top">
                    {/* <img src={dog} alt="" /> */}
                    <img src={`http://localhost:5000/api/petcategory/petcategory-photo/${item._id}`} alt="pet-category" />
                </div>
                <div className="shop-category-item-bottom">
                    <h3>{item.name}</h3>
                </div>
            </div>
            ))}
                {/* <div className="shop-category-item">
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
                </div> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default ShopByPet