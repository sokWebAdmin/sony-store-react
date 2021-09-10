import React, { useState, useEffect } from 'react';

// components
import LayerPopup from '../common/LayerPopup';


// stylesheet
import '../../assets/scss/contents.scss';
import { timeFormat } from '../../utils/utils';
import { sendSMS, verifySMS } from '../../api/auth';
import Alert from '../common/Alert';
import { putDormancy } from '../../api/member';
import { useHistory } from 'react-router-dom';

export default function Authentication ({ setVisible }) {
  const history = useHistory();
  const initMemberInfo = { mobileNo: '', memberName: '' };
  const [memberInfo, setMemberInfo] = useState(initMemberInfo);
  const [error, setError] = useState({ mobileNo: false, memberName: false });
  const [time, setTime] = useState(179);
  const [code, setCode] = useState('')
  const [expireAt, setExpireAt] = useState('');
  const [authAvailable, setAuthAvailable] = useState(false);
  const [authSent, setAuthSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authCheck, setAuthCheck] = useState(false);
  // alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const closePopup = () => setVisible(false);
  const openAlert = (message) => {
    setAlertVisible(true);
    setAlertMessage(message);
  };

  const closeModal = () => {
    setAlertVisible(false);
  };

  const onChangeValues = (type, value) => {
    setMemberInfo({
      ...memberInfo,
      [type]: value,
    });
  };

  const validationMemberInfo = () => {
    let isSuccess = true;
    if(memberInfo.memberName === '') {
      setError(prev => ({
      ...prev,
        memberName: true,
      }));
      isSuccess = false
    }
   if(memberInfo.mobileNo === '') {
     setError(prev => ({
       ...prev,
       mobileNo: true,
     }));
     isSuccess = false
   }

   if(code === '') {
     openAlert('인증번호를 입력해주세요.');
     isSuccess = false
   }
  return isSuccess
}

  const onClickAuthentication = async () => {
    if(validationMemberInfo() === false) return;
    const request = {
      authType: "SMS",
      mobileNo: memberInfo.mobileNo,
      certificationNumber: code
    }

   const response = await putDormancy(request)
    if(response.status === 204){
      closePopup()
      history.push('/member/activeAccounts');
    } else{
      openAlert(response.data.message);
    }
  }

  const _sendSMS = async (phoneNum, name) => {
    const response = await sendSMS(phoneNum, 'RELEASE_DORMANT', name);
    if (response.status === 200) {
      setAuthSent(true);
    } else {
      openAlert(response.data.message);
      setAuthSent(true);

    }
  };

  const _verifySMS = async (phoneNum, code) => {
    setCode(code)
    const response = await verifySMS(phoneNum, code, 'RELEASE_DORMANT');
    if (response.status === 200) {
      setAuthCheck(true);
      openAlert('인증되었습니다.');
    } else {
      openAlert(response.data.message);

    }
  };

  useEffect(() => {
    setMemberInfo(initMemberInfo);
    setExpireAt('');
    setTime(179);
    setAuthAvailable(false);
    setAuthSent(false);
    setAuthCode('');
    setAuthCheck(false);
  }, []);

  useEffect(() => {
    if (memberInfo.mobileNo.match(/^\d{2,3}\d{3,4}\d{4}$/) && memberInfo.memberName !== '') {
      setAuthAvailable(true);
    } else {
      setAuthAvailable(false);
    }
  }, [memberInfo.mobileNo]);

  useEffect(() => {
   if(memberInfo.mobileNo !== ''){
     setError(prev => ({
       ...prev,
       mobileNo: false,
     }));
   }
    if(memberInfo.memberName !== ''){
      setError(prev => ({
        ...prev,
        memberName: false,
      }));
    }
  }, [memberInfo.mobileNo, memberInfo.memberName]);

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
  <LayerPopup className="certifi_pop" onClose={closePopup}>
    {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
              <p className="pop_tit">휴대폰 본인 인증</p>
              <div className="pop_cont_scroll contents">
                <form action="">
                  <div className="form_zone">
                    <div className="input_item">
                      <div className="group error">
                        <div className="inp_box">
                          <label className="inp_desc" htmlFor="name">
                            <input type="text" id="name" className="inp center" placeholder="&nbsp;"
                                   autoComplete="off" value={memberInfo.memberName} tabIndex={1}
                                   onChange={(e) => onChangeValues('memberName', e.target.value)} />
                              <span className="label">이름<span style={{marginLeft:"12px", fontSize:"14px", color:"#bbb", fontWeight:"100"}}>(띄어쓰기 없이 입력하세요.)</span></span>
                              <span className="focus_bg"></span>
                          </label>
                        </div>
                        {error.memberName && <div className="error_txt"><span className="ico"></span>이름을 입력해 주세요.</div>}
                      </div>
                      <div className="group btn_type error">
                        <div className="inp_box">
                          <label className="inp_desc" htmlFor="phoneNumber">
                            <input type="text" id="phoneNumber" className="inp center" placeholder="&nbsp;"
                                   autoComplete="off" maxLength="11" tabIndex={2} value={memberInfo.mobileNo}
                                   onChange={(e) => onChangeValues('mobileNo', e.target.value)} />
                              <span className="label">휴대폰번호<span style={{marginLeft:"12px", fontSize:"14px", color:"#bbb", fontWeight:"100"}}>(-없이 입력하세요.)</span></span>
                              <span className="focus_bg"></span>
                          </label>
                          {error.mobileNo && <div className="error_txt"><span className="ico"></span>휴대폰 번호를 입력해 주세요.</div>}
                          <div className="btn_box">
                            {(authSent && authCheck === false) ?
                              <button type="button" className={`btn btn_default`} onClick={() => {
                                if (authAvailable === true) {
                                  //유효기간 설정
                                  let now = new Date().getTime();
                                  const target = new Date(now + (3 * 60000)).toString();
                                  setTime(179);
                                  setExpireAt(target);

                                  //인증번호 발송
                                  _sendSMS(memberInfo.mobileNo, memberInfo.memberName);
                                }
                              }}>재전송</button>
                              :
                              <button type="button"
                                      className={`btn ${(authAvailable === true && authCheck === false) ? 'btn_primary' : 'btn_disable'}`}
                                      onClick={() => {
                                        if (authAvailable === true) {
                                          //유효기간 설정
                                          let now = new Date().getTime();
                                          const target = new Date(now + (3 * 60000)).toString();
                                          setTime(179);
                                          setExpireAt(target);

                                          //인증번호 발송
                                          _sendSMS(memberInfo.mobileNo, memberInfo.memberName);
                                        }
                                      }}>인증번호</button>
                            }

                          </div>
                        </div>
                      </div>
                      <div className="group btn_type">

                        {
                          authSent === true &&
                          <div className="group btn_type">
                            <div className="inp_box" style={{position:'relative', paddingRight:'186px'}}>
                              <label className="inp_desc" htmlFor="certifyNumber">
                                <input type="text" id="certifyNumber" className="inp" placeholder=" " autoComplete="off"
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
                                          debugger
                                          if (authCheck !== true) {
                                            if (time === 0) {
                                              openAlert('인증시간이 만료되었습니다. 재전송 후 인증해주세요.');
                                            } else {
                                              if (authCode === '') {
                                                openAlert('인증번호를 입력해주세요.');
                                                return;
                                              }
                                              _verifySMS(memberInfo.mobileNo, authCode);
                                            }
                                          }
                                        }}>인증
                                </button>
                              </div>
                            </div>
                            <div className="certify_txt">※ 입력하신 번호로 인증번호가 전송되었습니다.</div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="btn_article">
                <button className="button button_positive button-m closed" onClick={onClickAuthentication}
              type="button">확인
                </button>
              </div>
            <button href="#" className="ico_x closed" title="팝업창 닫기" onClick={closePopup}>
              <span>팝업창 닫기</span>
            </button>
      </LayerPopup>
  );
};
