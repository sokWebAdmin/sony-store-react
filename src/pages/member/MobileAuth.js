import { useState, useEffect, useCallback } from "react";
import { sendSMS, verifySMS } from "../../api/auth";
import Alert from "../../components/common/Alert";
import { useAlert } from "../../hooks";
import { timeFormat } from "../../utils/utils";

export default function MobileAuth({ mobile, setVisible, handleResult, remobileReset, setRemobileReset, setNeedsResend, authType = 'CHANGE_MOBILE_NO' }) {
  
  const { alertVisible, alertMessage, openAlert, closeModal } = useAlert();

  const [time, setTime] = useState(179);
  const [expireAt, setExpireAt] = useState('');

  const [authSent, setAuthSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authCheck, setAuthCheck] = useState(false);



  const _sendSMS = async () => {
    const response = await sendSMS(mobile, authType);
    if (response.status === 200) {
      setAuthSent(true);
      setRemobileReset(false);
    } else {
      openAlert(response.data.message);
    }
  };

  const _verifySMS = async (phoneNum, code) => {
    const response = await verifySMS(phoneNum, code, authType);
    
    if (response.data.result) {
      //인증성공
      setAuthCheck(true);
      openAlert('인증되었습니다.', () => {
        document.body.style.overflow = "auto";
        setRemobileReset(false);
        setNeedsResend(false);
        handleResult(true);
        setVisible(false);
      });
    } else {
      openAlert(response.data.message);
    }
  };

  const setTimer = useCallback(() => {
    let now = new Date().getTime();
    const target = new Date(now + (3 * 60_000));
    setTime(179);
    setExpireAt(target);

    //인증번호 발송
    _sendSMS();
  }, [])

  useEffect(() => !authSent && setTimer(), [])
  useEffect(() => {
    (remobileReset) && setTimer();
  }, [remobileReset])

  useEffect(() => {
    if (!authSent) return;

    if (time > 0) {
      const counter = setInterval(() => {
        const diff = Math.floor((new Date(expireAt).getTime() - new Date().getTime()) / 1000);
        setTime(diff);
      }, 1000);
      return () => clearInterval(counter);
    }
  }, [expireAt, time, authSent]);

  const handleChange = ({ target }) => setAuthCode(target.value);

  const handleVerify = () => {
    if (!authCheck) {
      if (!time) {
        openAlert('인증시간이 만료되었습니다. 재전송 후 인증해주세요.');
      } else {
        if (!authCode) {
          openAlert('인증번호를 입력해주세요.');
          return;
        }
        _verifySMS(mobile, authCode, authType);
      }
    }
  }

  return (
    <div className="info_box type_txt_btn tel_chk" style={{ display: 'block' }}>
      {
        alertVisible && <Alert onClose={ closeModal }>{ alertMessage }</Alert>
      }
      <div className="data_box">
        <div className="inp_box">
          <input 
            type="text" 
            className="inp" 
            maxLength={11} 
            title="인증번호 입력해주세요."
            placeholder=" "
            onChange={ handleChange }
          />
          <span className="label">인증번호</span>
          <span className="focus_bg" />
        </div>
        {
          !authCheck && <span className="timer" id="timer">{timeFormat(time)}</span>
        }
      </div>
      <div className="btn_box">
        <button 
          style={{ cursor: 'pointer' }} 
          className={`button btn_primary ${ authCode && 'on' }`} 
          disabled={ !authCode && 'disabled' } 
          type="button"
          onClick={ handleVerify }
        >인증</button>
      </div>
      <div className="certify_txt">※ 입력하신 번호로 인증번호가 전송되었습니다.</div>
    </div>
  )
}