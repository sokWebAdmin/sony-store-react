import React, { useState, useEffect, useContext, useMemo } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { loginApi } from '../../api/auth';
import { getProfile } from '../../api/member';

//css
import '../../assets/scss/contents.scss';

//utils
import { emptyCheck } from '../../utils/utils';
import { useHistory } from 'react-router-dom';

//lib
import Cookies from 'js-cookie';

//context
import GlobalContext from '../../context/global.context';
import { setAccessToken, setGuestToken } from '../../utils/token';
import { fetchProfile, useProileDispatch } from '../../context/profile.context';
import OpenLogin from '../../components/member/OpenLogin';
import { postGuestOrdersOrderNo } from '../../api/order';
import { getAgent } from '../../utils/detectAgent';

export default function Login ({ location }) {
  const agent = getAgent();
  const { onChangeGlobal, isLogin } = useContext(GlobalContext);
  const profileDispatch = useProileDispatch();

  // null | 'cart'
  const nextLocation = useMemo(() => {
    const { search } = location;
    if (!search && !search.includes('nextLocation')) {
      return null;
    }
    return search.split('=')[1];
  }, [location]);

  const history = useHistory();

  const [tabState, setTabState] = useState('member');
  const [isPwVisible, setPwVisible] = useState(false);

  //state
  const [email, setEmail] = useState(Cookies.get('sony_email') ?? '');
  const [pw, setPw] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  //validation
  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [emptyOrderNo, setEmptyOrderNo] = useState(false);
  const [emptyOrderPw, setEmptyOrderPw] = useState(false);

  //cookie
  const [saveEmail, setSaveEmail] = useState(Cookies.get('sony_email') ?? false);

  const [isNonPwVisible, setIsNonPwVisible] = useState(false);
  const [orderNo, setOrderNo] = useState('');
  const [orderPw, setOrderPw] = useState('');

  //action
  const _loginApi = async (email, password) => {
    let validation = true;
    if (emptyCheck(email)) {
      setIsEmail(true);
      validation = false;
    } else {
      setIsEmail(false);
    }

    if (emptyCheck(password)) {
      setIsPw(true);
      validation = false;
    } else {
      setIsPw(false);
    }

    if (validation) {
      const response = await loginApi(email, password, autoLogin || null);
      const code = response.data?.message ? JSON.parse(response.data.message).errorCode : '';

      if (code === '3000') {
        alert('아이디/비밀번호를 확인해주세요.');
        //계정 잠금
      } else if (code === '3003') {
        history.push('/member/lockedAccounts');
        //휴먼 계정
      } else if (response?.data?.dormantMemberResponse) {
        const { accessToken, expireIn } = response.data;
        setAccessToken(accessToken, expireIn);
        history.push('/member/inactiveAccounts');
      } else {
        const { accessToken, expireIn } = response.data;
        setAccessToken(accessToken, expireIn);
        onChangeGlobal({ isLogin: true });
        // await fetchProfile(profileDispatch);

        if (saveEmail) {
          Cookies.set('sony_email', email);
        } else {
          Cookies.remove('sony_email');
        }
        if (agent.isApp) {
          history.push(`sonyapp://autoLoginYn?value=${autoLogin ? 'Y' : 'N'}`);
        }
        
        if (!!history.location.state?.next) {
          history.push(history.location.state.next);
        }
        else {
          console.log(nextLocation);
          nextLocation === 'cart' ? history.push(
            `/${nextLocation}?savingGuestCart=true`) : history.push('/');
        }
      }
    }
  };

  const nonMemberLogin = async () => {
    let validation = true;
    if (emptyCheck(orderNo)) {
      setEmptyOrderNo(true);
      validation = false;
    } else {
      setEmptyOrderNo(false);
    }

    if (emptyCheck(orderPw)) {
      setEmptyOrderPw(true);
      validation = false;
    } else {
      setEmptyOrderPw(false);
    }

    if (validation) {
      const response = await postGuestOrdersOrderNo(orderNo, { orderRequestType: 'ALL', password: orderPw });
      if (response.status === 200) {
        setGuestToken(response.data.guestToken);
        history.push(`/my-page/order-detail?orderNo=${orderNo}`);
      } else {
        alert('주문번호/비밀번호를 확인해 주세요.');
      }
    }
  };

  //componentDidMount
  useEffect(() => {
    //로그인 상태인 경우, 메인화면으로 자동 이동처리
    if (isLogin) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <SEOHelmet title={'로그인'} />
      <div className="contents">
        <div className="container" id="container">
          <div className="login">
            <ul className="login__tab">
              <li className={tabState == 'member' ? 'current' : ''} data-tab="tab1">
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    setTabState('member');
                  }}
                >
                  회원 로그인
                </a>
              </li>
              <li className={tabState == 'nonmember' ? 'current' : ''} data-tab="tab2">
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    setTabState('nonmember');
                  }}
                >
                  비회원 로그인
                </a>
              </li>
            </ul>

            {/* 회원 로그인  */}
            <div id="tab1" className={`login__tabcont ${tabState == 'member' ? 'current' : ''}`}>
              <div className={`group ${isEmail === true && 'error'}`}>
                <div className="inp_box">
                  <label className="inp_desc" htmlFor="loginName">
                    <input
                      type="text"
                      id="loginName"
                      className="inp"
                      placeholder=" "
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <span className="label">
                      이메일 아이디<span>(예 : sony@sony.co.kr)</span>
                    </span>
                    <span className="focus_bg" />
                  </label>
                </div>
                <div className="error_txt">
                  <span className="ico" />
                  이메일 아이디를 입력해 주세요.
                </div>
              </div>
              <div className={`group ${isPw === true && 'error'}`}>
                <div className="inp_box password_box">
                  <label className="inp_desc" htmlFor="loginPw">
                    <input
                      type={`${isPwVisible === true ? 'text' : 'password'}`}
                      id="loginPw"
                      className="inp"
                      placeholder=" "
                      value={pw}
                      onChange={(e) => {
                        setPw(e.target.value);
                      }}
                      onKeyPress={(event) => {
                        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                          _loginApi(email, pw);
                        }
                      }}
                    />
                    <span className="label">비밀번호</span>
                    <span className="focus_bg" />
                    <div className="eyes">
                      <button
                        type="button"
                        title={`${isPwVisible === true ? '비밀번호 숨김' : '비밀번호 표시'}`}
                        onClick={() => {
                          setPwVisible(!isPwVisible);
                        }}
                      >
                        <i className={isPwVisible ? 'ico_eyes_open' : 'ico ico_eyes'} />
                      </button>
                    </div>
                  </label>
                </div>
                <div className="error_txt">
                  <span className="ico" />
                  비밀번호를 입력해 주세요.
                </div>
              </div>
              <div className="btn_box full">
                <button
                  type="submit"
                  className="btn btn_dark"
                  title="로그인"
                  onClick={() => {
                    _loginApi(email, pw);
                  }}
                >
                  로그인
                </button>
              </div>
              <div className="find_box">
                {!agent.isApp ? <div className="check">
                  <input
                    type="checkbox"
                    className="inp_check"
                    id="chk01"
                    checked={saveEmail}
                    onChange={(e) => setSaveEmail(e.target.checked)}
                  />
                  <label htmlFor="chk01">이메일 아이디 저장</label>
                </div> : <div className="check">
                  <input
                    type="checkbox"
                    className="inp_check"
                    id="chk01"
                    checked={autoLogin}
                    onChange={(e) => setAutoLogin(e.target.checked)}
                  />
                  <label htmlFor="chk01">자동로그인</label>
                </div>}
                <ul className="user_menu">
                  <li>
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        history.push('/member/search');
                      }}
                    >
                      아이디 · 비밀번호 찾기
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        history.push('/member/join');
                      }}
                    >
                      회원가입
                    </a>
                  </li>
                </ul>
              </div>
              {autoLogin && <div className="app_txt">
                자동 로그인을 사용할 경우<br />타인에게 고객의 정보가 노출될 위험이 있습니다.
              </div>}
              <div className="txt_or">
                <span className="txt">또는</span>
                <span className="bar" />
              </div>
              <OpenLogin />
            </div>

            {/* 비회원 로그인 */}
            <div id="tab2" className={`login__tabcont ${tabState == 'nonmember' ? 'current' : ''}`}>
              <div className={`group ${emptyOrderNo ? 'error' : ''}`}>
                <div className="inp_box">
                  <label className="inp_desc" htmlFor="loginumber">
                    <input
                      type="text"
                      id="loginumber"
                      className="inp"
                      placeholder=" "
                      value={orderNo}
                      onChange={(e) => setOrderNo(e.target.value)}
                    />
                    <span className="label">주문번호</span>
                    <span className="focus_bg" />
                  </label>
                </div>
                <div className="error_txt">
                  <span className="ico" />
                  주문번호를 입력해 주세요.
                </div>
              </div>
              <div className={`group ${emptyOrderPw ? 'error' : ''}`}>
                <div className="inp_box password_box">
                  <label className="inp_desc" htmlFor="loginumber">
                    <input
                      type={isNonPwVisible ? 'text' : 'password'}
                      id="loginPw_nonmember"
                      className="inp"
                      placeholder=" "
                      value={orderPw}
                      onChange={(e) => setOrderPw(e.target.value)}
                      onKeyPress={(event) => {
                        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                          nonMemberLogin();
                        }
                      }}
                    />
                    <span className="label">비밀번호</span>
                    <div className="eyes">
                      <button type="button" title="비밀번호 숨김" onClick={() => setIsNonPwVisible(!isNonPwVisible)}>
                        <i className={isNonPwVisible ? 'ico_eyes_open' : 'ico ico_eyes'} />
                      </button>
                    </div>
                    <span className="focus_bg" />
                  </label>
                </div>
                <div className="error_txt">
                  <span className="ico" />
                  비밀번호를 입력해 주세요.
                </div>
              </div>
              <div className="btn_box full">
                <button type="submit" className="btn btn_dark" title="로그인" onClick={() => nonMemberLogin()}>
                  로그인
                </button>
              </div>
              <p className="txt_nonmember">
                비회원께서는 주문 시 주문번호와 비밀번호(주문 시 배송 조회 비밀번호로 입력)를 입력하시면,
                <span className="block">해당 주문 상품의 배송 상태를 조회하실 수 있습니다.</span>
              </p>
              <div className="join_box">
                <strong className="join_title">아직 소니코리아 회원이 아니세요?</strong>
                <p className="join_desc">
                  회원가입을 통해 소니스토어에서 <span className="block">다양한 서비스를 이용하실 수 있습니다.</span>
                </p>
                <div className="btn_box">
                  <a
                    href="javascript:void(0)"
                    onClick={() => {
                      history.push('/member/join');
                    }}
                    className="btn btn_default"
                  >
                    회원가입
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
