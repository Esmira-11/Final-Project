import React from 'react'
import requireimg from '../../assets/images/require.png'
import Layout from '../Layout'
import './require.scss'

function Require() {
  return (
    <>
    <Layout>
    <div className="require-container">
        <div className="require-container-top">
            <img src={requireimg} alt="img" />
        </div>
        <div className="require-container-bottom">  
            <p>Please login to view the page.</p>
            <p> Even if you don't have an account, feel free to register and continue</p>
        </div>
    </div>
    </Layout>
    </>
  )
}

export default Require