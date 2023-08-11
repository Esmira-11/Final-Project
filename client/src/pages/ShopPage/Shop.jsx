import React from 'react'
import ShopByPet from '../../components/ShopByPet/ShopByPet'
import './shop.scss'
import Filter from '../../components/FilterSection/Filter'
import Layout from '../../components/Layout'

function Shop() {
  return (
    <Layout>
      <div className="shop">
          <ShopByPet/>
          <Filter/>
      </div>
    </Layout>
  )
}

export default Shop