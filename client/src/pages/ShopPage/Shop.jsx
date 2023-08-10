import React from 'react'
import ShopByPet from '../../components/ShopByPet/ShopByPet'
import './shop.scss'
import Filter from '../../components/FilterSection/Filter'

function Shop() {
  return (
    <div className="shop">
        <ShopByPet/>
        <Filter/>
    </div>
    
  )
}

export default Shop