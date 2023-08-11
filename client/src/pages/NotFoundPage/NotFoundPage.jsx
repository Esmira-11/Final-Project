import React from 'react'
import img from '../../assets/images/error.png'
import { useNavigate } from "react-router-dom";
import './notfoundpage.scss'
import Layout from '../../components/Layout'


function NotFoundPage() {

    let navigate = useNavigate();

    const gohome = () => {
      navigate('/')
    }
  
  return (
    <>
    <Layout>
        <div className="error">
            <div className="error-container">
                <div className="error-left">
                    <div className="error-left-container">
                        <h1>404</h1>
                        <p>Ooops, page not found</p>
                        <div className="go-home-btn">
                            <button onClick={gohome}>Go Home</button>
                        </div>
                    </div>
                </div>
                <div className="error-right">
                    <img src={img} alt="error-img" />
                </div>
            </div>
        </div>
    </Layout>
    </>
  )
}

export default NotFoundPage