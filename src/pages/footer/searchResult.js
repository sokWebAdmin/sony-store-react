import { React, useEffect, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/category.scss"

//lib
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"

//utils
import {useWindowSize} from '../../utils/utils'

export default function SearchResult() {

    const size = useWindowSize();

    const [tabState, setTabState] = useState("total");


    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
    
    return (
        <>
        <SEOHelmet title={"검색 결과 페이지"} />
        <div className="contents category">

        <div className="container">
  <div className="content no_margin">{/* 검색 영역 페이지에 no_margin 클래스 추가 */}
    {/* 검색 결과 영역 */}
    <div className="searchResult">
      <div className="searchResult__form">
        <form>
          <label htmlFor="search-input">검색결과</label>
          <input type="text" id="search-input" className="input-txt" defaultValue="헤드폰" />
          <button type="button" className="btn_search" title="검색">검색</button>
        </form>
      </div>
      <div className="result-message">
        <p>
          <strong>‘헤드폰’</strong>에 대한 검색결과는 총 <strong>79</strong>건 입니다.
        </p>
      </div>
    </div>
    {/*// 검색 결과 영역 */}
    {/* 스와이퍼 탭영역 */}
        { 
            size.width < 1281 ?
            <div className="swipe_tab swiper-container">

        <Swiper className="swiper-wrapper"
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }}
        slidesPerView="auto"
        freeMode={true}
      >
        <SwiperSlide className="active swiper-slide">
          <a href="#">전체 (79)</a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <a href="#">제품 (60)</a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <a href="#">기획전 (6)</a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <a href="#">카테고리 (14)</a>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <a href="#">공지사항 (2)</a>
        </SwiperSlide>
        </Swiper>
      <div className="swiper-button-prev">
      <a href="#" title="메뉴 더보기">메뉴 더보기</a>
    </div>
    <div className="swiper-button-next">
      <a href="#" title="메뉴 더보기">메뉴 더보기</a>
    </div>
  </div>
        :
<div class="swipe_tab swiper-container">
        <ul class="swiper-wrapper">
          <li class="active swiper-slide">
            <a href="#">전체 (79)</a>
          </li>
          <li class="swiper-slide">
            <a href="#">제품 (60)</a>
          </li>
          <li class="swiper-slide">
            <a href="#">기획전 (6)</a>
          </li>
          <li class="swiper-slide">
            <a href="#">카테고리 (14)</a>
          </li>
          <li class="swiper-slide">
            <a href="#">공지사항 (2)</a>
          </li>
        </ul>
        <div class="swiper-button-prev">
          <a href="#" title="메뉴 더보기">메뉴 더보기</a>
        </div>
        <div class="swiper-button-next">
          <a href="#" title="메뉴 더보기">메뉴 더보기</a>
        </div>
      </div>

        }
      

    {/*//스와이퍼 탭영역 */}
    {/* 제품 리스트 영역 */}
    <div className="product">
      <div className="section_top">
        <h2 className="title">제품<span>(60)</span></h2>
        <div className="itemsort" aria-label="상품 정렬">
          <button className="itemsort__button">
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">최신순</span>
          </button>
          <div className="itemsort__drawer">
            <ul className="itemsort__items">
              <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
              <li className="itemsort__item"><a href="#" className="itemsort__item__link">높은 가격순</a></li>
              <li className="itemsort__item"><a href="#" className="itemsort__item__link">낮은 가격순</a></li>
            </ul>
          </div>
        </div>      </div>
      {/* item-list */}
      <div className="product__list product__list--lite">
        {/* item */}
        <div className="product">
          <span className="badge__text badge__text__best">BEST</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_01.png" alt="상품1 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_02.png" alt="상품1 색상2" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_03.png" alt="상품1 색상3" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code="ffffff">
              <span className="colorchip__item__label">
                <span className="sr-only">화이트</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M7 Worldcup Special Edition</strong>
            <span className="badge__label badge__label__reserve">예약판매</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__event">EVENT</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_02.png" alt="상품2 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_03.png" alt="상품2 색상2" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_04.png" alt="상품2 색상3" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code="ffffff">
              <span className="colorchip__item__label">
                <span className="sr-only">화이트</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M8</strong>
            <span className="badge__label badge__label__release">출시예정</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라  Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          </a>
          <div className="product__price">
            <span className="product__price__num">2,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__hot">HOT</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_03.png" alt="상품3 색상1" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip" />
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M9</strong>
            <span className="badge__label badge__label__outofstock">일시품절</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_04.png" alt="상품4 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_05.png" alt="상품4 색상2" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_06.png" alt="상품4 색상3" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code="ffffff">
              <span className="colorchip__item__label">
                <span className="sr-only">화이트</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M10</strong>
            <span className="badge__label badge__label__soldout">품절</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__best">BEST</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_05.png" alt="상품5 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_06.png" alt="상품5 색상2" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M11</strong>
            <span className="badge__label badge__label__outofstock">일시품절</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__hot">HOT</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_06.png" alt="상품6 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_01.png" alt="상품6 색상2" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_02.png" alt="상품6 색상3" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code="ffffff">
              <span className="colorchip__item__label">
                <span className="sr-only">화이트</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M12</strong>
            <span className="badge__label badge__label__soldout">품절</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__best">BEST</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_01.png" alt="상품1 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_02.png" alt="상품1 색상2" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_03.png" alt="상품1 색상3" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code="ffffff">
              <span className="colorchip__item__label">
                <span className="sr-only">화이트</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M7 Worldcup Special Edition</strong>
            <span className="badge__label badge__label__reserve">예약판매</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__event">EVENT</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_02.png" alt="상품2 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_03.png" alt="상품2 색상2" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_04.png" alt="상품2 색상3" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code="ffffff">
              <span className="colorchip__item__label">
                <span className="sr-only">화이트</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M8</strong>
            <span className="badge__label badge__label__release">출시예정</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라  Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          </a>
          <div className="product__price">
            <span className="product__price__num">2,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__hot">HOT</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_03.png" alt="상품3 색상1" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip" />
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M9</strong>
            <span className="badge__label badge__label__outofstock">일시품절</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_04.png" alt="상품4 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_05.png" alt="상품4 색상2" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_06.png" alt="상품4 색상3" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code="ffffff">
              <span className="colorchip__item__label">
                <span className="sr-only">화이트</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M10</strong>
            <span className="badge__label badge__label__soldout">품절</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__best">BEST</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_05.png" alt="상품5 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_06.png" alt="상품5 색상2" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M11</strong>
            <span className="badge__label badge__label__outofstock">일시품절</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
        <div className="product">
          <span className="badge__text badge__text__hot">HOT</span>
          <div className="product__pic">
            <a href="#" className="product__pic__link">
              <img src="/images/_tmp/item640x640_06.png" alt="상품6 색상1" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_01.png" alt="상품6 색상2" className="product__pic__img" />
              <img src="/images/_tmp/item640x640_02.png" alt="상품6 색상3" className="product__pic__img" />
            </a>
          </div>
          <div className="colorchip">
            <span className="sr-only">전체 색상</span>
            <span className="colorchip__item" data-color-code={"000000"}>
              <span className="colorchip__item__label">
                <span className="sr-only">블랙</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code={"666666"}>
              <span className="colorchip__item__label">
                <span className="sr-only">그레이</span>
              </span>
            </span>
            <span className="colorchip__item" data-color-code="ffffff">
              <span className="colorchip__item__label">
                <span className="sr-only">화이트</span>
              </span>
            </span>
          </div>
          <a href="#" className="product__title">
            <strong className="product__title__name">DSC-RX100M12</strong>
            <span className="badge__label badge__label__soldout">품절</span>
          </a>
          <a href="#" className="product__info">
            세계 최고의 AF 속도(0.02초)의 리얼 타임 Eye-AF 지원 APS-C 카메라
          </a>
          <div className="product__price">
            <span className="product__price__num">1,890,900</span>
            <span className="product__price__unit">원</span>
          </div>
        </div>
      </div>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      {/* 기획전 리스트 영역 */}
      <div className="section_top">
        <h2 className="title">기획전<span>(6)</span></h2>
        <div className="itemsort" aria-label="게시판 정렬">
          <button className="itemsort__button">
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">최신순</span>
          </button>
          <div className="itemsort__drawer">
            <ul className="itemsort__items">
              <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
              <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된순</a></li>
            </ul>
          </div>
        </div>      </div>
      <ul className="product_List grid">
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img04.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">5월의 선물</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img05.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">톡톡, 우리 친구할까요?</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img06.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">다시, 음악의 계절</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img07.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">눈부신너의 스무 살을 축하해</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img08.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">산뜻한 일상의 시작 올인원 스피커<br />CMT-X3CD</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="grid_inner">
            <div className="grid_img">
              <a href="#none">
                <img src="/images/_tmp/@tmp_img09.png" alt="" />
              </a>
            </div>
            <dl className="grid_info">
              <dt><a href="#none">소니스토어 압구정 디퓨저 사운드<br />스피커 청음 이벤트</a></dt>
              <dd>2021. 05. 10 ~ 2021. 05. 23</dd>
            </dl>
          </div>
        </li>
      </ul>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="기획전 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      {/*// 기획전 리스트 영역 */}
      {/* 카테고리 리스트 영역 */}
      <div className="section_top">
        <h2 className="title">카테고리<span>(60)</span></h2>
      </div>
      <div className="result_list">
        <ul className="category">
          <li>
            <a href="#none">
              <span>제품</span><span>오디오</span><span>헤드폰/이어폰</span><strong className="keword">헤드폰 엠프</strong>
            </a>
          </li>
          <li>
            <a href="#none">
              <span>제품</span><span>오디오</span><span>헤드폰/이어폰</span><strong className="keword">헤드폰 엠프헤드폰 엠프헤드폰 엠프</strong>
            </a>
          </li>
          <li>
            <a href="#none">
              <span>제품</span><span>오디오</span><span>헤드폰/이어폰</span><strong className="keword">헤드폰 엠프헤드폰</strong>
            </a>
          </li>
        </ul>
      </div>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="카테고리 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      {/* 카테고리 리스트 영역 */}
      {/* 공지사항 리스트 영역 */}
      <div className="section_top">
        <h2 className="title">공지사항<span>(5)</span></h2>
        <div className="itemsort" aria-label="게시판 정렬">
          <button className="itemsort__button">
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">최신순</span>
          </button>
          <div className="itemsort__drawer">
            <ul className="itemsort__items">
              <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
              <li className="itemsort__item"><a href="#" className="itemsort__item__link">오래된순</a></li>
            </ul>
          </div>
        </div>      </div>
      <div className="result_list">
        <ul className="noti">
          <li>
            <a href="#none">
              <span className="num">29240</span>
              <span className="tit">아이유와 함께하는 MDR HRA <strong className="keword">헤드폰</strong> 정품등록 이벤트 당첨자 발표</span>
              <span className="date">2015. 08. 11</span>
            </a>
          </li>
          <li>
            <a href="#none">
              <span className="num">29240</span>
              <span className="tit">소니 <strong className="keword">헤드폰</strong> 썸머 페스티발 당첨자 발표</span>
              <span className="date">2015. 08. 11</span>
            </a>
          </li>
        </ul>
      </div>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="공지사항 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      {/* 공지사항 리스트 영역 */}
    </div>
  </div>
</div>
</div>


        </>
    );
}