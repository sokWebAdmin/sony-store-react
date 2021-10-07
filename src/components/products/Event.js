import { useRef } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import { getStrDate } from '../../utils/dateFormat';
import SnsShare from './viewTopContent/SnsShare';

export default function Event({ events }) {
  SwiperCore.use([Navigation]);
  const history = useHistory();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="product_cont event_zone" style={{marginTop: '180px'}}>
      <div className="exhibitions_slider swiper-container item_list">
        <Swiper className="swiper-wrapper"
          slidesPerView={2}
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
          >
            {
              events?.map(({
                pcImageUrl,
                mobileimageUrl,
                tag,
                eventNo,
                label,
                url,
                startYmdt,
                endYmdt
              }) => (
                <SwiperSlide key={eventNo} className="swiper-slide item_row">
                  <div style={{width: '100%'}} className="event_item" key={eventNo} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      history.push(`/event/detail/${eventNo}`)
                    }}>
                      <Link to={`/event/detail${eventNo}`} className="item">
                        <div className="img" style={{ display: 'flex', justifyContent: 'center' }}><img src={pcImageUrl} alt={label} /></div>
                        <div className="event_desc">
                          <p className="tit">{label}</p>
                          <p className="event_duration">{getStrDate(startYmdt)} ~ {getStrDate(endYmdt)}</p>
                        </div>
                      </Link>
                      <SnsShare className={'event_share popup_comm_btn'} productName={eventNo} />
                    </div>
                  
                </SwiperSlide>
              ))
            }
            <div className="arrow_btn">
              <button className="arrow swiper-button-prev banner-prev" ref={prevRef}><img src="/images/common/arrow_19_34.png" alt="이전" /></button>
              <button className="arrow swiper-button-next banner-next" ref={nextRef}><img src="/images/common/arrow_19_34.png" alt="다음" /></button>
            </div>
        </Swiper>
      </div>
    </div>
  )
}