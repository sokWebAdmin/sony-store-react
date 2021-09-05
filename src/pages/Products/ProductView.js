
import { React ,useState, useEffect, useContext } from 'react';

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
import { useHistory } from "react-router-dom";
import CountBox from '../../components/common/CountBox';
import _, { sum } from 'lodash';

//image

export default function ProductView({match}) {
  const history = useHistory();

  const {onChangeGlobal, shopByToken} = useContext(GlobalContext)
  const {product_no} = match.params;

  //ui
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabState, setTabState] = useState('intro');
  const [isOptionOpen, setOptionOpen] = useState(false);

  //data
  const [productData, setProductData] = useState();
  const [productOptions, setProductOptions] = useState();
  const [selectedOption, setSelectedOption] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const size = useWindowSize();

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  useEffect(()=>{
    const header = document.getElementsByClassName("header").clientHeight;
    setHeaderHeight(header);
  },[])
  
  const _getProductDetail = async(productNo) =>{
      const response = await getProductDetail(productNo);
      
      if(response.status == 200 && response.data){
        console.log(response)
        setProductData(response.data)
        _getProductOptions(productNo)
      }
  }

  const _getProductOptions = async(productNo) =>{
    const response = await getProductOptions(productNo);
    
    if(response.status == 200 && response.data){
      console.log(response)
      setProductOptions(response.data)
    }
}

  useEffect(()=>{
    _getProductDetail(product_no)
  },[])
  
    return (
      <>        
      <SEOHelmet title={"상품 상세"} />
      <div className="contents product">
      {
        (headerHeight != 0 || size.height < 1280) && productData &&
<div className="product_view_wrap" style={{backgroundColor:"#fff"}}>
        <div className="product_view_main">
          <div className="prd_main_slider" style={size.width > 1280 ? ( size.height - headerHeight < 500 ? {height: "500px", marginTop : (headerHeight/2)*-1} : {height: `${size.height}px`, marginTop : (headerHeight/2)*-1} ) : {display: "block"}}>
            <div className="view_slider swiper-container">
              <Swiper className="swiper-wrapper"
                loop={true}
                slidesPerView={1}
                pagination={{ 
                  el: '.preview-image-pagination',
                  clickable: true,
                  renderBullet: function (index, className) {
                    return '<span className="' + className + '">' + (index + 1) + '</span>';
                  }
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                >

                  {
                    productData.baseInfo.imageUrls && productData.baseInfo.imageUrls.map((image) =>{
                      return(<SwiperSlide className="swiper-slide"><img src={`https:${image}`} alt="" /></SwiperSlide>)
                    })
                  }
                {/*
              여러 색상일 경우.
              productView_colorType_fc5227_thumb_01 이미지 명 : colorType_ 와 _thumb 사이 값으로 교체. = fc5227
              .circle_color_box > .c_bg의 data-slide-img-type 값과 동일하게 적용.
            */}
              </Swiper>
              <div className="arrow_btn">
                <a className="arrow swiper-button-prev"><img src="/images/common/arrow_19_34.png" alt="이전" /></a>
                <a className="arrow swiper-button-next"><img src="/images/common/arrow_19_34.png" alt="다음" /></a>
              </div>
              <div className="swiper-pagination preview-image-pagination" />
            </div>
          </div>
          <form action>
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
                            <div className={`select_zone selectOn ${isOptionOpen ? "open" : ''}`}>
                              {/* 품절시 disabled class  */}
                              <a  className="selected_btn" data-default-text="제품을 선택하세요." onClick={
                                ()=>{
                                  setOptionOpen(!isOptionOpen)
                                }
                              }>{/* disabled : 선택불가 품절 */}
                                제품을 선택하세요.
                              </a>
                              <div className="select_inner" style={isOptionOpen ? {display:"block"} : {display:"none"}}>
                                <p className="prd_tag">제품</p>
                                <ul className="select_opt">
                                  {productOptions && productOptions.flatOptions.map(item => {
                                    return (<>
                                  <li key={item.optionNo}>
                                    <a  className="opt_list" onClick={()=>{
                                      let tempOptionList = selectedOption;
                                      if(tempOptionList.includes(item)){
                                        alert("이미 선택된 옵션입니다.");
                                        setOptionOpen(false);
                                        return;
                                      }

                                      item.buyCnt = 1;
                                      tempOptionList.push(item);
                                      setSelectedOption(tempOptionList)
                                      setOptionOpen(false)

                                      setTotalCnt(totalCnt + 1);
                                      setTotalPrice(totalPrice + item.buyPrice);
                                    }}>{/* disabled : 선택 불가 품절 */}
                                      <div className="item">
                                        {/* <span className="circle_color">
                                          <span className="c_bg" style={{background: '#fc5227'}} />
                                        </span> */}
                                        {/* <span className="opt_name">{item.label} <span>품절</span></span> */}
                                        <span className="opt_name">{item.label}</span>
                                      </div>
                                    </a>
                                  </li>
                                    </>)
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                    

                  <div className="selected_opt"> {/* 선택한 제품 */}
                    

              {selectedOption.length > 0 &&
                selectedOption.map((item, itemIndex) => {
                  return (<>
                <div className="opt_info">
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
                        <a  onClick={()=>{
                          //구매 로직 
                          if(shopByToken){
                            
                          }else{
                            alert("로그인 후 이용해주세요.")
                          }
                          
                        }} className="btn_style direct" style={{backgroundColor: '#000'}}>바로 구매하기</a>
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
              <div className="cont naver" style={{marginTop: '24px', paddingTop: 0}}>
                <img src="/images/product/naver_btn.png" alt="" style={{width: '100%'}} />
              </div>
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
            breakpointsInverse={true}
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
              <li>
                <a href="https://www.sony.co.kr/alpha/handler/NAlpha-Main" className="link_btn" target="_blank" title="새 창 열림">
                  <i className="ico"><img src="/images/product/ico__relation_alpha.png" alt="" /></i>
                  <span className="link_txt">소니 알파 사이트</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/user/sonystyleblog" className="link_btn" target="_blank" title="새 창 열림">
                  <i className="ico"><img src="/images/product/ico__relation_youtube.png" alt="" /></i>
                  <span className="link_txt">소니코리아 공식 유튜브</span>
                </a>
              </li>
              <li>
                <a href="https://www.sony.co.kr/electronics/support" className="link_btn" target="_blank" title="새 창 열림">
                  <i className="ico"><img src="/images/product/ico__relation_download.png" alt="" /></i>
                  <span className="link_txt">매뉴얼 다운로드</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* 제품 탭 정보 */}
        <div className="product_cont">
          <div className="detail_tab tab_ui size3">
            <ul>
              <li className={`tabs ${tabState=="intro" ? "on" : ""}`}><a className="btn" onClick={()=>{
                setTabState("intro")
              }}>제품 개요</a></li>
              <li className={`tabs ${tabState=="detail" ? "on" : ""}`}><a className="btn" onClick={()=>{
                setTabState("detail")
              }}>제품 상세</a></li>
              <li className={`tabs ${tabState=="terms" ? "on" : ""}`}><a className="btn" onClick={()=>{
                setTabState("terms")
              }}>배송/환불규정</a></li>
            </ul>
          </div>
          <div className="detail_info_zone tab_ui_info">
            {/* 제품 개요 */}
            <div className={`detail_info tab_ui_inner ${tabState=="intro" ? "view" : ""}`}>
               <div dangerouslySetInnerHTML={ {__html: productData.baseInfo.contentHeader} }>
               </div>
              
            </div>
            {/* 제품 상세 */}
            <div className={`detail_info tab_ui_inner ${tabState=="detail" ? "view" : ""}`}>
              <div dangerouslySetInnerHTML={ {__html: productData.baseInfo.content} }>
               </div>
            </div>
            {/* 배송/환불 규정 */}
            <div className={`detail_info tab_ui_inner ${tabState=="terms" ? "view" : ""}`}>
              <div className="detail_box">
                <h2 className="common__title h2">배송 / 환불 규정</h2>
                <h3 className="common__title h3">교환 / 반품 안내 및 보증 조건과 절차</h3>
                <div className="common__table__wrap">
                  <table className="common__table" role="presentation">
                    <caption>교환 / 반품 안내 및 보증 조건과 절차 등의 정보</caption>
                    <colgroup>
                      <col width="23.5%" />
                      <col width="76.5%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">교환 / 반품 기준</th>
                        <td>
                          <ul className="dot_list">
                            <li>고객 변심으로 인한 교환/반품은 상품을 수령하신 날로부터 7일 이내에 신청 가능합니다.</li>
                            <li>반품 시 제공된 사은품은 모두 회수하며 회수가 되지 않을 경우 교환/반품이 불가능합니다.</li>
                            <li>교환/환불 시 제품 특성에 따라 처리 소요시간이 상이할 수 있습니다.</li>
                            <li>교환은 동일한 상품만 가능하며, 다른 상품으로 교환을 원하실 경우 해당 상품을 주문취소 후 재주문하여 주시기 바랍니다.<br />(색상변경 포함)</li>
                            <li>전자상거래 등에서의 소비자 보호에 관한 법률로 규정되어 있는 소비자 청약철회 가능 범위에 해당하는 경우 신청 가능합니다.</li>
                            <li>퀵배송 등으로 주문하신 상품과 설치상품의 교환/반품 접수는 고객지원센터(1588-0911)로 연락주시기 바랍니다.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">교환 / 반품 기준</th>
                        <td>
                          <ul className="dot_list">
                            <li>포장을 개봉하여 사용하거나 또는 설치가 완료되어 상품들의 가치가 훼손된 경우</li>
                            <li>고객님의 단순변심으로 인한 교환/반품 요청이 상품을 수령한 날로부터 7일을 경과한 경우</li>
                            <li>고객님의 귀책사유로 상품 등의 가치가 파손되거나 훼손된 경우</li>
                            <li>배송된 상품이 하자없음을 확인한 후 설치가 완료된 상품의 경우</li>
                            <li>기타 ‘전자상거래 등에서의 소비자보호에 관한 법률’이 정하는 청약철회 제한 사유에 해당되는 경우</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">교환 / 반품 기준</th>
                        <td>
                          <ul className="dot_list">
                            <li>품질보증기준 : 제품별 별도표기</li>
                            <li>A/S 관련 전화번호 : 고객지원센터 1588-0911</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3 className="common__title h3">배송안내</h3>
                <div className="common__table__wrap">
                  <table className="common__table" role="presentation">
                    <caption>배송안내 등의 정보</caption>
                    <colgroup>
                      <col width="23.5%" />
                      <col width="76.5%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">배송방법</th>
                        <td>택배 배송 (설치상품일 경우, 업체에서 직접 방문하여 설치해드립니다.)</td>
                      </tr>
                      <tr>
                        <th scope="row">배송가능지역</th>
                        <td>전국</td>
                      </tr>
                      <tr>
                        <th scope="row">배송비</th>
                        <td>
                          <ul className="dot_list">
                            <li>포장을 개봉하여 사용하거나 또는 설치가 완료되어 상품들의 가치가 훼손된 경우</li>
                            <li>고객님의 단순변심으로 인한 교환/반품 요청이 상품을 수령한 날로부터 7일을 경과한 경우</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">배송기일</th>
                        <td>
                          <ul className="dot_list">
                            <li>결제일 다음날부터 3~5일 이내 (일요일, 공휴일, 정기휴무 제외) 발송됩니다.</li>
                            <li>예약판매 상품 등 일부 상품에 대해서는 상품 수급 또는 운송업체의 사정에 따라 배송이 지연될 수 있습니다.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">교환 / 반품 기준</th>
                        <td>
                          <ul className="dot_list">
                            <li>품질보증기준 : 제품별 별도표기</li>
                            <li>A/S 관련 전화번호 : 고객지원센터 1588-0911</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3 className="common__title h3">거래약관</h3>
                <p className="s_txt">웹사이트 하단의 이용약관을 참조하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </div>
      </>  
    )
}