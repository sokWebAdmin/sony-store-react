
import { React ,useState, useEffect, useContext, useCallback, useMemo } from 'react';

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
import { getProductDetail, getProductOptions } from "../../api/product";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/product.scss"

//context
import GlobalContext from '../../context/global.context';

//util
import { wonComma } from '../../utils/utils';
import {useWindowSize} from '../../utils/utils'
import { Link, useHistory } from "react-router-dom";
import CountBox from '../../components/common/CountBox';
import _, { sum } from 'lodash';
import SelectBox from '../../components/common/SelectBox';
import qs from 'qs';
import { postOrderSheets } from '../../api/order';
import { getInfoLinks, getMainSliderStyle, mapContents } from './utils';
import MainImage from './productView/MainImage';

//image


export default function ProductView({ match }) {
  const history = useHistory();

  const {onChangeGlobal, isLogin} = useContext(GlobalContext)
  const { productNo } = match.params;

  //ui
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabState, setTabState] = useState('intro');

  //data
  const [productData, setProductData] = useState();
  const [productOptions, setProductOptions] = useState();
  const [selectedOption, setSelectedOption] = useState([]);
  const [contents, setContents] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const size = useWindowSize();

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  useEffect(()=>{
    const header = document.getElementsByClassName("header").clientHeight;
    setHeaderHeight(header);
  },[]);

  // product init data

  const mapProductData = useCallback(([productData, optionData]) => {
    setProductData(productData);
    setProductOptions(optionData);
    setContents(mapContents(productData.baseInfo));
  }, [])

  const fetchProductData = useCallback(async (productNo) => {
    const ret = await  Promise.all([
      getProductDetail(productNo),
      getProductOptions(productNo),
    ]);
    mapProductData(ret.map(({ data }) => data));
  }, [mapProductData]);

  useEffect(() => fetchProductData(productNo), [fetchProductData, productNo]);

  //
  const showProductDetail = useMemo(() => (headerHeight > 0 || size.height < 1280) && productData, [headerHeight, size.height, productData] )

    return (
      <>        
        <SEOHelmet title={"상품 상세"} />
        <div className="contents product">
        {
          showProductDetail &&
          <div className="product_view_wrap" style={{backgroundColor:"#fff"}}>
            <div className="product_view_main">
              <div className="prd_main_slider" style={getMainSliderStyle(size)}>
                <div className="view_slider swiper-container">
                  { productData.baseInfo.imageUrls && <MainImage imageUrls={ productData.baseInfo.imageUrls } /> }
                </div>
              </div>
              <form>
                <div className="product_view_about">{/* class :  soldout-품절, restock-재입고 텍스트 색상 변경을 위함 */}
                  <div className="cont">
                    <span className="flag new">NEW</span>{/* class : new / event / best / hot */}
                    <p className="product_tit">{productData.baseInfo.productName}</p>
                    {productData.baseInfo.productNameEn &&
                        <p className="product_txt">{productData.baseInfo.productNameEn}</p>
                    }
                    {/* <p className="product_desc">이 제품은 예약 주문 상품으로 구매 후 1주일 뒤에 발송됩니다</p> */}
                    <ul className="social_list">
                      <li className="share"><a  className="ico_btn" data-popup="popup_share">공유하기</a></li>
                    </ul>
                  </div>
                  <div className="cont">
                    <p className="delivery_txt">
                      {productData.deliveryFee.deliveryConditionType == "FREE" ? "무료배송" : ""}
                      </p>
                    <p className="product_price"><strong className="price">{wonComma(productData.price.salePrice)}</strong> 원</p>
                  </div>
                  <div className="cont line">
                    <p className="tit">회원별 마일리지 적립혜택 <span className="icon_question">!</span></p>
                    <ul className="membership_rating">
                      <li className="vvip">{/* class 별 등급 색상 지정 vvip / vip / family */}
                        <span className="mark">VV</span>
                        <div className="save_info">
                          <span className="percentage">VVIP 8%</span>
                          <p className="mileage"><span className="num">{wonComma(productData.price.salePrice * 0.08)}</span> P</p>
                        </div>
                      </li>
                      <li className="vip">
                        <span className="mark">V</span>
                        <div className="save_info">
                          <span className="percentage">VIP 4%</span>
                          <p className="mileage"><span className="num">{wonComma(productData.price.salePrice * 0.04)}</span> P</p>
                        </div>
                      </li>
                      <li className="family">
                        <span className="mark">M</span>
                        <div className="save_info">
                          <span className="percentage">MEMBERSHIP 2%</span>
                          <p className="mileage"><span className="num">{wonComma(productData.price.salePrice * 0.02)}</span> P</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="cont line">
                    <div className="color_select">
                      <p className="tit">색상</p>
                      <ul className="circle_color_box">
                        <li className="on">
                          <a  className="color_btn">
                            <span className="circle_color">
                              <span className="c_bg" data-slide-img-type="fc5227" style={{background: '#fc5227'}} />
                            </span>
                            <span className="color_name">오렌지</span>
                          </a>
                        </li>
                        <li>
                          <a  className="color_btn">
                            <span className="circle_color">
                              <span className="c_bg" data-slide-img-type="f7f5f5" style={{background: '#f7f5f5'}} />
                            </span>
                            <span className="color_name">화이트</span>
                          </a>
                        </li>
                        <li>
                          <a  className="color_btn">
                            <span className="circle_color">
                              <span className="c_bg" data-slide-img-type="1b8faa" style={{background: '#1b8faa'}} />
                            </span>
                            <span className="color_name">블루</span>
                          </a>
                        </li>
                        <li>
                          <a  className="color_btn">
                            <span className="circle_color">
                              <span className="c_bg" data-slide-img-type={222222} style={{background: '#222'}} />
                            </span>
                            <span className="color_name">블랙</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                  {/* prd_select_wrap */}
                  <div className="cont prd_select_wrap">
                    <div className="prd_select_inner">


                            <>
                              <div className="prd_select_box">
                                <p className="tit">제품선택</p>

                                  <SelectBox 
                                    selectOptions={productOptions?.flatOptions.map(o => ({...o, disabled: o.forcedSoldOut})) ?? []}
                                    selectOption={option => {
                                      setSelectedOption(prev => prev.concat({
                                        ...option,
                                        buyCnt: 1,
                                      }));
                                      setTotalCnt(totalCnt + 1);
                                      setTotalPrice(totalPrice + option.buyPrice);
                                    }}
                                  />
                                  
                              </div>
                            </>
                        

                      <div className="selected_opt"> {/* 선택한 제품 */}
                        

                  {selectedOption.length > 0 &&
                                  selectedOption.map((item, itemIndex) => {
                      return (<>
                    <div className="opt_info" key={itemIndex}>
                      <p className="opt_tag">제품</p>
                    <div className="opt_item">
                      <div className="item">
                        <span className="opt_name">{item.label}</span>
                      </div>
                      {/* <div className="item">
                        <span className="opt_name">WF-SP800N / 화이트</span>
                      </div> */}
                    </div>
                    <div className="opt_count">
                      <CountBox 
                        initialCount={item?.buyCnt}
                        maxCount={item.stockCnt}
                        changedCount={currentCount => {
                          if (!currentCount) return;
                          const { buyCnt: prevBuyCnt, buyPrice } = selectedOption[itemIndex];

                          const tempOptionList = selectedOption;
                          tempOptionList[itemIndex] = {
                            ...item,
                            buyCnt: currentCount,
                          };
                          
                          setSelectedOption(() => tempOptionList);

                          setTotalCnt(
                            () => _.chain(tempOptionList)
                                    .map(({ buyCnt }) => buyCnt)
                                    .sum()
                                    .value()
                          )
                          setTotalPrice(() => totalPrice - (prevBuyCnt * buyPrice) + (currentCount * buyPrice))
                        }}
                      />
                      
                      <p className="opt_price"><strong className="price">{wonComma(item.buyPrice * item.buyCnt)}</strong>원</p>
                    </div>
                    <a href="#delete" className="prd_delete" onClick={ event => {
                    
                      event.preventDefault();
                      const tempOptionList = selectedOption.filter(({ optionNo }) => optionNo !== item.optionNo)
                    
                      setTotalCnt(totalCnt - item.buyCnt);
                      setTotalPrice(totalPrice - (item.buyCnt * item.buyPrice));

                      setSelectedOption(tempOptionList)
                      
                    }}>구매 목록에서 삭제</a>
                  </div>  
                      </>
                      )
                    })
                  }
                    
                      </div>
                    </div>
                    <div className="result_list">
                      <div className="result_chk_box">
                        <p className="tit">총 상품금액 <span className="s_txt">(총 <span className="count">{totalCnt > 0 ? totalCnt : "-"}</span>개)</span></p>
                        <p className="result_price"><span className="num">{totalPrice > 0 ? wonComma(totalPrice) : "-"}</span> 원</p>
                      </div>
                    </div>
                    <div className="result_btn_inner">
                      <div className="result_btn_box">
                        <ul>
                          <li className="like"><a  className="btn_icon">찜하기</a></li>
                          <li className="cart"><a  onClick={()=>{history.push('/cart')}} className="btn_icon" data-popup="popup_cart">장바구니</a></li>
                          <li className="gift"><a  className="btn_icon" data-popup="popup_gift">선물</a></li>
                          <li className="final">
                            <Link to="/order/step/1" onClick={ async ( event) => {

                              if (isLogin) {

                              } else {

                                event.preventDefault();
                                const response = await postOrderSheets({
                                  productCoupons: null,
                                  trackingKey: null,
                                  cartNos: null,
                                  channelType: null,
                                  products: selectedOption.map(p => ({
                                    channelType: null,
                                    orderCnt: p.buyCnt,
                                    optionInputs: null,
                                    optionNo: p.optionNo,
                                    productNo: productNo
                                  }))
                                });

                                history.push({
                                  pathname: '/order/step/1',
                                  search: '?' + qs.stringify(response.data)
                                });

                              }
                              
                            }} className="btn_style direct" style={{backgroundColor: '#000'}}>바로 구매하기</Link>
                            <a  className="btn_style disabled" style={{display: 'none', backgroundColor: '#ddd'}}>품절</a>
                            <a  className="btn_style reservation" style={{display: 'none', backgroundColor: '#5865F5'}}>예약구매</a>
                            {/*
                          * 버튼 참고
                          btn_style : 기본 버튼 스타일
                          class 추가
                          direct : 바로 구매하기
                          disabled : 일시 품절, 품절 (선택불가)
                          reservation : 예약구매, 재입고 알림 신청
                        */}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <a  className="select_closed" title="선택 목록 닫기">닫기</a>
                  </div>
                  {/* 네이버 임시 */}
                  {/* <div className="cont naver" style={{marginTop: '24px', paddingTop: 0}}>
                    <img src="/images/product/naver_btn.png" alt="" style={{width: '100%'}} />
                  </div> */}
                </div>
              </form>
            </div>
            {/* 함께 구매하시면 좋은 추천 제품 */}
            <div className="product_cont first recommend">
              <div className="slide_box together_prd_slider swiper-container">
              <h2 className="title">함께 구매하시면 좋은 추천 제품</h2>
              <Swiper className="swiper-wrapper product_List"
              slidesPerView={2}
              spaceBetween={10}
              navigation={{
                nextEl : '.swiper-button-next',
                prevEl : '.swiper-button-prev',
              }}
              breakpointsinverse={"true"}
              breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10
                  },
                  1200: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  }
              }}
              >
                <SwiperSlide className="swiper-slide">
                  <div className="product_tabArea">
                    {/* 상품 이미지*/}
                    <div className="product_img">
                      <a  onClick={()=>{history.push('/product-view/1')}}>
                        <div className="img-box">
                          <div className="inner">
                            <img src="/images/_tmp/item640x640_06.png" alt="" />
                          </div>
                        </div>
                      </a>
                    </div>
                    {/*// 상품 이미지*/}
                    {/* 상품 이름*/}
                    <div className="product-name">
                      <div className="product-option">
                      <a  onClick={()=>{history.push('/product-view/1')}}>
                          <strong>SEL50F25G</strong>
                          <p>원핸드 컴팩트 풀프레임</p>
                        </a>
                        <div className="price">
                          <strong>899,000</strong>원
                        </div>
                      </div>
                    </div>
                    {/*// 상품 이름*/}
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="product_tabArea">
                    {/* 상품 이미지*/}
                    <div className="product_img">
                    <a  onClick={()=>{history.push('/product-view/1')}}>
                        <div className="img-box">
                          <div className="inner">
                            <img src="/images/_tmp/item640x640_05.png" alt="" />
                          </div>
                        </div>
                      </a>
                    </div>
                    {/*// 상품 이미지*/}
                    {/* 상품 이름*/}
                    <div className="product-name">
                      <div className="product-option">
                      <a  onClick={()=>{history.push('/product-view/1')}}>
                          <strong>SEL50F25G</strong>
                          <p>원핸드 컴팩트 풀프레임 G 렌즈원핸드 컴팩트 풀프레임 G 렌즈
                            원핸드 컴팩트 풀프레임
                            원핸드 컴팩트 풀프레임</p>
                        </a>
                        <div className="price">
                          <strong>899,000</strong>원
                        </div>
                      </div>
                    </div>
                    {/*// 상품 이름*/}
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="product_tabArea">
                    {/* 상품 이미지*/}
                    <div className="product_img">
                    <a  onClick={()=>{history.push('/product-view/1')}}>
                        <div className="img-box">
                          <div className="inner">
                            <img src="/images/_tmp/item640x640_04.png" alt="" />
                          </div>
                        </div>
                      </a>
                    </div>
                    {/*// 상품 이미지*/}
                    {/* 상품 이름*/}
                    <div className="product-name">
                      <div className="product-option">
                      <a  onClick={()=>{history.push('/product-view/1')}}>
                          <strong>SEL50F25G</strong>
                          <p>원핸드 컴팩트 풀프레임 G 렌즈
                            원핸드 컴팩트 풀프레임</p>
                        </a>
                        <div className="price">
                          <strong>899,000</strong>원
                        </div>
                      </div>
                    </div>
                    {/*// 상품 이름*/}
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="product_tabArea">
                    {/* 상품 이미지*/}
                    <div className="product_img">
                    <a  onClick={()=>{history.push('/product-view/1')}}>
                        <div className="img-box">
                          <div className="inner">
                            <img src="/images/_tmp/item640x640_03.png" alt="" />
                          </div>
                        </div>
                      </a>
                    </div>
                    {/*// 상품 이미지*/}
                    {/* 상품 이름*/}
                    <div className="product-name">
                      <div className="product-option">
                      <a  onClick={()=>{history.push('/product-view/1')}}>
                          <strong>SEL50F25G</strong>
                          <p>원핸드 컴팩트 풀프레임 G 렌즈
                            원핸드 컴팩트 풀프레임</p>
                        </a>
                        <div className="price">
                          <strong>899,000</strong>원
                        </div>
                      </div>
                    </div>
                    {/*// 상품 이름*/}
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="product_tabArea">
                    {/* 상품 이미지*/}
                    <div className="product_img">
                    <a  onClick={()=>{history.push('/product-view/1')}}>
                        <div className="img-box">
                          <div className="inner">
                            <img src="/images/_tmp/item640x640_02.png" alt="" />
                          </div>
                        </div>
                      </a>
                    </div>
                    {/*// 상품 이미지*/}
                    {/* 상품 이름*/}
                    <div className="product-name">
                      <div className="product-option">
                      <a  onClick={()=>{history.push('/product-view/1')}}>
                          <strong>SEL50F25G</strong>
                          <p>원핸드 컴팩트 풀프레임 G 렌즈
                            원핸드 컴팩트 풀프레임</p>
                        </a>
                        <div className="price">
                          <strong>899,000</strong>원
                        </div>
                      </div>
                    </div>
                    {/*// 상품 이름*/}
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="product_tabArea">
                    {/* 상품 이미지*/}
                    <div className="product_img">
                      <a >
                        <div className="img-box">
                          <div className="inner">
                            <img src="/images/_tmp/item640x640_01.png" alt="" />
                          </div>
                        </div>
                      </a>
                    </div>
                    {/*// 상품 이미지*/}
                    {/* 상품 이름*/}
                    <div className="product-name">
                      <div className="product-option">
                      <a  onClick={()=>{history.push('/product-view/1')}}>
                          <strong>SEL50F25G</strong>
                          <p>원핸드 컴팩트 풀프레임 G 렌즈
                            원핸드 컴팩트 풀프레임</p>
                        </a>
                        <div className="price">
                          <strong>899,000</strong>원
                        </div>
                      </div>
                    </div>
                    {/*// 상품 이름*/}
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="swiper-button-next">다음</div>
              <div className="swiper-button-prev">이전</div>
            </div>
            </div>
            {/* 기획전 배너 슬라이드 + SNS 이동 배너 */}
            <div className="product_cont full">
              {/* 기획전 이벤트 배너 */}
              {/* 기획전 슬라이드 */}
              <div className="exhibitions_slider swiper-container">
                <Swiper className="swiper-wrapper"
                  navigation={{
                    nextEl : '.banner-next',
                    prevEl : '.banner-prev',
                  }}>
                  <SwiperSlide className="swiper-slide">
                    <div className="exhibitions_box" style={{background: `url("/images/product/banner_thumb_01.png") no-repeat center top`}}>
                      <img className="bg_img" src="/images/product/banner_thumb_01.png" alt="" />{/* 슬라이드 배경 */}
                      <div className="txt_box">
                        <span className="tag" style={{color: '#5865f5'}}>기획전</span>
                        <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                  <div className="exhibitions_box" style={{background: `url("/images/product/banner_thumb_01.png") no-repeat center top`}}>
                      <img className="bg_img" src="/images/product/banner_thumb_01.png" alt="" />
                      <div className="txt_box">
                        <span className="tag" style={{color: '#5865f5'}}>기획전</span>
                        <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                  <div className="exhibitions_box" style={{background: `url("/images/product/banner_thumb_01.png") no-repeat center top`}}>
                      <img className="bg_img" src="/images/product/banner_thumb_01.png" alt="" />
                      <div className="txt_box">
                        <span className="tag" style={{color: '#5865f5'}}>기획전</span>
                        <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className="arrow_btn">
                  <a className="arrow swiper-button-prev banner-prev"><img src="/images/common/arrow_19_34.png" alt="이전" /></a>
                  <a className="arrow swiper-button-next banner-next"><img src="/images/common/arrow_19_34.png" alt="다음" /></a>
                </div>
                <div className="swiper-pagination" />
              </div>
            </div>
          <div className="product_cont full">
            <div className="relation_link">
              <ul className="link_inner">
                {
                  getInfoLinks().map(({
                    name,
                    href,
                    imgUrl,
                    label
                  }) => (
                    <li key={ name }>
                      <a 
                        href={href} 
                        className="link_btn" 
                        rel="noreferrer"
                        target="_blank" 
                        title="새 창 열림"
                      >
                        <i className="ico">
                          <img src={ imgUrl } alt={ name } />
                        </i>
                        <span className="link_txt">{ label }</span>
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          {/* 제품 탭 정보 */}
          <div className="product_cont">
            <div className="detail_tab tab_ui size3">
              <ul>
                {
                  contents.map(
                    ({ tabName, label }) => (
                      <li key={`tab_${tabName}`} className={`tabs ${tabState === tabName && 'on'}`}>
                        <a 
                          className="btn"
                          href={`#${tabName}`} 
                          onClick={ event => {
                            event.preventDefault();
                            setTabState(tabName);
                          }}
                        >{ label }</a>
                      </li>
                    )
                  )
                }
              </ul>
            </div>
            <div className="detail_info_zone tab_ui_info">
              {
                contents.map(
                  ({ tabName, content }) => (
                    <div key={`tab_content_${tabName}`} className={`detail_info tab_ui_inner ${tabState === tabName && "view"}`}>
                      <div dangerouslySetInnerHTML={ {__html: content } }></div>
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
        }
      </div>
      </>  
    )
}