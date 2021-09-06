import React, { useEffect, useContext } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//utils
import { useHistory } from "react-router-dom";

//css
import '../../assets/scss/contents.scss';

//context
import GlobalContext from '../../context/global.context';

export default function Join() {
  const {isLogin} = useContext(GlobalContext)

  const history = useHistory();

  //componentDidMount
  useEffect(() => {
    //로그인 상태인 경우, 메인화면으로 자동 이동처리
    if (isLogin) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <SEOHelmet title={'회원가입'} />
      <div className="contents">
        <div className="container" id="container">
          <div className="login">
            <div className="join_area">
              <h2 className="login__title">회원가입</h2>
              <p className="login__desc">소니스토어와 소니 고객지원 사이트는 하나의 아이디와 비밀번호로 운영됩니다. <span className="block">회원가입을 통해 다양한 서비스를 이용하실 수 있습니다.</span>
              </p>
              <div className="btn_box full">
                <button type="button" className="btn btn_dark" onClick={() => {
                  history.push('/member/joinStep');
                }}>소니스토어 간편 회원 가입
                </button>
              </div>
            </div>
            <div className="txt_or">
              <span className="txt">또는</span>
              <span className="bar" />
            </div>
            <div className="sns_login_box">
              <strong className="sns_title">SNS 계정으로<span>간편하게 로그인하세요.</span></strong>
              <ul className="sns_list">
                <li className="naver"><a>네이버</a></li>
                <li className="kakao"><a>카카오톡</a></li>
                <li className="facebook"><a>페이스북</a></li>
              </ul>
            </div>
            <div className="caution_txt">
              <p>· 소니코리아 통합 웹회원 정책 상 공식적으로 <strong>만 14세 미만의 경우 회원가입이 불가합니다.</strong></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}