import { useState, useEffect, useCallback } from "react";
import { sendSMS, verifySMS } from "../../api/auth";
import Alert from "../../components/common/Alert";
import { useAlert } from "../../hooks";
import { timeFormat } from "../../utils/utils";

export default function MobileAuth({ mobile, setVisibel, handleResult }) {
  
  const { alertVisible, alertMessage, openAlert, closeModal } = useAlert();

  const [time, setTime] = useState(179);
  const [expireAt, setExpireAt] = useState('');

  const [authSent, setAuthSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authCheck, setAuthCheck] = useState(false);



  const _sendSMS = async () => {
    //@todo type 변경하기
    const response = await sendSMS(mobile, 'JOIN');
    if (response.status === 200) {
      setAuthSent(true);
    } else {
      openAlert(response.data.message);
    }
  };

  const _verifySMS = async (phoneNum, code) => {
    //@todo type 변경하기
    const response = await verifySMS(phoneNum, code, 'JOIN');
    if (response.status === 200) {
      //인증성공
      setAuthCheck(true);
      openAlert('인증되었습니다.');
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
    // _sendSMS();
  }, [])

  useEffect(() => setTimer(), [setTimer])

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

  const handleChange = ({ target }) => {
    setAuthCode(target.value);
  }
  const handleVerify = () => {
    if (!authCheck) {
      if (!time) {
        openAlert('인증시간이 만료되었습니다. 재전송 후 인증해주세요.');
      } else {
        if (!authCode) {
          openAlert('인증번호를 입력해주세요.');
          return;
        }
        _verifySMS(mobile, authCode, 'JOIN');
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
          disabled={ authCode && 'disabled' } 
          type="button"
          onClick={ handleVerify }
        >인증</button>
      </div>
      <div className="certify_txt">※ 입력하신 번호로 인증번호가 전송되었습니다.</div>
    </div>
  )
}