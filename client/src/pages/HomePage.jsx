import React from 'react'
import Feature from '../components/Feature/Feature'
import Feedback from '../components/Feedback/Feedback'
import GivingBack from '../components/GivingBack/GivingBack'
import Services from '../components/Services/Services'
import IntroSection from '../components/IntroSection/IntroSection'
// import Card from '../components/Card/Card'

function HomePage() {
  return (
    <>
        {/* <IntroSection/> */}
        <Feedback/>
        <Feature/>
        <GivingBack/>
        {/* <Card/> */}
    </>
    
  )
}

export default HomePage