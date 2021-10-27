import { React, useState } from 'react';

//SEO
import SEOHelmet from '../../../components/SEOHelmet';

//api

//css
import '../../../assets/scss/contents.scss';
import '../../../assets/scss/mypage.scss';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useAlert } from '../../../hooks';
import Alert from '../../../components/common/Alert';
import Confirm from '../../../components/common/Confirm';

export default function Rename() {
  const history = useHistory();

  const [authType, setAuthType] = useState(null);
  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const openConfirm = (message) => {
    setConfirmVisible(true);
    setConfirmMessage(message);
  };
  const mobileConfirm = (status) => {
    setConfirmVisible(false);
    if (status === 'ok') {
      console.log('@todo 모바일 인증화면 필요함');
    } else if (status === 'cancel') {
      console.log('취소');
    }
  };
  const ipinConfirm = (status) => {
    setConfirmVisible(false);
    if (status === 'ok') {
      console.log('@todo 아이핀 인증화면 필요함');
    } else if (status === 'cancel') {
      console.log('취소');
    }
  };

  const close = () => {
    const 개명대상아님에도본인인증함 = false;
    if (개명대상아님에도본인인증함) {
      openAlert('개명 대상이 아닙니다.');
      history.goBack();
    } else {
      openAlert('개명 회원 본인인증이 완료되었습니다.');
      history.replace({
        pathname: '/my-page/member',
        state: { rename: true },
      });
    }
  };

  const handleClick = (event, type) => {
    event.preventDefault();
    switch (type) {
      case 'mobile':
      case 'ipin':
        setAuthType(type);
        openConfirm('실명인증을 진행하시겠습니까?');
        break;
      case 'close':
        close();
        break;
      case 'cancle':
        history.goBack();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SEOHelmet title={'구매상담 이용약관 동의'} />
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {confirmVisible && (
        <Confirm onClose={authType === 'mobile' ? mobileConfirm : ipinConfirm}>{confirmMessage}</Confirm>
      )}
      <div className="contents mypage">
        <div className="rename_wrap">
          <div className="common_head first_tit">
            <Link href="/my-page" className="common_head_back">
              마이페이지
            </Link>
            <h1 className="common_head_name">개명 회원 본인 확인</h1>
          </div>
          <div className="certify_zone">
            <ul className="certify_box">
              <li className="certify_list">
                {/* 클릭 시 on */}
                <a href="#none" className="certify" onClick={(event) => handleClick(event, 'mobile')}>
                  <span className="ico_phone_certify" />
                  <p className="tit">
                    휴대폰 번호 인증하기
                    <span className="tit_desc">생년월일, 성명, 휴대폰 정보를 통한 휴대폰 인증서비스</span>
                  </p>
                </a>
              </li>
              <li className="certify_list">
                <a href="#none" className="certify" onClick={(event) => handleClick(event, 'ipin')}>
                  <span className="ico_ipn_certify" />
                  <p className="tit">
                    아이핀 인증하기<span className="tit_desc">방송통신위원회에서 주관하는 아이핀 인증서비스</span>
                  </p>
                </a>
              </li>
            </ul>
            <div className="btn_article">
              <button
                className="button button_negative"
                type="button"
                onClick={(event) => handleClick(event, 'cancle')}
              >
                취소
              </button>
              <button className="button button_positive" type="button" onClick={(event) => handleClick(event, 'close')}>
                확인
              </button>
            </div>
            <div className="guide_list">
              <p className="tit">[안내]</p>
              <ul className="list_dot">
                <li>
                  <strong>이름 변경(개명)</strong>을 위해서 <strong>본인 확인</strong>이 <strong>필요</strong>합니다.
                </li>
                <li>
                  신용평가기관에 개명된 이름이 먼저 등록되어 있어야 하며, <strong>개명된 이름으로 가입된 휴대폰</strong>{' '}
                  또는 <strong>아이핀</strong>으로 <strong>본인 확인 가능</strong>합니다.
                </li>
                <li>
                  본인 확인을 위해 입력하신 개인정보는 본인인증기관에서 수집하는 정보이며, 이때 수집된 정보는 본인 확인
                  외<br className="mo_none" /> 어떠한 용도로도 이용되거나 별도 저장되지 않습니다.{' '}
                </li>
                <li>
                  원하시는 <strong>인증 방법</strong>을 <strong>선택</strong>하신 후 확인 버튼을 눌러주세요.
                </li>
                <li>
                  <strong>아이핀이 없으시더라도 신규 발급</strong>받아 바로 <strong>이용</strong>할 수 있습니다.
                </li>
                <li>
                  <strong>휴대폰 인증</strong>은 <strong>본인 명의</strong>로 <strong>가입</strong>하신 분만{' '}
                  <strong>인증</strong>이 <strong>가능</strong>합니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
