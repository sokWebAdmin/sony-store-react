import LayerPopup from "../../../components/common/LayerPopup";

// @todo import 되지 않음
import '../../../assets/scss/contents.scss';
import '../../../assets/scss/partials/popup/repassword.scss';
import { useState } from "react";
import _ from "lodash";
import { modifyMy } from "../../../api/sony/member";
import { useProfileState } from "../../../context/profile.context";
import { useHistory } from "react-router";
import Alert from "../../../components/common/Alert";
import { useAlert } from "../../../hooks";

const errorMsg = {
  empty: {
    password: '현재 비밀번호를 입력하세요.',
    newPassword: '새 비밀번호를 입력하세요.',
    valNewPassword: '새 비밀번호를 다시 입력하세요.',
  },
  valid: {
    password: '현재 비밀번호가 올바르지 않습니다.',
    newPassword: `비밀번호는 영문 대문자와 소문자, 숫자를 혼합하여 12자리 이상 15자리 미만으로 입력하시기 바랍니다. \n 일부 특수문자도 사용 가능합니다.`,
    valNewPassword: `새 비밀번호가 일치 하지 않습니다. \n 다시 확인해주세요.`,
  }
};

const initialState = {
  password: '',
  newPassword: '',
  valNewPassword: '',
};

const labels = Object.keys(initialState);

export default function Repassword({ setVisible }) {
  const history = useHistory();
  const { profile: { memberId }} = useProfileState();
  const profileDispatch = useProfileState();
  
  const close = () => setVisible(false);
  
  const [state, setState] = useState(initialState);
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();

  const { password, newPassword, valNewPassword } = state;
  const handleChange = ({ target: { name, value }}) => {
    setState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isValid = () => {
    let isEmpty = true;
    labels.forEach(label => {
      if (!state[label]) {
        openAlert(errorMsg.empty[label]);
        throw new Error('EMPTY_VALUE');
      }
      isEmpty = false;
    });

    if (isEmpty) return false;

    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{12,15}$/;
    if (newPassword !== valNewPassword) {
      openAlert(errorMsg.valid.valNewPassword);
      return false
    };

    if (!(pattern.test(newPassword))) {
      openAlert(errorMsg.valid.newPassword);
      return false
    };

  };

  const isChanged = async () => {
    
    const ret = await modifyMy({ password, newPassword, customerid: memberId });
    console.log(ret);
    
    if (ret.data.errorCode === '0000' && ret.data.body) {
      openAlert(`비밀번호를 정상적으로 변경하였습니다. \n 소니스토어 메인 화면으로 이동합니다.`);
      return true;
    }

    if (ret.data.errorCode === '2000') {
      openAlert(errorMsg.valid.password);
      return false;
    }

    if (ret.data.errorCode === '1002') {
      openAlert(errorMsg.valid.newPassword);
      return false;
    }

    openAlert(ret.data.errorMessage);
    return false;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!isValid() || !(await isChanged())) return;

    // fetchProfile(profileDispatch);
    history.push('/');
  }


  return (
    <LayerPopup
      className="password_change"
      onClose={ close }
    >
      { alertVisible && <Alert onClose={ closeModal }>{ alertMessage }</Alert> }
      <p className="pop_tit tit_inp">비밀번호 변경</p>
      <div className="pop_cont_scroll">
        <form onSubmit={ handleSubmit }>
        <div className="form_zone">
          <div className="input_item">
            <div className="group">
              <div className="inp_box password_box">
                <label className="inp_desc" htmlFor="popPw">
                  <input 
                    type="password" 
                    id="popPw" 
                    className="inp center" 
                    placeholder="&nbsp;" 
                    name="password"
                    value={ password }
                    onChange={ handleChange }
                  />
                  <span className="label">비밀번호 입력</span>
                  <span className="focus_bg"></span>
                  <div className="eyes"><a href="#none" className="eyes_btn" title="비밀번호 숨김"><i className="ico ico_eyes"></i></a></div>
                </label>
              </div>
              <div className="error_txt"><span className="ico"></span>현재 비밀번호가 올바르지 않습니다.</div>
            </div>
            <div className="group">
              <div className="inp_box password_box">
                <label className="inp_desc" htmlFor="popPw">
                  <input
                    type="password" 
                    id="popPw" 
                    className="inp center" 
                    placeholder="&nbsp;" 
                    autoComplete="off" 
                    name="newPassword"
                    value={ newPassword }
                    onChange={ handleChange }
                  />
                  <span className="label"> 새 비밀번호 입력</span>
                  <span className="focus_bg"></span>
                  <div className="eyes"><a href="#none" className="eyes_btn" title="비밀번호 숨김"><i className="ico ico_eyes"></i></a></div>
                </label>
              </div>
              <div className="error_txt">
                <span className="ico"></span>
                영문 대/소문자, 숫자를 혼합하여 12자리 이상 15자리 미만으로
                입력하시기 바랍니다. 일부 특수문자도 사용 가능합니다.
              </div>
            </div>
            <div className="group">
              <div className="inp_box password_box">
                <label className="inp_desc" htmlFor="popPw">
                  <input 
                    type="password" 
                    id="popPw" 
                    className="inp center"
                    name="valNewPassword"
                    value={ valNewPassword }
                    onChange={ handleChange }
                    placeholder="&nbsp;" 
                    autoComplete="off" 
                  />
                  <span className="label">새 비밀번호 확인</span>
                  <span className="focus_bg"></span>
                  <div className="eyes"><a href="#none" className="eyes_btn" title="비밀번호 숨김"><i className="ico ico_eyes"></i></a></div>
                </label>
              </div>
              <div className="error_txt"><span className="ico"></span>새 비밀번호가 일치하지 않습니다.</div>
            </div>
          </div>
          <div className="btn_article">
            <button className="button button_positive button-full" type="submit">비밀번호 변경</button>
          </div>
          <div className="guide_list">
            <p className="tit ico_tit">주의사항 및 안내</p>
            <ul className="list_dot">
              <li><strong>영문 대문자와 소문자, 숫자 조합으로 12자리 이상 15자리 미만으로 입력</strong>해 주세요.</li>
              <li><strong>일부 특수문자도 사용 가능합니다.</strong></li>
              <li>아이디와 같은 비밀번호나 주민등록번호, 생일, 전화번호 등 개인정보와 관련된 숫자, 연속된 숫자, 반복되는 숫자 등은 타인이 쉽게 알아낼 수 있어 유출의 위험이 있으니 사용하지 않는 것이 좋습니다. </li>
              <li>이전에 사용된 비밀번호를 재사용하시면 도용의 우려가 있으니 새로운 비밀번호로 사용해 주세요.</li>
              <li>소니스토어에서 사용하는 자체 비밀번호는 회원 정보 수정 및 회원 탈퇴 시에 꼭 필요합니다.(가입 시 이용한 각 SNS 계정 비밀번호와는 다름)</li>
              <li>비밀 번호는 주기적으로 변경해 주세요. (<strong>최소 3개월에 1회</strong>는 변경해 주시는 것이 좋습니다.)</li>
              <li>타 사이트와 동일하거나 유추할 수 있는 비밀 번호는 도용의 위험이 크니, 안전도가 높은 비밀 번호로 변경하시길 권장합니다. </li>
              <li><strong>SNS 계정으로 가입하신 회원님은 각 SNS 페이지에서 수정 및 변경하시기 바랍니다.</strong></li>
            </ul>
          </div>
        </div>
        </form>
      </div>
    </LayerPopup>
  )
}