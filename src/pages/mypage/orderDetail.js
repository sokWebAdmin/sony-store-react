import { React, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks';
import OrderProcess from '../../components/myPage/orderDetail/OrderProcess';
import OrderSummary from '../../components/myPage/orderDetail/OrderSummary';
import OrderProductList from '../../components/myPage/orderDetail/OrderProductList';
import OrderDetailProductItem from '../../components/myPage/orderDetail/OrderDetailProductItem';
import OrderInfo from '../../components/myPage/orderDetail/OrderInfo';
import PurchaseInfo from '../../components/myPage/orderDetail/PurchaseInfo';

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
    requestShippingDate: null,
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
      orderOptionsGroupByPartner,
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
      requestShippingDate: orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].requestShippingDate,
      usesShippingInfoLaterInput:
        orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].usesShippingInfoLaterInput,
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

  const showOrderCancel = (orderStatusType) => {
    return ['DEPOSIT_WAIT', 'PAY_DONE', 'PRODUCT_PREPARE', 'DELIVERY_PREPARE'].includes(orderStatusType);
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
            <OrderSummary orderInfo={orderInfo} />
            {/* 제품 정보 */}
            <div className="order_detail_cont">
              <OrderProductList>
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
              </OrderProductList>
            </div>
            <OrderInfo ordererInfo={ordererInfo} shippingAddress={shippingAddress} />
            <PurchaseInfo amountInfo={amountInfo} payInfo={payInfo} receiptInfos={receiptInfos} />
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
          </div>
        </div>
      </div>
    </>
  );
}
