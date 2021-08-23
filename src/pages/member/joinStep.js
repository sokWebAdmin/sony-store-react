import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/css/contents.css"

export default function joinStep() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="container" id="container">
  <div className="login join_step">
    <h2 className="login__title">회원가입</h2>
    <p className="login__desc">소니코리아 통합 웹회원 정책 상 공식적으로 <strong>만 14세 미만의 경우 회원가입이 불가합니다.</strong></p>
    <div className="join_inp_box">
      <div className="group not-ready">
        <div className="inp_box">
          <label className="inp_desc" htmlFor="loginName">
            <input type="text" id="loginName" className="inp" placeholder=" " autoComplete="off" tabIndex={1} />
            <span className="label">이메일 아이디<span>(예 : sony@sony.co.kr)</span></span>
            <span className="focus_bg" />
          </label>
        </div>
        <div className="error_txt"><span className="ico" />이메일 아이디를 입력해 주세요.</div>
      </div>
      <div className="rowgroup">
        <div className="group not-ready">
          <div className="inp_box password_box">
            <label className="inp_desc" htmlFor="loginPw1">
              <input type="password" id="loginPw1" className="inp" placeholder=" " autoComplete="off" tabIndex={2} />
              <span className="label">비밀번호<span>(영문/숫자 조합 10~15자리 미만)</span></span>
              <span className="focus_bg" />
              <div className="eyes"><button type="button" title="비밀번호 숨김"><i className="ico ico_eyes" /></button></div>
            </label>
          </div>
          <div className="error_txt"><span className="ico" />비밀번호를 입력해 주세요.</div>
        </div>
        <div className="group not-ready">
          <div className="inp_box password_box">
            <label className="inp_desc" htmlFor="loginPw2">
              <input type="password" id="loginPw2" className="inp" placeholder=" " autoComplete="off" tabIndex={3} />
              <span className="label">비밀번호 확인</span>
              <span className="focus_bg" />
              <div className="eyes"><button type="button" title="비밀번호 숨김"><i className="ico ico_eyes" /></button></div>
            </label>
          </div>
          <div className="error_txt"><span className="ico" />비밀번호를 재입력 해주세요.</div>
        </div>
      </div>
      <div className="rowgroup">
        <div className="group not-ready">
          <div className="inp_box">
            <label className="inp_desc" htmlFor="username">
              <input type="text" id="username" className="inp" placeholder=" " autoComplete="off" tabIndex={4} />
              <span className="label">이름<span>(띄어쓰기 없이 입력하세요.)</span></span>
              <span className="focus_bg" />
            </label>
          </div>
          <div className="error_txt"><span className="ico" />이름을 입력해 주세요.</div>
        </div>
        <div className="group not-ready">
          <div className="inp_box">
            <label className="inp_desc" htmlFor="userbirth">
              <input type="text" id="userbirth" className="inp" placeholder=" " />
              <span className="label">생년월일<span>(예 : 20210307)</span></span>
              <span className="focus_bg" />
            </label>
          </div>
          <div className="error_txt"><span className="ico" />생년월일을 주세요.</div>
        </div>
      </div>
      <div className="group not-ready btn_type">
        <div className="inp_box">
          <label className="inp_desc" htmlFor="phonenumber">
            <input type="text" id="phonenumber" className="inp" placeholder=" " autoComplete="off" tabIndex={5} />
            <span className="label">휴대폰 번호<span>(-없이 입력하세요.)</span></span>
            <span className="focus_bg" />
          </label>
          <div className="btn_box">
            <button type="button" className="btn btn_disable">인증번호</button>
            {/*<button type="button" class="btn btn_primary">인증번호</button> 휴대폰 번호 입력시 활성화 버튼*/}
            {/*<button type="button" class="btn btn_default">재전송</button> 재전송시 버튼 */}
          </div>
        </div>
        <div className="error_txt"><span className="ico" />휴대폰 번호를 입력해주세요.</div>
      </div>
      <div className="group not-ready btn_type">
        <div className="inp_box">
          <label className="inp_desc" htmlFor="certifynumber">
            <input type="text" id="certifynumber" className="inp" placeholder=" " autoComplete="off" tabIndex={6} />
            <span className="label">인증번호</span>
            <span className="timer" id="timer">03:00</span>
            <span className="focus_bg" />
          </label>
          <div className="btn_box">
            <button type="button" className="btn btn_primary">인증</button>
          </div>
        </div>
        <div className="certify_txt">※ 입력하신 번호로 인증번호가 전송되었습니다.</div>
      </div>
      <div className="btn_box full">
        <button type="button" className="btn btn_dark" onClick={()=>{
            window.location.href="/member/login"
        }}>가입 완료</button>
      </div>
    </div>
  </div>
</div>
        </>
    );
}