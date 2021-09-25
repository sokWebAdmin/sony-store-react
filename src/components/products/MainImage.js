import { Swiper, SwiperSlide } from 'swiper/react';

export default function MainImage({ imageUrls }) {
  console.log(imageUrls)
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
      {/*
        여러 색상일 경우.
        productView_colorType_fc5227_thumb_01 이미지 명 : colorType_ 와 _thumb 사이 값으로 교체. = fc5227
        .circle_color_box > .c_bg의 data-slide-img-type 값과 동일하게 적용.
      */}
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