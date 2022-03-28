import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
    Controller,
} from 'swiper/core';

import SEO from 'components/SEO';
import Alert from 'components/common/Alert';
import { useWindowSize, wonComma } from 'utils/utils';
import { breakPoint } from 'utils/constants';
import { main } from 'const/seo';
import { getDisplaySectionsSectionNo, loadBanner } from 'api/display';
import { useAlert } from 'hooks';
import useScript from 'hooks/useScript';
import { bannerCode } from 'bannerCode';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import 'assets/scss/main.scss';

export default function Main() {
    useScript('//image.sony.co.kr/omniture/omni_dev/sonystore_code_2013.js');

    const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();

    const size = useWindowSize();
    //1. 슬라이드 배너 pc : 000
    const [slidePcBanners, setSlidePcBanners] = useState([]);
    //2. 슬라이드 배너 mo : 001
    const [slideMoBanners, setSlideMoBanners] = useState([]);

    //3. 추천제품 : 002
    const [recommendedBanners, setRecommendedBanners] = useState([]);

    //4. 이벤트 : 003
    const [eventBanners, setEventBanners] = useState([]);
    const [eventBgPcBanners, setEventBgPcBanners] = useState([]);
    const [eventBgMoBanners, setEventBgMoBanners] = useState([]);

    //5. 아카데미 pc : 004
    const [academyPcBanners, setAcademyPcBanners] = useState({});

    //6. 아카데미 mo : 005
    const [academyMoBanners, setAcademyMoBanners] = useState({});

    //6. 추천제품 상품섹션
    const [recommendedSections, setRecommendedSections] = useState([]);

    const [eventSections, setEventSections] = useState([]);

    const getRecommendedBannerNames = (bannerInfoList) => {
        bannerInfoList.forEach((bannerInfo) => {
            const bannerNameList = bannerInfo.banners[0].name.split('/');
            bannerInfo.banners[0].nameList = bannerNameList.reduce(
                (acc, bannerName, index) => {
                    if (bannerNameList.length - 1 === index) {
                        acc += `${bannerName}`;
                    } else {
                        acc += `${bannerName}<br />`;
                    }
                    return acc;
                },
                '',
            );
        });
    };

    const getSlideBannerNames = (bannerInfoList) => {
        bannerInfoList.forEach((bannerInfo) => {
            let bannerNameList = bannerInfo.banners[0].name.split('/');
            bannerNameList = bannerNameList.map((name) => name.split(' '));
            let count = 0;
            bannerInfo.banners[0].nameList = bannerNameList.reduce(
                (acc, bannerName) => {
                    const nameHtml = bannerName.reduce((acc, name) => {
                        acc += `<span class="copy-${count}"><span>${name}</span></span>`;
                        count++;
                        return acc;
                    }, '');
                    acc += `<div class="kv__head__copy">${nameHtml}</div>`;
                    return acc;
                },
                '',
            );
        });
    };

    const getAcademyBannerNames = (bannerInfoList) => {
        if (Object.keys(bannerInfoList).length === 0) return;
        const bannerNames = bannerInfoList.banners[0].name.split('/');
        bannerInfoList.banners[0].nameList = bannerNames.reduce(
            (acc, bannerName, index) => {
                const { length } = bannerNames;
                acc +=
                    index - 1 === length ? bannerName : bannerName + '<br />';
                return acc;
            },
            '',
        );
    };

    //1. 배너 노출 api
    const getBanners = useCallback(async () => {
        try {
            const {
                kvPc,
                kvMo,
                recommend,
                eventMain,
                eventBgPc,
                eventBgMo,
                academyMo,
                academyPc,
            } = bannerCode.main;
            const { data } = await loadBanner(
                `${kvPc},${kvMo},${recommend},${eventMain},${academyPc},${academyMo},${eventBgPc},${eventBgMo}`,
            );

            const moBanners =
                data.find(({ code }) => code === kvMo)?.accounts || [];
            getSlideBannerNames(moBanners);
            setSlideMoBanners(moBanners);
            const eventBanners =
                data.find(({ code }) => code === eventMain)?.accounts || [];
            setEventBanners(eventBanners);
            const academyPcBanners =
                data.find(({ code }) => code === academyPc)?.accounts[0] || {};
            getAcademyBannerNames(academyPcBanners);
            setAcademyPcBanners(academyPcBanners);
            const academyMoBanners =
                data.find(({ code }) => code === academyMo)?.accounts[0] || {};
            getAcademyBannerNames(academyMoBanners);
            setAcademyMoBanners(academyMoBanners);

            const slidePcBanners =
                data.find(({ code }) => code === kvPc)?.accounts || [];
            getSlideBannerNames(slidePcBanners);
            setSlidePcBanners(slidePcBanners);
            const recommendedBanners =
                data.find(({ code }) => code === recommend)?.accounts || [];
            getRecommendedBannerNames(recommendedBanners);
            setRecommendedBanners(recommendedBanners);

            const eventBgPcBanners =
                data.find(({ code }) => code === eventBgPc)?.accounts[0] || [];
            setEventBgPcBanners(eventBgPcBanners);
            const eventBgMoBanners =
                data.find(({ code }) => code === eventBgMo)?.accounts[0] || [];
            setEventBgMoBanners(eventBgMoBanners);
        } catch (e) {
            console.error(e);
        }
    }, []);

    //2. 섹션 조회
    const getSections = useCallback(async () => {
        // 5742: 추천상품 5833:이벤트
        const { recommend, event } = bannerCode.product;

        try {
            const params = {
                by: 'ADMIN_SETTING',
                soldout: true,
                pageNumber: 1,
                pageSize: 30,
            };
            const recommendedRequest = {
                pathParams: {
                    sectionNo: recommend,
                },
                params,
            };
            const eventRequest = {
                pathParams: {
                    sectionNo: event,
                },
                params,
            };
            const { data } = await getDisplaySectionsSectionNo(
                recommendedRequest,
            );

            setRecommendedSections(data[0].products);
            const eventResponse = await getDisplaySectionsSectionNo(
                eventRequest,
            );
            setEventSections(eventResponse.data[0]);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        getBanners();
        getSections();
    }, [getBanners, getSections]);

    //top
    const [topSwiper, setTopSwiper] = useState(null);
    const [mPointer, setMPointer] = useState('none');

    //recommend
    const [recLeftSwiper, setRecLeftSwiper] = useState(null);
    const [recRightSwiper, setRecRightSwiper] = useState(null);

    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

    //swiper 제어권 할당 및 클릭이벤트 (추천영역)
    useEffect(() => {
        if (
            recLeftSwiper &&
            recRightSwiper &&
            recLeftSwiper.controller &&
            recRightSwiper.controller
        ) {
            recLeftSwiper.controller.control = recRightSwiper;
            recRightSwiper.controller.control = recLeftSwiper;
        }
    }, [recRightSwiper, recLeftSwiper]);

    const onClickServiceCenter = () => {
        openAlert(
            '고객님께서 원하시는 제품을<br />빠르고 정확하게 구매하실 수 있도록<br />도와드리겠습니다.<br/>고객지원센터: 1588-0911',
        );
    };

    return (
        <>
            <SEO data={main} />

            <div className='main'>
                <div id='container' className='container'>
                    <div className='content main'>
                        {/* <!-- key visual --> */}
                        <div
                            className={`kv swiper-container ${
                                mPointer !== 'none' && mPointer
                            }`}
                            onMouseMove={(e) => {
                                if (size.width > breakPoint) {
                                    let halfWidth = size.width / 2;
                                    let activeClass = 'none';

                                    if (e.clientX < halfWidth) {
                                        activeClass = 'hover-prev';
                                    } else {
                                        activeClass = 'hover-next';
                                    }

                                    setMPointer(activeClass);
                                }
                            }}
                            onMouseLeave={() => {
                                if (size.width > breakPoint) {
                                    setMPointer('none');
                                }
                            }}
                            onClick={() => {
                                if (size.width > breakPoint) {
                                    if (mPointer === 'hover-prev') {
                                        if (topSwiper) {
                                            topSwiper.slidePrev();
                                        }
                                    } else if (mPointer === 'hover-next') {
                                        topSwiper.slideNext();
                                    }
                                }
                            }}
                        >
                            {slidePcBanners.length > 0 &&
                                slideMoBanners.length > 0 && (
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
                                            renderCustom: (
                                                swiper,
                                                current,
                                                total,
                                            ) => {
                                                let _current = current;
                                                let _total = total;
                                                if (current < 10)
                                                    _current = '0' + current;
                                                if (total < 10)
                                                    _total = '0' + total;

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
                                        {slidePcBanners.map(
                                            (bannerInfo, index) => (
                                                <SwiperSlide
                                                    key={index}
                                                    className='swiper-slide video-slide'
                                                    data-swiper-autoplay='10000'
                                                    style={{
                                                        backgroundImage:
                                                            size.width >
                                                            breakPoint
                                                                ? bannerInfo
                                                                      .banners[0]
                                                                      .videoUrl ===
                                                                      '' &&
                                                                  `url(${bannerInfo.banners[0].imageUrl})`
                                                                : slideMoBanners[
                                                                      index
                                                                  ].banners[0]
                                                                      .videoUrl ===
                                                                      '' &&
                                                                  `url(${slideMoBanners[index]?.banners[0]?.imageUrl})`,
                                                    }}
                                                >
                                                    {size.width > breakPoint
                                                        ? bannerInfo.banners[0]
                                                              .videoUrl !==
                                                              '' && (
                                                              <video
                                                                  className='video-slide-player'
                                                                  autoPlay
                                                                  muted
                                                                  playsInline
                                                                  loop
                                                              >
                                                                  <source
                                                                      src={
                                                                          bannerInfo
                                                                              .banners[0]
                                                                              .videoUrl
                                                                      }
                                                                      type='video/mp4'
                                                                  />
                                                              </video>
                                                          )
                                                        : slideMoBanners[index]
                                                              .banners[0]
                                                              .videoUrl !==
                                                              '' && (
                                                              <video
                                                                  className='video-slide-player'
                                                                  autoPlay
                                                                  muted
                                                                  playsInline
                                                                  loop
                                                              >
                                                                  <source
                                                                      src={
                                                                          slideMoBanners[
                                                                              index
                                                                          ]
                                                                              .banners[0]
                                                                              .videoUrl
                                                                      }
                                                                      type='video/mp4'
                                                                  />
                                                              </video>
                                                          )}
                                                    <div className='kv__slide'>
                                                        {size.width >
                                                        breakPoint ? (
                                                            <div
                                                                className='kv__head'
                                                                dangerouslySetInnerHTML={{
                                                                    __html: bannerInfo
                                                                        .banners[0]
                                                                        .nameList,
                                                                }}
                                                            />
                                                        ) : (
                                                            <div
                                                                className='kv__head'
                                                                dangerouslySetInnerHTML={{
                                                                    __html: slideMoBanners[
                                                                        index
                                                                    ].banners[0]
                                                                        .nameList,
                                                                }}
                                                            />
                                                        )}

                                                        <span className='kv__product'>
                                                            <span>
                                                                {size.width >
                                                                breakPoint
                                                                    ? bannerInfo
                                                                          .banners[0]
                                                                          .description
                                                                    : slideMoBanners[
                                                                          index
                                                                      ]
                                                                          .banners[0]
                                                                          .description}
                                                            </span>
                                                        </span>
                                                        {size.width > breakPoint
                                                            ? bannerInfo
                                                                  ?.banners[0]
                                                                  ?.landingUrl !==
                                                                  '//' && (
                                                                  <Link
                                                                      to={
                                                                          bannerInfo
                                                                              ?.banners[0]
                                                                              ?.landingUrl
                                                                      }
                                                                      target={
                                                                          bannerInfo
                                                                              ?.banners[0]
                                                                              .browerTargetType ===
                                                                          'CURRENT'
                                                                              ? '_self'
                                                                              : '_blank'
                                                                      }
                                                                      className='kv__link'
                                                                      style={{
                                                                          padding:
                                                                              '30px 10px 30px 0',
                                                                      }}
                                                                  >
                                                                      <span>
                                                                          자세히
                                                                          보기
                                                                      </span>
                                                                  </Link>
                                                              )
                                                            : slideMoBanners[
                                                                  index
                                                              ]?.banners[0]
                                                                  ?.landingUrl !==
                                                                  '//' && (
                                                                  <Link
                                                                      to={
                                                                          slideMoBanners[
                                                                              index
                                                                          ]
                                                                              .banners[0]
                                                                              ?.landingUrl
                                                                      }
                                                                      target={
                                                                          slideMoBanners[
                                                                              index
                                                                          ]
                                                                              .banners[0]
                                                                              .browerTargetType ===
                                                                          'CURRENT'
                                                                              ? '_self'
                                                                              : '_blank'
                                                                      }
                                                                      className='kv__link'
                                                                      style={{
                                                                          padding:
                                                                              '30px 10px 30px 0',
                                                                      }}
                                                                  >
                                                                      <span>
                                                                          자세히
                                                                          보기
                                                                      </span>
                                                                  </Link>
                                                              )}
                                                    </div>
                                                </SwiperSlide>
                                            ),
                                        )}
                                    </Swiper>
                                )}
                            <div className='swiper-pagination' />
                        </div>
                        {/* <!-- // key visual --> */}

                        {/* <!-- recommended --> */}
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
                                        {recommendedBanners.map(
                                            (recommendedBanner, index) => (
                                                <SwiperSlide
                                                    key={index}
                                                    className='swiper-slide'
                                                    style={{
                                                        backgroundImage: `url(${recommendedBanner?.banners[0]?.imageUrl})`,
                                                    }}
                                                />
                                            ),
                                        )}
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
                                        {recommendedBanners.map(
                                            (recommendedBanner, index) => (
                                                <SwiperSlide
                                                    className='recommend__item swiper-slide'
                                                    key={index}
                                                >
                                                    <Link
                                                        to={`product-view/${recommendedSections[index]?.productNo}`}
                                                        target={
                                                            recommendedBanner
                                                                ?.banners[0]
                                                                ?.browerTargetType ===
                                                            'CURRENT'
                                                                ? '_self'
                                                                : '_blank'
                                                        }
                                                        onClick={(e) => {
                                                            if (
                                                                window.innerWidth >
                                                                breakPoint
                                                            ) {
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
                                                                __html: recommendedBanner
                                                                    .banners[0]
                                                                    .nameList,
                                                            }}
                                                        />
                                                        <div
                                                            className='recommend__item__pic'
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    recommendedSections[
                                                                        index
                                                                    ]
                                                                        ?.listImageUrls[0]
                                                                }
                                                                alt={`"${recommendedBanner?.banners[0]?.name}"`}
                                                            />
                                                        </div>
                                                        <span className='recommend__item__desc'>
                                                            {
                                                                recommendedSections[
                                                                    index
                                                                ]?.productName
                                                            }
                                                        </span>
                                                        <span className='recommend__item__name'>
                                                            {
                                                                recommendedSections[
                                                                    index
                                                                ]?.productNameEn
                                                            }
                                                        </span>
                                                    </Link>
                                                </SwiperSlide>
                                            ),
                                        )}
                                    </Swiper>
                                )}
                                <div
                                    className='swiper-scrollbar rec-scrollbar'
                                    style={{ position: 'absolute' }}
                                />
                            </div>
                        </div>
                        {/* <!-- // recommended --> */}

                        {/* <!-- event --> */}
                        <div className='event'>
                            <h2 className='event__title'>EVENT</h2>
                            <div className='event__list'>
                                {((size.width > breakPoint &&
                                    eventBgPcBanners?.banners) ||
                                    (size.width <= breakPoint &&
                                        eventBgMoBanners?.banners)) && (
                                    <div
                                        className='event__wrapper'
                                        style={{
                                            backgroundImage:
                                                size.width > breakPoint
                                                    ? `url(${eventBgPcBanners?.banners[0]?.imageUrl})`
                                                    : `url(${eventBgMoBanners?.banners[0]?.imageUrl})`,
                                        }}
                                    >
                                        <div className='event__main__info'>
                                            <div className='event__copy'>
                                                <p className='event__copy__head'>
                                                    {eventSections?.label
                                                        ?.split('/')
                                                        .map(
                                                            (
                                                                eventLabel,
                                                                index,
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                >
                                                                    {eventLabel}
                                                                </span>
                                                            ),
                                                        )}
                                                </p>
                                                <p className='event__copy__desc'>
                                                    {
                                                        eventSections?.sectionExplain
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className='event__main swiper-container'>
                                            <button
                                                type='button'
                                                className='swiper-button-prev'
                                            />
                                            {eventSections?.products?.length >
                                                0 && (
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
                                                        (
                                                            eventSection,
                                                            index,
                                                        ) => (
                                                            <SwiperSlide
                                                                className='swiper-slide'
                                                                key={index}
                                                            >
                                                                <Link
                                                                    to={`product-view/${eventSection.productNo}`}
                                                                    style={{
                                                                        textAlign:
                                                                            'center',
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
                                            {eventBanners.map(
                                                (eventBanner, index) => (
                                                    <SwiperSlide
                                                        key={index}
                                                        className='swiper-slide'
                                                        style={{
                                                            backgroundImage: `url("${eventBanner?.banners[0]?.imageUrl}")`,
                                                        }}
                                                    >
                                                        <Link
                                                            to={
                                                                eventBanner
                                                                    ?.banners[0]
                                                                    .landingUrl
                                                            }
                                                            target={
                                                                eventBanner
                                                                    ?.banners[0]
                                                                    ?.browerTargetType ===
                                                                'CURRENT'
                                                                    ? '_self'
                                                                    : '_blank'
                                                            }
                                                        >
                                                            <div className='event__sub__inner'>
                                                                <p className='event__copy__head'>
                                                                    {eventBanner?.banners[0]?.name
                                                                        ?.split(
                                                                            '/',
                                                                        )
                                                                        ?.map(
                                                                            (
                                                                                bannerName,
                                                                                index,
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        bannerName
                                                                                    }
                                                                                </span>
                                                                            ),
                                                                        )}
                                                                </p>
                                                                <p className='event__copy__desc'>
                                                                    {
                                                                        eventBanner
                                                                            ?.banners[0]
                                                                            ?.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </SwiperSlide>
                                                ),
                                            )}
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
                        {/* <!-- // event --> */}

                        {/* <!-- product --> */}
                        <div className='main__product'>
                            <h2 className='main__product__title'>PRODUCT</h2>
                            <div className='main__product__inner'>
                                <ul className='main__product__lists'>
                                    <li className='main__product__list camera'>
                                        <Link to='/products/camera'>
                                            Camera
                                        </Link>
                                    </li>
                                    <li className='main__product__list vcamera'>
                                        <Link to='/products/videocamera'>
                                            Video Camera
                                        </Link>
                                    </li>
                                    <li className='main__product__list audio'>
                                        <Link to='/products/audio'>Audio</Link>
                                    </li>
                                    <li className='main__product__list ps'>
                                        <Link to='/products/playstation'>
                                            PlayStation®
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- // product --> */}

                        {/* <!-- academy banner --> */}
                        {((size.width > breakPoint &&
                            academyPcBanners?.banners) ||
                            (size.width <= breakPoint &&
                                academyMoBanners?.banners)) && (
                            <div
                                className='main__banner'
                                style={{
                                    backgroundImage:
                                        size.width > breakPoint
                                            ? `url(${academyPcBanners?.banners[0]?.imageUrl})`
                                            : `url(${academyMoBanners?.banners[0]?.imageUrl})`,
                                }}
                            >
                                <div className='main__banner__inner'>
                                    {size.width > breakPoint &&
                                    academyPcBanners?.banners ? (
                                        <h2
                                            className='main__banner__title'
                                            dangerouslySetInnerHTML={{
                                                __html: academyPcBanners
                                                    ?.banners[0]?.nameList,
                                            }}
                                        />
                                    ) : (
                                        <h2
                                            className='main__banner__title'
                                            dangerouslySetInnerHTML={{
                                                __html: academyMoBanners
                                                    ?.banners[0]?.nameList,
                                            }}
                                        />
                                    )}
                                    {size.width > breakPoint &&
                                    academyPcBanners?.banners ? (
                                        <a
                                            className='main__banner__link'
                                            href={
                                                academyPcBanners.banners[0]
                                                    ?.landingUrl
                                            }
                                            target={
                                                academyPcBanners?.banners[0]
                                                    ?.browerTargetType ===
                                                'CURRENT'
                                                    ? '_self'
                                                    : '_blank'
                                            }
                                        >
                                            자세히 보기
                                        </a>
                                    ) : (
                                        <a
                                            className='main__banner__link'
                                            href={
                                                academyMoBanners.banners[0]
                                                    ?.landingUrl
                                            }
                                            target={
                                                academyMoBanners?.banners[0]
                                                    ?.browerTargetType ===
                                                'CURRENT'
                                                    ? '_self'
                                                    : '_blank'
                                            }
                                        >
                                            자세히 보기
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* // academy banner */}

                        {/* customer service */}
                        <div className='main__help'>
                            <h2 className='main__help__title'>
                                무엇을
                                <br />
                                도와드릴까요?
                            </h2>
                            <ul className='main__help__lists'>
                                <li className='main__help__list notice'>
                                    <Link to='/faq'>FAQ & 공지사항</Link>
                                </li>
                                <li className='main__help__list location'>
                                    <Link to='/store-info'>매장안내</Link>
                                </li>
                                <li className='main__help__list customer'>
                                    <a
                                        href='javascript:void(0)'
                                        onClick={onClickServiceCenter}
                                    >
                                        고객센터
                                    </a>
                                </li>
                                <li className='main__help__list service'>
                                    <a
                                        href={
                                            window.anchorProtocol +
                                            'www.sony.co.kr/electronics/support'
                                        }
                                        onClick={window.openBrowser}
                                        target='_blank'
                                    >
                                        제품지원
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* customer service */}
                        {alertVisible && (
                            <Alert onClose={closeModal}>{alertMessage}</Alert>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
