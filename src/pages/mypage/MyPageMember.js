import { React, useEffect, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/mypage.scss"
import { useProfileState } from '../../context/profile.context';
import _ from 'lodash';
import moment from 'moment';

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
  customerid : 'nanuya0331@gmail.com',
  custcategory: '',
  gender: '',
  firstname: '윤보미',
  mobile: '01044758305',
  birthday: '19870331',
  email: '',
  viasite: '',
  sms: '', // sms 수신 동의 여부
  mobileflag: '',
  servicesite: {
    news: '' // 이벤트 프로모션 알림 메일 동의 여부
  }, //nesw 는 email 알림만 있는 것 같은데 확인 필요
  password : '1234567890',
  newPassword: '',
  homeaddress1: '서울 서울 서울', // 주소
  homeaddress2: '서 울 상 세 어 딘 가 12345', // 상세주소
  homezipcode: '12345', // 우편번호
  custgrade: 'M', // 고객등급: N - 일반, M - Membership, V - VIP
};

// vvip / vip / family
const memberGrade = {
  N: { className: '', label: '일반' },
  M: { className: 'family', label: 'MEMBERSHIP' },
  V: { className: 'vip', label: 'VIP' }
}

export default function MyPageMember() {
  const profileState = useProfileState();

  const [ myForm, setMyForm ] = useState(initialState);
  const [ error, setError ] = useState([]);

  const onClickHandler = () => {}
  
  const handleSubmit = event => {
    event.preventDefault();
    const test = _.chain(event.target)
                  .pick(Object.keys(initialState))
                  .map(({ name, value }) => ({ [name]: value }))
                  .value();
    console.log(test);
    // @TODO sns 와 email 체크박스는 따로 관리해야 함
  }

  const addErrorType = type => setError(prev => {
    if(prev.some(error => error === type)) return;
    return prev.concat(type);
  });
  const removeErrorType = type => setError(prev => prev.filter(error => error !== type));

  useEffect(() => {
    setMyForm(prev => ({
      ...prev,
      ...profileState.my
    }))
  }, [profileState.my])

    return (
      <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents mypage">
          <div className="member_wrap">
            {/* <div className="common_head first_tit">
              <Link to='/my-page' className="common_head_back">마이페이지</Link>
              <h1 className="common_head_name">회원정보</h1>
            </div> */}
            <form onSubmit={ handleSubmit }>
              <div className="member_info">
                <div className="member_withdrawal">
                  <a href="#none" className="button button_secondary button-s" onClick={ onClickHandler }>비밀번호 변경</a>
                  <a href="#none" className="button button_secondary button-s" onClick={ onClickHandler }>회원탈퇴</a>
                </div>
                <div className="member_info_list">
                  <div className="member_list name">
                    <div className="tit_inner">
                      <label htmlFor="member_name" className="tit">이름</label>
                    </div>
                    <div className="info_inner">
                      <div className="info_box type_txt_btn">
                        <div className="data_box sub_txt_box">
                          <div className="inp_box">
                            <input 
                              type="text" 
                              id="member_name" 
                              name="firstname" 
                              className="inp disabled" 
                              value={ myForm.firstname } 
                              disabled="disabled" 
                              maxLength={50} 
                              autoComplete="off" 
                            />
                            <span className="focus_bg" />
                          </div>
                          <p className="name_desc">※ 개명(이름 변경)한 경우 ‘이름 변경’ 버튼을 눌러주세요.</p>
                        </div>
                        <div className="btn_box">
                          <button className="button change_btn" type="button" onClick={ onClickHandler }>이름변경</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="member_list tel">
                    <div className="tit_inner">
                      <label htmlFor="member_tel" className="tit">휴대폰</label>
                    </div>
                    <div className="info_inner">
                      <div className="info_box type_txt_btn">
                        <div className="data_box">
                          <div className="inp_box">
                            <input 
                              type="text" 
                              id="member_tel" 
                              name="mobile" 
                              className="inp tel_number disabled" 
                              value={ myForm.mobile } 
                              disabled="disabled" 
                              maxLength={11} 
                              autoComplete="off" 
                              placeholder=" " 
                            />
                            <span className="label">휴대폰 번호<span>(- 없이 입력하세요.)</span></span>
                            <span className="focus_bg" />
                          </div>
                        </div>
                        <div className="btn_box">
                          <button className="button change_btn" type="button" onClick={ onClickHandler }><span>휴대폰</span> 번호 변경</button>
                        </div>
                      </div>
                      <div className="info_box type_txt_btn tel_chk">
                        <div className="data_box">
                          <div className="inp_box">
                            <input 
                              type="text" 
                              className="inp" 
                              maxLength={11} 
                              title="인증번호 입력해주세요." 
                              disabled="disabled" 
                              placeholder=" " 
                              autoComplete="off" 
                            />
                            <span className="label">인증번호</span>
                            <span className="focus_bg" />
                          </div>
                          <span className="timer" id="timer">02:55</span>
                        </div>
                        <div className="btn_box">
                          <button className="button btn_primary" disabled="disabled" type="button">인증</button>{/* class : on  */}
                        </div>
                        <div className="certify_txt">※ 입력하신 번호로 인증번호가 전송되었습니다.</div>
                      </div>
                    </div>
                  </div>
                  <div className="member_list email">
                    <div className="tit_inner">
                      <label htmlFor="member_email" className="tit">이메일 아이디</label>
                    </div>
                    <div className="info_inner">
                      <div className="info_box">
                        <div className="data_box">
                          <div className="inp_box">
                            <input 
                              type="text" 
                              id="member_email" 
                              className="inp disabled" 
                              name="customerid"
                              value={ myForm.customerid } 
                              disabled="disabled" 
                              maxLength={50} 
                            />
                            <span className="focus_bg" />
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
                              className="inp disabled" 
                              value={getStrDate(myForm.birthday)} 
                              disabled="disabled" 
                              maxLength={8} 
                            />
                            <span className="focus_bg" />
                          </div>
                        </div>
                      </div>
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
                            <span className={ `ico_grade ${ memberGrade[myForm.custgrade].className }` }>
                              <input 
                                type="text" 
                                id="member_grade"
                                name="custgrade"
                                className="inp disabled" 
                                value={ memberGrade[myForm.custgrade].label }
                                disabled="disabled" 
                                maxLength={20} 
                              />
                              <span className="focus_bg" />
                            </span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* @todo 기획서에 없음 비밀번호 변경 팝업 연결 후 삭제하기 */}
                  {/* <div className="member_list password">
                    <div className="tit_inner">
                      <label htmlFor="member_password" className="tit">비밀번호</label>
                    </div>
                    <div className="info_inner">
                      <div className="info_box type_txt_btn">
                        <div className="data_box">
                          <div className="inp_box password_box">
                            <input 
                              type="password" 
                              id="member_password" 
                              name="password"
                              className="inp disabled" 
                              value={ myForm.password }
                              disabled="disabled" 
                              maxLength={50} 
                              autoComplete="off" 
                            />
                            <span className="focus_bg" />
                          </div>
                        </div>
                        <div className="btn_box">
                          <button className="button change_btn popup_comm_btn" type="button" data-popup-name="password_change" onClick={ onClickHandler }>비밀번호 변경</button>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
                              className="inp disabled" 
                              value={ myForm.homezipcode }
                              disabled="disabled" 
                              maxLength={50} 
                            />
                            <span className="focus_bg" />
                          </div>
                        </div>
                        <div className="btn_box">
                          <button className="button change_btn" type="button" onClick={ onClickHandler }>우편번호찾기</button>
                        </div>
                      </div>
                      <div className="info_box">
                        <div className="data_box">
                          <div className="inp_box">
                            <input 
                              type="text" 
                              id="member_addr2" 
                              name="homeaddress1"
                              className="inp disabled" 
                              value={ myForm.homeaddress1 } 
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
                              className="inp disabled" 
                              value={ myForm.homeaddress2 } 
                              disabled="disabled" 
                              maxLength={50} 
                            />
                            <span className="focus_bg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="member_list opt_in">
                    <div className="tit_inner">
                      <p className="tit">이벤트/포로모션<br className="mo_none" /> 알림</p>
                    </div>
                    <div className="info_inner">
                      <div className="info_box">
                        <div className="switchbtn_box">
                          <div className="switchbtn">
                            <span className="switch_tit">메일 수신</span>
                            <label className="switch">
                              <input 
                                type="checkbox" 
                                name="email_in" 
                                className="check_all" 
                              />
                              <span className="toggle" />
                            </label>
                          </div>
                          <div className="switchbtn">
                            <span className="switch_tit">SMS 수신</span>
                            <label className="switch">
                              <input type="checkbox" name="sms_in" className="check_all" />
                              <span className="toggle" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        {/* 로봇이 아닙니다. */}
        <div className="macro_chk_box" style={{display: 'none'}}>
        </div>
        {/* // 로봇이 아닙니다. */}
      </div>{/* // member_info_list */}
      <div className="btn_article">
        <button className="button button_positive button-full popup_comm_btn" data-popup-name="modify_pw_chk" type="submit">회원정보 수정</button>
      </div>
    </div>
  </form>
</div>{/* // member_wrap */}
</div>
        </>
    );
}
