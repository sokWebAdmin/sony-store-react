import { React, useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks';
import { useReactToPrint } from 'react-to-print';
import OrderProcess from '../../components/myPage/orderDetail/OrderProcess';
import OrderSummary from '../../components/myPage/orderDetail/OrderSummary';
import OrderProductList from '../../components/myPage/orderDetail/OrderProductList';
import OrderDetailProductItem from '../../components/myPage/orderDetail/OrderDetailProductItem';
import OrderInfo from '../../components/myPage/orderDetail/OrderInfo';
import PurchaseInfo from '../../components/myPage/orderDetail/PurchaseInfo';
import { useAlert } from '../../hooks';
import Alert from '../../components/common/Alert';
import Confirm from '../../components/common/Confirm';

import GlobalContext from '../../context/global.context';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getProfileOrderByOrderNo, getGuestOrderByOrderNo } from '../../api/order';
import {
  postProfileClaimOrderCancelByOrderNo,
  postGuestClaimOrderCancelByOrderNo,
  postProfileCancelByOrderOptions,
  postGuestCancelByOrderOptions,
} from '../../api/claim';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';
import RefundAccount from '../order/RefundAccount';

export default function OrderDetail() {
  const query = useQuery();
  const printArea = useRef();
  const { isLogin } = useContext(GlobalContext);
  const [orderInfo, setOrderInfo] = useState({
    orderNo: '',
    orderYmdt: '',
    defaultOrderStatusType: '', // order의 가장 첫번째 옵션주문의 주문상태(api 동일)
    claimStatusTypeLabel: '', // 클레임 상태 라벨(기획 누락으로 샵바이 API에서 던져주는 claimStatusTypeLabel 사용)
  });
  const [claimInfo, setClaimInfo] = useState({
    claimStatusType: '',
    claimNo: '',
  });
  const [orderProducts, setOrderProducts] = useState([]); // 주문 상품
  const [ordererInfo, setOrdererInfo] = useState({ ordererName: '', ordererContact1: '' }); // 주문 정보
  const [shippingAddress, setShippingAddress] = useState({
    // 주문 정보
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
    payType: '', // 가상계좌 ESCROW_VIRTUAL_ACCOUNT, 신용카드 CREDIT_CARD
    cardInfo: null, // 가상계좌일 때 NUll
    bankInfo: null, // 신용카드일 때 Null
  });
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const [confirm, setConfirm] = useState({ visible: '', message: '', name: '' });

  const [refundAccountVisible, setRefundAccountVisible] = useState(false);

  useEffect(async () => {
    setStates(await _getOrderByOrderNo());
  }, []);

  const _getOrderByOrderNo = async () => {
    const request = { path: { orderNo: query.get('orderNo') } };
    const getOrderByOrderNo = isLogin ? getProfileOrderByOrderNo : getGuestOrderByOrderNo;

    try {
      return await getOrderByOrderNo(request);
    } catch (e) {
      console.error(e);
    }
  };

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

    setOrderInfo({
      orderNo,
      orderYmdt: orderYmdt.split(' ')[0],
      defaultOrderStatusType,
      claimStatusTypeLabel:
        orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].orderOptions[0].claimStatusTypeLabel,
      retrieveInvoiceUrl: orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].retrieveInvoiceUrl,
    });

    setClaimInfo(() => ({
      claimStatusType: orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].orderOptions[0].claimStatusType,
      claimNo: orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].orderOptions[0].claimNo,
    }));

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
      // payAmt는 할인 다 적용되고 적립금까지 포함된 금액이라 적립금은 제외해야함 (from 김진훈 선임)
      payAmt: payAmt - subPayAmt,
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
        orderStatusType: orderOption.orderStatusType,
      }));
  };

  const showOrderCancel = (orderStatusType, claimStatusType) => {
    // 주문아이템에 orderStatusType과 claimStatusType 둘 다 있음.
    // claimStatusType이 존재하면 클레임 중이니 주문 취소 버튼 hidden 처리
    if (claimStatusType) {
      return false;
    }

    return ['DEPOSIT_WAIT', 'PAY_DONE', 'PRODUCT_PREPARE', 'DELIVERY_PREPARE'].includes(orderStatusType);
  };

  const onPrint = useReactToPrint({
    pageStyle: '.my{margin: 0 20px;}',
    content: () => printArea.current,
  });

  // 클레임 중인 상품인지 확인 => 기획누락같은데, 클레임 상태일 땐 주문상태 UI disable 처리
  const isClaimStart = (defaultOrderStatusType) => {
    const claimStatuses = ['CANCEL', 'EXCHANGE', 'RETURN'];
    return claimStatuses.some((claimStatus) => defaultOrderStatusType.includes(claimStatus));
  };

  const onCloseConfirm = (status) => {
    setConfirm(() => ({
      visible: false,
      message: '',
      name: '',
    }));

    if (status === 'ok') {
      if (confirm.name === 'cancel-confirm') {
        if (payInfo.payType === 'ESCROW_VIRTUAL_ACCOUNT') {
          setRefundAccountVisible(() => true);
        } else {
          _cancelOrder();
        }
      }
    }
  };

  const _cancelOrder = (bankAccountInfo = null) => {
    const isAllSameOrerSatatus = orderProducts.every(
      (orderProduct, _, orderProducts) => orderProducts[0].orderStatusType === orderProduct.orderStatusType,
    );
    if (!isAllSameOrerSatatus) {
      alert('주문상태가 다른 상품이 있습니다. 소니 고객센터로 연락바랍니다.');
      return;
    }

    const request = {
      path: { orderNo: query.get('orderNo') },
      requestBody: {
        claimType: 'CANCEL',
        claimReasonType: 'CHANGE_MIND',
        claimReasonDetail: '',
        bankAccountInfo,
        saveBankAccountInfo: false,
        responsibleObjectType: null,
      },
    };

    // 옵션 주문들 상태가 상품준비중, 배송준비중 이전 상태일 땐 전체취소 API로 전체 취소한다.
    const orderCancelMap = {
      profile: () => postProfileClaimOrderCancelByOrderNo(request),
      guest: () => postGuestClaimOrderCancelByOrderNo(request),
    };

    // 옵션 주문들 상태가 상품준비중, 배송준비중일 땐 복수부분취소 API로 전체 취소한다.
    const orderOptionCancelMap = {
      profile: () => postProfileCancelByOrderOptions(request),
      guest: () => postGuestCancelByOrderOptions(request),
    };

    const isDeliveryPrepare = ['PRODUCT_PREPARE', 'DELIVERY_PREPARE'].includes(orderProducts[0].orderStatusType);
    const postCancel = isDeliveryPrepare ? orderOptionCancelMap : orderCancelMap;

    if (isDeliveryPrepare) {
      request.requestBody.claimedProductOptions = orderProducts.map(({ orderOptionNo, orderCnt }) => ({
        orderProductOptionNo: orderOptionNo,
        productCnt: orderCnt,
      }));
    }

    return postCancel[isLogin ? 'profile' : 'guest']().then((res) => {
      if (res.data.status === 404 || res.data.status === 400) {
        openAlert(res.data.message);
        return;
      }

      let message =
        '<strong>주문 취소 요청이 정상적으로 완료되었습니다.</strong><br />주문 취소 요청 후 최종 취소 접수까지는 약 1일 정도가 소요됩니다.';
      if (payInfo.payType === 'ESCROW_VIRTUAL_ACCOUNT') {
        message += '<br />환불받으실 계좌를 등록하시면 더욱 편리하게 환불받으실 수 있습니다.';
      }

      openAlert(message, () => {
        if (payInfo.payType === 'ESCROW_VIRTUAL_ACCOUNT') {
          return async () => {
            const { data } = await _getOrderByOrderNo();
            const { claimStatusType, claimNo } =
              data.orderOptionsGroupByPartner[0].orderOptionsGroupByDelivery[0].orderOptions[0];

            if (!!claimNo && payInfo.payType === 'ESCROW_VIRTUAL_ACCOUNT') {
              setClaimInfo(() => ({ claimStatusType, claimNo }));
              setRefundAccountVisible(() => false);
              window.location.reload();
            }
          };
        }

        return () => window.location.reload();
      });
    });
  };

  const onOrderCancel = () => {
    const orderStatus = orderProducts[0]?.orderStatusType;

    if (payInfo.payType === 'ESCROW_VIRTUAL_ACCOUNT' && orderStatus !== 'DEPOSIT_WAIT') {
      openAlert('해당 주문의 취소/반품은 소니 고객센터에 문의해주세요')
      return;
    }


    setConfirm({
      ...confirm,
      visible: true,
      message: '주문 취소 신청 후에는 변경하실 수 없습니다.\n취소 접수를 하시겠습니까?',
      name: 'cancel-confirm',
    });
  };

  return (
    <>
      <SEOHelmet title={'주문 상세 조회'} />
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {confirm.visible && <Confirm onClose={onCloseConfirm}>{confirm.message}</Confirm>}
      <div ref={printArea} className="contents mypage">
        <div className="container my">
          <div className="content">
            <div className="common_head">
              {isLogin ?
                <Link to="/my-page/order-list" className="common_head_back">
                  주문/배송내역
                </Link>
                :
                <a className="common_head_back">주문/배송내역</a>
              }
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
                  orderProducts.map((orderProduct, index) => (
                    <OrderDetailProductItem
                      key={index}
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
              {showOrderCancel(orderInfo.defaultOrderStatusType, claimInfo.claimStatusType) && (
                <button type="button" className="button button_negative" onClick={onOrderCancel}>
                  주문 취소
                </button>
              )}

              <button type="button" className="button button_negative only-pc" onClick={() => onPrint()}>
                주문 정보 프린트
              </button>
              {isLogin && (
                <Link to="/my-page/order-list" className="button button_positive">
                  목록
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {refundAccountVisible && (
        <RefundAccount setVisible={setRefundAccountVisible} claimNo={claimInfo.claimNo} cancelOrder={_cancelOrder} />
      )}
    </>
  );
}
