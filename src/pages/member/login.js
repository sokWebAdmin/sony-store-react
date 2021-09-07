import React, { useState, useEffect, useContext } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import {loginApi} from "../../api/auth";
import {getProfile} from "../../api/member";

//css
import "../../assets/scss/contents.scss"

//utils
import { emptyCheck } from '../../utils/utils';
import { useHistory } from "react-router-dom";

//lib
import Cookies from "js-cookie";

//context
import GlobalContext from '../../context/global.context';
import { setAccessToken } from '../../utils/token';
import { fetchProfile, useProileDispatch } from '../../context/profile.context';
import OpenLogin from '../../components/member/OpenLogin';

export default function Login() {
  const {onChangeGlobal, isLogin} = useContext(GlobalContext);
  const profileDispatch = useProileDispatch();

  const history = useHistory();

  const [tabState, setTabState] = useState("member");
  const [isPwVisible, setPwVisible] = useState(false);

  //state
  const [email, setEmail] = useState(Cookies.get('sony_email') ?? '');
  const [pw, setPw] = useState('');

  //validation
  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);

  //cookie
  const [saveEmail, setSaveEmail] = useState(Cookies.get('sony_email') ?? false);

  //action
  const _loginApi = async (email, password) => {
    let validation = true
    if(emptyCheck(email)){
      setIsEmail(true)
      validation = false;
    } else{
      setIsEmail(false)
    }
    
    if(emptyCheck(password)){
      setIsPw(true)
      validation = false;
    } else{
      setIsPw(false)
    }

    if(validation){
      const response = await loginApi(email, password);
      if(response.status !== 200) {
        alert("아이디/비밀번호를 확인해주세요.");
      }else {
        const {accessToken, expireIn} = response.data;
        setAccessToken(accessToken, expireIn);
        onChangeGlobal({isLogin: true})
        await fetchProfile(profileDispatch);

        if(saveEmail === true){
          Cookies.set("sony_email", email);
        }else{
          Cookies.remove("sony_email");
        }
        history.push('/')
      }
    }
  }

  //componentDidMount
  useEffect(()=>{
    //로그인 상태인 경우, 메인화면으로 자동 이동처리
    if (isLogin) {
      history.push('/');
    }
  },[])


    return (
        <>
        <SEOHelmet title={"로그인"} />
        <div className="contents">
          <div className="container" id="container"> 
            <div className="login">
              <ul className="login__tab">
                <li className={tabState == "member" ? "current" : ""} data-tab="tab1"><a href="javascript:void(0)" onClick={()=>{
                  setTabState("member")
                }}>회원 로그인</a></li>
                <li className={tabState == "nonmember" ? "current" : ""} data-tab="tab2"><a href="javascript:void(0)" onClick={()=>{
                  setTabState("nonmember")
                }}>비회원 로그인</a></li>
              </ul>


              {/* 회원 로그인  */}
              <div id="tab1" className={`login__tabcont ${tabState == "member" ? "current" : ""}`}>
                <div className={`group ${isEmail === true && "error"}`}>
                  <div className="inp_box">
                    <label className="inp_desc" htmlFor="loginName">
                      <input type="text" id="loginName" className="inp" placeholder=" " value={email} onChange={(e)=>{ setEmail(e.target.value) }} />
                      <span className="label">이메일 아이디<span>(예 : sony@sony.co.kr)</span></span>
                      <span className="focus_bg" />
                    </label>
                  </div>
                  <div className="error_txt"><span className="ico" />이메일 아이디를 입력해 주세요.</div>
                </div>
                <div className={`group ${isPw === true && "error"}`}>
                  <div className="inp_box password_box">
                    <label className="inp_desc" htmlFor="loginPw">
                      <input type={`${isPwVisible === true ? "text" : "password"}`} id="loginPw" className="inp" placeholder=" " value={pw} onChange={(e)=>{ setPw(e.target.value) }} />
                      <span className="label">비밀번호</span>
                      <span className="focus_bg" />
                      <div className="eyes">
                        <button type="button" title={`${isPwVisible === true ? "비밀번호 숨김" : "비밀번호 표시"}`} onClick={()=>{
                          setPwVisible(!isPwVisible);
                        }}>
                          <i className="ico ico_eyes" />
                        </button>
                      </div>
                    </label>
                  </div>
                  <div className="error_txt"><span className="ico" />비밀번호를 입력해 주세요.</div>
                </div>
                <div className="btn_box full">
                  <button type="submit" className="btn btn_dark" title="로그인" onClick={()=>{
                      _loginApi(email, pw);
                  }}>로그인</button>
                </div>
                <div className="find_box">
                  <div className="check">
                    <input type="checkbox" className="inp_check" id="chk01" checked={saveEmail} onChange={(e)=>{
                      if(e.target.checked == true){
                        setSaveEmail(true);
                      }else{
                        setSaveEmail(false);
                      }
                    }}/>
                    <label htmlFor="chk01">이메일 아이디 저장</label>
                  </div>
                  <ul className="user_menu">
                    <li><a href="javascript:void(0)" onClick={()=>{history.push('/member/search')}}>아이디 · 비밀번호 찾기</a></li>
                    <li><a href="javascript:void(0)" onClick={()=>{history.push('/member/join-agree')}}>회원가입</a></li>
                  </ul>
                </div>
                <div className="txt_or">
                  <span className="txt">또는</span>
                  <span className="bar" />
                </div>
                <OpenLogin/>
              </div>
                
                {/* 비회원 로그인 */}
              <div id="tab2" className={`login__tabcont ${tabState == "nonmember" ? "current" : ""}`}>
                <div className="group">
                  <div className="inp_box">
                    <label className="inp_desc" htmlFor="loginumber">
                      <input type="text" id="loginumber" className="inp" placeholder=" " />
                      <span className="label">주문번호</span>
                      <span className="focus_bg" />
                    </label>
                  </div>
                  <div className="error_txt"><span className="ico" />주문번호를 입력해 주세요.</div>
                </div>
                <div className="group">
                  <div className="inp_box password_box">
                    <label className="inp_desc" htmlFor="loginumber">
                      <input type="password" id="loginPw_nonmember" className="inp" placeholder=" " />
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
                    <a href="javascript:void(0)" onClick={()=>{history.push('/member/join')}} className="btn btn_default">회원가입</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    );
}