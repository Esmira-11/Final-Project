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
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ForgotPassword from './pages/ForgotPasswordPage/forgotPassword'
import ChangePassword from './pages/ChangePasswordPage/ChangePassword'


function App() {

  return (
    <>

      <BrowserRouter>
        {/* <Header /> */}
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/changepassword' element={<ChangePassword/>}/>


          </Routes>
        {/* <Footer /> */}
      </BrowserRouter>

      {/* <Header/> */}
      {/* <IntroSection/> */}
      {/* <Feedback/>
      <Feature/>
      <GivingBack/>
      <About/>
      <Team/>
      <Services/>
      <Footer/> */}
    </>
  )
}

export default App
