import { React, useState, useEffect, useContext, useRef, useCallback } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/recommend.scss';

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
      const { data } = await loadBanner('000,002,016,017');
      //TODo 코드 바꾸기
      const slideBanners = data.find(({ code }) => code === '000')?.accounts || [];
      const recommendBanners = data.find(({ code }) => code === '002')?.accounts || [];
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
    const day = getDay(date);
    const time = getStrHM(data);
    return `${changeDateFormat(date, 'YYYY.MM.DD')}(${day}) ${time}`;
  };

  useEffect(() => {
    getBanners();
  }, [getBanners]);

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

  return (
    <>
      <Controller>
        <div className="contents recommend">
          <div className="container">
            <div className="content">
              <div className="reco">
                {/* kv */}
                <div className="reco_kv">
                  <div className={`reco_kv_inner ${isFinished == true && 'end'}`}>
                    {/*{slideBanners.map((slideBanner, index) => (*/}
                    {/*  <Scene triggerElement={`".trigger-${index + 1}"`} duration={size.height * 0.4} key={index}>*/}
                    {/*    {(progress) => (*/}
                    {/*      <Tween duration={1} totalProgress={progress} to={{ y: '300%' }} paused>*/}
                    {/*        <div*/}
                    {/*          id={`reco_kv_img-${index + 1}`}*/}
                    {/*          className={`reco_kv_img reco_kv_img-${index + 1} ${progress === 1 ? 'end' : ''}`}*/}
                    {/*        >*/}
                    {/*          <img src={slideBanner?.banners[0]?.imageUrl} alt={slideBanner?.banners[0]?.name} />*/}
                    {/*        </div>*/}
                    {/*      </Tween>*/}
                    {/*    )}*/}
                    {/*  </Scene>*/}
                    ))}
                    <Scene triggerElement=".trigger-1" duration={size.height * 0.5}>
                      {(progress) => (
                        <Tween duration={1} totalProgress={progress} to={{ y: '300%' }} paused>
                          <div
                            id="reco_kv_img-1"
                            className={`reco_kv_img reco_kv_img-1 ${progress === 1 ? 'end' : ''}`}
                          >
                            <img src={slideBanners[0]?.banners[0]?.imageUrl} alt={slideBanners[0]?.banners[0]?.name} />
                          </div>
                        </Tween>
                      )}
                    </Scene>
                    <Scene triggerElement=".trigger-2" duration={size.height * 0.4}>
                      {(progress) => (
                        <Tween duration={1} totalProgress={progress} to={{ y: '300%' }} paused>
                          <div id="reco_kv_img-2" className={`reco_kv_img reco_kv_img-2 ${progress > 0 ? 'end' : ''}`}>
                            <img src={slideBanners[1]?.banners[0]?.imageUrl} alt={slideBanners[1]?.banners[0]?.name} />
                          </div>
                        </Tween>
                      )}
                    </Scene>
                    <Scene triggerElement=".trigger-3" duration={size.height * 0.5}>
                      {(progress) => (
                        <Tween duration={1} totalProgress={progress} paused>
                          <div id="reco_kv_img-3" className={`reco_kv_img reco_kv_img-3 ${progress > 0 ? 'end' : ''}`}>
                            <img src={slideBanners[2]?.banners[0]?.imageUrl} alt={slideBanners[2]?.banners[0]?.name} />
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
                              dangerouslySetInnerHTML={{
                                __html: slideBanners[2]?.banners[0]?.name
                                  ?.split('/')
                                  .map((bannerName, index) =>
                                    index + 1 === slideBanners[2]?.banners[0]?.name?.split('/').length
                                      ? bannerName
                                      : `${bannerName}<br />`,
                                  ),
                              }}
                            />
                            <p
                              className="reco_kv_desc"
                              dangerouslySetInnerHTML={{
                                __html: slideBanners[2]?.banners[0]?.description
                                  ?.split('/')
                                  .map((bannerDescription, index) =>
                                    index + 1 === slideBanners[2]?.banners[0]?.description?.split('/').length
                                      ? bannerDescription
                                      : `${bannerDescription}<br />`,
                                  ),
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
                {/* //kv */}
                {/* flex */}
                <div className="reco_items">
                  {recommendTopBanners?.map((bannerInfo, index) => (
                    <div className="reco_item">
                      <div className="reco_item_inner">
                        <Scene
                          triggerElement="reco_item_inner"
                          duration={size.height * 0.5}
                          triggerHook={0.75}
                          key={index}
                        >
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

                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <h2 className={`reco_title ${progress === 1 && 'end'}`}>{bannerInfo.banners[0].name}</h2>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
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
                    style={{ backgroundImage: `url(${middleBanners[0]?.banners[0]?.imageUrl})` }}
                  >
                    <Scene triggerElement=".trigger-banner_img" duration={size.height * 0.5} triggerHook={0.75}>
                      {(progress) => (
                        <Tween duration={1}>
                          <div className={`reco_banner_img ${progress > 0 ? 'end' : ''}`}>
                            <img src="/images/recommend/banner_item.png" alt="WF-1000XM4/S,Sony Earphones,Silver" />
                          </div>
                        </Tween>
                      )}
                    </Scene>
                  </div>

                  {recommendBottomBanners.map((bannerInfo, index) => (
                    <div className="reco_item">
                      <div className="reco_item_inner">
                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
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

                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <h2 className={`reco_title ${progress === 1 && 'end'}`}>{bannerInfo.banners[0].name}</h2>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
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
                <div className="exhibitions_slider swiper-container">
                  <Swiper
                    className="swiper-wrapper"
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }}
                  >
                    {eventBanners.map((bannerInfo, index) => (
                      <SwiperSlide className="swiper-slide" key={index}>
                        <div
                          class="exhibitions_box"
                          style={{ background: `url('${bannerInfo.banners[0].imageUrl}') no-repeat center top` }}
                        >
                          <img className="bg_img" src="/images/product/banner_thumb_01.png" alt="" />
                          <div className="txt_box">
                            <span className="tag" style={{ color: '#5865f5' }}>
                              기획전
                            </span>
                            <p
                              className="tit"
                              dangerouslySetInnerHTML={{
                                __html: bannerInfo?.banners[0]?.name
                                  ?.split('/')
                                  ?.map((bannerName, index) =>
                                    index + 1 === bannerInfo?.banners[0]?.name?.split('/').length
                                      ? bannerName
                                      : `${bannerName}<br />`,
                                  ),
                              }}
                            />
                            <div>{`${getDate(bannerInfo?.banners[0]?.displayStartYmdt)} ~ ${getDate(
                              bannerInfo?.banners[0]?.displayEndYmdt,
                            )}`}</div>
                          </div>
                          {/*  <div*/}
                          {/*    dangerouslySetInnerHTML={{*/}
                          {/*      __html: bannerInfo?.banners[0]?.description*/}
                          {/*        ?.split('/')*/}
                          {/*        ?.map((bannerDescription, index) =>*/}
                          {/*          index + 1 === bannerInfo?.banners[0]?.name?.split('/').length*/}
                          {/*            ? bannerDescription*/}
                          {/*            : `${bannerDescription}<br />`,*/}
                          {/*        ),*/}
                          {/*    }}*/}
                          {/*  />*/}
                          {/*</div>*/}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="arrow_btn">
                    <a className="arrow swiper-button-prev">
                      <img src="/images/common/arrow_19_34.png" alt="이전" />
                    </a>
                    <a className="arrow swiper-button-next">
                      <img src="/images/common/arrow_19_34.png" alt="다음" />
                    </a>
                  </div>
                  <div className="swiper-pagination" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Controller>
    </>
  );
}
