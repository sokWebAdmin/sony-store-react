import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss"

export default function pwSearch() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents">
        <div className="container" id="container">
  <div className="login">
    <h2 className="login__title">아이디 · 비밀번호 찾기</h2>
    <p className="login__desc">아이디·비밀번호가 기억나지 않으신가요? <span>아래의 인증 방법 중 선택하여 인증해주세요.</span></p>
    <div className="login__search_box">
      <ul className="login__tab search_type">
        <li><a >아이디 찾기</a></li>
        <li className="current"><a >비밀번호 찾기</a></li>{/* 활성화 클래스 li 에 current */}
      </ul>
      <div className="idsearch_way">
        <div className="radio_box">
          <input type="radio" className="inp_radio" id="tab1" name="tabradio" defaultChecked="checked" />
          <label htmlFor="tab1" className="contentType">본인인증으로 찾기</label>
        </div>
        <div className="radio_box">
          <input type="radio" className="inp_radio" id="tab2" name="tabradio" />
          <label htmlFor="tab2" className="contentType">간편회원가입 정보로 찾기</label>
        </div>
      </div>
      <div className="tabResult">
        <div className="result_cont tab1 on">
          <ul className="certify_box">
            <li>
              <a >
                <span className="ico_phone_certify" />
                <p>휴대폰 번호 인증하기<span>(본인인증으로 찾기)</span></p>
              </a>
            </li>
            <li>
              <a >
                <span className="ico_ipn_certify" />
                <p>아이핀 인증하기<span>(간편 회원 가입정보로 찾기)</span></p>
              </a>
            </li>
          </ul>
        </div>
        <div className="result_cont tab2">
          <div className="group not-ready">
            <div className="inp_box">
              <label className="inp_desc" htmlFor="loginName">
                <input type="text" id="loginName" className="inp" placeholder=" " autoComplete="off" tabIndex={1} />
                <span className="label">이메일 아이디<span>(예 : sony@sony.co.kr)</span></span>
                <span className="focus_bg" />
              </label>
            </div>
            <div className="error_txt"><span className="ico" />이름을 입력해 주세요. (띄어쓰기 없이 입력하세요.)</div>
          </div>
          <div className="group not-ready btn_type">
            <div className="inp_box">
              <label className="inp_desc" htmlFor="phonenumber">
                <input type="text" id="phonenumber" className="inp" placeholder=" " autoComplete="off" tabIndex={2} />
                <span className="label">휴대폰 번호<span>(-없이 입력하세요.)</span></span>
                <span className="focus_bg" />
              </label>
              <div className="btn_box">
                <button type="button" className="btn btn_disable">인증번호</button>
                {/*<button type="button" class="btn btn_primary">인증번호</button> 휴대폰 번호 입력시 활성화 버튼*/}
                {/*<button type="button" class="btn btn_default">재전송</button> 재전송시 버튼 */}
              </div>
            </div>
            <div className="error_txt"><span className="ico" />휴대폰 번호를 입력해주세요. (-없이 입력하세요.)</div>
          </div>
          <div className="group not-ready btn_type">
            <div className="inp_box">
              <label className="inp_desc" htmlFor="certifynumber">
                <input type="text" id="certifynumber" className="inp" placeholder=" " autoComplete="off" tabIndex={3} />
                <span className="label">인증번호</span>
                <span className="timer" id="timer">02:43</span>
                <span className="focus_bg" />
              </label>
              <div className="btn_box">
                <button type="button" className="btn btn_primary">인증</button>
              </div>
            </div>
            <div className="certify_txt">※ 입력하신 번호로 인증번호가 전송되었습니다.</div>
          </div>
          <div className="btn_box full">
            <button type="button" className="btn btn_dark">확인</button>
          </div>
        </div>
      </div>
      <div className="caution_txt">
        <p>· 가입하신 종류와 일치하지 않을 경우 검색이 안될 수 있습니다.</p>
      </div>
    </div>
  </div>
</div>
</div>
        </>
    );
}