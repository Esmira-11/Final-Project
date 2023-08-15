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
import {Routes,Route} from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ForgotPassword from './pages/ForgotPasswordPage/forgotPassword'
import ChangePassword from './pages/ChangePasswordPage/ChangePassword'
import Announcement from './pages/AnnouncementPage/Announcement'
import Detail from './pages/DetailPage/Detail'
import Shop from './pages/ShopPage/Shop'
import Contact from './pages/ContactPage/Contact'
import Verify from './pages/VerifyPage/Verify'
import UserProfile from './pages/UserProfilePage/UserProfile'
import PrivateRoute from './routes/Private'

function App() {

  return (
    <>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/resetpassword' element={<ChangePassword/>}/>
            <Route path='/announsements' element={<Announcement/>}/>
            <Route path='/detail' element={<Detail/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/profile' element={<PrivateRoute/>}>
                <Route path='' element={<UserProfile/>}/>
            </Route>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/verify' element={<Verify/>}/>
          </Routes>
    </>
  )
}

export default App
