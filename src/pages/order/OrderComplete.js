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
import gc from '../../storage/guestCart';

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
      return;
    }

    if (!isLogin) {
      gc.cover([])
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
                  주문이 정상적으로 접수 되었습니다.
                </p>
              )}

              <div className="order_confirm_box__oder_num_box">
                <dl>
                  <dt>주문번호</dt>
                  <dd>{orderNo}</dd>
                </dl>
              </div>
              {isLogin ? (
                <ul className='list_star'>
                  <li>
                    주문하신 상품에 대한 배송 상태 등의 조회는 마이페이지에서 확인하실 수 있습니다.
                  </li>
                  <li>
                    본 주문에 대한 소비자 피해보상보험 신청되었습니다.<br />
                    상세 신청 내역은&nbsp;
                    <a
                    href={
                        window.anchorProtocol +
                        'www.usafe.co.kr/u_customer_issue.asp'
                    }
                    onClick={window.openBrowser}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='under_line'
                    >
                      <em className="color">여기</em>
                    </a>
                    에서 확인하실 수 있으며, 몇 분 소요될 수 있습니다.
                  </li>
                  <li>
                    보증보험 전자보증서 발급의 경우 결제완료 후 최대 3~4시간이 소요될 수 있습니다.
                  </li>
                </ul>
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
