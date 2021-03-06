import LayerPopup from '../../../components/common/LayerPopup';
import OpenLogin from '../../../components/member/OpenLogin';
import '../../../assets/scss/mypage.scss';
import { useState, useRef } from 'react';
import { useAlert } from '../../../hooks';
import { loginApi } from '../../../api/auth';
import { useProfileState } from '../../../context/profile.context';
import Alert from '../../../components/common/Alert';
import '../../../assets/scss/contents.scss';
import '../../../assets/scss/partials/popup/authPassword.scss';

export default function AuthPassword({ setVisible, authResult }) {
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const {
    profile: { memberId },
  } = useProfileState();
  const [password, setPassword] = useState('');
  const close = () => setVisible(false);
  const passwordRef = useRef(null);
  const [pwType, setPwType] = useState(true);

  const submitPassword = async () => {
    if (!password) {
      openAlert('비밀번호를 입력해주세요.');
      return false;
    }

    const ret = await loginApi(memberId, password);

    if (ret.status !== 200) {
      openAlert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    if (ret.status === 200) {
      return true;
    }

    return false;
  };

  const handleResult = async (result) => {
    const creditable = result || (result === null && (await submitPassword()));

    if (!creditable) return;

    authResult(true);
    close();
  };

  const handleLogin = (profileResult) => {
    if (!profileResult) {
      openAlert('간편 인증에 실패하였습니다.', () => {
        authResult(false);
        close();
      });
      return;
    }
    openAlert('인증이 완료되었습니다.', () => {
      authResult(true);
      close();
    });
  };

  const handleClick = (type) => {
    switch (type) {
      case 'cancle':
        authResult(false);
        close();
        break;
      case 'check':
        handleResult(null);
        break;
      default:
        break;
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      event.preventDefault();
      handleClick('check');
    }
  };

  return (
    <>
      <LayerPopup className="modify_pw_chk" onClose={close}>
        {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
        <p className="pop_tit tit_inp">비밀번호 확인</p>
        <div className="pop_cont_scroll">
          <form onSubmit={() => handleClick('check')}>
            <div className="form_zone">
              <div className="input_item">
                <div className="group">
                  <div className="inp_box password_box">
                    <label className="inp_desc" for="popPw">
                      <input
                        type={pwType ? 'password' : 'text'}
                        id="popPw"
                        className="inp center"
                        placeholder="&nbsp;"
                        name="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        onKeyDown={handleEnter}
                        ref={passwordRef}
                      />
                      <span className="label">비밀번호 입력</span>
                      <span className="focus_bg"></span>
                      <div className="eyes">
                        <button
                          type="button"
                          title={`${pwType ? '비밀번호 숨김' : '비밀번호 표시'}`}
                          onClick={() => setPwType((prev) => !!!prev)}
                        >
                          <i className={`${pwType ? 'ico ico_eyes' : 'ico_eyes_open'}`}></i>
                        </button>
                      </div>
                    </label>
                  </div>
                  <div className="error_txt">
                    <span className="ico"></span>현재 비밀번호가 올바르지 않습니다.
                  </div>
                </div>
                <div className="btn_article">
                  <button className="button button_negative" type="button" onClick={() => handleClick('cancle')}>
                    취소
                  </button>
                  <button className="button button_positive" type="button" onClick={() => handleClick('check')}>
                    확인
                  </button>
                </div>
                <OpenLogin
                  message="SNS 계정으로 회원 인증"
                  title="가입하신 SNS 계정으로 회원 인증을 해주세요."
                  customCallback={handleLogin}
                />
              </div>
              <div className="guide_list">
                <ul className="list_dot">
                  <li>고객님의 정보를 안전하게 보호 하기 위해 비밀번호를 다시 한번 확인합니다.</li>
                  <li>비밀번호는 타인에게 노출되지 않게 주의 해 주십시오.</li>
                  <li>
                    <strong>비밀번호 입력 후 확인을 누르시면 회원정보가 변경됩니다.</strong>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </LayerPopup>
    </>
  );
}
