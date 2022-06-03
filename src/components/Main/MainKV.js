import { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getLinkTarget } from 'utils/html';

const MainKV = ({
    size,
    mPointer,
    breakPoint,
    setMPointer,
    topSwiper,
    slidePcBanners,
    slideMoBanners,
    setTopSwiper,
}) => {
    const [mainBanners, setMainBanners] = useState([]);
    const isWiderThenBreakPoint = useMemo(
        () => size.width > breakPoint,
        [breakPoint, size.width],
    );

    useEffect(() => {
        setMainBanners(isWiderThenBreakPoint ? slidePcBanners : slideMoBanners);
    }, [isWiderThenBreakPoint, slidePcBanners, slideMoBanners]);

    const onMouseMoveHandler = (e) => {
        if (isWiderThenBreakPoint) {
            let halfWidth = size.width / 2;
            let activeClass = 'none';

            if (e.clientX < halfWidth) {
                activeClass = 'hover-prev';
            } else {
                activeClass = 'hover-next';
            }

            setMPointer(activeClass);
        }
    };

    const onMouseLeaveHandler = () => {
        if (isWiderThenBreakPoint) {
            setMPointer('none');
        }
    };

    const onClickHandler = () => {
        if (isWiderThenBreakPoint) {
            if (mPointer === 'hover-prev') {
                if (topSwiper) {
                    topSwiper.slidePrev();
                }
            } else if (mPointer === 'hover-next') {
                topSwiper.slideNext();
            }
        }
    };

    return (
        <div
            className={`kv swiper-container ${mPointer !== 'none' && mPointer}`}
            onMouseMove={onMouseMoveHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={onClickHandler}
        >
            <Swiper
                className='swiper-wrapper'
                onSwiper={setTopSwiper}
                resizeObserver={true}
                observer={true}
                loop={true}
                speed={600}
                autoplay={{
                    delay: 20000,
                    disableOnInteraction: true,
                }}
                pagination={{
                    el: '.swiper-pagination',
                    type: 'custom',
                    renderCustom: (swiper, current, total) => {
                        let _current = current;
                        let _total = total;
                        if (current < 10) _current = '0' + current;
                        if (total < 10) _total = '0' + total;

                        return (
                            "<span class='swiper-pagination-current'>No. " +
                            _current +
                            '</span>' +
                            "<span class='swiper-pagination-total'>" +
                            _total +
                            '</span>'
                        );
                    },
                }}
            >
                {mainBanners.map(({ banners, accountNo }) => (
                    <SwiperSlide
                        key={accountNo}
                        className='swiper-slide video-slide'
                        data-swiper-autoplay='10000'
                        style={{
                            backgroundImage: `url(${banners[0].imageUrl})`,
                        }}
                    >
                        <video
                            className='video-slide-player'
                            autoPlay
                            muted
                            playsInline
                            loop
                        >
                            <source
                                src={banners[0].videoUrl}
                                type='video/mp4'
                            />
                        </video>

                        <div className='kv__slide'>
                            <div
                                className='kv__head'
                                style={{
                                    color: banners[0].nameColor,
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: banners[0].nameList,
                                }}
                            />

                            <span className='kv__product'>
                                <span
                                    style={{
                                        color: banners[0].nameColor,
                                    }}
                                >
                                    {banners[0].description}
                                </span>
                            </span>
                            {banners[0].landingUrl !== '//' && (
                                <Link
                                    to={banners[0].landingUrl}
                                    target={getLinkTarget(
                                        banners[0].browerTargetType,
                                    )}
                                    className='kv__link'
                                    style={{
                                        color: banners[0].nameColor,
                                        padding: '30px 10px 30px 0',
                                    }}
                                >
                                    <span>자세히 보기</span>
                                </Link>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='swiper-pagination' />
        </div>
    );
};

MainKV.propTypes = {
    size: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }),
    breakPoint: PropTypes.number.isRequired,
    mPointer: PropTypes.oneOf(['none', 'hover-prev', 'hover-next']).isRequired,
    setMPointer: PropTypes.func.isRequired,
    topSwiper: PropTypes.object,
    setTopSwiper: PropTypes.func.isRequired,
    slidePcBanners: PropTypes.array.isRequired,
    slideMoBanners: PropTypes.array.isRequired,
};

export default memo(MainKV);
