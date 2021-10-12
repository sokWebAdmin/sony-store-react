import { React, useState, useEffect, useContext, useRef, useCallback } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/recommend.scss';
import arrow from '../../assets/images/common/arrow_recommend.png';
//context
import GlobalContext from '../../context/global.context';

//utils
import { useWindowSize } from '../../utils/utils';
import { useHistory } from 'react-router-dom';

//lib
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import { Link } from 'react-router-dom';
import { loadBanner } from '../../api/display';
import { changeDateFormat, getDay, getStrHM } from '../../utils/dateFormat';

export default function Recommend({ match }) {
  const history = useHistory();

  const size = useWindowSize();
  const [slideBanners, setSlideBanners] = useState([]);
  const [recommendTopBanners, setRecommendTopBanners] = useState([]);
  const [recommendBottomBanners, setRecommendBottomBanners] = useState([]);
  const [middleBanners, setMiddleBanners] = useState([]);
  const [eventBanners, setEventBanners] = useState([]);
  const [isFinished, setFinished] = useState(false);

  const getBanners = useCallback(async () => {
    try {
      //배너 코드 객체로 관리하기
      //응답이 순서를 보징하지 않음
      const { data } = await loadBanner('013,015,016,017');
      const slideBanners = data.find(({ code }) => code === '013')?.accounts || [];
      const recommendBanners = data.find(({ code }) => code === '015')?.accounts || [];
      const middleBanners = data.find(({ code }) => code === '016')?.accounts || [];
      const eventBanners = data.find(({ code }) => code === '017')?.accounts || [];

      if (recommendBanners.length > 4) {
        setRecommendTopBanners(recommendBanners.splice(0, 4));
        setRecommendBottomBanners(recommendBanners);
      } else {
        setRecommendTopBanners(recommendBanners);
      }
      setMiddleBanners(middleBanners);
      setSlideBanners(slideBanners);
      setEventBanners(eventBanners);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getDate = (data) => {
    const date = data.split(' ')[0];
    return `${changeDateFormat(date, 'YYYY.MM.DD')}`;
  };

  const splitStr = (str) => {
    if (!str) return;
    const strList = str.split('/');
    return strList?.reduce((acc, string, index) => {
      acc += index + 1 !== strList.length ? `${string}<br />` : string;
      return acc;
    }, '');
  };
  const trigger2 = useRef();
  useEffect(() => {
    document.body.style.position = 'fixed';
  }, []);

  useEffect(() => {
    getBanners();
    onScroll();
  }, [getBanners]);

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

  const onScroll = () => {
    const movingStart = trigger2.current.offsetTop;
    Array(3)
      .fill(null)
      .forEach((_, index) => {
        const scrollTo = movingStart * (index + 1);
        const setTime = (time) => {
          setTimeout(() => scrollScreen(scrollTo, index), 800 * time);
        };
        setTime(index + 1);
      });

    const scrollScreen = (top, index) => {
      if (index === 0) {
        document.body.style.position = 'static';
      }
      window.scrollTo({
        top,
        left: 0,
        behavior: 'smooth',
      });
    };
  };

  return (
    <>
      <SEOHelmet title={'스토어 추천제품 : 추천제품'} />
      <Controller>
        <div className="contents recommend">
          <div className="container">
            <div className="content">
              <div className="reco">
                {/* kv */}
                {slideBanners && (
                  <div className="reco_kv">
                    <div className={`reco_kv_inner ${isFinished === true && 'end'}`}>
                      <Scene triggerElement=".trigger-1" duration={size.height * 0.5}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} to={{ y: '300%' }} paused>
                            <div
                              id="reco_kv_img-1"
                              className={`reco_kv_img reco_kv_img-1 ${progress === 1 ? 'end' : ''}`}
                            >
                              <img
                                src={slideBanners[0]?.banners[0]?.imageUrl}
                                alt={slideBanners[0]?.banners[0]?.name}
                              />
                            </div>
                          </Tween>
                        )}
                      </Scene>
                      <Scene triggerElement=".trigger-2" duration={size.height * 0.4}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} to={{ y: '300%' }} paused>
                            <div
                              id="reco_kv_img-2"
                              className={`reco_kv_img reco_kv_img-2 ${progress > 0 ? 'end' : ''}`}
                              ref={trigger2}
                            >
                              <img
                                src={slideBanners[1]?.banners[0]?.imageUrl}
                                alt={slideBanners[1]?.banners[0]?.name}
                              />
                            </div>
                          </Tween>
                        )}
                      </Scene>
                      <Scene triggerElement=".trigger-3" duration={size.height * 0.5}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <div
                              id="reco_kv_img-3"
                              className={`reco_kv_img reco_kv_img-3 ${progress > 0 ? 'end' : ''}`}
                            >
                              <img
                                src={slideBanners[2]?.banners[0]?.imageUrl}
                                alt={slideBanners[2]?.banners[0]?.name}
                              />
                            </div>
                          </Tween>
                        )}
                      </Scene>
                      <Scene triggerElement=".trigger-4" duration={size.height * 0.5}>
                        {(progress) => (
                          <Tween duration={1}>
                            <div className={`reco_kv_copy ${progress > 0 ? 'end' : ''}`}>
                              <h1
                                className="reco_kv_title"
                                dangerouslySetInnerHTML={{ __html: splitStr(slideBanners[2]?.banners[0]?.name) }}
                              />
                              <p
                                className="reco_kv_desc"
                                dangerouslySetInnerHTML={{
                                  __html: splitStr(slideBanners[2]?.banners[0]?.description),
                                }}
                              />
                            </div>
                          </Tween>
                        )}
                      </Scene>
                      <Scene triggerElement=".trigger-end">
                        {(progress) => {
                          setFinished(true);
                          return <></>;
                        }}
                      </Scene>
                    </div>

                    <div className="trigger trigger-1" />
                    <div className="trigger trigger-2" />
                    <div className="trigger trigger-3" />
                    <div className="trigger trigger-4" />
                    <div className="trigger trigger-end" />
                  </div>
                )}
                {/* //kv */}
                {/* flex */}
                <div className="reco_items">
                  {recommendTopBanners?.map((bannerInfo, index) => (
                    <div className="reco_item" key={index}>
                      <div className="reco_item_inner">
                        <Scene triggerElement=".reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <Link
                                to={bannerInfo.banners[0].landingUrl}
                                target={bannerInfo?.banners[0].browerTargetType === 'CURRENT' ? '_self' : '_blank'}
                                className={`reco_prod ${progress === 1 && 'end'}`}
                              >
                                <img
                                  src={bannerInfo.banners[0].imageUrl}
                                  alt={bannerInfo.banners[0].name}
                                  className="reco_prod_img"
                                />
                              </Link>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement=".reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <h2 className={`reco_title ${progress === 1 && 'end'}`}>{bannerInfo.banners[0].name}</h2>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement=".reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <p className={`reco_desc ${progress === 1 && 'end'}`}>
                                {bannerInfo.banners[0].description}
                              </p>
                            </Tween>
                          )}
                        </Scene>
                      </div>
                    </div>
                  ))}

                  <div
                    className="reco_banner"
                    style={{
                      backgroundImage: `url(${middleBanners[0]?.banners[0]?.imageUrl})`,
                      backgroundSize: '100%',
                    }}
                  >
                    <Scene duration={size.height * 0.5} triggerHook={0.75}>
                      {(progress) => (
                        <Tween duration={1}>
                          <div className={`reco_banner_img ${progress > 0 ? 'end' : ''}`}>
                            <img
                              src={middleBanners[0]?.banners[1]?.imageUrl}
                              alt={middleBanners[0]?.banners[1]?.name}
                            />
                          </div>
                        </Tween>
                      )}
                    </Scene>
                  </div>

                  {recommendBottomBanners.map((bannerInfo, index) => (
                    <div className="reco_item" key={index}>
                      <div className="reco_item_inner">
                        <Scene triggerElement=".reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <Link
                                to={bannerInfo.banners[0].landingUrl}
                                target={bannerInfo?.banners[0].browerTargetType === 'CURRENT' ? '_self' : '_blank'}
                                className={`reco_prod ${progress === 1 && 'end'}`}
                              >
                                <img
                                  src={bannerInfo.banners[0].imageUrl}
                                  alt={bannerInfo.banners[0].name}
                                  className="reco_prod_img"
                                />
                              </Link>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement=".reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <h2 className={`reco_title ${progress === 1 && 'end'}`}>{bannerInfo.banners[0].name}</h2>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement=".reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <p className={`reco_desc ${progress === 1 && 'end'}`}>
                                {bannerInfo.banners[0].description}
                              </p>
                            </Tween>
                          )}
                        </Scene>
                      </div>
                    </div>
                  ))}
                </div>
                {/* //flex */}
                {/* 기획전 슬라이드 */}
                <div className="exhibitions_zone">
                  <p className="title">진행중인 기획전</p>
                  <div className="exhibitions_inner swiper-container swiper_none">
                    <Swiper
                      className="swiper-wrapper"
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
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
                      {eventBanners.map((bannerInfo, index) => (
                        <SwiperSlide className="swiper-slide" key={index}>
                          <div className="slide_item">
                            <Link to={bannerInfo.banners[0].landingUrl} className="item">
                              <div className="img">
                                <img src={bannerInfo.banners[0].imageUrl} alt="" />
                              </div>
                              <div className="event_desc">
                                <p
                                  className="tit"
                                  dangerouslySetInnerHTML={{ __html: splitStr(bannerInfo?.banners[0]?.name) }}
                                />
                                {bannerInfo?.banners[0]?.displayPeriodType === 'PERIOD' && (
                                  <p className="event_duration">{`${getDate(
                                    bannerInfo?.banners[0]?.displayStartYmdt,
                                  )} ~ ${getDate(bannerInfo?.banners[0]?.displayEndYmdt)}`}</p>
                                )}
                              </div>
                            </Link>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="arrow_btn">
                      <a className="arrow swiper-button-prev">
                        <img src={arrow} alt="이전" />
                      </a>
                      <a className="arrow swiper-button-next">
                        <img src={arrow} alt="다음" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Controller>
    </>
  );
}
