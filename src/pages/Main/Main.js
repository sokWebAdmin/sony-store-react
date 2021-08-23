import { React ,useState, useEffect, useContext, useRef } from 'react';
import { Link } from "react-router-dom";

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//lib
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"


//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/css/main.css"

//utils
import {useWindowSize} from '../../utils/utils'
import { breakPoint, breakPointTablet } from '../../utils/constants';

//context
import GlobalContext from '../../context/global.context';

export default function Main() {
  const {onChangeGlobal} = useContext(GlobalContext)

  const size = useWindowSize();

  //top
  const [topSwiper, setTopSwiper] = useState(null);
  const [mPointer, setMPointer] = useState('none');

  //recommend
  const [recLeftSwiper, setRecLeftSwiper] = useState(null);
  const [recRightSwiper, setRecRightSwiper] = useState(null);



  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  //swiper 제어권 할당 및 클릭이벤트 (추천영역)
  useEffect(()=>{
    if (recLeftSwiper && recRightSwiper && recLeftSwiper.controller && recRightSwiper.controller) {
      recLeftSwiper.controller.control = recRightSwiper;
      recRightSwiper.controller.control = recLeftSwiper;
    }
  },[recRightSwiper, recLeftSwiper])

      return (
          <>
          <SEOHelmet title={"메인"} />

            <div id="container" className="container">
                <div className="content main">
                {/* <!-- key visual --> */}
                <div className={`kv swiper-container ${mPointer != "none" &&  mPointer}`}
                        onMouseMove={(e)=>{
                            if(size.width > breakPoint){
                                let halfWidth = size.width / 2;
                                let activeClass = "none";

                                if (e.clientX < halfWidth) {
                                    activeClass = "hover-prev";
                                  } else {
                                    activeClass = "hover-next";
                                  };
                                  
                                  setMPointer(activeClass);
                            }
                        }}

                        onMouseLeave={()=>{
                            if(size.width > breakPoint){
                                setMPointer("none");
                            }
                        }}

                        onClick={()=>{
                          if(size.width > breakPoint){
                              if(mPointer == "hover-prev"){
                                if(topSwiper){
                                  topSwiper.slidePrev();
                                }
                              }else if(mPointer == "hover-next"){
                                topSwiper.slideNext();
                              }
                          }
                      }}
                    >
                <Swiper className="swiper-wrapper"
                        onSwiper={setTopSwiper}
                        resizeObserver={true}
                        observer={true}
                        loop={true}
                        speed={600}
                        autoplay={{delay:6000, disableOnInteraction: true}}
                        pagination={{ 
                            el: ".swiper-pagination",
                            type: "custom",
                            renderCustom: (swiper, current, total) => {
                                let _current = current;
                                let _total = total; 
                                    if (current < 10) _current = "0" + current;
                                    if (total < 10) _total = "0" + total;
                
                                return "<span class='swiper-pagination-current'>No. "+_current+"</span>" + "<span class='swiper-pagination-total'>"+_total+"</span>";
                            }}
                        }>
                    
                    <SwiperSlide className="swiper-slide video-slide" data-swiper-autoplay="10000">
                      <video className="video-slide-player" preload autoPlay muted playsInline>
                          <source src={ size.width > breakPoint ? `images/_tmp/demo_1920x1080-1.mp4` : `images/_tmp/demo_1920x1080-1.mp4`} type="video/mp4" />
                      </video>
                      <div className="kv__slide">
                        <div className="kv__head">
                            <div className="kv__head__copy"><span className="copy-0"><span>Silent</span></span><span className="copy-1"><span>White</span></span></div>
                            <div className="kv__head__copy"><span className="copy-2"><span>WH-1000</span></span><span className="copy-3"><span>XM4</span></span></div>
                        </div>
                        <span className="kv__product"><span>무선 노이즈 캔슬링 헤드폰</span></span>
                        <a href="/product-view/1" className="kv__link"><span>자세히 보기</span></a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/pc_kv_img1.jpg)` : `url(/images/_tmp/mo_kv_img1.jpg)`}}>
                      <div className="kv__slide">
                        <div class="kv__head">
                          <div class="kv__head__copy"><span class="copy-0"><span>One</span></span><span class="copy-1"><span>hand</span></span></div>
                          <div class="kv__head__copy"><span class="copy-2"><span>Full-Frame</span></span></div>
                          <div class="kv__head__copy"><span class="copy-3"><span>α7c</span></span></div>
                        </div>
                        <span className="kv__product"><span>원핸드 컴팩트 풀프레임 카메라</span></span>
                        <a href="/product-view/1" className="kv__link"><span>자세히 보기</span></a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide video-slide" data-swiper-autoplay="10000">
                      <video className="video-slide-player" preload autoPlay muted playsInline>
                          <source src={ size.width > breakPoint ? `images/_tmp/demo_608x1080-1.mp4` : `images/_tmp/demo_608x1080-1.mp4`} type="video/mp4" />
                      </video>
                      <div className="kv__slide">
                        <div class="kv__head">
                          <div class="kv__head__copy"><span class="copy-0"><span>Vlog</span></span><span class="copy-1"><span>camera</span></span></div>
                          <div class="kv__head__copy"><span class="copy-2"><span>ZV-1</span></span></div>
                        </div>
                        <span className="kv__product"><span>예뻐지는 데일리 카메라</span></span>
                        <a href="/product-view/1" className="kv__link"><span>자세히 보기</span></a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/pc_kv_img2.jpg)` : `url(/images/_tmp/mo_kv_img2.jpg)`}}>
                      <div className="kv__slide">
                        <div class="kv__head">
                          <div class="kv__head__copy"><span class="copy-0"><span>WH-</span></span></div>
                          <div class="kv__head__copy"><span class="copy-1"><span>1000XM4</span></span></div>
                        </div>
                        <span className="kv__product"><span>무선 노이즈 캔슬링 헤드폰</span></span>
                        <a href="/product-view/1" className="kv__link"><span>자세히 보기</span></a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/pc_kv_img3.jpg)` : `url(/images/_tmp/mo_kv_img3.jpg)`}}>
                      <div className="kv__slide">
                        <div class="kv__head">
                          <div class="kv__head__copy"><span class="copy-0"><span>Vlog</span></span><span class="copy-1"><span>Camera</span></span></div>
                          <div class="kv__head__copy"><span class="copy-2"><span>ZV-1</span></span></div>
                        </div>
                        <span className="kv__product"><span>예뻐지는 데일리 카메라</span></span>
                        <a href="/product-view/1" className="kv__link"><span>자세히 보기</span></a>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <div className="swiper-pagination"></div>
                </div>
                {/* <!-- // key visual --> */}

                {/* <!-- recommended --> */}
                <div className="recommend">
                  <div className="recommend__bg__swiper swiper-container">
                    <Swiper className="swiper-wrapper"
                      onSwiper={setRecLeftSwiper}
                      slidesPerView={1.000000001}
                      observer={true}
                      resizeObserver={true}
                      loop={true}
                      speed={600}
                      spaceBetween={0}
                      >
                      <SwiperSlide className="swiper-slide" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/main_recomm_pc1.jpg)` : `url(/images/_tmp/main_recomm_mo1.jpg)`}}></SwiperSlide>
                      <SwiperSlide className="swiper-slide" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/main_recomm_pc2.jpg)` : `url(/images/_tmp/main_recomm_mo2.jpg)`}}></SwiperSlide>
                      <SwiperSlide className="swiper-slide" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/main_recomm_pc3.jpg)` : `url(/images/_tmp/main_recomm_mo3.jpg)`}}></SwiperSlide>
                      <SwiperSlide className="swiper-slide" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/main_recomm_pc4.jpg)` : `url(/images/_tmp/main_recomm_mo4.jpg)`}}></SwiperSlide>
                      </Swiper>
                  </div>
                  <div className="recommend__swiper swiper-container">
                    <Swiper className="swiper-wrapper"
                    onSwiper={setRecRightSwiper}
                     scrollbar= {{
                      el: ".rec-scrollbar",
                      draggable: false,
                    }}

                    on={{
                      init: swiper => {
                        swiper.update()
                      },
                      resize: swiper => {
                        swiper.update();
                      },
                      update: swiper => {
                      },
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
                        641: {
                          slidesPerView: 1.8,
                          spaceBetween: 92,
                          allowTouchMove: true,
                        },
                        1281: {
                          slidesPerView: 1.5,
                          spaceBetween: 110,
                          allowTouchMove: false,
                        },
                        1600: {
                          slidesPerView: 1.5,
                          spaceBetween: 157,
                          allowTouchMove: false,
                        }
                    }}
                    >
                      <SwiperSlide className="recommend__item swiper-slide">
                        <a href="/product-view/1" onClick={(e)=>{
                          if(window.innerWidth > breakPoint){
                            if(e.currentTarget.parentElement.classList.contains("swiper-slide-next")){
                              e.preventDefault();
                              recRightSwiper.slideNext();
                            }
                          }
                        }}>
                          <span className="recommend__item__copy">몰입을 넘어 소통까지<br />벗지않는 헤드폰</span>
                          <div className="recommend__item__pic">
                            <img src="/images/_tmp/main_recomm_item1.png" alt="모델명1" />
                          </div>
                          <span className="recommend__item__desc">무선 노이즈 캔슬링 헤드폰</span>
                          <span className="recommend__item__name">WH-1000XM1</span>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="recommend__item swiper-slide">
                        <a href="/product-view/1" onClick={(e)=>{
                          if(window.innerWidth > breakPoint){
                            if(e.currentTarget.parentElement.classList.contains("swiper-slide-next")){
                              e.preventDefault();
                              recRightSwiper.slideNext();
                            }
                          }
                        }}>
                          <span className="recommend__item__copy">소리로 공간을 디자인하다</span>
                          <div className="recommend__item__pic">
                            <img src="/images/_tmp/main_recomm_item2.png" alt="모델명2" />
                          </div>
                          <span className="recommend__item__desc">디퓨저 사운드 스피커</span>
                          <span className="recommend__item__name">SRS-RA5000</span>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="recommend__item swiper-slide">
                      <a href="/product-view/1" onClick={(e)=>{
                          if(window.innerWidth > breakPoint){
                            if(e.currentTarget.parentElement.classList.contains("swiper-slide-next")){
                              e.preventDefault();
                              recRightSwiper.slideNext();
                            }
                          }
                        }}>
                          <span className="recommend__item__copy">모든 영상가를 자유롭게 하다</span>
                          <div className="recommend__item__pic">
                            <img src="/images/_tmp/main_recomm_item3.png" alt="모델명3" />
                          </div>
                          <span className="recommend__item__desc">FX3 풀프레임 시네마 라인 카메라</span>
                          <span className="recommend__item__name">Alpha-FX3</span>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="recommend__item swiper-slide">
                      <a href="/product-view/1" onClick={(e)=>{
                          if(window.innerWidth > breakPoint){
                            if(e.currentTarget.parentElement.classList.contains("swiper-slide-next")){
                              e.preventDefault();
                              recRightSwiper.slideNext();
                            }
                          }
                        }}>
                          <span className="recommend__item__copy">F1.2 렌즈의 초격차 한계를 뛰어넘다</span>
                          <div className="recommend__item__pic">
                            <img src="/images/_tmp/main_recomm_item4.png" alt="모델명4" />
                          </div>
                          <span className="recommend__item__desc">FE 50mm F1.2 GM</span>
                          <span className="recommend__item__name">SEL50F12GM</span>
                        </a>
                      </SwiperSlide>
                    </Swiper>
                    <div className="swiper-scrollbar rec-scrollbar" style={{position:"absolute"}}></div>
                  </div>
                </div>
                {/* <!-- // recommended --> */}

                {/* <!-- event --> */}
                <div className="event">
                  <h2 className="event__title">EVENT</h2>
                  <div className="event__list">
                    <div className="event__wrapper" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/main_event_bg_pc1.png)` : `url(/images/_tmp/main_event_bg_mo1.png)`}}>
                      <div className="event__main__info">
                        <div className="event__copy">
                          <p className="event__copy__head">
                            <span>디퓨저 사운드 스피커</span>
                            <span>청음 이벤트</span>
                          </p>
                          <p className="event__copy__desc">소니스토어 압구정에서 청음 시 최대 20% 할인!</p>
                        </div>
                      </div>
                      <div className="event__main swiper-container">
                        <button type="button" className="swiper-button-prev"></button>
                        <Swiper className="swiper-wrapper"
                          slidesPerView={1}
                          observer={true}
                          resizeObserver={true}
                          loop={true}
                          speed={600}
                          autoplay={{delay: 5000}}
                          navigation = {{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                          }}
                          >
                          <SwiperSlide className="swiper-slide">
                            <a href="/product-view/1"><img src="/images/_tmp/item640x640_01.png" alt="상품명" /></a>
                            <div className="event__main__inner">
                              <div className="event__product">
                                <span className="event__product__name">SRS-RA3000BMKR2</span>
                                <span className="event__product__price">399,000</span>
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide">
                            <a href="/product-view/1"><img src="/images/_tmp/item640x640_02.png" alt="상품명" /></a>
                            <div className="event__main__inner">
                              <div className="event__product">
                                <span className="event__product__name">WWE-RA3000BMKR2</span>
                                <span className="event__product__price">299,000</span>
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide">
                            <a href="/product-view/1"><img src="/images/_tmp/item640x640_03.png" alt="상품명" /></a>
                            <div className="event__main__inner">
                              <div className="event__product">
                                <span className="event__product__name">WOW-RA3000BMKR2</span>
                                <span className="event__product__price">199,000</span>
                              </div>
                            </div>
                          </SwiperSlide>
                        </Swiper>
                        <button type="button" className="swiper-button-next"></button>
                      </div>
                    </div>
                    <div className="event__sub swiper-container">
                      <Swiper className="swiper-wrapper"
                        slidesPerView={3}
                        observer={true}
                        resizeObserver={true}
                        centeredSlides={false}
                        spaceBetween={24}
                        speed={600}
                        scrollbar= {{
                          el: ".event-scrollbar",
                          draggable: false,
                        }}
                        breakpoints= {{
                          320: {
                            slidesPerView: 1.2,
                            centeredSlides: true,
                            spaceBetween: 15,
                          },
                          640: {
                            slidesPerView: 1.2,
                            centeredSlides: true,
                            spaceBetween: 24,
                          },
                          1281: {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 15,
                          },
                          1366: {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 15,
                          },
                          1600: {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 24,
                          },
                        }}
                        >
                        <SwiperSlide className="swiper-slide" style={{backgroundImage: `url("/images/_tmp/main_event2-1.jpg")`}}>
                          <a href="#">
                            <div className="event__sub__inner">
                              <p className="event__copy__head">
                                <span>성공적인 재택생활</span>
                                <span>꿀-팁</span>
                              </p>
                              <p className="event__copy__desc">1000X 노이즈 캔슬링으로 더하는 성공적인 재택생활! </p>
                            </div>
                          </a>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide" style={{backgroundImage: `url("/images/_tmp/main_event2-2.jpg")`}}>
                          <a href="#">
                            <div className="event__sub__inner">
                              <p className="event__copy__head">
                                <span>이번주는 오리지널</span>
                                <span>시리즈 정주행</span>
                              </p>
                              <p className="event__copy__desc">WH-1000XM4 구매 시 특별 혜택 증정</p>
                            </div>
                          </a>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide" style={{backgroundImage: `url("/images/_tmp/main_event2-3.jpg")`}}>
                          <a href="#">
                            <div className="event__sub__inner">
                              <p className="event__copy__head">
                                <span>카메라 무상 수리 서비스</span>
                                <span>1+1년 연장 프로모션</span>
                              </p>
                              <p className="event__copy__desc">카메라 구매 시 무상 수리 서비스 1년 추가 연장</p>
                            </div>
                          </a>
                        </SwiperSlide>
                      </Swiper>
                      <div className="swiper-scrollbar event-scrollbar" style={{position:"absolute"}}></div>
                    </div>
                  </div>
                  <a href="#" className="btn__event__more">더 보러 가기</a>
                </div>
                {/* <!-- // event --> */}

                {/* <!-- product --> */}
                <div className="main__product">
                  <h2 className="main__product__title">PRODUCT</h2>
                  <div className="main__product__inner">
                    <ul className="main__product__lists">
                      <li className="main__product__list camera"><a href="/products/camera">Camera</a></li>
                      <li className="main__product__list vcamera"><a href="/products/videocamera">Video Camera</a></li>
                      <li className="main__product__list audio"><a href="/products/audio">Audio</a></li>
                      <li className="main__product__list ps"><a href="/products/playstation">PlayStation®</a></li>
                    </ul>
                  </div>
                </div>
                {/* <!-- // product --> */}

                {/* <!-- academy banner --> */}
                <div className="main__banner" style={{backgroundImage: size.width > breakPoint ? `url(/images/_tmp/main_banner_pc.png)` : ( size.width > breakPointTablet ? `url(/images/_tmp/main_banner_tab.png)` : `url(/images/_tmp/main_banner_mo.png)`)}}>
                  <div className="main__banner__inner">
                    <h2 className="main__banner__title">알파 아카데미<br />4월 강좌 수강신청</h2>
                    <a href="#" className="main__banner__link">자세히 보기</a>
                  </div>
                </div>
              {/* // academy banner */}

                {/* customer service */}
                <div className="main__help">
                  <h2 className="main__help__title">무엇을<br />도와드릴까요?</h2>
                  <ul className="main__help__lists">
                    <li className="main__help__list notice">
                      <a href="#">공지사항 & FAQ</a>
                    </li>
                    <li className="main__help__list location">
                      <a href="#">매장안내</a>
                    </li>
                    <li className="main__help__list customer">
                      <a href="#">고객센터</a>
                    </li>
                    <li className="main__help__list service">
                      <a href="#">제품지원</a>
                    </li>
                  </ul>
                </div>
                {/* customer service */}

              </div>
            </div>
          </>
      )
}
