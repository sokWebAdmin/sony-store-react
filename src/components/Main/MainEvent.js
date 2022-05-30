import { Fragment, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import { breakPoint } from 'utils/constants';
import { wonComma } from 'utils/utils';
import { getLinkTarget } from 'utils/html';

const MainEvent = ({
    size,
    eventBgPcBanners,
    eventBgMoBanners,
    eventSections,
    eventBanners,
}) => {
    const banners = useMemo(
        () => (size.width > breakPoint ? eventBgPcBanners : eventBgMoBanners),
        [size, eventBgPcBanners, eventBgMoBanners],
    );
    const history = useHistory();

    const onEventClick = (url, target) => {
        if (target === 'CURRENT') {
            history.push(url);
        } else {
            window.open(url, '_blank');
        }
    };
    return (
        <div className='event'>
            <h2 className='event__title'>EVENT</h2>
            <div className='event__list'>
                {banners && (
                    <div
                        className='event__wrapper'
                        style={{
                            backgroundImage: `url(${banners?.banners[0]?.imageUrl})`,
                        }}
                        onClick={() =>
                            onEventClick(
                                banners?.banners[0]?.landingUrl,
                                banners?.banners[0]?.browerTargetType,
                            )
                        }
                    >
                        <div className='event__main__info'>
                            <div className='event__copy'>
                                <p className='event__copy__head'>
                                    {banners?.banners[0]?.name
                                        .split('/')
                                        .map((value, index) => (
                                            <Fragment key={index}>
                                                <span>{value}</span>
                                            </Fragment>
                                        ))}
                                </p>
                                <p className='event__copy__desc'>
                                    {banners?.banners[0]?.description
                                        .split('/')
                                        .map((value, index) => (
                                            <Fragment key={index}>
                                                <span
                                                    style={{
                                                        display: 'block',
                                                    }}
                                                >
                                                    {value}
                                                </span>
                                            </Fragment>
                                        ))}
                                </p>
                            </div>
                        </div>

                        <div className='event__main swiper-container'>
                            <button
                                type='button'
                                className='swiper-button-prev'
                            />
                            {eventSections?.products?.length > 0 && (
                                <Swiper
                                    className='swiper-wrapper'
                                    slidesPerView={1}
                                    observer={true}
                                    resizeObserver={true}
                                    loop={true}
                                    speed={600}
                                    autoplay={{ delay: 5000 }}
                                    navigation={{
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                    }}
                                >
                                    {eventSections?.products?.map(
                                        (eventSection, index) => (
                                            <SwiperSlide
                                                className='swiper-slide'
                                                key={index}
                                            >
                                                <Link
                                                    to={`product-view/${eventSection.productNo}`}
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            eventSection
                                                                ?.listImageUrls[0]
                                                        }
                                                        alt='상품이미지'
                                                    />
                                                </Link>
                                                <div className='event__main__inner'>
                                                    <div className='event__product'>
                                                        <span className='event__product__name'>
                                                            {
                                                                eventSection.productName
                                                            }
                                                        </span>
                                                        <span className='event__product__price'>
                                                            {wonComma(
                                                                eventSection.salePrice,
                                                            )}
                                                            원
                                                        </span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ),
                                    )}
                                </Swiper>
                            )}
                            <button
                                type='button'
                                className='swiper-button-next'
                            />
                        </div>
                    </div>
                )}

                <div className='event__sub swiper-container'>
                    {eventBanners.length > 0 && (
                        <Swiper
                            className='swiper-wrapper'
                            slidesPerView={3}
                            observer={true}
                            resizeObserver={true}
                            centeredSlides={false}
                            spaceBetween={24}
                            speed={600}
                            scrollbar={{
                                el: '.event-scrollbar',
                                draggable: false,
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1.2,
                                    spaceBetween: 15,
                                },
                                1281: {
                                    slidesPerView: 3,
                                    spaceBetween: 15,
                                },
                            }}
                        >
                            {eventBanners.map(({ banners }, index) => (
                                <SwiperSlide
                                    key={index}
                                    className='swiper-slide'
                                    style={{
                                        backgroundImage: `url("${banners[0]?.imageUrl}")`,
                                    }}
                                >
                                    <Link
                                        to={banners[0].landingUrl}
                                        target={getLinkTarget(
                                            banners[0].browerTargetType,
                                        )}
                                    >
                                        <div className='event__sub__inner'>
                                            <p className='event__copy__head'>
                                                {banners[0]?.name
                                                    ?.split('/')
                                                    ?.map(
                                                        (bannerName, index) => (
                                                            <span
                                                                key={index}
                                                                style={{
                                                                    color: banners[0]
                                                                        .nameColor,
                                                                }}
                                                            >
                                                                {bannerName}
                                                            </span>
                                                        ),
                                                    )}
                                            </p>
                                            <p className='event__copy__desc'>
                                                {banners[0]?.description}
                                            </p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                    <div
                        className='swiper-scrollbar event-scrollbar'
                        style={{ position: 'absolute' }}
                    />
                </div>
            </div>
            <Link to='event/list' className='btn__event__more'>
                더 보러 가기
            </Link>
        </div>
    );
};

MainEvent.propTypes = {
    eventBanners: PropTypes.array.isRequired,
    eventSections: PropTypes.object.isRequired,
    eventBgMoBanners: PropTypes.object.isRequired,
    eventBgPcBanners: PropTypes.object.isRequired,
    size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }),
};

export default memo(MainEvent);
