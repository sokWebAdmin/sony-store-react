import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

import { breakPoint } from 'utils/constants';
import { getLinkTarget } from 'utils/html';

const MainRecommend = ({
    recommendedBanners,
    setRecLeftSwiper,
    setRecRightSwiper,
    recRightSwiper,
    recommendedSections,
}) => {
    return (
        <div className='recommend'>
            <div className='recommend__bg__swiper swiper-container'>
                {recommendedBanners.length > 0 && (
                    <Swiper
                        className='swiper-wrapper'
                        onSwiper={setRecLeftSwiper}
                        slidesPerView={1.000000001}
                        observer={true}
                        resizeObserver={true}
                        loop={true}
                        speed={600}
                        spaceBetween={0}
                    >
                        {recommendedBanners.map((recommendedBanner, index) => (
                            <SwiperSlide
                                key={index}
                                className='swiper-slide'
                                style={{
                                    backgroundImage: `url(${recommendedBanner?.banners[0]?.imageUrl})`,
                                }}
                            />
                        ))}
                    </Swiper>
                )}
            </div>
            <div className='recommend__swiper swiper-container'>
                {recommendedBanners.length > 0 && (
                    <Swiper
                        className='swiper-wrapper'
                        onSwiper={setRecRightSwiper}
                        scrollbar={{
                            el: '.rec-scrollbar',
                            draggable: false,
                        }}
                        on={{
                            init: (swiper) => {
                                swiper.update();
                            },
                            resize: (swiper) => {
                                swiper.update();
                            },
                            update: (swiper) => {},
                        }}
                        observer={true}
                        resizeObserver={true}
                        loop={true}
                        speed={600}
                        slidesPerView={1.5}
                        spaceBetween={157}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.5,
                                spaceBetween: 50,
                                allowTouchMove: true,
                            },
                            1281: {
                                slidesPerView: 1.5,
                                spaceBetween: 110,
                                allowTouchMove: false,
                            },
                        }}
                    >
                        {recommendedBanners.map((recommendedBanner, index) => (
                            <SwiperSlide
                                className='recommend__item swiper-slide'
                                key={index}
                            >
                                <Link
                                    to={`product-view/${recommendedSections[index]?.productNo}`}
                                    target={getLinkTarget(
                                        recommendedBanner?.banners[0]
                                            ?.browerTargetType,
                                    )}
                                    onClick={(e) => {
                                        if (window.innerWidth > breakPoint) {
                                            if (
                                                e.currentTarget.parentElement.classList.contains(
                                                    'swiper-slide-next',
                                                )
                                            ) {
                                                e.preventDefault();
                                                recRightSwiper.slideNext();
                                            }
                                        }
                                    }}
                                >
                                    <span
                                        className='recommend__item__copy'
                                        dangerouslySetInnerHTML={{
                                            __html: recommendedBanner.banners[0]
                                                .nameList,
                                        }}
                                        style={{
                                            color: recommendedBanner.banners[0]
                                                .nameColor,
                                        }}
                                    />
                                    <div
                                        className='recommend__item__pic'
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <img
                                            src={
                                                recommendedSections[index]
                                                    ?.listImageUrls[0]
                                            }
                                            alt={`"${recommendedBanner?.banners[0]?.name}"`}
                                        />
                                    </div>
                                    <span className='recommend__item__desc'>
                                        {
                                            recommendedSections[index]
                                                ?.productName
                                        }
                                    </span>
                                    <span className='recommend__item__name'>
                                        {
                                            recommendedSections[index]
                                                ?.productNameEn
                                        }
                                    </span>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                <div
                    className='swiper-scrollbar rec-scrollbar'
                    style={{ position: 'absolute' }}
                />
            </div>
        </div>
    );
};

MainRecommend.propTypes = {
    recommendedBanners: PropTypes.array.isRequired,
    setRecLeftSwiper: PropTypes.func.isRequired,
    setRecRightSwiper: PropTypes.func.isRequired,
    recRightSwiper: PropTypes.object.isRequired,
    recommendedSections: PropTypes.array.isRequired,
};

export default memo(MainRecommend);
