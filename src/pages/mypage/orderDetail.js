import { React, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks';
import { toCurrencyString } from '../../utils/unit';
import OrderProcess from '../../components/myPage/order/OrderProcess';
import OrderDetailProductItem from '../../components/order/OrderDetailProductItem';

import GlobalContext from '../../context/global.context';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getProfileOrderByOrderNo, getGuestOrderByOrderNo } from '../../api/order';
import { postProfileClaimOrderCancelByOrderNo, postGuestClaimOrderCancelByOrderNo } from '../../api/claim';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderDetail() {
  const query = useQuery();
  const { isLogin } = useContext(GlobalContext);
  const [orderInfo, setOrderInfo] = useState({ orderNo: '', orderYmdt: '', defaultOrderStatusType: '' });
  const [orderProducts, setOrderProducts] = useState([]); // 주문 상품
  const [ordererInfo, setOrdererInfo] = useState({ ordererName: '', ordererContact1: '' }); // 주문 정보
  const [shippingAddress, setShippingAddress] = useState({
    // 주문 정보 주소
    // TODO: 배송일 선택 필드 확인 https://nhnent.dooray.com/project/posts/3089925914259872916
    receiverName: '',
    receiverContact1: '',
    receiverAddress: '',
    receiverDetailAddress: '',
    deliveryMemo: '',
  });
  const [receiptInfos, setReceiptInfos] = useState(null);

  // 결제금액정보
  const [amountInfo, setAmountInfo] = useState({
    totalProductAmt: 0, // 총 주문 금액
    promotionDiscountAmt: 0,
    couponDiscountAmt: 0,
    mileageAmt: 0,
    totalDiscountAmount: 0, // 총 할인 금액
    payAmt: 0, // 결제 금액
  });

  const [payInfo, setPayInfo] = useState({
    // 결제 정보
    payType: '', // 가상계좌 VIRTUAL_ACCOUNT, 신용카드 CREDIT_CARD
    cardInfo: null, // 가상계좌일 때 NUll
    bankInfo: null, // 신용카드일 때 Null
  });

  useEffect(() => {
    const request = { path: { orderNo: query.get('orderNo') } };
    const fetchOrderDetailMap = {
      guest: () => getGuestOrderByOrderNo(request),
      profile: () => getProfileOrderByOrderNo(request),
    };

    fetchOrderDetailMap[isLogin ? 'profile' : 'guest']().then((res) => setStates(res));
  }, []);

  const setStates = (res) => {
    const {
      orderNo,
      orderYmdt,
      defaultOrderStatusType,
      orderer: { ordererName, ordererContact1 },
      shippingAddress: { receiverName, receiverAddress, receiverContact1, receiverDetailAddress },
      deliveryMemo,
      lastOrderAmount: {
        totalProductAmt,
        immediateDiscountAmt,
        additionalDiscountAmt,
        cartCouponDiscountAmt,
        productCouponDiscountAmt,
        subPayAmt,
        payAmt,
      },
      payType,
      payInfo: { cardInfo, bankInfo },
      receiptInfos,
    } = res.data;

    setOrderInfo({ orderNo, orderYmdt: orderYmdt.split(' ')[0], defaultOrderStatusType });
    setOrderProducts(makeOrderProducts(res.data));
    setOrdererInfo({ ordererName, ordererContact1 });
    setShippingAddress({
      receiverName,
      receiverAddress,
      receiverDetailAddress,
      receiverContact1,
      deliveryMemo,
    });

    const promotionDiscountAmt = immediateDiscountAmt + additionalDiscountAmt;
    const couponDiscountAmt = cartCouponDiscountAmt + productCouponDiscountAmt;
    setAmountInfo({
      totalProductAmt,
      promotionDiscountAmt,
      couponDiscountAmt,
      mileageAmt: subPayAmt,
      totalDiscountAmount: promotionDiscountAmt + couponDiscountAmt + subPayAmt,
      payAmt,
    });

    setPayInfo({
      payType,
      cardInfo,
      bankInfo,
    });

    setReceiptInfos(receiptInfos);
  };

  const makeOrderProducts = (orderDetailResponse) => {
    const { orderOptionsGroupByPartner } = orderDetailResponse;
    return orderOptionsGroupByPartner
      .flatMap(({ orderOptionsGroupByDelivery }) => orderOptionsGroupByDelivery)
      .flatMap(({ orderOptions }) => orderOptions)
      .map((orderOption) => ({
        orderNo: orderOption.orderNo,
        imageUrl: orderOption.imageUrl,
        orderOptionNo: orderOption.orderOptionNo,
        optionTitle: orderOption.optionTitle,
        productNo: orderOption.productNo,
        productName: orderOption.productName,
        orderCnt: orderOption.orderCnt,
        buyPrice: orderOption.price.buyPrice,
        buyAmt: orderOption.price.buyAmt,
      }));
  };

  const getOrderStatus = (defaultOrderStatusType) => {
    const orderStatus = {
      DEPOSIT_WAIT: '입금대기',
      PAY_DONE: '결제완료',
      PRODUCT_PREPARE: '배송준비', // 소니에서는 상품준비중을 배송준비중으로 표기ㄴ
      DELIVERY_PREPARE: '배송준비',
      DELIVERY_ING: '배송중',
      DELIVERY_DONE: '배송완료',
      CANCEL_REQUEST: '취소신청',
      CANCEL_PROCESSING: '취소진행중',
      CANCEL_DONE: '취소완료',
      EXCHANGE_REQUEST: '교환신청',
      EXCHANGE_PROCESSING: '교환진행중',
      EXCHANGE_DONE: '교환완료',
      RETURN_REQUEST: '반품신청',
      RETURN_PROCESSING: '반품진행중',
      RETURN_DONE: '반품완료',
    };

    return orderStatus[defaultOrderStatusType];
  };

  const showFindDelivery = (defaultOrderStatusType) => {
    return defaultOrderStatusType === 'DELIVERY_ING' || defaultOrderStatusType === 'DELIVERY_DONE';
  };

  const showOrderCancel = (orderStatusType) => {
    return ['DEPOSIT_WAIT', 'PAY_DONE', 'PRODUCT_PREPARE', 'DELIVERY_PREPARE'].includes(orderStatusType);
  };

  const getInstallmentPeriod = (cardInfo) => {
    const { installmentPeriod, noInterest } = cardInfo;
    if (installmentPeriod === 0) {
      return '일시불';
    }
    return `${installmentPeriod}개월 할부${noInterest ? '(무)' : ''}`;
  };

  // TODO: 마크업처럼 스타일리 안되는데 추후 확인
  const onPrint = () => {
    const html = document.querySelector('html');
    const printContents = document.querySelector('.content').innerHTML;
    const printDiv = document.createElement('div');
    printDiv.className = 'print-div';

    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printDiv.style.display = 'none';
  };

  const openCredicardReceipt = (receiptInfoUrl) => {
    window.open(receiptInfoUrl);
  };

  const onOrderCancel = (orderNo) => {
    const request = {
      path: { orderNo },
      requestBody: {
        claimType: 'CANCEL',
        claimReasonType: 'CHANGE_MIND',
        claimReasonDetail: '',
        bankAccountInfo: null,
        saveBankAccountInfo: false,
        responsibleObjectType: null,
      },
    };

    const orderCancelMap = {
      profile: () => postProfileClaimOrderCancelByOrderNo(request),
      guest: () => postGuestClaimOrderCancelByOrderNo(request),
    };

    return orderCancelMap[isLogin ? 'profile' : 'guest']().then((res) => {
      if (res.data.status === 404 || res.data.status === 400) {
        alert(res.data.message);
        return;
      }

      window.alert('주문취소 신청이 완료되었습니다.');
    });
  };

  // 클레임 중인 상품인지 확인 => 기획누락같은데, 클레임 상태일 땐 주문상태 UI disable 처리
  const isClaimStart = (defaultOrderStatusType) => {
    const claimStatuses = ['CANCEL', 'EXCHANGE', 'RETURN'];
    return claimStatuses.some((claimStatus) => defaultOrderStatusType.includes(claimStatus));
  };

  return (
    <>
      <SEOHelmet title={'주문 상세 조회'} />
      <div className="contents mypage">
        <div className="container my">
          <div className="content">
            <div className="common_head">
              <Link to="/my-page/order-list" className="common_head_back">
                주문/배송내역
              </Link>
              <h1 className="common_head_name">주문 상세 조회</h1>
            </div>
            {!isClaimStart(orderInfo.defaultOrderStatusType) && (
              <OrderProcess defaultOrderStatusType={orderInfo.defaultOrderStatusType} />
            )}
            <div className="o_summary">
              <dl className="o_summary_status">
                <dt className="o_summary_term">처리상태</dt>
                <dd className="o_summary_desc">
                  <strong>{getOrderStatus(orderInfo.defaultOrderStatusType)}</strong>
                  {showFindDelivery(orderInfo.defaultOrderStatusType) && (
                    <button type="button" className="button button_positive button-s">
                      배송조회
                    </button>
                  )}
                </dd>
              </dl>
              <dl className="o_summary_date">
                <dt className="o_summary_term">주문날짜</dt>
                <dd className="o_summary_desc">{orderInfo.orderYmdt}</dd>
              </dl>
              <dl className="o_summary_number">
                <dt className="o_summary_term">주문번호</dt>
                <dd className="o_summary_desc">{orderInfo.orderNo}</dd>
              </dl>
            </div>
            {/* 제품 정보 */}
            <div className="order_detail_cont">
              <div className="col_table_wrap order_list">
                <div className="col_table">
                  <div className="col_table_head">
                    <div className="col_table_row">
                      <div className="col_table_cell">제품</div>
                      <div className="col_table_cell">가격</div>
                      <div className="col_table_cell">수량</div>
                      <div className="col_table_cell">합계</div>
                    </div>
                  </div>
                  <div className="col_table_body">
                    {orderProducts.length > 0 &&
                      orderProducts.map((orderProduct) => (
                        <OrderDetailProductItem
                          key={orderProduct.orderNo}
                          productName={orderProduct.productName}
                          imageUrl={orderProduct.imageUrl}
                          optionTitle={orderProduct.optionTitle}
                          buyPrice={orderProduct.buyPrice}
                          buyAmt={orderProduct.buyAmt}
                          orderCnt={orderProduct.orderCnt}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {/*// 제품 정보 */}
            {/* 주문 정보 */}
            <div className="cont order_info">
              <h3 className="cont_tit">주문 정보</h3>
              <div className="order_info_inner">
                <dl className="order">
                  <dt className="order_term">주문자 정보</dt>
                  <dd className="order_desc">
                    {ordererInfo.ordererName}({ordererInfo.ordererContact1})
                  </dd>
                  <dt className="order_term">수령인</dt>
                  <dd className="order_desc">
                    {shippingAddress.receiverName}({shippingAddress.ordererContact1})
                  </dd>
                  <dt className="order_term">배송지</dt>
                  <dd className="order_desc">
                    {shippingAddress.receiverAddress}
                    {shippingAddress.receiverDetailAddress}
                  </dd>
                  <dt className="order_term">배송 요청사항</dt>
                  <dd className="order_desc">{shippingAddress.deliveryMemo ? shippingAddress.deliveryMemo : '없음'}</dd>
                  <dt className="order_term">배송일 선택</dt>
                  <dd className="order_desc">정상 배송 </dd>
                </dl>
              </div>
            </div>
            {/* // 주문 정보 */}
            {/* 결제 정보 */}
            <div className="cont purchase_info">
              <h3 className="cont_tit">결제 정보</h3>
              <div className="purchase_info_inner">
                <dl className="purchase">
                  <dt className="purchase_term purchase_price">총 주문금액</dt>
                  <dd className="purchase_desc purchase_price">
                    {toCurrencyString(amountInfo.totalProductAmt)}
                    <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_discount">할인 금액</dt>
                  <dd className="purchase_desc purchase_discount">
                    - {toCurrencyString(amountInfo.totalDiscountAmount)} <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_discount_sub">프로모션 할인</dt>
                  <dd className="purchase_desc purchase_discount_sub">
                    - {toCurrencyString(amountInfo.promotionDiscountAmt)} <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_discount_sub">쿠폰 사용</dt>
                  <dd className="purchase_desc purchase_discount_sub">
                    - {toCurrencyString(amountInfo.couponDiscountAmt)} <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_discount_sub">마일리지 사용</dt>
                  <dd className="purchase_desc purchase_discount_sub">
                    - {toCurrencyString(amountInfo.mileageAmt)} <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_detail">결제 내역</dt>
                  <dd className="purchase_desc purchase_detail">
                    <div className="purchase_detail_price">
                      {toCurrencyString(amountInfo.payAmt)} <span className="won">원</span>
                    </div>
                    {/* 결제정보 현금 */}
                    {payInfo.payType === 'VIRTUAL_ACCOUNT' && (
                      <>
                        <div className="purchase_detail_method">
                          가상 계좌 : {payInfo.bankInfo.bankName}({payInfo.bankInfo.account})
                        </div>
                      </>
                    )}
                    {payInfo.payType === 'CREDIT_CARD' && (
                      <>
                        <div className="purchase_detail_method">
                          {payInfo.cardInfo.cardName} / {getInstallmentPeriod(payInfo.cardInfo)}
                        </div>
                        <button
                          type="button"
                          className="button button_negative button-s"
                          onClick={() => openCredicardReceipt(receiptInfos[0].url)}
                        >
                          신용카드 영수증
                        </button>
                      </>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
            {/* // 결제 정보 */}
            {/* buttons */}
            <div className="cont button_wrap">
              {showOrderCancel(orderInfo.defaultOrderStatusType) && (
                <button
                  type="button"
                  className="button button_negative"
                  onClick={() => onOrderCancel(query.get('orderNo'))}
                >
                  주문 취소
                </button>
              )}

              <button type="button" className="button button_negative only-pc" onClick={() => onPrint()}>
                주문 정보 프린트
              </button>
              <Link to="/my-page/order-list" className="button button_positive">
                목록
              </Link>
            </div>
            {/* // buttons */}
          </div>
        </div>
      </div>
    </>
  );
}
