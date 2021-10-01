import { React, useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//lib
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

//css
import '../../assets/scss/main.scss';

//utils
import { useWindowSize, wonComma } from '../../utils/utils';
import { breakPoint } from '../../utils/constants';
import { useHistory } from 'react-router-dom';

import { getDisplaySectionsSectionNo, loadBanner } from '../../api/display';

export default function Main() {
  const history = useHistory();

  const size = useWindowSize();
  //1. 슬라이드 배너 pc : 000
  const [slidePcBanners, setSlidePcBanners] = useState([]);
  //2. 슬라이드 배너 mo : 001
  const [slideMoBanners, setSlideMoBanners] = useState([]);

  //3. 추천제품 : 002
  const [recommendedBanners, setRecommendedBanners] = useState([]);

  //4. 이벤트 : 003
  const [eventBanners, setEventBanners] = useState([]);

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
      bannerInfo.banners[0].nameList = bannerNameList.reduce((acc, bannerName, index) => {
        if (bannerNameList.length - 1 === index) {
          acc += `${bannerName}`;
        } else {
          acc += `${bannerName}<br />`;
        }
        return acc;
      }, '');
    });
  };

  const getSlideBannerNames = (bannerInfoList) => {
    bannerInfoList.forEach((bannerInfo) => {
      let bannerNameList = bannerInfo.banners[0].name.split('/');
      bannerNameList = bannerNameList.map((name) => name.split(' '));
      let count = 0;
      bannerInfo.banners[0].nameList = bannerNameList.reduce((acc, bannerName) => {
        const nameHtml = bannerName.reduce((acc, name) => {
          acc += `<span class="copy-${count}"><span>${name}</span></span>`;
          count++;
          return acc;
        }, '');
        acc += `<div class="kv__head__copy">${nameHtml}</div>`;
        return acc;
      }, '');
    });
  };

  const getAcademyPcBannerNames = (bannerInfoList) => {
    const bannerNames = bannerInfoList.banners[0].name.split('/');
    bannerInfoList.banners[0].nameList = bannerNames.reduce((acc, bannerName, index) => {
      const { length } = bannerNames;
      acc += index - 1 === length ? bannerName : bannerName + '<br />';
      return acc;
    }, '');
  };

  //1. 배너 노출 api
  const getBanners = useCallback(async () => {
    try {
      //배너 코드 객체로 관리하기
      //응답이 순서를 보징하지 않음
      const { data } = await loadBanner('000,001,002,003,004,005');

      const moBanners = data.find(({ code }) => code === '001')?.accounts || [];
      setSlideMoBanners(moBanners);
      const eventBanners = data.find(({ code }) => code === '003')?.accounts || [];
      setEventBanners(eventBanners);
      const academyPcBanners = data.find(({ code }) => code === '004')?.accounts[0] || {};
      getAcademyPcBannerNames(academyPcBanners);
      setAcademyPcBanners(academyPcBanners);
      const academyMoBanners = data.find(({ code }) => code === '005')?.accounts[0] || {};
      setAcademyMoBanners(academyMoBanners);

      const slidePcBanners = data.find(({ code }) => code === '000')?.accounts || [];
      getSlideBannerNames(slidePcBanners);
      setSlidePcBanners(slidePcBanners);
      const recommendedBanners = data.find(({ code }) => code === '002')?.accounts || [];
      getRecommendedBannerNames(recommendedBanners);
      setRecommendedBanners(recommendedBanners);
    } catch (e) {
      console.error(e);
    }
  }, []);

  //2. 섹션 조회
  const getSections = useCallback(async () => {
    // 5742: 추천상품 5833:이벤트
    try {
      const params = {
        by: 'ADMIN_SETTING',
        soldout: true,
        pageNumber: 1,
        pageSize: 30,
      };
      const recommendedRequest = {
        pathParams: {
          sectionNo: 5742,
        },
        params,
      };
      const eventRequest = {
        pathParams: {
          sectionNo: 5833,
        },
        params,
      };
      const { data } = await getDisplaySectionsSectionNo(recommendedRequest);
      setRecommendedSections(data[0].products);
      const eventResponse = await getDisplaySectionsSectionNo(eventRequest);
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
    if (recLeftSwiper && recRightSwiper && recLeftSwiper.controller && recRightSwiper.controller) {
      recLeftSwiper.controller.control = recRightSwiper;
      recRightSwiper.controller.control = recLeftSwiper;
    }
  }, [recRightSwiper, recLeftSwiper]);

  return (
    <>
      <SEOHelmet title={'메인'} />
      <div className="main">
        <div id="container" className="container">
          <div className="content main">
            {/* <!-- key visual --> */}
            <div
              className={`kv swiper-container ${mPointer !== 'none' && mPointer}`}
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
              {slidePcBanners.length > 0 && (
                <Swiper
                  className="swiper-wrapper"
                  onSwiper={setTopSwiper}
                  resizeObserver={true}
                  observer={true}
                  loop={true}
                  speed={600}
                  autoplay={{ delay: 6000, disableOnInteraction: true }}
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
                  {slidePcBanners.map((bannerInfo, index) => (
                    <SwiperSlide
                      key={index}
                      className="swiper-slide video-slide"
                      data-swiper-autoplay="10000"
                      style={{
                        backgroundImage:
                          bannerInfo.banners[0].videoUrl === '' && size.width > breakPoint
                            ? `url(${bannerInfo.banners[0].imageUrl})`
                            : `url(${slideMoBanners[index]?.banners[0]?.imageUrl})`,
                      }}
                    >
                      {bannerInfo.banners[0].videoUrl !== '' && (
                        <video className="video-slide-player" preload="true" autoPlay muted={true} playsInline>
                          <source
                            src={
                              size.width > breakPoint
                                ? bannerInfo.banners[0].videoUrl
                                : slideMoBanners[index].banners[0].videoUrl
                            }
                            type="video/mp4"
                          />
                        </video>
                      )}
                      <div className="kv__slide">
                        <div
                          className="kv__head"
                          dangerouslySetInnerHTML={{ __html: bannerInfo.banners[0].nameList }}
                        />
                        <span className="kv__product">
                          <span>{bannerInfo.banners[0].description}</span>
                        </span>
                        <Link
                          to={bannerInfo?.banners[0]?.landingUrl}
                          target={bannerInfo?.banners[0].browerTargetType === 'CURRENT' ? '_self' : '_blank'}
                          className="kv__link"
                          style={{ height: '80px' }}
                        >
                          <span>자세히 보기</span>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <div className="swiper-pagination" />
            </div>
            {/* <!-- // key visual --> */}

            {/* <!-- recommended --> */}
            <div className="recommend">
              <div className="recommend__bg__swiper swiper-container">
                {recommendedBanners.length > 0 && (
                  <Swiper
                    className="swiper-wrapper"
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
                        className="swiper-slide"
                        style={{ backgroundImage: `url(${recommendedBanner?.banners[0]?.imageUrl})` }}
                      />
                    ))}
                  </Swiper>
                )}
              </div>
              <div className="recommend__swiper swiper-container">
                {recommendedBanners.length > 0 && (
                  <Swiper
                    className="swiper-wrapper"
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
                  >
                    {recommendedBanners.map((recommendedBanner, index) => (
                      <SwiperSlide className="recommend__item swiper-slide" key={index}>
                        <Link
                          to={`product-view/${recommendedSections[index]?.productNo}`}
                          target={recommendedBanner?.banners[0]?.browerTargetType === 'CURRENT' ? '_self' : '_blank'}
                          onClick={(e) => {
                            if (window.innerWidth > breakPoint) {
                              if (e.currentTarget.parentElement.classList.contains('swiper-slide-next')) {
                                e.preventDefault();
                                recRightSwiper.slideNext();
                              }
                            }
                          }}
                        >
                          <span
                            className="recommend__item__copy"
                            dangerouslySetInnerHTML={{ __html: recommendedBanner.banners[0].nameList }}
                          />
                          <div className="recommend__item__pic" style={{ minHeight: '384px', textAlign: 'center' }}>
                            <img
                              src={recommendedSections[index]?.listImageUrls[0]}
                              alt={`"${recommendedBanner?.banners[0]?.name}"`}
                            />
                          </div>
                          <span className="recommend__item__desc">{recommendedSections[index]?.productName}</span>
                          <span className="recommend__item__name">{recommendedSections[index]?.productNameEn}</span>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                <div className="swiper-scrollbar rec-scrollbar" style={{ position: 'absolute' }} />
              </div>
            </div>
            {/* <!-- // recommended --> */}

            {/* <!-- event --> */}
            <div className="event">
              <h2 className="event__title">EVENT</h2>
              <div className="event__list">
                <div
                  className="event__wrapper"
                  style={{
                    backgroundImage:
                      size.width > breakPoint
                        ? `url(/images/_tmp/main_event_bg_pc1.png)`
                        : `url(/images/_tmp/main_event_bg_mo1.png)`,
                  }}
                >
                  <div className="event__main__info">
                    <div className="event__copy">
                      <p className="event__copy__head">
                        {eventSections?.label?.split('/').map((eventLabel, index) => (
                          <span key={index}>{eventLabel}</span>
                        ))}
                      </p>
                      <p className="event__copy__desc">{eventSections?.sectionExplain}</p>
                    </div>
                  </div>
                  <div className="event__main swiper-container">
                    <button type="button" className="swiper-button-prev" />
                    {eventSections?.products?.length > 0 && (
                      <Swiper
                        className="swiper-wrapper"
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
                        {eventSections?.products?.map((eventSection, index) => (
                          <SwiperSlide className="swiper-slide" key={index}>
                            <Link to={`product-view/${eventSection.productNo}`} style={{ textAlign: 'center' }}>
                              <img src={eventSection?.listImageUrls[0]} alt="상품명" />
                            </Link>
                            <div className="event__main__inner">
                              <div className="event__product">
                                <span className="event__product__name">{eventSection.productNameEn}</span>
                                <span className="event__product__price">{wonComma(eventSection.salePrice)}</span>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                    <button type="button" className="swiper-button-next" />
                  </div>
                </div>
                <div className="event__sub swiper-container">
                  {eventBanners.length > 0 && (
                    <Swiper
                      className="swiper-wrapper"
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
                    >
                      {eventBanners.map((eventBanner, index) => (
                        <SwiperSlide
                          key={index}
                          className="swiper-slide"
                          style={{ backgroundImage: `url("${eventBanner?.banners[0]?.imageUrl}")` }}
                        >
                          <Link
                            to={eventBanner?.banners[0].landingUrl}
                            target={eventBanner?.banners[0]?.browerTargetType === 'CURRENT' ? '_self' : '_blank'}
                          >
                            <div className="event__sub__inner">
                              <p className="event__copy__head">
                                {eventBanner?.banners[0]?.name?.split('/')?.map((bannerName, index) => (
                                  <span key={index}>{bannerName}</span>
                                ))}
                              </p>
                              <p className="event__copy__desc">{eventBanner?.banners[0]?.description}</p>
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                  <div className="swiper-scrollbar event-scrollbar" style={{ position: 'absolute' }} />
                </div>
              </div>
              <Link to="event/list" className="btn__event__more">
                더 보러 가기
              </Link>
            </div>
            {/* <!-- // event --> */}

            {/* <!-- product --> */}
            <div className="main__product">
              <h2 className="main__product__title">PRODUCT</h2>
              <div className="main__product__inner">
                <ul className="main__product__lists">
                  <li className="main__product__list camera">
                    <Link to="/products/camera">Camera</Link>
                  </li>
                  <li className="main__product__list vcamera">
                    <Link to="/products/videocamera">Video Camera</Link>
                  </li>
                  <li className="main__product__list audio">
                    <Link to="/products/audio">Audio</Link>
                  </li>
                  <li className="main__product__list ps">
                    <Link to="/products/playstation">PlayStation®</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- // product --> */}

            {/* <!-- academy banner --> */}
            {academyPcBanners?.banners && academyMoBanners?.banners && (
              <div
                className="main__banner"
                style={{
                  backgroundImage:
                    size.width > breakPoint
                      ? `url(${academyPcBanners?.banners[0]?.imageUrl})`
                      : `url(${academyMoBanners?.banners[0]?.imageUrl})`,
                }}
              >
                <div className="main__banner__inner">
                  <h2
                    className="main__banner__title"
                    dangerouslySetInnerHTML={{ __html: academyPcBanners?.banners[0]?.nameList }}
                  />
                  <Link
                    className="main__banner__link"
                    to={academyPcBanners.banners[0]?.landingUrl}
                    target={academyPcBanners?.banners[0]?.browerTargetType === 'CURRENT' ? '_self' : '_blank'}
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            )}
            {/* // academy banner */}

            {/* customer service */}
            <div className="main__help">
              <h2 className="main__help__title">
                무엇을
                <br />
                도와드릴까요?
              </h2>
              <ul className="main__help__lists">
                <li className="main__help__list notice">
                  <Link to="/notice">공지사항 & FAQ</Link>
                </li>
                <li className="main__help__list location">
                  <Link to="/store-info">매장안내</Link>
                </li>
                <li className="main__help__list customer">
                  <a>고객센터</a>
                </li>
                <li className="main__help__list service">
                  <a href="https://www.sony.co.kr/electronics/support">제품지원</a>
                </li>
              </ul>
            </div>
            {/* customer service */}
          </div>
        </div>
      </div>
    </>
  );
}
