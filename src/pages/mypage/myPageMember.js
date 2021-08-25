import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/mypage.scss"

export default function myPageMember() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents mypage">
       <div className="member_wrap">
  <div className="common_head first_tit">
    <a href="../../html/mypage/myPageMain.html" className="common_head_back">마이페이지</a>
    <h1 className="common_head_name">회원정보</h1>
  </div>
  <form action>
    <div className="member_info">
      <div className="member_withdrawal">
        <a href="#" className="button button_secondary button-s">회원탈퇴</a>
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
                  <input type="text" id="member_name" className="inp disabled" defaultValue="김소니" disabled="disabled" maxLength={50} autoComplete="off" />
                  <span className="focus_bg" />
                </div>
                <p className="name_desc">※ 개명(이름 변경)한 경우 ‘이름 변경’ 버튼을 눌러주세요.</p>
              </div>
              <div className="btn_box">
                <button className="button change_btn" type="button">이름변경</button>
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
                  <input type="text" id="member_tel" className="inp tel_number disabled" defaultValue={"12345678910"} disabled="disabled" maxLength={11} autoComplete="off" placeholder=" " />
                  <span className="label">휴대폰 번호<span>(- 없이 입력하세요.)</span></span>
                  <span className="focus_bg" />
                </div>
              </div>
              <div className="btn_box">
                <button className="button change_btn" type="button"><span>휴대폰</span> 번호 변경</button>
              </div>
            </div>
            <div className="info_box type_txt_btn tel_chk">
              <div className="data_box">
                <div className="inp_box">
                  <input type="text" className="inp" maxLength={11} title="인증번호  입력해주세요." disabled="disabled" placeholder=" " autoComplete="off" />
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
                  <input type="text" id="member_email" className="inp disabled" defaultValue="sony@sony.co.kr" disabled="disabled" maxLength={50} />
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
                  <input type="text" id="member_birth" className="inp disabled" defaultValue={"20020518"} disabled="disabled" maxLength={8} />
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
                  <span className="ico_grade vvip">{/* class : vvip / vip / family*/}
                    <input type="text" id="member_grade" className="inp disabled" defaultValue="VVIP" disabled="disabled" maxLength={20} />
                    <span className="focus_bg" />
                  </span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="member_list password">
          <div className="tit_inner">
            <label htmlFor="member_password" className="tit">비밀번호</label>
          </div>
          <div className="info_inner">
            <div className="info_box type_txt_btn">
              <div className="data_box">
                <div className="inp_box password_box">
                  <input type="password" id="member_password" className="inp disabled" defaultValue={"123456789"} disabled="disabled" maxLength={50} autoComplete="off" />
                  <span className="focus_bg" />
                </div>
              </div>
              <div className="btn_box">
                <button className="button change_btn popup_comm_btn" type="button" data-popup-name="password_change">비밀번호 변경</button>
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
                  <input type="text" id="member_addr" className="inp disabled" defaultValue={"05781"} disabled="disabled" maxLength={50} />
                  <span className="focus_bg" />
                </div>
              </div>
              <div className="btn_box">
                <button className="button change_btn" type="button">주소 변경</button>
              </div>
            </div>
            <div className="info_box">
              <div className="data_box">
                <div className="inp_box">
                  <input type="text" id="member_addr2" className="inp disabled" defaultValue="서울특별시 영등포구 여의도동 국제금융로 10 One IFC" disabled="disabled" maxLength={50} />
                </div>
              </div>
            </div>
            <div className="info_box">
              <div className="data_box"><div className="inp_box">
                  <input type="text" id="member_addr3" className="inp disabled" defaultValue="One IFC 24층 ㈜ 소니코리아" disabled="disabled" maxLength={50} />
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
                    <input type="checkbox" name="email_in" className="check_all" />
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
        <button className="button button_positive button-full popup_comm_btn" data-popup-name="modify_pw_chk" type="button">회원정보 수정</button>
      </div>
    </div>
  </form>
</div>{/* // member_wrap */}
</div>
        </>
    );
}