import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"

export default function login() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents">
        <div className="container" id="container">
  <div className="login">
    <ul className="login__tab">
      <li className="current" data-tab="tab1"><a href="#">회원 로그인</a></li>
      <li data-tab="tab2"><a href="#">비회원 로그인</a></li>
    </ul>
    <div id="tab1" className="login__tabcont current">
      <div className="group">
        <div className="inp_box">
          <label className="inp_desc" htmlFor="loginName">
            <input type="text" id="loginName" className="inp" placeholder=" " />
            <span className="label">이메일 아이디<span>(예 : sony@sony.co.kr)</span></span>
            <span className="focus_bg" />
          </label>
        </div>
        <div className="error_txt"><span className="ico" />이메일 아이디를 입력해 주세요.</div>
      </div>
      <div className="group">
        <div className="inp_box password_box">
          <label className="inp_desc" htmlFor="loginPw">
            <input type="password" id="loginPw" className="inp" placeholder=" " />
            <span className="label">비밀번호</span>
            <span className="focus_bg" />
            <div className="eyes"><button type="button" title="비밀번호 숨김"><i className="ico ico_eyes" /></button></div>
          </label>
        </div>
        <div className="error_txt"><span className="ico" />비밀번호를 입력해 주세요.</div>
      </div>
      <div className="btn_box full">
        <button type="submit" className="btn btn_dark" title="로그인" onClick={()=>{
            window.location.href="/my-page"
        }}>로그인</button>
      </div>
      <div className="find_box">
        <div className="check">
          <input type="checkbox" className="inp_check" id="chk01" />
          <label htmlFor="chk01">이메일 아이디 저장</label>
        </div>
        <ul className="user_menu">
          <li><a href="/member/pw-search">아이디 · 비밀번호 찾기</a></li>
          <li><a href="/member/join">회원가입</a></li>
        </ul>
      </div>
      <div className="txt_or">
        <span className="txt">또는</span>
        <span className="bar" />
      </div>
      <div className="sns_login_box">
        <strong className="sns_title">SNS 계정으로 <span>간편하게 로그인하세요.</span></strong>
        <ul className="sns_list">
          <li className="naver"><a href="#">네이버</a></li>
          <li className="kakao"><a href="#">카카오톡</a></li>
          <li className="facebook"><a href="#">페이스북</a></li>
        </ul>
      </div>
    </div>
    <div id="tab2" className="login__tabcont">
      <div className="group">
        <div className="inp_box">
          <label className="inp_desc" htmlFor="loginumber">
            <input type="text" id="loginumber" className="inp" placeholder=" " />
            <span className="label">주문번호</span>
            <span className="focus_bg" />
          </label>
        </div>
        <div className="error_txt"><span className="ico" />주문번호를 입력해 주세요.</div>
      </div>
      <div className="group">
        <div className="inp_box password_box">
          <label className="inp_desc" htmlFor="loginumber">
            <input type="password" id="loginPw_nonmember" className="inp" placeholder=" " />
            <span className="label">비밀번호</span>
            <div className="eyes"><button type="button" title="비밀번호 숨김"><i className="ico ico_eyes" /></button></div>
            <span className="focus_bg" />
          </label>
        </div>
        <div className="error_txt"><span className="ico" />비밀번호를 입력해 주세요.</div>
      </div>
      <div className="btn_box full">
        <button type="submit" className="btn btn_dark" title="로그인">로그인</button>
      </div>
      <p className="txt_nonmember">비회원께서는 주문 시 주문번호와 비밀번호(주문 시 배송 조회 비밀번호로 입력)를 입력하시면,<span className="block">해당 주문 상품의 배송 상태를 조회하실 수 있습니다.</span></p>
      <div className="join_box">
        <strong className="join_title">아직 소니코리아 회원이 아니세요?</strong>
        <p className="join_desc">회원가입을 통해 소니스토어에서 <span className="block">다양한 서비스를 이용하실 수 있습니다.</span></p>
        <div className="btn_box">
          <a href="/member/join" className="btn btn_default">회원가입</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>


        </>
    );
}