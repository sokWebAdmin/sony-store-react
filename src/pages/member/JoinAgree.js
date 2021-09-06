import React, { useState, useEffect, useCallback } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import Alert from '../../components/common/Alert';

import { useToggle } from '../../hooks';
import { useHistory } from 'react-router-dom';

const labels = [
  '[필수] 소니스토어 쇼핑몰 이용약관 동의',
  '[필수] 소니 고객지원 사이트(SCS) 이용약관 동의',
  '[필수] 회원가입 개인정보 수집에 관한 동의',
  '[필수] 개인정보 위탁에 관한 동의',
  '[선택] 이벤트 등 프로모션 알림 메일 수신',
  '[선택] 이벤트 등 프로모션 알림 SMS 수신'
]

const JoinAgree = () => {
  const history = useHistory();
  const [checkAll, setCheckAll] = useToggle(false);
  const [checkList, setCheckList] = useState(labels.map(() => false));
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCheckClick = (index) => {
    setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)));
    const isAllChecked = checkList.every((x) => x);
    if (isAllChecked) {
      setCheckAll();
      checkbox();
    }
  };

  const validateAgree = () => {
    const requireAgree = Array.from(Array(4).keys()).every(index => checkList[index]);
    if (requireAgree) {
      history.push({pathname: '/member/joinStep', search: `?agree=USE,PI_COLLECTION_AND_USE_REQUIRED,PI_PROCESS_CONSIGNMENT&sms=${checkList[4]}&email=${checkList[5]}`});
    } else {
      openAlert('이용약관에 동의해주세요.');
    }
  }

  const openAlert = (message) => {
    setAlertVisible(true);
    setAlertMessage(message);
  };

  const closeModal = () => {
    setAlertVisible(false);
  };

  const checkbox = useCallback(() => {
    if (checkAll) {
      setCheckList(labels.map(() => true));
    } else {
      setCheckList(labels.map(() => false));
    }
  }, [checkAll]);

  useEffect(() => {
    checkbox()
  }, [checkbox]);

  return (
    <>
      <SEOHelmet title={'소니코리아 회원가입'} />
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      <div className="contents">
        <div className="container">
          <div className="login join_agree">
            <h2 className="login__title">소니스토어</h2>
            <p className="login__desc">소니 고객지원 사이트(SCS) 와 소니스토어는 하나의 ID 와 비밀번호로 운영됩니다.<span className="block">소니 고객지원 사이트(SCS)의 이용약관에 함께 동의하시면,</span>
              하나의 ID로 고객지원 사이트(SCS)를 편리하게 이용하실 수 있습니다.</p>
            <div className="agree_chk_box">
              <div className="all_box">
                <strong className="tit_label">약관 전체 동의<span>(선택 항목 포함)</span></strong>
                <div className="switchbtn">
                  <label className="switch">
                    <input type="checkbox" name="all" className="check_all" checked={checkAll} onChange={() => setCheckAll()}/>
                    <span className="toggle"/>
                  </label>
                </div>
              </div>
              <div className="bg_check_box">
                {labels.map((label, index) => {
                  const key = `chk0${index}`
                  return (<div className="chk_cell" key={key}>
                    <div className="check">
                      <input type="checkbox" className="inp_check" onChange={() => handleCheckClick(index)} checked={checkList[index]} id={key}/>
                      <label htmlFor={key}>{label}</label>
                    </div>
                    <a href="javascript:openModal('modal1');" className="btn_view" data-modal-target="modal1">전체보기</a>
                  </div>)
                })}
              </div>
              <div className="btn_box agree full">
                <button type="button" className="btn btn_dark" onClick={() => validateAgree()}>동의</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinAgree;
