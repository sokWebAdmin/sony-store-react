import { useContext, useState } from "react";
import { useHistory } from "react-router";
import _ from "lodash";
import qs from 'qs';

import { postCart, postOrderSheets } from "../../api/order";

import CountBox from "../common/CountBox";
import SelectBox from "../common/SelectBox";

import { wonComma } from "../../utils/utils";

import GlobalContext from "../../context/global.context";
import { useAlert } from "../../hooks";
import Alert from "../common/Alert";
import Notification from "./Notification";
import gc from "../../storage/guestCart";

// 배송
function Delivery({
  deliveryFee,
  price
}) {
  return (
    <div className="cont">
      <p className="delivery_txt">
        {deliveryFee.deliveryConditionType === "FREE" ? "무료배송" : ""}
        </p>
      <p className="product_price"><strong className="price">{wonComma(price.salePrice)}</strong> 원</p>
    </div>
  )
}

// 할인 혜택
function Benefits({ price }) {
  return (
    <div className="cont line">
      <p className="tit">회원별 마일리지 적립혜택 <span className="icon_question">!</span></p>
      <ul className="membership_rating">
        <li className="vvip">{/* class 별 등급 색상 지정 vvip / vip / family */}
          <span className="mark">VV</span>
          <div className="save_info">
            <span className="percentage">VVIP 8%</span>
            <p className="mileage"><span className="num">{wonComma(price.salePrice * 0.08)}</span> P</p>
          </div>
        </li>
        <li className="vip">
          <span className="mark">V</span>
          <div className="save_info">
            <span className="percentage">VIP 4%</span>
            <p className="mileage"><span className="num">{wonComma(price.salePrice * 0.04)}</span> P</p>
          </div>
        </li>
        <li className="family">
          <span className="mark">M</span>
          <div className="save_info">
            <span className="percentage">MEMBERSHIP 2%</span>
            <p className="mileage"><span className="num">{wonComma(price.salePrice * 0.02)}</span> P</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

// 컬러칩
function ColorChip() {
  return (
    <div className="cont line">
      <div className="color_select">
        <p className="tit">색상</p>
        <ul className="circle_color_box">
          <li className="on">
            <a href="#none" className="color_btn">
              <span className="circle_color">
                <span className="c_bg" data-slide-img-type="fc5227" style={{background: '#fc5227'}} />
              </span>
              <span className="color_name">오렌지</span>
            </a>
          </li>
          <li>
            <a href="#none" className="color_btn">
              <span className="circle_color">
                <span className="c_bg" data-slide-img-type="f7f5f5" style={{background: '#f7f5f5'}} />
              </span>
              <span className="color_name">화이트</span>
            </a>
          </li>
          <li>
            <a href="#none" className="color_btn">
              <span className="circle_color">
                <span className="c_bg" data-slide-img-type="1b8faa" style={{background: '#1b8faa'}} />
              </span>
              <span className="color_name">블루</span>
            </a>
          </li>
          <li>
            <a href="#none" className="color_btn">
              <span className="circle_color">
                <span className="c_bg" data-slide-img-type={222222} style={{background: '#222'}} />
              </span>
              <span className="color_name">블랙</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

// 선택된 옵션 리스트
function Option({ 
  options, 
  selectedOption, 
  setSelectedOption, 
  setTotalCnt, 
  setTotalPrice,
  totalCnt,
  totalPrice
}) {
  return (
    <div className="prd_select_inner">
            
      <div className="prd_select_box">
        <p className="tit">제품선택</p>

        <SelectBox
          selectOptions={options?.map(o => ({...o, disabled: o.forcedSoldOut})) ?? []}
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
      
        
      <div className="selected_opt"> {/* 선택한 제품 */}
        {selectedOption.length > 0 && selectedOption.map((item, itemIndex) => (
          <div className="opt_info" key={itemIndex}>
            <p className="opt_tag">제품</p>
            <div className="opt_item">
              <div className="item">
                <span className="opt_name">{item.label}</span>
              </div>
              {/* 
              <div className="item">
                <span className="opt_name">WF-SP800N / 화이트</span>
              </div> 
              */}
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
      
              <p className="opt_price">
                <strong className="price">{wonComma(item.buyPrice * item.buyCnt)}</strong>원
              </p>
            </div>
            <a 
              href="#delete" 
              className="prd_delete" 
              onClick={ event => {
    
                event.preventDefault();
                const tempOptionList = selectedOption.filter(({ optionNo }) => optionNo !== item.optionNo)
              
                setTotalCnt(totalCnt - item.buyCnt);
                setTotalPrice(totalPrice - (item.buyCnt * item.buyPrice));

                setSelectedOption(tempOptionList)
      
              }}>구매 목록에서 삭제</a>
          </div>
        ))}
      </div>
    </div>
  )
}

// 총 상품금액
function OptionResult({ totalCnt, totalPrice }) {
  return (
    <div className="result_list">
      <div className="result_chk_box">
        <p className="tit">총 상품금액 <span className="s_txt">(총 <span className="count">{totalCnt > 0 ? totalCnt : "-"}</span>개)</span></p>
        <p className="result_price"><span className="num">{totalPrice > 0 ? wonComma(totalPrice) : "-"}</span> 원</p>
      </div>
    </div>
  )
}

const getOrderSheetNo = async (productNo, selectedOption) => {
  try {
    const { data } = await postOrderSheets({
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
    return data;
  } catch(e) {
    console.error(e);
  }
};

const getCartRequest = (productNo, options) => options.map(
    ({ buyCnt, ...rest }) => ({
        productNo,
        orderCnt: buyCnt,
        channelType: null,
        optionInputs: null,
        ...rest
    })
  );

function ButtonGroup({ selectedOption, productNo, canBuy }) {
  const { openAlert, closeModal, alertVisible, alertMessage  } = useAlert();
  const { isLogin } = useContext(GlobalContext);
  const [ giftVisible, setGiftVisible ] = useState(false);
  const [ cartVisible, setCartVisible ] = useState(false);

  const order = async (pathname = '/order/sheet') => {
    if (!canBuy) {
      openAlert('옵션을 선택하세요.');
      return;
    };

    const result = await getOrderSheetNo(productNo, selectedOption);

    history.push({
      pathname,
      search: '?' + qs.stringify(result),
    });
  }

  const gift = () => {
    if (isLogin) {
      order('/gift/sheet');
    } else {
      setGiftVisible(true);
    }
  };

  const cart = async () => {
    if (!canBuy) {
      openAlert('옵션을 선택하세요.');
      return;
    };

    const products = getCartRequest(selectedOption);

    try {
      if (isLogin) {
        await postCart(products);
      } else {
        gc.set(products);
      }
      setCartVisible(true);
    } catch(e) {
      console.error(e);
    }
  }

  const handleClick = (e, type) => {
    e.preventDefault();
    switch(type) {
      case 'gift':
        gift();
        break;
      case 'order':
        order();
        break;
      case 'cart':
        cart();
        break;
      default:
        break;
    }
  }

  const history = useHistory();
  return (
    <>
      <div className="result_btn_inner">
        <div className="result_btn_box">
          <ul>
            <li className="like"><a href="#none" className="btn_icon">찜하기</a></li>
            <li className="cart">
              <a 
                href="/cart" 
                className="btn_icon"
                onClick={ e => handleClick(e, 'cart') } 
                data-popup="popup_cart"
              >장바구니</a>
            </li>
            <li className="gift">
              <a 
                href="/gift/sheet" 
                className="btn_icon" 
                onClick={ e => handleClick(e, 'gift') }
              >선물</a>
            </li>
            <li className="final">
              <a 
                href="/order/sheet" 
                onClick={ e => handleClick(e, 'order')} 
                className="btn_style direct" 
                style={{backgroundColor: '#000'}}
              >바로 구매하기</a>
              <a href="#none" className="btn_style disabled" style={{display: 'none', backgroundColor: '#ddd'}}>품절</a>
              <a href="#none" className="btn_style reservation" style={{display: 'none', backgroundColor: '#5865F5'}}>예약구매</a>
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
      <a href="#none" className="select_closed" title="선택 목록 닫기">닫기</a>
      {
        giftVisible 
          && <Notification setNotificationVisible={setGiftVisible} type='gift' />
      }
      {
        cartVisible
          && <Notification setNotificationVisible={setCartVisible} type='cart' />
      }
      {
        alertVisible 
          && <Alert onClose={closeModal}>{alertMessage}</Alert>
      }
    </>
  )
}

export default function TobContent({
  baseInfo,
  deliveryFee,
  price,
  options,
  productNo,
}) {

  const [selectedOption, setSelectedOption] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  return (
    <form>
      <div className="product_view_about">{/* class :  soldout-품절, restock-재입고 텍스트 색상 변경을 위함 */}
        <div className="cont">
          <span className="flag new">NEW</span>{/* class : new / event / best / hot */}
          <p className="product_tit">{baseInfo.productName}</p>
          {baseInfo.productNameEn &&
              <p className="product_txt">{baseInfo.productNameEn}</p>
          }
          {/* <p className="product_desc">이 제품은 예약 주문 상품으로 구매 후 1주일 뒤에 발송됩니다</p> */}
          <ul className="social_list">
            <li className="share">
              <a href="#none" className="ico_btn" data-popup="popup_share">공유하기</a>
            </li>
          </ul>
        </div>
        
        <Delivery 
          deliveryFee={deliveryFee}
          price={price}
        />
        
        <Benefits 
          price={price}
        />

        <ColorChip />

        {/* prd_select_wrap */}
        <div className="cont prd_select_wrap">
          <Option 
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setTotalCnt={setTotalCnt}
            setTotalPrice={setTotalPrice}
            totalCnt={totalCnt}
            totalPrice={totalPrice}
          />
          
          <OptionResult 
            totalCnt={totalCnt}
            totalPrice={totalPrice}
          />
          
          <ButtonGroup 
            selectedOption={selectedOption}
            productNo={productNo}
            canBuy={totalCnt > 0}
          />
        </div>
      </div>
    </form>
  )
}