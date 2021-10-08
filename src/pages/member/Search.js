import React, { useState, useEffect } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sendSMS, verifySMS } from '../../api/auth';
import { getMemberInfo } from '../../api/sony/member';

//css
import '../../assets/scss/contents.scss';
import { emptyCheck, timeFormat } from '../../utils/utils';
import Alert from '../../components/common/Alert';
import { Link, useHistory } from 'react-router-dom';
import { getUrlParam } from '../../utils/location';

export default function Search() {
  const history = useHistory();
  const [tabState, setTabState] = useState(getUrlParam('type') || 'id');

  const initSearchValue = { mobileNo: '', memberName: '', email: '' };
  const [searchValue, setSearchValue] = useState(initSearchValue);
  const [result, setResult] = useState(null);

  const [emptyMobile, setEmptyMobile] = useState(false);
  const [emptySearchValue, setEmptySearchValue] = useState(false);

  const [time, setTime] = useState(179);
  const [expireAt, setExpireAt] = useState('');
  const [authAvailable, setAuthAvailable] = useState(false);
  const [authSent, setAuthSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authCheck, setAuthCheck] = useState(false);
  // alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [afterAlert, setAfterAlert] = useState(false);

  const openAlert = (message, afterProcess = false) => {
    setAlertVisible(true);
    setAlertMessage(message);
    if (afterProcess) {
      setAfterAlert(true);
    }
  };
  const closeModal = () => {
    setAlertVisible(false);
    if (afterAlert) {
      history.push('/');
    }
  };
  const onChangeValues = (type, value) => {
    setSearchValue({
      ...searchValue,
      [type]: value,
    });
  };

  const validationSearch = (mobile, searchValue) => {
    let validation = true;
    if (emptyCheck(searchValue)) {
      setEmptySearchValue(true);
      validation = false;
    } else {
      setEmptySearchValue(false);
    }

    if (emptyCheck(mobile)) {
      setEmptyMobile(true);
      validation = false;
    } else {
      setEmptyMobile(false);
    }

    return validation;
  }

  const searchMember = async () => {
    if (!authSent || !authCheck) {
      openAlert('휴대폰 번호 인증을 하십시오.');
      return;
    }
    if (tabState === 'id') {
      if (!validationSearch(searchValue.mobileNo, searchValue.memberName)) return;
      const { data: response } = await getMemberInfo({
        type: '10',
        firstname: searchValue.memberName,
        mobile: searchValue.mobileNo
      });
      if (response.errorCode === '0000') {
        setResult(response.body.customerid);
      } else {
        openAlert(response.errorMessage);
      }
    } else {
      if (!validationSearch(searchValue.mobileNo, searchValue.email)) return;
      const { data: response } = await getMemberInfo({
        type: '20',
        customerid: searchValue.email,
        mobile: searchValue.mobileNo
      });
      if (response.errorCode === '0000') {
        openAlert(`${response.body.customerid} 메일을 보냈습니다.`, true);
      } else {
        openAlert(response.errorMessage);
      }
    }
  };

  const _sendSMS = async (phoneNum) => {
    const response = await sendSMS(phoneNum, 'JOIN');
    if (response.status === 200) {
      //발송성공
      setAuthSent(true);
    } else {
      openAlert(response.data.message);
    }
  };

  const _verifySMS = async (phoneNum, code) => {
    const response = await verifySMS(phoneNum, code, 'JOIN');
    if (response.status === 200) {
      //인증성공
      setAuthCheck(true);
      openAlert('인증되었습니다.');
    } else {
      openAlert(response.data.message);
    }
  };

  useEffect(() => {
    setSearchValue(initSearchValue);
    setExpireAt('');
    setTime(179);
    setAuthAvailable(false);
    setAuthSent(false);
    setAuthCode('');
    setAuthCheck(false);
    setResult(null);
    setEmptyMobile(false);
    setEmptySearchValue(false);
  }, [tabState]);

  useEffect(() => {
    if (searchValue.mobileNo.match(/^\d{2,3}\d{3,4}\d{4}$/)) {
      setAuthAvailable(true);
    } else {
      setAuthAvailable(false);
    }
  }, [searchValue.mobileNo]);

  useEffect(() => {
    if (authSent === true) {
      if (time > 0) {
        const Counter = setInterval(() => {
          const gap = Math.floor((new Date(expireAt).getTime() - new Date().getTime()) / 1000);
          setTime(gap);
        }, 1000);
        return () => clearInterval(Counter);
      }
    }
  }, [expireAt, time, authSent]);

  return (
    <>
      <SEOHelmet title={'아이디 · 비밀번호 찾기'} />
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      <div className="contents">
        <div className="container" id="container">
          <div className="login">
            <h2 className="login__title">아이디 · 비밀번호 찾기</h2>
            <p className="login__desc">아이디·비밀번호가 기억나지 않으신가요? <span>아래의 인증 방법 중 선택하여 인증해주세요.</span></p>
            <div className="login__search_box">
              <ul className="login__tab search_type">
                <li className={tabState === 'id' ? 'current' : ''}><a href="javascript:void(0)" onClick={() => setTabState('id')}>아이디 찾기</a></li>
                <li className={tabState === 'password' ? 'current' : ''}><a href="javascript:void(0)" onClick={() => setTabState('password')}>비밀번호
                  찾기</a></li>
              </ul>

              <div className="tabResult">
                {!result ? <div className="result_cont tab2 on">
                    <div className={`group ${emptySearchValue ? 'error' : ''}`}>
                      <div className="inp_box">
                        <label className="inp_desc" htmlFor="loginName">
                          <input type="text" id="loginName" className="inp" placeholder="&nbsp;" autoComplete="off"
                                 value={tabState === 'id' ? searchValue.memberName : searchValue.email} tabIndex={1}
                                 onChange={(e) => onChangeValues(tabState === 'id' ? 'memberName' : 'email', e.target.value)}
                          />
                          {tabState === 'id' ?
                            <span className="label">이름<span>(띄어쓰기 없이 입력하세요.)</span></span> :
                            <span className="label">이메일 아이디<span>(예 : sony@sony.co.kr)</span></span>}
                          <span className="focus_bg" />
                        </label>
                      </div>
                      <div className="error_txt"><span className="ico" />이름을 입력해 주세요. (띄어쓰기 없이 입력하세요.)</div>
                    </div>
                    <div className={`group btn_type ${emptyMobile ? 'error' : ''}`}>
                      <div className="inp_box">
                        <label className="inp_desc" htmlFor="phonenumber">
                          <input type="text" id="phonenumber" className="inp" placeholder=" " autoComplete="off"
                                 tabIndex={2} value={searchValue.mobileNo}
                                 onChange={(e) => onChangeValues('mobileNo', e.target.value)}
                          />
                          <span className="label">휴대폰 번호<span>(-없이 입력하세요.)</span></span>
                          <span className="focus_bg" />
                        </label>
                        <div className="btn_box">
                          {(authSent && authCheck == false) ?
                            <button type="button" className={`btn btn_default`} onClick={() => {
                              if (authAvailable === true) {
                                //유효기간 설정
                                let now = new Date().getTime();
                                const target = new Date(now + (3 * 60000));
                                setTime(179);
                                setExpireAt(target);

                                //인증번호 발송
                                _sendSMS(searchValue.mobileNo);
                              }
                            }}>재전송</button>
                            :
                            <button type="button"
                                    className={`btn ${(authAvailable == true && authCheck == false) ? 'btn_primary' : 'btn_disable'}`}
                                    onClick={() => {
                                      if (authAvailable === true) {
                                        //유효기간 설정
                                        let now = new Date().getTime();
                                        const target = new Date(now + (3 * 60000));
                                        setTime(179);
                                        setExpireAt(target);

                                        //인증번호 발송
                                        _sendSMS(searchValue.mobileNo);
                                      }
                                    }}>인증번호</button>
                          }
                        </div>
                      </div>
                      <div className="error_txt"><span className="ico" />휴대폰 번호를 입력해주세요. (-없이 입력하세요.)</div>
                    </div>
                    {
                      authSent === true &&
                      <div className="group btn_type">
                        <div className="inp_box">
                          <label className="inp_desc" htmlFor="certifynumber">
                            <input type="text" id="certifynumber" className="inp" placeholder=" " autoComplete="off"
                                   tabIndex={6} value={authCode} onChange={(e) => {
                              setAuthCode(e.target.value);
                            }} readOnly={authCheck} />
                            <span className="label">인증번호</span>
                            {authCheck === false &&
                            <span className="timer" id="timer">{timeFormat(time)}</span>
                            }
                            <span className="focus_bg" />
                          </label>
                          <div className="btn_box">
                            <button type="button" className={`btn ${authCheck !== true ? 'btn_primary' : 'btn_disable'}`}
                                    onClick={() => {
                                      if (authCheck !== true) {
                                        if (time === 0) {
                                          openAlert('인증시간이 만료되었습니다. 재전송 후 인증해주세요.');
                                        } else {
                                          if (authCode === '') {
                                            openAlert('인증번호를 입력해주세요.');
                                            return;
                                          }
                                          _verifySMS(searchValue.mobileNo, authCode, 'JOIN');
                                        }
                                      }
                                    }}>인증
                            </button>
                          </div>
                        </div>
                        <div className="certify_txt">※ 입력하신 번호로 인증번호가 전송되었습니다.</div>
                      </div>
                    }
                    <div className="btn_box full">
                      <button type="button" className="btn btn_dark" onClick={() => searchMember()}>확인</button>
                    </div>
                  </div> :
                  <div className="id_result">
                    <span className="ico_id_result"></span>
                    <p className="info">회원님의 이메일 아이디 검색 결과입니다.</p>
                    <p className="mailaddress">{result}</p>
                    <div className="btn_box full">
                      <Link to={'/member/login'} className="btn btn_dark">로그인</Link>
                    </div>
                  </div>}
              </div>
              <div className="caution_txt">
                <p>· 가입하신 종류와 일치하지 않을 경우 검색이 안될 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}