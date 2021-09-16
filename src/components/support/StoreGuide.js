//lib
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller  } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useWindowSize } from '../../utils/utils';

export default function StoreGuide() {
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
  const size = useWindowSize();
  return (
    <div className="store_info_wrap_guidebox">
      <div className="guidebox_slider swiper-container">
        {
          size.width < 1199 ? 
            <Swiper
              className="swiper-wrapper"
              slidesPerView="auto"
              freeMode={true}
              spaceBetween={0}
              observer={true}
              observeParents={true}
            >
              <SwiperSlide className="swiper-slide box">
                <span className="box_tit">매장 운영시간</span>
                <div className="box_time">
                  <em className="everyday">매일</em>
                  <span className="time">11:00 ~ 20:00</span>
                </div>
                <p className="box_desc">(설, 추석명절 휴무)</p>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide box tel">
                <span className="box_tit">매장 전화번호</span>
                <div className="box_time">
                  <span className="code">{ '02)' }</span>
                  <span className="time">515-7946</span>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide box">
                <span className="box_tit">고객센터 운영시간</span>
                <ul className="box_day">
                  <li className="weekday">
                    <span className="weekday_day">월-금요일</span>
                    <span className="weekday_time">11:00 ~ 20:00</span>
                  </li>
                  <li className="weekday">
                    <span className="weekday_day">토요일</span>
                    <span className="weekday_time">11:00 ~ 15:00</span>
                  </li>
                </ul>
                <p className="box_desc">(일요일, 공휴일 휴무)</p>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide box search">
                <a 
                  href="https://www.sony.co.kr/scs/handler/Service-AsCenter" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <i className="icon"></i>
                  <p className="box_desc">AS 센터 찾기</p>
                </a>
              </SwiperSlide>
            </Swiper>
          :
          <div className="swiper-wrapper">
            <div className="swiper-slide box">
              <span className="box_tit">매장 운영시간</span>
              <div className="box_time">
                <em className="everyday">매일</em>
                <span className="time">11:00 ~ 20:00</span>
              </div>
              <p className="box_desc">(설, 추석명절 휴무)</p>
            </div>
            <div className="swiper-slide box tel">
              <span className="box_tit">매장 전화번호</span>
              <div className="box_time">
                <span className="code">{ '02)' }</span>
                <span className="time">515-7946</span>
              </div>
            </div>
            <div className="swiper-slide box">
              <span className="box_tit">고객센터 운영시간</span>
              <ul className="box_day">
                <li className="weekday">
                  <span className="weekday_day">월-금요일</span>
                  <span className="weekday_time">11:00 ~ 20:00</span>
                </li>
                <li className="weekday">
                  <span className="weekday_day">토요일</span>
                  <span className="weekday_time">11:00 ~ 15:00</span>
                </li>
              </ul>
              <p className="box_desc">(일요일, 공휴일 휴무)</p>
            </div>
            <div className="swiper-slide box search">
              <a 
                  href="https://www.sony.co.kr/scs/handler/Service-AsCenter" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <i className="icon"></i>
                  <p className="box_desc">AS 센터 찾기</p>
                </a>
            </div>
          </div>
        }
      </div>
    </div>
  )
}