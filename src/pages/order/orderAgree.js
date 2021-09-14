import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

//context
import { useGuestDispatch, setOrderAgree } from '../../context/guest.context.js';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

// components
import Terms from '../../components/popup/policy/Terms';
import Privacy from '../../components/popup/policy/Privacy';

//stylesheet
import '../../assets/scss/contents.scss';
import '../../assets/scss/order.scss';
import GlobalContext from '../../context/global.context';
import Alert from '../../components/common/Alert';

export default function OrderAgree () {
  const { isLogin } = useContext(GlobalContext);
  const history = useHistory();
  const guestDispatch = useGuestDispatch();

  const [viewTerms, setViewTerms] = useState(false);
  const [viewPrivacy, setViewPrivacy] = useState(false);
  const [allAgree, setAllAgree] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [unValid, setUnValid] = useState(false);

  useEffect(() => {
    const viewSomeAgree = (viewTerms || viewPrivacy);
    document.body.style.overflow = viewSomeAgree ? 'hidden' : 'none';
  }, [viewTerms, viewPrivacy]);

  useEffect(() => {
    setAllAgree(agreeTerms && agreePrivacy);
  }, [agreeTerms, agreePrivacy]);

  const changeAllAgree = () => {
    setAgreeTerms(!allAgree);
    setAgreePrivacy(!allAgree);

    setAllAgree(true);
  };

  useEffect(() => {
    if (isLogin) {
      alert('잘못된 접근입니다.');
      history.push('/');
    }
  }, [isLogin]);

  const submit = () => {
    const happyPath = agreeTerms && agreePrivacy;
    if (!happyPath) {
      setUnValid(true);
      return;
    }

    setOrderAgree(guestDispatch, true);

    /**
     * 시나리오
     *
     * 여기서 guest.orderAgree context true 로 주고 주문서 페이지로 gogo
     * 주문서 페이지는 guest.orderAgree check 후 false 면 다시 여길로 보냄 (안전빵)
     */

  };

  return (
    <>
      <SEOHelmet title={'구매상담 이용약관 동의'} />
      <div className="contents order">
        <div className="container" id="container">
          <div className="login join_agree order">
            <h2 className="login__title">비회원 구매동의</h2>
            <p className="login__desc">비회원으로 상품을 구매하시면 소니스토어의 쿠폰 및 마일리지 적립 혜택을
              받으실<span className="block">수 없습니다. 소니스토어 회원으로 가입하시고 다양한 멤버십 혜택을 누리세요!</span>
            </p>
            <div className="agree_chk_box">
              <div className="all_box">
                <strong className="tit_label">약관 전체
                  동의<span>(선택 항목 포함)</span></strong>
                <div className="switchbtn">
                  <label className="switch">
                    <input type="checkbox" name="all" className="check_all"
                           checked={allAgree} onChange={changeAllAgree} />
                    <span className="toggle" />
                  </label>
                </div>
              </div>
              <div className="bg_check_box">
                <div className="chk_cell">
                  <div className="check">
                    <input type="checkbox" className="inp_check" id="chk01"
                           checked={agreeTerms}
                           onChange={() => setAgreeTerms(!agreeTerms)} />
                    <label htmlFor="chk01">[필수] 소니스토어 쇼핑몰 이용약관 동의</label>
                  </div>
                  <a href="#terms" className="btn_view"
                     data-modal-target="modal1"
                     onClick={() => setViewTerms(true)}>전체보기</a>
                </div>
                <div className="chk_cell">
                  <div className="check">
                    <input type="checkbox" className="inp_check" id="chk03"
                           checked={agreePrivacy}
                           onChange={() => setAgreePrivacy(!agreePrivacy)} />
                    <label htmlFor="chk03">[필수] 개인정보 수집 및 이용에 대한 안내</label>
                  </div>
                  <a href="#privacy"
                     className="btn_view"
                     onClick={() => setViewPrivacy(true)}>전체보기</a>
                </div>
              </div>
              <div className="btn_box agree full">
                <button type="button" className="btn btn_dark"
                        onClick={submit}>동의
                </button>
              </div>
            </div>
          </div>
        </div>
        {viewTerms && <Terms id="terms" toggle={setViewTerms} />}
        {viewPrivacy && <Privacy id="privacy" toggle={setViewPrivacy} />}
        {unValid &&
        <Alert onClose={() => setUnValid(false)}>이용약관에 동의해주세요.</Alert>}
      </div>
    </>
  );
}