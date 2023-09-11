import React, { useEffect, useState } from 'react'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import Layout from '../components/Layout'
import loadinggif from '../assets/images/loading.gif';

function AboutPage() {
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
        <About/>
      <Services/>
      </>)}
        
      </Layout>
    </>
    
  )
}

export default AboutPage