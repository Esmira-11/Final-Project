import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay} from 'swiper/modules';
import slider from '../../assets/images/slider-1.jpg'
import slider2 from '../../assets/images/slider-2.jpg'
// import slider3 from '../../assets/images/slider-3.jpg'
import slider4 from '../../assets/images/slider-4.jpg'
import './introsection.scss'

function IntroSection() {
  return (
    <div className="introsection">
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        }}
    
        modules={[Autoplay]}
        className="mySwiper"
        >
        <SwiperSlide><img src={slider} alt="photo" /></SwiperSlide>
        <SwiperSlide><img src={slider2} alt="photo" /></SwiperSlide>
        {/* <SwiperSlide><img src={slider3} alt="photo" /></SwiperSlide> */}
        <SwiperSlide><img src={slider4} alt="photo" /></SwiperSlide>
        
        </Swiper>
    </div>
    
  )
}


export default IntroSection