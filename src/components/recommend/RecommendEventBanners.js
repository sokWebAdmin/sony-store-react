import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
} from 'swiper/core';

import { splitStr } from 'utils/html';
import { formatDate } from 'utils/dateFormat';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import arrow from 'assets/images/common/arrow_recommend.png';

const RecommendEventBanners = ({ eventBanners }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

    return (
        <div className='exhibitions_zone'>
            <p className='title'>진행중인 기획전</p>
            <div className='exhibitions_inner swiper-container swiper_none'>
                <Swiper
                    className='swiper-wrapper'
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    observer={true}
                    resizeObserver={true}
                    slidesPerView={2}
                    spaceBetween={24}
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
                    {eventBanners.map(({ accountNo, banners }) => (
                        <SwiperSlide className='swiper-slide' key={accountNo}>
                            <div className='slide_item'>
                                <Link
                                    to={banners[0].landingUrl}
                                    className='item'
                                >
                                    <div className='img'>
                                        <img
                                            src={banners[0].imageUrl}
                                            alt={banners[0].name}
                                        />
                                    </div>
                                    <div className='event_desc'>
                                        <p
                                            className='tit'
                                            dangerouslySetInnerHTML={{
                                                __html: splitStr(
                                                    banners[0].name,
                                                ),
                                            }}
                                        />
                                        <p className='event_duration'>
                                            {`${formatDate(
                                                banners[0].displayStartYmdt,
                                            )} ~ ${
                                                banners[0].displayPeriodType ===
                                                'PERIOD'
                                                    ? formatDate(
                                                          banners[0]
                                                              .displayEndYmdt,
                                                      )
                                                    : '재고 소진 시'
                                            }`}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='arrow_btn'>
                    <button className='arrow swiper-button-prev'>
                        <img src={arrow} alt='이전' />
                    </button>
                    <button className='arrow swiper-button-next'>
                        <img src={arrow} alt='다음' />
                    </button>
                </div>
            </div>
        </div>
    );
};

RecommendEventBanners.propTypes = {
    eventBanners: PropTypes.array.isRequired,
};

export default memo(RecommendEventBanners);
