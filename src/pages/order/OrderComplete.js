import React, { useMemo, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import GlobalContext from '../../context/global.context';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';
import { getUrlParam } from '../../utils/location';

const OrderComplete = ({ location }) => {
  const history = useHistory();

  const { isLogin } = useContext(GlobalContext);
  const status = useMemo(() => getUrlParam('status'), [location]);
  const orderType = useMemo(() => getUrlParam('orderType'), [location]);
  const orderNo = useMemo(() => getUrlParam('orderNo'), [location]);

  const openSurvey = (e) => {
    e.preventDefault();
    const d = new Date();
    const chkDate =
      d.getFullYear() +
      '' +
      (d.getMonth() + 1) +
      '' +
      d.getDate() +
      '' +
      d.getHours() +
      '' +
      d.getMinutes() +
      '' +
      d.getSeconds();
    const openUrl =
      process.env.NODE_ENV === 'development'
        ? 'https://testwww.sony.co.kr/handler/EXCSATemplate-SurveyForm'
        : 'https://www.sony.co.kr/handler/EXCSATemplate-SurveyForm';
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.setAttribute('action', openUrl);
    // form.setAttribute('enctype', 'application/x-www-form-urlencoded;charset=euc-kr');
    form.innerHTML = `
      <input type="hidden" name="guestid" value="${chkDate}">
      <input type="hidden" name="templateinstid" value="45073">
      <input type="hidden" name="returnMode" value="__CLOSE__">
    `;

    document.body.appendChild(form);
    // window.open(
    //   openUrl,
    //   'throw_external_popup',
    //   `resizable=yes,toolbar=yes,menubar=yes,location=yes`,
    // );
    form.submit();
    document.body.removeChild(form);
  };

  useEffect(() => {
    if (!orderNo) {
      alert('잘못된 접근입니다.');
      history.push('/');
    }
  }, [location]);

  return (
    <>
      <SEOHelmet title={'주문 완료'} />
      <div className="contents order">
        <div className="container" id="container">
          <div className="content order_page" style={{ padding: '0' }}>
            <div className="order_confirm_box">
              <i className="icon receipe" />

              {orderType !== 'GIFT' ? (
                <h2 className="order_confirm_box__tit">주문 완료</h2>
              ) : (
                <h2 className="order_confirm_box__tit">선물하기 주문 {status === 'PAY_DONE' ? '완료' : '접수'}</h2>
              )}

              <p className="order_confirm_box__dsc">소니스토어를 이용해 주셔서 감사합니다!</p>

              {status === 'PAY_DONE' && orderType === 'GIFT' ? (
                <p className="order_confirm_box__dsc" style={{ fontWeight: 700 }}>
                  선물하기 주문이 완료 되었습니다.
                </p>
              ) : (
                status !== 'DEPOSIT_WAIT' && (
                  <p className="order_confirm_box__dsc" style={{ fontWeight: 700 }}>
                    주문이 완료 되었습니다.
                  </p>
                )
              )}

              {status === 'DEPOSIT_WAIT' && (
                <p className="order_confirm_box__dsc" style={{ fontWeight: 700 }}>
                  주문이 정상적으로 접수 되었습니다. 감사합니다.
                </p>
              )}

              <div className="order_confirm_box__oder_num_box">
                <dl>
                  <dt>주문번호</dt>
                  <dd>{orderNo}</dd>
                </dl>
              </div>
              {isLogin ? (
                <p className="order_confirm_box__txt">
                  주문하신 상품에 대한 배송 상태 등의 조회는 마이페이지에서 확인하실 수 있습니다.
                </p>
              ) : (
                <p class="order_confirm_box__txt">
                  비회원 구매 후 배송 조회는 위의 주문번호와 결제 시 입력하신 비밀번호(12자리)로 확인 가능합니다.
                </p>
              )}

              <div className="btn_box">
                <Link to="/" className="button button_negative" type="button">
                  계속 쇼핑하기
                </Link>
                <a href="#none" className="button button_negative" type="button" onClick={(e) => openSurvey(e)}>
                  설문조사 참여하기
                </a>
                <Link to={`/my-page/order-detail?orderNo=${orderNo}`} className="button button_positive" type="button">
                  주문/배송 조회
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderComplete;
