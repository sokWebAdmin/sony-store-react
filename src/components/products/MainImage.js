import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Navigation, Pagination } from 'swiper/core';

export default function MainImage({ imageUrls }) {
  SwiperCore.use([Navigation, Pagination, Controller]);

  const hasImgs = useMemo(() => imageUrls.length > 1, [imageUrls]);
  return (
    <div className="view_slider swiper-container">
      <Swiper
        className="swiper-wrapper"
        loop={ true }
        slidesPerView={ 1 }
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        }}
        observer={true}
        observeParents={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        >
        {
          imageUrls?.map((image, index) => (
            <SwiperSlide 
              key={index} 
              className="swiper-slide"
            >
              <img src={image} alt="상품 이미지" />
            </SwiperSlide>
          ))
        }
        {
          hasImgs && (
            <div className="arrow_btn">
              <a className="arrow swiper-button-prev"><img src="/images/common/arrow_19_34.png" alt="이전" /></a>
              <a className="arrow swiper-button-next"><img src="/images/common/arrow_19_34.png" alt="다음" /></a>
            </div>
          )
        }
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  ) 
}