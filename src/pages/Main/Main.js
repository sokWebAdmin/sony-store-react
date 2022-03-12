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
import MainRecommend from 'components/Main/MainRecommend';
import MainEvent from 'components/Main/MainEvent';
import CustomerService from 'components/CustomerService';
import Alert from 'components/common/Alert';
import { useWindowSize } from 'utils/utils';
import {
    getRecommendedBannerNames,
    getSlideBannerNames,
    getAcademyBannerNames,
    getLinkTarget,
} from 'utils/html';
import { breakPoint } from 'utils/constants';
import { main } from 'const/seo';
import { getDisplaySectionsSectionNo, loadBanner } from 'api/display';
import { useAlert } from 'hooks';
import { bannerCode } from 'bannerCode';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import 'assets/scss/main.scss';

export default function Main() {
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

    const [eventSections, setEventSections] = useState();

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
                                                                style={{
                                                                    color: bannerInfo
                                                                        .banners[0]
                                                                        .nameColor,
                                                                }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: bannerInfo
                                                                        .banners[0]
                                                                        .nameList,
                                                                }}
                                                            />
                                                        ) : (
                                                            <div
                                                                className='kv__head'
                                                                style={{
                                                                    color: bannerInfo
                                                                        .banners[0]
                                                                        .nameColor,
                                                                }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: slideMoBanners[
                                                                        index
                                                                    ].banners[0]
                                                                        .nameList,
                                                                }}
                                                            />
                                                        )}

                                                        <span className='kv__product'>
                                                            <span
                                                                style={{
                                                                    color:
                                                                        size.width >
                                                                        breakPoint
                                                                            ? bannerInfo
                                                                                  .banners[0]
                                                                                  .descriptionColor
                                                                            : slideMoBanners[
                                                                                  index
                                                                              ]
                                                                                  .banners[0]
                                                                                  .descriptionColor,
                                                                }}
                                                            >
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
                                                                      target={getLinkTarget(
                                                                          bannerInfo
                                                                              ?.banners[0]
                                                                              .browerTargetType,
                                                                      )}
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
                                                                      target={getLinkTarget(
                                                                          slideMoBanners[
                                                                              index
                                                                          ]
                                                                              .banners[0]
                                                                              .browerTargetType,
                                                                      )}
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
                        {recRightSwiper &&
                            recommendedBanners &&
                            recommendedSections && (
                                <MainRecommend
                                    recommendedBanners={recommendedBanners}
                                    setRecLeftSwiper={setRecLeftSwiper}
                                    setRecRightSwiper={setRecRightSwiper}
                                    recRightSwiper={recRightSwiper}
                                    recommendedSections={recommendedSections}
                                />
                            )}

                        {/* <!-- // recommended --> */}

                        {/* <!-- event --> */}
                        {size &&
                            eventBgMoBanners &&
                            eventBgPcBanners &&
                            eventSections &&
                            eventBanners && (
                                <MainEvent
                                    size={size}
                                    breakPoint={breakPoint}
                                    eventBgMoBanners={eventBgMoBanners}
                                    eventBgPcBanners={eventBgPcBanners}
                                    eventSections={eventSections}
                                    eventBanners={eventBanners}
                                />
                            )}
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
                                            style={{
                                                color: academyPcBanners
                                                    ?.banners[0]?.nameColor,
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: academyPcBanners
                                                    ?.banners[0]?.nameList,
                                            }}
                                        />
                                    ) : (
                                        <h2
                                            className='main__banner__title'
                                            style={{
                                                color: academyMoBanners
                                                    ?.banners[0]?.nameColor,
                                            }}
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
                                            rel='noreferrer'
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
                                            rel='noreferrer'
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
                        <CustomerService />

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
