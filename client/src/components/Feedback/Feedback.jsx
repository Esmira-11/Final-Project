import React from "react";
import img from "../../assets/images/feedback-image.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import avatar1 from "../../assets/images/avatar-1.png";
import avatar2 from "../../assets/images/avatar-2.png";
import avatar3 from "../../assets/images/avatar-3.png";
import avatar4 from "../../assets/images/avatar-4.png";
import "./feedback.scss";

function Feedback() {
  return (
    <div className="feedback">
      <div className="feedback-left">
        <img src={img} alt="img" />
      </div>
      <div className="feedback-right">
        <div className="feedback-right-top">
          <h3>Customer Feedback</h3>
        </div>
        <div className="feedback-right-center">
          <h2>
            What Our Satisfied <span>Client Says</span>
          </h2>
        </div>
        <div className="feedback-right-bottom">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="slider-box">
                <div className="slider-box-top">
                  <p>
                    When an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. only five
                    centuries, but also the leap.
                  </p>
                </div>
                <div className="slider-box-bottom">
                  <div className="slider-box-avatar">
                    <img src={avatar3} alt="avatar1" />
                  </div>
                  <div className="slider-box-costumer">
                    <p>Monica Penelope</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-box">
                <div className="slider-box-top">
                  <p>
                    When an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. only five
                    centuries, but also the leap.
                  </p>
                </div>
                <div className="slider-box-bottom">
                  <div className="slider-box-avatar">
                    <img src={avatar1} alt="avatar1" />
                  </div>
                  <div className="slider-box-costumer">
                    <p>Silverster Scott</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-box">
                <div className="slider-box-top">
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution. The point of using Lorem
                    Ipsum is that it has a more-or-less normal.
                  </p>
                </div>
                <div className="slider-box-bottom">
                  <div className="slider-box-avatar">
                    <img src={avatar2} alt="avatar1" />
                  </div>
                  <div className="slider-box-costumer">
                    <p>lia Jhon</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-box">
                <div className="slider-box-top">
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution.
                  </p>
                </div>
                <div className="slider-box-bottom">
                  <div className="slider-box-avatar">
                    <img src={avatar4} alt="avatar1" />
                  </div>
                  <div className="slider-box-costumer">
                    <p>Silverster Scott</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
