import React, { useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';
import { useProfileState } from '../../context/profile.context';
import { Link, useHistory } from 'react-router-dom';
import SelectBox from '../../components/common/SelectBox';
import { withdrawalReasons } from '../../const/mypage';
import OpenLogin from '../../components/member/OpenLogin';
import { withdrawalMember } from '../../api/sony/member';
import { deleteProfile } from '../../api/member';
import { useAlert } from '../../hooks';
import Alert from '../../components/common/Alert';

export default function Withdraw() {
  const history = useHistory();
  const { profile } = useProfileState();

  const {openAlert, closeModal, alertVisible, alertMessage} = useAlert();
  const [password, setPassword] = useState('');
  const [withdrawReason, setWithdrawReason] = useState(null);

  const validateWithdraw = () => {
    if (!withdrawReason) {
      openAlert('탈퇴사유를 선택해주세요.');
      return false;
    }
    if (!password) {
      openAlert('비밀번호를 입력해주세요.');
      return false;
    }

    return true;
  }

  const onClickWithdraw = async () => {
    if (!validateWithdraw()) return;
    const response = await deleteProfile(withdrawReason.label);
    if (response.status !== 200) {

    }
    const checkWithdraw = await withdrawalMember({
      customerid: profile.memberId,
      withdrawReason: withdrawReason.optionNo,
      password,
    })
    if (checkWithdraw.resultCode === '0000') {
      history.push('/member/withdraw-complete');
    }
  }

  return (
    <>
      <SEOHelmet title={'구매상담 이용약관 동의'} />
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      <div className="contents mypage">
        <div className="container" id="container">
          <div className="content">
            <div className="common_head">
              <Link to={'/my-page'} className="common_head_back">마이페이지</Link>
              <div className="common_head_name">회원탈퇴</div>
            </div>
            <div className="withdraw_wrap">
              <div className="member_idbox">{profile.memberId}</div>
              <p className="txt_primary">개인정보, 쿠폰 정보, 보유하신 마일리지, 정품등록 정보 등 회원 탈퇴 시 삭제됩니다.</p>
              <form>
                <div className="withdraw_box">
                  <div className="group">
                    <div className="inp_box password_box">
                      <label className="inp_desc" htmlFor="popPw">
                        <input type="password" id="popPw" className="inp center" placeholder="" value={password}
                               onChange={(e) => setPassword(e.target.value)} />
                        <span className="label">비밀번호</span>
                        <span className="focus_bg" />
                        <div className="eyes">
                          <button type="button" title="비밀번호 숨김"><i className="ico ico_eyes" /></button>
                        </div>
                      </label>
                    </div>
                    <div className="error_txt"><span className="ico" />현재 비밀번호가 올바르지 않습니다.</div>
                  </div>
                  <div className="select_ui_zone btm_line">
                    <SelectBox
                      defaultInfo={{
                        type: 'dropdown',
                        placeholder: '탈퇴사유를 선택해주세요.',
                      }}
                      selectOptions={withdrawalReasons}
                      selectOption={option => setWithdrawReason(option)}
                    />
                  </div>
                  <div className="btn_article">
                    <button className="button button_positive popup_comm_btn button-full" type="button"
                            onClick={() => onClickWithdraw()}>회원탈퇴
                    </button>
                  </div>
                  <div className="info_withdraw">
                    <strong className="info_title">[안내]</strong>
                    <ul className="list_dot">
                      <li>소니코리아 고객지원 사이트와 소니스토어는 하나의 이메일 ID와 비밀번호로 운영됩니다.</li>
                      <li><strong>회원 탈퇴 신청 시 "소니코리아 고객지원 사이트와 소니스토어" 모두 탈퇴처리됩니다.</strong></li>
                      <li>고객님의 소중한 의견을 참고하여, 보다 나은 소니코리아가 될 수 있도록 하겠습니다.</li>
                    </ul>
                  </div>
                  <div className="sns_certify">
                    <OpenLogin message="SNS 계정으로 회원 인증"
                               title="SNS 계정으로 가입하신 회원님은 비밀번호 입력 대신 SNS 계정을 인증해 주셔야 탈퇴가 가능합니다." />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}