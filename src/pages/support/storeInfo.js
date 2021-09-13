import { React, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//lib
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller  } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/support.scss';

import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

const MAP_CLIENT_ID = process.env.REACT_APP_MAP_CLIENT_ID || 'cvkvsq54we';

const COORDINATE = {
  lat: 37.52369,
  lng: 127.03901
};

function NaverMapAPI({isMapOpen}) {
  const navermaps = window.naver.maps;
  const storeMapStyle = {
    width: '100%',
    height: '90vh',
    background: '#ddd',
    display: isMapOpen ? 'block' : 'none',
  };
  return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'}
      style={storeMapStyle}
      defaultCenter={ COORDINATE }
      defaultZoom={13}
      zoom={13}
      scaleControl={false}
      logoControl={false}
      zoomControl={true}
      mapTypeControl={true}
      mapTypeControlOptions={{
        style: window.naver.maps.MapTypeControlStyle.BUTTON,
        position: window.naver.maps.Position.TOP_RIGHT,
      }}
    >
      <Marker 
        mapDivId={'maps-getting-started-uncontrolled'}
        key={1}
        position={new navermaps.LatLng(COORDINATE)}
        icon={{
          url: '../../images/support/naver_map_marker.svg',
          size: new navermaps.Size(50, 67)
        }}
      />
    </NaverMap>
  );
}

const storeImages = [
  {
    src:'../../images/event/img_store1.jpg',
    alt: '소니스토어 압구정점 내부 이미지 1'
  },
  {
    src:'../../images/event/img_store2.jpg',
    alt: '소니스토어 압구정점 내부 이미지 2'
  },
  {
    src:'../../images/event/img_store3.jpg',
    alt: '소니스토어 압구정점 내부 이미지 3'
  },
  {
    src:'../../images/event/img_store4.jpg',
    alt: '소니스토어 압구정점 내부 이미지 4'
  },
  {
    src:'../../images/event/img_store5.jpg',
    alt: '소니스토어 압구정점 내부 이미지 5'
  },
];

export default function StoreInfo() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  const onOpenMap = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <>
      <SEOHelmet title={'소니스토어 직영점'} />
      <div className="contents support">
        <div className="container full">
          <div className="content">
            <div className="store_info_wrap">
              <div className="store_info_wrap_slider swiper-container">
                <Swiper
                  className="swiper-wrapper"
                  loop={true}
                  slidesPerView={1}
                  spaceBetween={0}
                  autoplay={{ delay: 3000 }}
                >
                  {
                    storeImages.map(({ src, alt }, idx) => (
                      <SwiperSlide key={idx} className="swiper-slide">
                        <div className="bg_img">
                        <img
                          src={`${src}`}
                          alt={`${alt}`}
                        />
                        <span className="bg" />
                      </div>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
              <div className="store_info_wrap_txtbox">
                <strong className="info_txt">직영점 안내</strong>
                <h1 className="info_store_tit">소니스토어 압구정</h1>
                <p className="info_desc">
                  렌즈교환식 카메라, 디지털 카메라, 캠코더, 모바일, 이어폰,
                  헤드폰, MP3,
                  <span className="br">
                    블루투스 스피커, 기타 액세서리 등 소니의 전 제품 판매
                  </span>
                </p>
              </div>
              <div className="store_info_wrap_guidebox">
                <div className="guidebox_slider swiper-container">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="way_box">
              <div className="way_box_inner">
                <div className="way_box_addr">
                  <strong className="way_box_addr_tit">오시는 길</strong>
                  <p className="way_box_addr_txt">
                    서울특별시 강남구 선릉로 801{' '}
                    <span className="block">(신사동 배강빌딩)</span>
                  </p>
                  <button
                    type="button"
                    className="button button_secondary button-s map_open"
                    onClick={onOpenMap}
                  >
                    { isMapOpen ? '지도접기' : '지도보기' }
                  </button>
                </div>
                <div className="way_box_transp pc">
                  <ul className="route">
                    <li className="route_subway">
                      <strong className="route_tit">지하철</strong>
                      <p className="route_method">
                        <span className="color_subway1">7호선</span> 강남구청
                        3번 출구 / <span className="color_subway2">분당선</span>{' '}
                        압구정로데오역 5번 출구
                      </p>
                    </li>
                    <li className="route_bus">
                      <strong className="route_tit">버스</strong>
                      <p className="route_method">
                        <span className="color_bus1">간선</span> 145, 301, 472 /{' '}
                        <span className="color_bus2">지선</span> 4412, 3011
                      </p>
                    </li>
                    <li className="route_car">
                      <strong className="route_tit">승용차</strong>
                      <p className="route_method">
                        도산대로 학동사거리 배강빌딩 1층
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              {/* 지도 영역 */}
              {/* pc width: 100%;height:100%*/}
              {/* <div className="storeMap" style={storeMapStyle}> */}
                <RenderAfterNavermapsLoaded
                  ncpClientId={ MAP_CLIENT_ID }
                >
                  <NaverMapAPI isMapOpen={isMapOpen}/>
                </RenderAfterNavermapsLoaded>
              {/* </div> */}
              {/*// 지도 영역 */}
              <div className="way_box_transp mo">
                <ul className="route">
                  <li className="route_subway">
                    <strong className="route_tit">지하철</strong>
                    <p className="route_method">
                      <span className="color_subway1">7호선</span> 강남구청 3번
                      출구{' '}
                      <span className="br">
                        <span className="color_subway2">분당선</span>{' '}
                        압구정로데오역 5번 출구
                      </span>
                    </p>
                  </li>
                  <li className="route_bus">
                    <strong className="route_tit">버스</strong>
                    <p className="route_method">
                      <span className="color_bus1">간선</span> 145, 301, 472{' '}
                      <span className="br">
                        <span className="color_bus2">지선</span> 4412, 3011
                      </span>
                    </p>
                  </li>
                  <li className="route_car">
                    <strong className="route_tit">승용차</strong>
                    <p className="route_method">
                      도산대로 학동사거리{' '}
                      <span className="br">배강빌딩 1층</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
