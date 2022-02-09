import { React, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//lib
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
    Controller,
} from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/support.scss';

import { storeImages } from '../../const/support';
import LoadedNaverMap from '../../components/support/LoadedNaverMap';
import StoreGuide from '../../components/support/StoreGuide';

export default function StoreInfo() {
    const [isMapOpen, setIsMapOpen] = useState(false);

    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

    const onOpenMap = () => {
        setIsMapOpen(!isMapOpen);
    };

    return (
        <>
            <SEOHelmet title={'고객 서비스 : 직영점 안내'} />
            <div className='contents support'>
                <div className='container full'>
                    <div className='content'>
                        <div className='store_info_wrap'>
                            <div className='store_info_wrap_slider swiper-container'>
                                <Swiper
                                    className='swiper-wrapper'
                                    loop={true}
                                    slidesPerView={1}
                                    spaceBetween={0}
                                    autoplay={{ delay: 3000 }}
                                >
                                    {storeImages.map(({ src, alt }, idx) => (
                                        <SwiperSlide
                                            key={idx}
                                            className='swiper-slide'
                                        >
                                            <div className='bg_img'>
                                                <img
                                                    src={`${src}`}
                                                    alt={`${alt}`}
                                                />
                                                <span className='bg' />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className='store_info_wrap_txtbox'>
                                <strong className='info_txt'>
                                    직영점 안내
                                </strong>
                                <h1 className='info_store_tit'>
                                    소니스토어 압구정
                                </h1>
                                <p className='info_desc'>
                                    소니 전 제품을 직접 체험하고,
                                    <br />
                                    컨설팅도 받아 볼 수 있는 소니스토어 직영점을
                                    방문해 보세요!
                                </p>
                            </div>
                            <StoreGuide />
                        </div>
                        <div className='way_box'>
                            <div className='way_box_inner'>
                                <div className='way_box_addr'>
                                    <strong className='way_box_addr_tit'>
                                        오시는 길
                                    </strong>
                                    <p className='way_box_addr_txt'>
                                        서울특별시 강남구 선릉로 801{' '}
                                        <span className='block'>
                                            (신사동 배강빌딩)
                                        </span>
                                    </p>
                                    <button
                                        type='button'
                                        className='button button_secondary button-s map_open'
                                        onClick={onOpenMap}
                                        style={{ background: '#f2f2f2' }}
                                    >
                                        {isMapOpen ? '지도접기' : '지도보기'}
                                    </button>
                                </div>
                                <div className='way_box_transp pc'>
                                    <ul className='route'>
                                        <li className='route_subway'>
                                            <strong className='route_tit'>
                                                지하철
                                            </strong>
                                            <p className='route_method'>
                                                <span className='color_subway1'>
                                                    7호선
                                                </span>{' '}
                                                강남구청 3-1번 출구 /{' '}
                                                <span className='color_subway2'>
                                                    분당선
                                                </span>{' '}
                                                압구정로데오역 5번 출구
                                            </p>
                                        </li>
                                        <li className='route_bus'>
                                            <strong className='route_tit'>
                                                버스
                                            </strong>
                                            <p className='route_method'>
                                                <span className='color_bus1'>
                                                    간선
                                                </span>{' '}
                                                145, 301, 472 /{' '}
                                                <span className='color_bus2'>
                                                    지선
                                                </span>{' '}
                                                4412, 3011
                                            </p>
                                        </li>
                                        <li className='route_car'>
                                            <strong className='route_tit'>
                                                승용차
                                            </strong>
                                            <p className='route_method'>
                                                도산대로 학동사거리 배강빌딩 1층
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {isMapOpen && <LoadedNaverMap />}
                            <div className='way_box_transp mo'>
                                <ul className='route'>
                                    <li className='route_subway'>
                                        <strong className='route_tit'>
                                            지하철
                                        </strong>
                                        <p className='route_method'>
                                            <span className='color_subway1'>
                                                7호선
                                            </span>{' '}
                                            강남구청 3-1번 출구{' '}
                                            <span className='br'>
                                                <span className='color_subway2'>
                                                    분당선
                                                </span>{' '}
                                                압구정로데오역 5번 출구
                                            </span>
                                        </p>
                                    </li>
                                    <li className='route_bus'>
                                        <strong className='route_tit'>
                                            버스
                                        </strong>
                                        <p className='route_method'>
                                            <span className='color_bus1'>
                                                간선
                                            </span>{' '}
                                            145, 301, 472{' '}
                                            <span className='br'>
                                                <span className='color_bus2'>
                                                    지선
                                                </span>{' '}
                                                4412, 3011
                                            </span>
                                        </p>
                                    </li>
                                    <li className='route_car'>
                                        <strong className='route_tit'>
                                            승용차
                                        </strong>
                                        <p className='route_method'>
                                            도산대로 학동사거리{' '}
                                            <span className='br'>
                                                배강빌딩 1층
                                            </span>
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
