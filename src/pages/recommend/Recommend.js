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
import { loadBanner } from '../../api/display';

export default function Recommend({ match }) {
  const history = useHistory();

  const size = useWindowSize();
  const [slideBanners, setSlideBanners] = useState([]);
  const [productBanners, setProductBanners] = useState([]);
  const [isFinished, setFinished] = useState(false);

  const getBanners = useCallback(async () => {
    try {
      //배너 코드 객체로 관리하기
      //응답이 순서를 보징하지 않음
      const { data } = await loadBanner('000, 015');
      setSlideBanners(data[0]?.accounts);
      setProductBanners(data[1]?.accounts);
    } catch (e) {
      console.error(e);
    }
  }, []);

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
                          <div id="reco_kv_img-1" className={`reco_kv_img reco_kv_img-1 ${progress == 1 ? 'end' : ''}`}>
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
                            <h1 className="reco_kv_title">
                              Sony Store
                              <br />
                              Products
                            </h1>
                            <p className="reco_kv_desc">
                              당신의 삶을 특별하게 해줄 스마트한 <br />
                              소니 스토어 추천 제품을 살펴보세요.
                            </p>
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
                  <div className="reco_item">
                    {productBanners?.map((bannerInfo, index) => (
                      <div className="reco_item_inner">
                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <a
                                onClick={() => {
                                  history.push('/product-view/1');
                                }}
                                className={`reco_prod ${progress == 1 && 'end'}`}
                              >
                                <img src="/images/recommend/img1.jpg" alt="PS-LX310BT" className="reco_prod_img" />
                              </a>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <h2 className={`reco_title ${progress == 1 && 'end'}`}>PS-LX310BT</h2>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <p className={`reco_desc ${progress == 1 && 'end'}`}>간편하게 즐기는 바이닐 사운드</p>
                            </Tween>
                          )}
                        </Scene>

                        <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                          {(progress) => (
                            <Tween duration={1} totalProgress={progress} paused>
                              <div className={`reco_hashes ${progress == 1 && 'end'}`}>
                                <a
                                  onClick={() => {
                                    history.push('/product-view/1');
                                  }}
                                  className="reco_hash"
                                >
                                  #이벤트
                                </a>
                              </div>
                            </Tween>
                          )}
                        </Scene>
                      </div>
                    ))}
                  </div>

                  <div className="reco_item">
                    <div className="reco_item_inner">
                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <a
                              onClick={() => {
                                history.push('/product-view/1');
                              }}
                              className={`reco_prod ${progress == 1 && 'end'}`}
                            >
                              <img src="/images/recommend/img2.jpg" alt="WH-1000XM4/L" className="reco_prod_img" />
                            </a>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <h2 className={`reco_title ${progress == 1 && 'end'}`}>WH-1000XM4/L</h2>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <p className={`reco_desc ${progress == 1 && 'end'}`}>몰입을 넘어 소통까지</p>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <div className={`reco_hashes ${progress == 1 && 'end'}`}>
                              <a
                                onClick={() => {
                                  history.push('/product-view/1');
                                }}
                                className="reco_hash"
                              >
                                #벗지 않는 헤드폰
                              </a>
                            </div>
                          </Tween>
                        )}
                      </Scene>
                    </div>
                  </div>

                  <div className="reco_item">
                    <div className="reco_item_inner">
                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <a
                              onClick={() => {
                                history.push('/product-view/1');
                              }}
                              className={`reco_prod ${progress == 1 && 'end'}`}
                            >
                              <img src="/images/recommend/img3.jpg" alt="WH-1000XM4/W" className="reco_prod_img" />
                            </a>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <h2 className={`reco_title ${progress == 1 && 'end'}`}>WH-1000XM4/L</h2>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <p className={`reco_desc ${progress == 1 && 'end'}`}>몰입을 넘어 소통까지</p>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <div className={`reco_hashes ${progress == 1 && 'end'}`}>
                              <a
                                onClick={() => {
                                  history.push('/product-view/1');
                                }}
                                className="reco_hash"
                              >
                                #벗지 않는 헤드폰
                              </a>
                            </div>
                          </Tween>
                        )}
                      </Scene>
                    </div>
                  </div>

                  <div className="reco_item">
                    <div className="reco_item_inner">
                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <a
                              onClick={() => {
                                history.push('/product-view/1');
                              }}
                              className={`reco_prod ${progress == 1 && 'end'}`}
                            >
                              <img src="/images/recommend/img4.jpg" alt="SRS-RA3000H" className="reco_prod_img" />
                            </a>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <h2 className={`reco_title ${progress == 1 && 'end'}`}>SRS-RA3000H</h2>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <p className={`reco_desc ${progress == 1 && 'end'}`}>
                              어떤 공간이든 스며든다, 디퓨저 사운드 스피커
                            </p>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <div className={`reco_hashes ${progress == 1 && 'end'}`}>
                              <a
                                onClick={() => {
                                  history.push('/product-view/1');
                                }}
                                className="reco_hash"
                              >
                                #인테리어
                              </a>
                            </div>
                          </Tween>
                        )}
                      </Scene>
                    </div>
                  </div>

                  <div className="reco_banner" style={{ backgroundImage: 'url(/images/recommend/banner_bg.png)' }}>
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

                  <div className="reco_item">
                    <div className="reco_item_inner">
                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <a
                              onClick={() => {
                                history.push('/product-view/1');
                              }}
                              className={`reco_prod ${progress == 1 && 'end'}`}
                            >
                              <img src="/images/recommend/img5.jpg" alt="WF-1000XM4/S" className="reco_prod_img" />
                            </a>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <h2 className={`reco_title ${progress == 1 && 'end'}`}>WF-1000XM4/S</h2>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <p className={`reco_desc ${progress == 1 && 'end'}`}>새로운 차원의 몰입을 경험하다</p>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <div className={`reco_hashes ${progress == 1 && 'end'}`}>
                              <a
                                onClick={() => {
                                  history.push('/product-view/1');
                                }}
                                className="reco_hash"
                              >
                                #노이즈캔슬링
                              </a>
                            </div>
                          </Tween>
                        )}
                      </Scene>
                    </div>
                  </div>

                  <div className="reco_item">
                    <div className="reco_item_inner">
                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <a
                              onClick={() => {
                                history.push('/product-view/1');
                              }}
                              className={`reco_prod ${progress == 1 && 'end'}`}
                            >
                              <img src="/images/recommend/img6.jpg" alt="WF-1000XM4/B" className="reco_prod_img" />
                            </a>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <h2 className={`reco_title ${progress == 1 && 'end'}`}>WF-1000XM4/S</h2>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <p className={`reco_desc ${progress == 1 && 'end'}`}>새로운 차원의 몰입을 경험하다</p>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <div className={`reco_hashes ${progress == 1 && 'end'}`}>
                              <a
                                onClick={() => {
                                  history.push('/product-view/1');
                                }}
                                className="reco_hash"
                              >
                                #노이즈캔슬링
                              </a>
                            </div>
                          </Tween>
                        )}
                      </Scene>
                    </div>
                  </div>

                  <div className="reco_item">
                    <div className="reco_item_inner">
                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <a
                              onClick={() => {
                                history.push('/product-view/1');
                              }}
                              className={`reco_prod ${progress == 1 && 'end'}`}
                            >
                              <img src="/images/recommend/img7.jpg" alt="WH-1000XM4/W" className="reco_prod_img" />
                            </a>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <h2 className={`reco_title ${progress == 1 && 'end'}`}>WH-1000XM4/L</h2>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <p className={`reco_desc ${progress == 1 && 'end'}`}>몰입을 넘어 소통까지</p>
                          </Tween>
                        )}
                      </Scene>

                      <Scene triggerElement="reco_item_inner" duration={size.height * 0.5} triggerHook={0.75}>
                        {(progress) => (
                          <Tween duration={1} totalProgress={progress} paused>
                            <div className={`reco_hashes ${progress == 1 && 'end'}`}>
                              <a
                                onClick={() => {
                                  history.push('/product-view/1');
                                }}
                                className="reco_hash"
                              >
                                #벗지 않는 헤드폰
                              </a>
                            </div>
                          </Tween>
                        )}
                      </Scene>
                    </div>
                  </div>
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
                    <SwiperSlide className="swiper-slide">
                      <div
                        class="exhibitions_box"
                        style={{ background: `url('/images/product/banner_thumb_01.png') no-repeat center top` }}
                      >
                        <img className="bg_img" src="/images/product/banner_thumb_01.png" alt="" />
                        <div className="txt_box">
                          <span className="tag" style={{ color: '#5865f5' }}>
                            기획전
                          </span>
                          <p className="tit">
                            원핸드 컴팩트 풀프레임
                            <br />G 렌즈 예약판매
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div
                        class="exhibitions_box"
                        style={{ background: `url('/images/product/banner_thumb_01.png') no-repeat center top` }}
                      >
                        <div className="txt_box">
                          <span className="tag" style={{ color: '#5865f5' }}>
                            기획전
                          </span>
                          <p className="tit">
                            원핸드 컴팩트 풀프레임
                            <br />G 렌즈 예약판매
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div
                        class="exhibitions_box"
                        style={{ background: `url('/images/product/banner_thumb_01.png') no-repeat center top` }}
                      >
                        <div className="txt_box">
                          <span className="tag" style={{ color: '#5865f5' }}>
                            기획전
                          </span>
                          <p className="tit">
                            원핸드 컴팩트 풀프레임
                            <br />G 렌즈 예약판매
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
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
