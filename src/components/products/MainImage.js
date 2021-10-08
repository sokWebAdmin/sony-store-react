import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/core';

export default function MainImage({ imageUrls }) {
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  return (
    <div className="view_slider swiper-container">
      <Swiper
      onInit={(swiper) => {
        swiper.params.pagination.el = paginationRef.current;
        swiper.params.pagination.bullets = imageUrls.length;
        swiper.params.pagination.clickable = true;
        swiper.pagination.render();
        swiper.pagination.update();

        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      loop={true}
    >
      {
        imageUrls?.map((image, i) => <SwiperSlide className="swiper-slide" key={i}><img src={image} alt="상품이미지" /></SwiperSlide>)
      }
      <div className="arrow_btn">
        <button className="product_prev product_arrow" ref={prevRef}><img src="/images/common/arrow_19_34.png" alt="이전" /></button>
        <button className="product_next product_arrow" ref={nextRef}><img src="/images/common/arrow_19_34.png" alt="다음" /></button>
      </div>
      <div ref={paginationRef}></div>
    </Swiper>
    </div>
  ) 
}