import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import '../../assets/scss/recommend.scss';
import 'swiper/swiper.scss';
import { getStrDate } from '../../utils/dateFormat';
// import SnsShare from './viewTopContent/SnsShare';
import arrow from '../../assets/images/common/arrow_recommend.png';

export default function Event({ events }) {
  const history = useHistory();
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="product_cont exhibitions_zone">
      <p className="title">진행중인 기획전</p>
      <div className={"exhibitions_inner swiper-container " +(Array.from(events).length === 1 ? 'swiper_none' : 'item_list')}> 
        <Swiper 
          className="swiper-wrapper"
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          spaceBetween={10}
          on={{
              init: swiper => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.update();
              },
            }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            641: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1281: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
          >
            {
              events?.map(({ eventNo, pcImageUrl, mobileimageUrl, startYmdt, endYmdt, label, displayPeriodType }) => (
                <SwiperSlide className="swiper-slide" key={eventNo}>
                  <div className="slide_item" style={{width: '100%'}} onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    history.push(`/event/detail/${eventNo}`)
                  }}>
                    <Link to={`/event/detail/${eventNo}`} className="item">
                      <div className="img" style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={pcImageUrl} alt={label} />
                      </div>
                      <div className="event_desc">
                        <p className="tit">{label}</p>
                        <p className="event_duration">{
                          displayPeriodType === 'REGULAR' ?
                          `${getStrDate(startYmdt)} ~ 재고 소진 시` :
                          `${getStrDate(startYmdt)} ~ ${getStrDate(endYmdt)}`
                        }</p>
                      </div>
                    </Link>
                      {/* <SnsShare className={'event_share popup_comm_btn'} productName={eventNo} /> */}
                  </div>
                </SwiperSlide>
              ))
            }
            <div className="arrow_btn">
              <button className="arrow swiper-button-prev" ref={prevRef}><img src={arrow} alt="이전" /></button>
              <button className="arrow swiper-button-next" ref={nextRef}><img src={arrow} alt="다음" /></button>
            </div>
        </Swiper>
      </div>
    </div>
  )
}