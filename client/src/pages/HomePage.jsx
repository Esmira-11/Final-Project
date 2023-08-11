import React from 'react'
import Feature from '../components/Feature/Feature'
import Feedback from '../components/Feedback/Feedback'
import GivingBack from '../components/GivingBack/GivingBack'
import Services from '../components/Services/Services'
import IntroSection from '../components/IntroSection/IntroSection'
import Layout from '../components/Layout'

function HomePage() {
  return (
    <>
      <Layout>
        {/* <IntroSection/> */}
        <Feedback/>
        <Feature/>
        <GivingBack/>
      </Layout>
    </>
    
  )
}

export default HomePage