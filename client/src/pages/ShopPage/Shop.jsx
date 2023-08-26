import React from 'react'
import './shop.scss'
import Filter from '../../components/FilterSection/Filter'
import Layout from '../../components/Layout'

function Shop() {
  return (
    <Layout>
      <div className="shop">
          <Filter/>
      </div>
    </Layout>
  )
}

export default Shop