import { useState } from 'react';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
    Controller,
} from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import SEO from 'components/SEO';
import LoadedNaverMap from 'components/support/LoadedNaverMap';
import StoreGuide from 'components/support/StoreGuide';
import { storeInfo } from 'const/seo';
import { storeImages } from 'const/support';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import 'assets/scss/contents.scss';
import 'assets/scss/support.scss';

export default function StoreInfo() {
    const [isMapOpen, setIsMapOpen] = useState(false);

    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

    const onOpenMap = () => setIsMapOpen(!isMapOpen);

    return (
        <>
            <SEO data={storeInfo} />

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
                                    ????????? ??????
                                </strong>
                                <h1 className='info_store_tit'>
                                    ??????????????? ?????????
                                </h1>
                                <p className='info_desc'>
                                    ?????? ??? ????????? ?????? ????????????,
                                    <br />
                                    ???????????? ?????? ??? ??? ?????? ??????????????? ????????????
                                    ????????? ?????????!
                                </p>
                            </div>
                            <StoreGuide />
                        </div>
                        <div className='way_box'>
                            <div className='way_box_inner'>
                                <div className='way_box_addr'>
                                    <strong className='way_box_addr_tit'>
                                        ????????? ???
                                    </strong>
                                    <p className='way_box_addr_txt'>
                                        ??????????????? ????????? ????????? 801{' '}
                                        <span className='block'>
                                            (????????? ????????????)
                                        </span>
                                    </p>
                                    <button
                                        type='button'
                                        className='button button_secondary button-s map_open'
                                        onClick={onOpenMap}
                                        style={{ background: '#f2f2f2' }}
                                    >
                                        {isMapOpen ? '????????????' : '????????????'}
                                    </button>
                                </div>
                                <div className='way_box_transp pc'>
                                    <ul className='route'>
                                        <li className='route_subway'>
                                            <strong className='route_tit'>
                                                ?????????
                                            </strong>
                                            <p className='route_method'>
                                                <span className='color_subway1'>
                                                    7??????
                                                </span>{' '}
                                                ???????????? 3-1??? ?????? /{' '}
                                                <span className='color_subway2'>
                                                    ?????????
                                                </span>{' '}
                                                ????????????????????? 5??? ??????
                                            </p>
                                        </li>
                                        <li className='route_bus'>
                                            <strong className='route_tit'>
                                                ??????
                                            </strong>
                                            <p className='route_method'>
                                                <span className='color_bus1'>
                                                    ??????
                                                </span>{' '}
                                                145, 301, 472 /{' '}
                                                <span className='color_bus2'>
                                                    ??????
                                                </span>{' '}
                                                4412, 3011
                                            </p>
                                        </li>
                                        <li className='route_car'>
                                            <strong className='route_tit'>
                                                ?????????
                                            </strong>
                                            <p className='route_method'>
                                                ???????????? ??????????????? ???????????? 1???
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
                                            ?????????
                                        </strong>
                                        <p className='route_method'>
                                            <span className='color_subway1'>
                                                7??????
                                            </span>{' '}
                                            ???????????? 3-1??? ??????{' '}
                                            <span className='br'>
                                                <span className='color_subway2'>
                                                    ?????????
                                                </span>{' '}
                                                ????????????????????? 5??? ??????
                                            </span>
                                        </p>
                                    </li>
                                    <li className='route_bus'>
                                        <strong className='route_tit'>
                                            ??????
                                        </strong>
                                        <p className='route_method'>
                                            <span className='color_bus1'>
                                                ??????
                                            </span>{' '}
                                            145, 301, 472{' '}
                                            <span className='br'>
                                                <span className='color_bus2'>
                                                    ??????
                                                </span>{' '}
                                                4412, 3011
                                            </span>
                                        </p>
                                    </li>
                                    <li className='route_car'>
                                        <strong className='route_tit'>
                                            ?????????
                                        </strong>
                                        <p className='route_method'>
                                            ???????????? ???????????????{' '}
                                            <span className='br'>
                                                ???????????? 1???
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
