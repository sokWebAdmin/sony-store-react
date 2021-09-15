import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks';
import { toCurrencyString } from '../../utils/unit';
import OrderProcess from '../../components/myPage/order/OrderProcess';
import OrderDetailProductItem from '../../components/order/OrderDetailProductItem';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getProfileOrderByOrderNo } from '../../api/order';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function OrderDetail() {
  const query = useQuery();
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
    getProfileOrderByOrderNo({ path: { orderNo: query.get('orderNo') } }).then((res) => {
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
        // payType,
        // cardInfo,
        // bankInfo,

        // FIXME: 목데이터, 개발완료되면 지우고 위 payType, cardInfo, bankInfo 주석 풀면 됨
        payType: 'CREDIT_CARD',
        cardInfo: {
          approveYmdt: '2021-09-11 22:29:43',
          cardAmt: 202000,
          cardApprovalNumber: '51587665',
          cardCode: 'CCBC',
          cardCompany: 'BC',
          cardName: 'BC카드',
          cardNo: '920020******9787',
          installmentPeriod: 0,
          noInterest: false,
        },
        bankInfo: {
          account: 'T0309260000174',
          bank: 'IBK',
          bankAmt: 202000,
          bankCode: '003',
          bankName: '기업은행',
          depositAmt: 0,
          depositYmdt: null,
          depositorName: '한국사이버결제',
          paymentExpirationYmdt: '2021-09-18 23:59:59',
        },
      });

      console.log('res.data:', res.data);
      console.log('orderProducts:', orderProducts);
    });
  }, []);

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

  return (
    <>
      <SEOHelmet title={'구매상담 이용약관 동의'} />
      <div className="contents mypage">
        <div className="container my">
          <div className="content">
            <div className="common_head">
              <Link to="/my-page/order-list" className="common_head_back">
                주문/배송내역
              </Link>
              <h1 className="common_head_name">주문 상세 조회</h1>
            </div>
            <OrderProcess defaultOrderStatusType={orderInfo.defaultOrderStatusType} />
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
                        <button
                          type="button"
                          className="button button_negative button-s popup_comm_btn"
                          data-popup-name="cash_receipt"
                        >
                          현금영수증 신청
                        </button>
                      </>
                    )}
                    {payInfo.payType === 'CREDIT_CARD' && (
                      <>
                        <div className="purchase_detail_method">
                          {payInfo.cardInfo.cardName} / {getInstallmentPeriod(payInfo.cardInfo)}
                        </div>
                        <button type="button" className="button button_negative button-s">
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
                <button type="button" className="button button_negative">
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
