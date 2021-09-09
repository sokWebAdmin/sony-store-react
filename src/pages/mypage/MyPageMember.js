import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss";
import '../../assets/scss/mypage.scss';

import { useProfileState } from '../../context/profile.context';
import _ from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router';
import FindAddress from '../../components/popup/FindAddress';
import Repassword from './myPageMember/Repassword';
import MobileAuth from '../member/MobileAuth';
import { useAlert } from '../../hooks';
import Alert from '../../components/common/Alert';
import { modifyMy } from '../../api/sony/member';

function getStrDate(date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}

/**
 * {
 *  name: 'email',
 *  reason: 'empty' | 'type' | 'invalid'
 * }
 * 
 */
const initialState = {
  customerid : 'test',
  custcategory: '',
  gender: '',
  firstname: 'bomee',
  mobile: '01044758305',
  birthday: '19870331',
  email: '',
  viasite: '',
  sms: true, // sms 수신 동의 여부
  mobileflag: '',
  servicesite: {
    news: true // 이벤트 프로모션 알림 메일 동의 여부
  }, //nesw 는 email 알림만 있는 것 같은데 확인 필요
  password : '',
  newPassword: '',
  homeaddress1: '', // 주소
  homeaddress2: '', // 상세주소
  homezipcode: '', // 우편번호
  custgrade: 'N', // 고객등급: N - 일반, M - Membership, V - VIP
};

// vvip / vip / family
const memberGrade = {
  N: { className: 'family', label: '일반' },
  M: { className: 'vip', label: 'MEMBERSHIP' },
  V: { className: 'vvip', label: 'VIP' }
};

const initialVisibleFlag = {
  address: false,
  rename: false,
  repassword: false,
  remobile: false,
};

const validateMobile = (mobile, openAlert) => {
  const pattern = /^\d{2,3}\d{3,4}\d{4}$/;
  if (!mobile) {
    openAlert('번호를 입력하세요.');
    return false;
  }
  if (!pattern.test(mobile)) {
    openAlert('번호를 확인하세요.');
    return false;
  }
  return true;
}

export default function MyPageMember() {
  const history = useHistory();
  const profileState = useProfileState();

  const { openAlert, closeModal, alertMessage, alertVisible } = useAlert();

  // 수정모드
  const [isEditMode, setIsEditMode] = useState(false);

  const [ myForm, setMyForm ] = useState({...initialState});
  const [ initForm, setInitForm ] = useState({...initialState});
  const [ error, setError ] = useState([]);

  // 우편번호 찾기
  const [findAddressVisible, setFindAddressVisible] = useState(false);
  const bindReceiverAddress = selectedAddress => {
    if (!selectedAddress) return;
    const { address, zipCode } = selectedAddress;
    setMyForm(prev => ({
      ...prev,
      homezipcode: zipCode,
      homeaddress1: address,
      homeaddress2: '',
    }))
  };
  // 비밀번호 변경하기
  const [repasswordVisible, setRepasswordVisible] = useState(false);
  // 휴대폰 번호 변경하기
  const [remobileVisible, setRemobileVisible] = useState(false);
  const [needsResend, setNeedsResend] = useState(false);
  const [remobileReset, setRemobileReset] = useState(false);
  const handleRemobileResult = result => console.log(result);

  // 수신 동의
  const [ active, setActive ] = useState({
    sns: false,
    email: false,
  });

  const remobile = () => {
    if (validateMobile(myForm.mobile, openAlert)) {
      setRemobileVisible(true);
      setNeedsResend(true);
    }
  };

  const resend = () => {
    setRemobileReset(true);
  }

  const noticeEditMode = () => {
    if (isEditMode) return true;
    openAlert('회원정보 수정 버튼을 클릭하세요.');
    return false;
  }
  
  
  const handleClick = (event, type) => {
    event.preventDefault();
    switch(type) {
      case 'password':
        setRepasswordVisible(true);
        break;
      case 'withdrawal':
        history.push({ pathname: '/my-page/withdraw' })
        break;
      case 'name':
        noticeEditMode() && history.push({ pathname: '/my-page/rename' });
        break;
      case 'mobile':
        needsResend ? resend() : noticeEditMode() && remobile();
        break;
      case 'address':
        noticeEditMode() && setFindAddressVisible(true);
        break;
      case 'cancle':
        setIsEditMode(false);
        setRemobileVisible(false);
        setNeedsResend(false);
        setMyForm(() => ({ ...initForm }));
        setActive({
          sms: profileState.my?.sms === 'Y',
          email: profileState.my?.servicesite.news === 'Y',
        });
        break;
        default:
          return;
    }
  };

  const handleChange = ({ target: { name, value }}) => {
    switch (name) {
      case 'sms':
      case 'email':
        setActive(prev => ({
          ...prev,
          [name]: value,
        }));
        break;
      default:
      setMyForm(prev => ({
        ...prev,
        [name]: value
       }));
    }
  };

  const validate = request => request;
  const handleSubmit = async event => {
    event.preventDefault();
    const request = {
      ...myForm,
      sms: active.sms ? 'Y' : 'N',
      servicesite: {
        news: active.email ? 'Y' : 'N'
      }
    };
    console.log(request);
    const ret = await modifyMy(validate(request));
    console.log(ret);
    // @TODO sns 와 email 체크박스는 따로 관리해야 함
    setIsEditMode(false);
  };

  const addErrorType = type => setError(prev => {
    if(prev.some(error => error === type)) return;
    return prev.concat(type);
  });
  const removeErrorType = type => setError(prev => prev.filter(error => error !== type));

  // 초기화
  useEffect(() => {
    setMyForm(prev => ({
      ...prev,
      ...profileState.my,
    }));
    setInitForm(prev => ({
      ...prev,
      ...profileState.my,
    }));

    setActive({
      sms: profileState.my?.sms === 'Y',
      email: profileState.my?.servicesite.news === 'Y',
    })
  }, [profileState.my])

    return (
    <>
      <SEOHelmet title={"구매상담 이용약관 동의"} />
      {
        alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>
      }
      <div className="contents mypage">
        <div className="member_wrap">
          <div className="common_head first_tit">
            <Link to='/my-page' className="common_head_back">마이페이지</Link>
            <h1 className="common_head_name">회원정보</h1>
          </div>
          <form onSubmit={ handleSubmit }>
            <div className="member_info">
              <div className="member_withdrawal">
                <a href="#none" className="button button_secondary button-s" onClick={ event => handleClick(event, 'password') }>비밀번호 변경</a>
                {
                  repasswordVisible &&
                    <Repassword 
                      setVisible={setRepasswordVisible}
                    />
                }
                <a href="#none" className="button button_secondary button-s" onClick={ event => handleClick(event, 'withdrawal') }>회원탈퇴</a>
              </div>
              <div className="member_info_list">
                <div className="member_list name">
                  <div className="tit_inner">
                    <label htmlFor="member_name" className="tit">이름</label>
                  </div>
                  <div className="info_inner">
                    <div className="info_box">
                    {/* <div className="info_box type_txt_btn"> */}
                      {/* <div className="data_box sub_txt_box"> */}
                      <div className="data_box">
                        <div className="inp_box">
                          <input 
                            type="text" 
                            id="member_name" 
                            name="firstname" 
                            className={`inp ${!isEditMode && 'disabled'}`}
                            value={ myForm.firstname }  
                            maxLength={50} 
                            autoComplete="off"
                            disabled="disabled"
                          />
                          <span className="focus_bg" />
                        </div>
                        {/* <p className="name_desc">※ 개명(이름 변경)한 경우 ‘이름 변경’ 버튼을 눌러주세요.</p> */}
                      </div>
                      {/* <div className="btn_box">
                        <button className="button change_btn" type="button" onClick={ event => handleClick(event, 'name') }>이름변경</button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="member_list email">
                  <div className="tit_inner">
                    <label htmlFor="member_email" className="tit">이메일 ID</label>
                  </div>
                  <div className="info_inner">
                    <div className="info_box">
                      <div className="data_box">
                        <div className="inp_box">
                          <input 
                            type="text" 
                            id="member_email" 
                            className={`inp disabled`} 
                            name="customerid"
                            value={ myForm.customerid }
                            autoComplete="off"
                            disabled='disabled'
                            maxLength={50} 
                          />
                          <span className="focus_bg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="member_list tel">
                  <div className="tit_inner">
                    <label htmlFor="member_tel" className="tit">휴대폰 번호</label>
                  </div>
                  <div className="info_inner">
                    <div className="info_box type_txt_btn">
                      <div className="data_box">
                        <div className="inp_box">
                          <input 
                            type="text" 
                            id="member_tel" 
                            name="mobile" 
                            className={`inp tel_number ${!isEditMode && 'disabled'}`}
                            value={ myForm.mobile }
                            maxLength={11} 
                            autoComplete="off" 
                            placeholder=""
                            onChange={handleChange}
                            disabled={ !isEditMode && 'disabled' }
                          />
                          <span className="label">휴대폰 번호<span>(- 없이 입력하세요.)</span></span>
                          <span className="focus_bg" />
                        </div>
                      </div>
                      <div className="btn_box">
                        <button 
                          className="button change_btn" 
                          type="button"
                          onClick={ event => handleClick(event, 'mobile') }>{ needsResend ? '재전송' : '인증번호 전송' }</button>
                      </div>
                    </div>
                    {
                      remobileVisible 
                        && <MobileAuth 
                              mobile={ myForm.mobile } 
                              visible={remobileVisible}
                              setVisible={ setRemobileVisible } 
                              handleResult={ handleRemobileResult }
                              setNeedsResend={setNeedsResend}
                              remobileReset={remobileReset}
                              setRemobileReset={setRemobileReset}
                            /> 
                    }
                  </div>
                </div>
                <div className="member_list grade">
                  <div className="tit_inner">
                    <label htmlFor="member_grade" className="tit">회원구분</label>
                  </div>
                  <div className="info_inner">
                    <div className="info_box">
                      <div className="data_box">
                        <div className="inp_box">
                          <span className={ `ico_grade ${ memberGrade[myForm.custgrade]?.className }` }>
                            <input 
                              type="text" 
                              id="member_grade"
                              name="custgrade"
                              className={`inp disabled`} 
                              value={ memberGrade[myForm.custgrade]?.label }
                              disabled="disabled" 
                              maxLength={20} 
                            />
                            <span className="focus_bg" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="member_list birth_date">
                  <div className="tit_inner">
                    <label htmlFor="member_birth" className="tit">생년월일</label>
                  </div>
                  <div className="info_inner">
                    <div className="info_box">
                      <div className="data_box">
                        <div className="inp_box">
                          <input 
                            type="text" 
                            id="member_birth" 
                            name="birthday"
                            className={`inp disabled`} 
                            value={getStrDate(myForm.birthday)}  
                            disabled='disabled'
                            maxLength={8} 
                          />
                          <span className="focus_bg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="member_list address">
                  <div className="tit_inner">
                    <label htmlFor="member_addr" className="tit">주소</label>
                  </div>
                  <div className="info_inner">
                    <div className="info_box type_txt_btn">
                      <div className="data_box">
                        <div className="inp_box">
                          <input 
                            type="text" 
                            id="member_addr"
                            name="homezipcode"
                            className={`inp disabled`} 
                            value={ myForm.homezipcode }
                            disabled="disabled" 
                            maxLength={50}
                            onChange={handleChange}
                          />
                          <span className="focus_bg" />
                        </div>
                      </div>
                      <div className="btn_box">
                        <button 
                          className="button change_btn" 
                          type="button" 
                          onClick={ event => handleClick(event, 'address') }
                          >우편번호찾기
                        </button>
                        {
                          findAddressVisible &&
                            <FindAddress 
                              setVisible={setFindAddressVisible}
                              setAddress={bindReceiverAddress} 
                            />
                        }
                      </div>
                    </div>
                    <div className="info_box">
                      <div className="data_box">
                        <div className="inp_box">
                          <input 
                            type="text" 
                            id="member_addr2" 
                            name="homeaddress1"
                            className={`inp disabled`} 
                            value={ myForm.homeaddress1 }
                            onChange={handleChange}
                            disabled="disabled" 
                            maxLength={50} 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="info_box">
                      <div className="data_box"><div className="inp_box">
                          <input 
                            type="text" 
                            id="member_addr3" 
                            name="homeaddress2"
                            className={`inp ${ !isEditMode && 'disabled' }`} 
                            value={ myForm.homeaddress2 } 
                            onChange={handleChange}
                            disabled={ !isEditMode && 'disabled' }
                            maxLength={50} 
                          />
                          <span className="focus_bg" />
                        </div>
                        <p className="name_desc">※ 주소는 사은품 및 기타 서비스를 제공받으실 때, 꼭 필요한 부분이므로 정확히 기입해 주시기 바랍니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="member_list opt_in">
                  <div className="tit_inner">
                    <p className="tit">이벤트 등 프로모션<br className="mo_none" /> 알림</p>
                  </div>
                  <div className="info_inner">
                    <div className="info_box">
                      <div className="switchbtn_box">
                        <div className="switchbtn">
                          <span className="switch_tit">메일 수신</span>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              name="email" 
                              className="check_all" 
                              disabled={ !isEditMode && 'disabled' }
                              checked={ active.email }
                              onChange={ handleChange }
                            />
                            <span className="toggle" />
                          </label>
                        </div>
                        <div className="switchbtn">
                          <span className="switch_tit">SMS 수신</span>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              name="sms" 
                              className="check_all" 
                              disabled={ !isEditMode && 'disabled' }
                              onChange={ handleChange }
                              checked={ active.sms }
                            />
                            <span className="toggle" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 로봇이 아닙니다. */}
                <div className="macro_chk_box" style={{display: 'block'}}></div>
                {/* // 로봇이 아닙니다. */}
              </div>{/* // member_info_list */}
              <div className="btn_article">
                  {
                    isEditMode ? 
                      (
                        <>
                          <button className="button button_negative" type="button" onClick={ event => handleClick(event, 'cancle') }>취소</button>
                          <button className="button button_positive" type="submit">저장</button>
                        </>
                      )
                      :
                    <button 
                      className="button button_positive button-full popup_comm_btn" 
                      data-popup-name="modify_pw_chk" 
                      type="button"
                      onClick={ () => setIsEditMode(true) }
                    >회원정보 수정</button>
                  }
              </div>
            </div>
          </form>
        </div>{/* // member_wrap */}
      </div>
    </>
  );
}
