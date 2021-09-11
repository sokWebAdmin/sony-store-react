import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks';
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
  const [orderInfo, setOrderInfo] = useState({ orderNo: '', orderYmdt: '' });
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

  const [amountInfo, setAmountInfo] = useState({
    // 결제금액정보
    totalProductAmt: 0, // 총 주문 금액
    //TODO: 아래 할인 필드들은 뭔지 확인
    immediateDiscountAmt: 0, //     프로모션 할인,  immediateDiscountAmt 맞는지 확인
    productCouponDiscountAmt: 0, // 쿠폰 사용, productCouponDiscountAmt 맞는지 확인
    subPayAmt: 0, // 마일리지 사용? subPayAmt 맞는지 확인
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
        orderer: { ordererName, ordererContact1 },
        shippingAddress: { receiverName, receiverAddress, receiverContact1, receiverDetailAddress },
        deliveryMemo,
        lastOrderAmount: { totalProductAmt, immediateDiscountAmt, productCouponDiscountAmt, subPayAmt, payAmt },
        payType,
        payInfo: { cardInfo, bankInfo },
      } = res.data;
      setOrderInfo({ orderNo, orderYmdt: orderYmdt.split(' ')[0] });
      setOrderProducts(makeOrderProducts(res.data));
      setOrdererInfo({ ordererName, ordererContact1 });
      setShippingAddress({
        receiverName,
        receiverAddress,
        receiverDetailAddress,
        receiverContact1,
        deliveryMemo,
      });
      setAmountInfo({
        totalProductAmt,
        immediateDiscountAmt,
        productCouponDiscountAmt,
        subPayAmt,
        totalDiscountAmount: immediateDiscountAmt + productCouponDiscountAmt + subPayAmt,
        payAmt,
      });

      setPayInfo({
        // payType,
        // cardInfo,
        // bankInfo,
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
        orderOptionNo: orderOption.orderOptionNo,
        optionTitle: orderOption.optionTitle,
        productNo: orderOption.productNo,
        productName: orderOption.productName,
        orderCnt: orderOption.orderCnt,
        buyPrice: orderOption.price.buyPrice,
        buyAmt: orderOption.price.buyAmt,
      }));
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
        <div className="container">
          <div className="content">
            <div className="common_head">
              <Link to="/my-page/order-list" className="common_head_back">
                주문/배송내역
              </Link>
              <h1 className="common_head_name">주문 상세 조회</h1>
            </div>
            <div className="my_order order_process">
              <ul className="order_list">
                {/* 현상태만 class: on 추가, .ico_txt 내부에 <strong> 추가 */}
                <li className="step_1">
                  <div className="ship_box">
                    <span className="ico_txt">입금대기</span>
                  </div>
                </li>
                <li className="step_2">
                  <div className="ship_box">
                    <span className="ico_txt">결제완료</span>
                  </div>
                </li>
                <li className="step_3 on">
                  <div className="ship_box">
                    <span className="ico_txt">
                      <strong>배송준비</strong>
                    </span>
                  </div>
                </li>
                <li className="step_4">
                  <div className="ship_box">
                    <span className="ico_txt">배송중</span>
                  </div>
                </li>
                <li className="step_5">
                  <div className="ship_box">
                    <span className="ico_txt">배송완료</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="o_summary">
              <dl className="o_summary_status">
                <dt className="o_summary_term">처리상태</dt>
                <dd className="o_summary_desc">
                  <strong>배송준비</strong>
                  <button type="button" className="button button_positive button-s">
                    배송조회
                  </button>
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
                    {amountInfo.totalProductAmt}
                    <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_discount">할인 금액</dt>
                  <dd className="purchase_desc purchase_discount">
                    - {amountInfo.totalDiscountAmount} <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_discount_sub">프로모션 할인</dt>
                  <dd className="purchase_desc purchase_discount_sub">
                    - {amountInfo.immediateDiscountAmt} <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_discount_sub">쿠폰 사용</dt>
                  <dd className="purchase_desc purchase_discount_sub">
                    - {amountInfo.productCouponDiscountAmt} <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_discount_sub">마일리지 사용</dt>
                  <dd className="purchase_desc purchase_discount_sub">
                    - {amountInfo.subPayAmt} <span className="won">원</span>
                  </dd>
                  <dt className="purchase_term purchase_detail">결제 내역</dt>
                  <dd className="purchase_desc purchase_detail">
                    <div className="purchase_detail_price">
                      {amountInfo.payAmt} <span className="won">원</span>
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
                        <div class="purchase_detail_method">
                          {payInfo.cardInfo.cardName} / {getInstallmentPeriod(payInfo.cardInfo)}
                        </div>
                        <button type="button" class="button button_negative button-s">
                          신용카드 영수증
                        </button>
                      </>
                    )}

                    {/*// 결제정보 현금 */}
                    {/* 결제정보 신용카드
        <div class="purchase_detail_method">삼성카드 / 일시불</div>
        <button type="button" class="button button_negative button-s">신용카드 영수증</button>
        */}
                  </dd>
                </dl>
              </div>
            </div>
            {/* // 결제 정보 */}
            {/* buttons */}
            <div className="cont button_wrap">
              <button type="button" className="button button_negative">
                주문 취소
              </button>
              <button type="button" className="button button_negative only-pc" onClick={() => onPrint()}>
                주문 정보 프린트
              </button>
              <a className="button button_positive">목록</a>
            </div>
            {/* // buttons */}
          </div>
        </div>
      </div>
    </>
  );
}
