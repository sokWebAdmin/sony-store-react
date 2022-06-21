import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
    Controller,
} from 'swiper/core';

import SEO from 'components/SEO';
import MainKV from 'components/Main/MainKV';
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
import { splitStr } from 'utils/html';
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
    const [eventBgPcBanners, setEventBgPcBanners] = useState(null);
    const [eventBgMoBanners, setEventBgMoBanners] = useState(null);

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

            data?.forEach(({ code, accounts }) => {
                switch (code) {
                    case kvMo:
                        getSlideBannerNames(accounts);
                        setSlideMoBanners(accounts);
                        break;
                    case eventMain:
                        setEventBanners(accounts);
                        break;
                    case academyPc:
                        getAcademyBannerNames(accounts[0]);
                        setAcademyPcBanners(accounts[0]);
                        break;
                    case academyMo:
                        getAcademyBannerNames(accounts[0]);
                        setAcademyMoBanners(accounts[0]);
                        break;
                    case kvPc:
                        getSlideBannerNames(accounts);
                        setSlidePcBanners(accounts);
                        break;
                    case recommend:
                        getRecommendedBannerNames(accounts);
                        setRecommendedBanners(accounts);
                        break;
                    case eventBgPc:
                        setEventBgPcBanners(accounts[0]);
                        break;
                    case eventBgMo:
                        setEventBgMoBanners(accounts[0]);
                        break;

                    default:
                        break;
                }
            });
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
                        {size &&
                            slidePcBanners.length > 0 &&
                            slideMoBanners.length > 0 && (
                                <MainKV
                                    size={size}
                                    mPointer={mPointer}
                                    setMPointer={setMPointer}
                                    breakPoint={breakPoint}
                                    topSwiper={topSwiper}
                                    setTopSwiper={setTopSwiper}
                                    slidePcBanners={slidePcBanners}
                                    slideMoBanners={slideMoBanners}
                                />
                            )}
                        {/* <!-- // key visual --> */}

                        {/* <!-- recommended --> */}
                        {recommendedBanners.length > 0 &&
                            recommendedSections.length > 0 && (
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
                            eventBanners.length > 0 && (
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
                                            style={{
                                                color: academyPcBanners
                                                    ?.banners[0]?.nameColor,
                                            }}
                                            rel='noreferrer'
                                            target={getLinkTarget(
                                                academyPcBanners?.banners[0]
                                                    ?.browerTargetType,
                                            )}
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
                                            style={{
                                                color: academyMoBanners
                                                    ?.banners[0]?.nameColor,
                                            }}
                                            rel='noreferrer'
                                            target={getLinkTarget(
                                                academyMoBanners?.banners[0]
                                                    ?.browerTargetType,
                                            )}
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
