import { React, useEffect, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { productSearch } from "../../api/product";

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
import Product from '../../components/Product';

export default function SearchResult({match}) {
    const {keyword} = match.params;

    const size = useWindowSize();

    //ui
    const [tabState, setTabState] = useState("total");
    const [mobileOrderOpen, setMobileOrderOpen] = useState(false);

    //data
    const [productList, setProductList] = useState([]);
    const [exhibitionList, setExhibitionList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);

    //data-else
    const [productCount, setProductCount] = useState(0);
    const [exhibitionCount, setExhibitionCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [noticeCount, setNoticeCount] = useState(0);

    //keyword
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const [finalKeyword, setFinalKeyword] = useState(keyword);

    //sort
    const [orderBy, setOrderBy] = useState('RECENT_PRODUCT');

    const _productSearch = async(_keyword, _orderBy) => {
        const response = await productSearch(_keyword, _orderBy);
        if(response.status == 200){
          if(response.data.items){
            setProductList(response.data.items)
          }
          setProductCount(response.data.totalCount);          
        }

        console.log(response)
    }

    useEffect(()=>{
      _productSearch(finalKeyword, orderBy)
    },[finalKeyword, orderBy])


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
          <input type="text" id="search-input" className="input-txt" defaultValue={searchKeyword} onChange={(e)=>{
            setSearchKeyword(e.target.value)
          }} />
          <button type="button" className="btn_search" title="검색" onClick={()=>{
            _productSearch(searchKeyword)
            setFinalKeyword(searchKeyword)
          }}>검색</button>
        </form>
      </div>
      <div className="result-message">
        <p>
          <strong>‘{finalKeyword}’</strong>에 대한 검색결과는 총 <strong>{productCount + exhibitionCount + categoryCount + noticeCount}</strong>건 입니다.
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
        <SwiperSlide className={`swiper-slide ${tabState == "total" ? "active" : ""}`}>
          <a href="#" onClick={()=>{
            setTabState("total");
          }}>전체 ({productCount + exhibitionCount + categoryCount + noticeCount})</a>
        </SwiperSlide>
        <SwiperSlide className={`swiper-slide ${tabState == "product" ? "active" : ""}`}>
          <a href="#" onClick={()=>{
            setTabState("product");
          }}>제품 ({productCount})</a>
        </SwiperSlide>
        <SwiperSlide className={`swiper-slide ${tabState == "exhibition" ? "active" : ""}`}>
          <a href="#" onClick={()=>{
            setTabState("exhibition");
          }}>기획전 ({exhibitionCount})</a>
        </SwiperSlide>
        <SwiperSlide className={`swiper-slide ${tabState == "category" ? "active" : ""}`}>
          <a href="#" onClick={()=>{
            setTabState("category");
          }}>카테고리 ({categoryCount})</a>
        </SwiperSlide>
        <SwiperSlide className={`swiper-slide ${tabState == "notice" ? "active" : ""}`}>
          <a href="#" onClick={()=>{
            setTabState("notice");
          }}>공지사항 ({noticeCount})</a>
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
          <li className={`swiper-slide ${tabState == "total" ? "active" : ""}`}>
            <a href="#" onClick={()=>{
            setTabState("total");
          }}>전체 ({productCount + exhibitionCount + categoryCount + noticeCount})</a>
          </li>
          <li className={`swiper-slide ${tabState == "product" ? "active" : ""}`}>
            <a href="#" onClick={()=>{
            setTabState("product");
          }}>제품 ({productCount})</a>
          </li>
          <li className={`swiper-slide ${tabState == "exhibition" ? "active" : ""}`}>
            <a href="#" onClick={()=>{
            setTabState("exhibition");
          }}>기획전 ({exhibitionCount})</a>
          </li>
          <li className={`swiper-slide ${tabState == "category" ? "active" : ""}`}>
            <a href="#" onClick={()=>{
            setTabState("category");
          }}>카테고리 ({categoryCount})</a>
          </li>
          <li className={`swiper-slide ${tabState == "notice" ? "active" : ""}`}>
            <a href="#" onClick={()=>{
            setTabState("notice");
          }}>공지사항 ({noticeCount})</a>
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
                <div className="product">


    { (tabState == "total" || tabState == "product") &&
      <>
      <div className="section_top">
        <h2 className="title">제품<span>({productCount})</span></h2>
        <div className={`itemsort ${mobileOrderOpen ? "itemsort--open" : ""}`} aria-label="상품 정렬">
                    <button className="itemsort__button" onClick={()=>{
                        setMobileOrderOpen(!mobileOrderOpen)
                    }}>
                        <span className="itemsort__button__label sr-only">정렬기준:</span>
                        <span className="itemsort__button__selected">{orderBy == "RECENT_PRODUCT" ? "최신순" : (orderBy == "TOP_PRICE" ? "높은 가격순" : "낮은 가격순")}</span>
                    </button>
          <div className="itemsort__drawer">
                        <ul className="itemsort__items">
                        <li className={`itemsort__item ${orderBy == "RECENT_PRODUCT" ? "itemsort__item--active" : ""}`}><a href="#" className="itemsort__item__link" onClick={()=>{
                            setOrderBy("RECENT_PRODUCT")
                        }}>최신순</a></li>
                        <li className={`itemsort__item ${orderBy == "TOP_PRICE" ? "itemsort__item--active" : ""}`}><a href="#" className="itemsort__item__link" onClick={()=>{
                            setOrderBy("TOP_PRICE")
                        }}>높은 가격순</a></li>
                        <li className={`itemsort__item ${orderBy == "DISCOUNTED_PRICE" ? "itemsort__item--active" : ""}`}><a href="#" className="itemsort__item__link" onClick={()=>{
                            setOrderBy("DISCOUNTED_PRICE")
                        }}>낮은 가격순</a></li>
                        </ul>
                    </div>
        </div>      
        </div>
      {/* item-list */}
      <div className="product__list product__list--lite">
        {/* item */}
        {productList && productList.map((item, itemIndex) => {
          return(<Product product={item} />)
        })}

      </div>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      </>
    }

      {/* 기획전 리스트 영역 */}

      {
        (tabState == "total" || tabState == "exhibition") &&
          <>
      <div className="section_top">
        <h2 className="title">기획전<span>({exhibitionCount})</span></h2>
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
          </>
      }

{
        (tabState == "total" || tabState == "category") &&
          <>
                {/* 카테고리 리스트 영역 */}
      <div className="section_top">
        <h2 className="title">카테고리<span>({categoryCount})</span></h2>
      </div>
      <div className="result_list">
        <ul className="category">
          <li>
            <a href="#none">
              <span>제품</span><span>오디오</span><span>헤드폰/이어폰</span><strong className="keword">          엠프</strong>
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
          </>
}


{
        (tabState == "total" || tabState == "notice") &&
          <>
                {/* 공지사항 리스트 영역 */}
      <div className="section_top">
        <h2 className="title">공지사항<span>({noticeCount})</span></h2>
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
          </>
}
    </div>
  </div>
</div>
</div>


        </>
    );
}