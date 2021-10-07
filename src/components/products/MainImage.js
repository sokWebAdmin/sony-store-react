import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/core';

export default function MainImage({ imageUrls }) {
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const hasImgs = imageUrls.length > 1;
  return (
    <div className="view_slider swiper-container">
      <Swiper
        className="swiper-wrapper"
        slidesPerView={ 1 }
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        }}
        observer={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        on={{
              init: swiper => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.update();
              },
            }}
        >
        {
          imageUrls?.map((image, index) => (
            <SwiperSlide 
              key={`${image}${index}`} 
              className="swiper-slide"
            >
              <img src={image} alt="상품 이미지" />
            </SwiperSlide>
          ))
        }
        <div className="arrow_btn">
              <button className="arrow swiper-button-prev banner-prev" ref={prevRef}><img src="/images/common/arrow_19_34.png" alt="이전" /></button>
              <button className="arrow swiper-button-next banner-next" ref={nextRef}><img src="/images/common/arrow_19_34.png" alt="다음" /></button>
            </div>
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  ) 
}