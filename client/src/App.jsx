import { useState } from 'react'
import Header from './components/Header/Header'
import Feedback from './components/Feedback/Feedback'
import Feature from './components/Feature/Feature'
import GivingBack from './components/GivingBack/GivingBack'
// import IntroSection from './components/IntroSection/IntroSection'
import './App.css'

function App() {

  return (
    <>

      <Header/>
      {/* <IntroSection/> */}
      <Feedback/>
      <Feature/>
      <GivingBack/>
    </>
  )
}

export default App
