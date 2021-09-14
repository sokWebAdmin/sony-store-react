import { useState } from 'react';

export default function GuestPasswordForm ({ setTempPassword }) {

  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwErrorText, setPwErrorText] = useState('');
  const [confirmPwErrorText, setConfirmPwErrorText] = useState('');

  const changePw = evt => {
    setPw(evt.target.value);
  };

  const changeConfirmPw = evt => {
    setConfirmPw(evt.target.value);
  };

  const blur = type => {
    const valid = validation(type);

    valid ? setTempPassword(confirmPw) : setTempPassword(null);
  };

  const validation = (type) => {
    const state = type === 'pw' ? pw : confirmPw;
    const msgSetter = type === 'pw' ? setPwErrorText : setConfirmPwErrorText;

    if (!state) {
      msgSetter('비밀번호를 입력해주세요.');
      return false;
    }

    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{12,}$/.test(state)) {
      msgSetter('대문자/소문자/숫자가 하나 이상 포함된 12자리를 입력해 주세요.\n');
      return false;
    }

    if (pw && confirmPw && pw !== confirmPw) {
      setConfirmPwErrorText('입력하신 비밀번호가 일치하지 않습니다.');
      return false;
    }

    setPwErrorText('');
    setConfirmPwErrorText('');

    return true;
  };

  return (
    <>
      <dl className="pw_info">
        <dt>비회원 배송 조회 시 사용하실 비밀번호를 입력해 주세요.</dt>
        <dd>비밀번호는 12자 이상이어야 하며, 대문자/소문자/숫자가 하나 이상 포함되어야 합니다.</dd>
      </dl>
      <div className="acc_form">
        <div className="acc_cell">
          <label htmlFor="user_pwd">비밀번호</label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type3 error">
              <input type="text" id="user_pwd" className="inp" value={pw}
                     onChange={changePw} onBlur={() => blur('pw')} />
              <span className="focus_bg"></span>
              {pwErrorText && <p className="error_txt"><span
                className="ico" />{pwErrorText}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell">
          <label htmlFor="user_pwd2">비밀번호 확인</label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type3 error">
              <input type="text" id="user_pwd2" className="inp"
                     value={confirmPw} onChange={changeConfirmPw}
                     onBlur={() => blur('cpw')} />
              <span className="focus_bg"></span>
              {confirmPwErrorText && <p className="error_txt"><span
                className="ico" />{confirmPwErrorText}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}