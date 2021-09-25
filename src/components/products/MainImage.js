import { Swiper, SwiperSlide } from 'swiper/react';

export default function MainImage({ imageUrls }) {
  return (
    <div className="view_slider swiper-container">
      <Swiper
        className="swiper-wrapper"
        loop={ false }
        slidesPerView={ 1 }
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
          renderBullet(index, className) {
            return `<span className=${ className }>${ index + 1 }</span>`
          }
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
      </Swiper>
      {
        imageUrls.length > 1 && (
          <>
            <div className="arrow_btn">
              <a href="#none" className="arrow swiper-button-prev swiper-button-disabled"><img src="/images/common/arrow_19_34.png" alt="이전" /></a>
              <a href="#none" className="arrow swiper-button-next swiper-button-disabled"><img src="/images/common/arrow_19_34.png" alt="다음" /></a>
            </div>
            <div className="swiper-pagination" />
          </>
        )
      }
    </div>
  ) 
}