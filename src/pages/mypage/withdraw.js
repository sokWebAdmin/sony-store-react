import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/mypage.scss"

export default function withdraw() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents mypage">
        <div className="container" id="container">
  <div className="content">
    <div className="common_head">
      <a href="../../html/mypage/myPageMain.html" className="common_head_back">마이페이지</a>
      <div className="common_head_name">회원탈퇴</div>
    </div>
    <div className="withdraw_wrap">
      <div className="member_idbox">
        iLoveSonydkfjalfj@sony.co.kr
      </div>
      <p className="txt_primary">개인정보, 쿠폰 정보, 보유하신 마일리지, 정품등록 정보 등 회원 탈퇴 시 삭제됩니다.</p>
      <form>
        <div className="withdraw_box">
          <div className="group">
            <div className="inp_box password_box">
              <label className="inp_desc" htmlFor="popPw">
                <input type="password" id="popPw" className="inp center" placeholder=" " />
                <span className="label">비밀번호</span>
                <span className="focus_bg" />
                <div className="eyes"><button type="button" title="비밀번호 숨김"><i className="ico ico_eyes" /></button></div>
              </label>
            </div>
            <div className="error_txt"><span className="ico" />현재 비밀번호가 올바르지 않습니다.</div>
          </div>
          <div className="select_ui_zone btm_line">
            <a  className="selected_btn" data-default-text="탈퇴사유를 선택해주세요.">{/* disabled : 선택불가 품절 */}
              탈퇴사유를 선택해주세요.
            </a>
            <div className="select_inner">
              <p className="prd_tag">탈퇴사유</p>
              <ul className="select_opt">
                <li>
                  <a  className="opt_list">{/* disabled : 선택 불가 품절 */}
                    <div className="item">다른 아이디 변경을 위해 탈퇴</div>
                  </a>
                </li>
                <li>
                  <a  className="opt_list">
                    <div className="item">유용한 컨텐츠 부족</div>
                  </a>
                </li>
                <li>
                  <a  className="opt_list">
                    <div className="item">장기간 부재(해외 이민, 유학, 군입대 등)로 인한 탈퇴</div>
                  </a>
                </li>
                <li>
                  <a  className="opt_list">
                    <div className="item">개인정보 노출 우려로 인한 탈퇴</div>
                  </a>
                </li>
                <li>
                  <a  className="opt_list">
                    <div className="item">기타</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="btn_article">
            <button className="button button_positive popup_comm_btn button-full" type="button" data-popup-name="withdraw_pop">회원탈퇴</button>
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
            <div className="sns_login_box">
              <div className="txt_lft">
                <strong className="sns_title">SNS 계정으로 회원 인증</strong>
                <p>SNS 계정으로 가입하신 회원님은 비밀번호 입력 대신 SNS 계정을 인증해 주셔야 탈퇴가 가능합니다.</p>
              </div>
              <ul className="sns_list">
                <li className="naver"><a >네이버</a></li>
                <li className="kakao"><a >카카오톡</a></li>
                <li className="facebook"><a >페이스북</a></li>
              </ul>
            </div>
          </div>
        </div></form>
    </div>
  </div>
</div>
</div>

        </>
    );
}