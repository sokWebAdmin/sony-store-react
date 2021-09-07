import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from "react-router-dom";

export default function Event() {
  return (
    <div className="product_cont full">
      {/* 기획전 이벤트 배너 */}
      {/* 기획전 슬라이드 */}
      <div className="exhibitions_slider swiper-container">
        <Swiper className="swiper-wrapper"
          navigation={{
            nextEl : '.banner-next',
            prevEl : '.banner-prev',
          }}>
          <SwiperSlide className="swiper-slide">
            <div className="exhibitions_box" style={{background: `url("/images/product/banner_thumb_01.png") no-repeat center top`}}>
              <img className="bg_img" src="/images/product/banner_thumb_01.png" alt="" />{/* 슬라이드 배경 */}
              <div className="txt_box">
                <span className="tag" style={{color: '#5865f5'}}>기획전1</span>
                <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
          <div className="exhibitions_box" style={{background: `url("/images/product/banner_thumb_01.png") no-repeat center top`}}>
              <img className="bg_img" src="/images/product/banner_thumb_01.png" alt="" />
              <div className="txt_box">
                <span className="tag" style={{color: '#5865f5'}}>기획전2</span>
                <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
          <div className="exhibitions_box" style={{background: `url("/images/product/banner_thumb_01.png") no-repeat center top`}}>
              <img className="bg_img" src="/images/product/banner_thumb_01.png" alt="" />
              <div className="txt_box">
                <span className="tag" style={{color: '#5865f5'}}>기획전3</span>
                <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="arrow_btn">
          <a className="arrow swiper-button-prev banner-prev"><img src="/images/common/arrow_19_34.png" alt="이전" /></a>
          <a className="arrow swiper-button-next banner-next"><img src="/images/common/arrow_19_34.png" alt="다음" /></a>
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  )
}