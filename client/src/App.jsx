import { useState } from 'react'
import Header from './components/Header/Header'
import Feedback from './components/Feedback/Feedback'
import Feature from './components/Feature/Feature'
import GivingBack from './components/GivingBack/GivingBack'
// import IntroSection from './components/IntroSection/IntroSection'
import './App.css'
import About from './components/About/About'
import Team from './components/Team/Team'
import Services from './components/Services/Services'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>

      <Header/>
      {/* <IntroSection/> */}
      <Feedback/>
      <Feature/>
      <GivingBack/>
      <About/>
      <Team/>
      <Services/>
      <Footer/>
    </>
  )
}

export default App
