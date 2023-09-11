import React, { useEffect, useState } from 'react'
import Feature from '../components/Feature/Feature'
import Feedback from '../components/Feedback/Feedback'
import GivingBack from '../components/GivingBack/GivingBack'
import Services from '../components/Services/Services'
// import IntroSection from '../components/IntroSection/IntroSection'
import Layout from '../components/Layout'
import loadinggif from '../assets/images/loading.gif';


function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      <Layout>
      {isLoading ? (<><div
          className="loading-container"
          style={{ display: "flex", justifyContent: "center",paddingTop:'100px' }}
        >
          <img
            src={loadinggif}
            alt="Loading GIF"
            className="loading-gif"
            width={420}
          />
        </div></>) : (<>
        {/* <IntroSection/> */}
        <Feedback/>
        <Feature/>
        <GivingBack/></>)}
        
      </Layout>
    </>
    
  )
}

export default HomePage