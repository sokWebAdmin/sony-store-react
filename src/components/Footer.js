import React,{useRef, useState, useMemo} from "react";
// import { isMobile } from 'react-device-detect';

//utils
import { Link } from "react-router-dom";


//img
import facebook from "../assets/images/common/ic_facebook.svg";
import instagram from "../assets/images/common/ic_instagram.svg";
import youtube from "../assets/images/common/ic_youtube.svg";
import blog from "../assets/images/common/ic_blog.svg";

import InsurePop from "./InsurePop";
import Floating from "./common/Floating";
import { useClickOutside, useToggle } from "../hooks";
import { SONY_COMPANY, SONY_FAMILY } from "../const/footer";

const MOBILE_WIDTH = 640;

export default function Footer() {
  const windowWidth = window.innerWidth;
  const isMobile = useMemo(() => windowWidth <= MOBILE_WIDTH, [windowWidth]);

  const [isPop, setPop] = useState(false);

  const [ pcActive, setPcActive ] = useToggle(false);

  const [ moActive, setMoActive ] = useToggle(false);

  const footerRef = useRef(null);
  useClickOutside(footerRef, () => setPcActive(false));

  const selectRef = useRef(null);

  return (
    <>
      <footer className="footer" style={{
        paddingBottom: '64px',
      }}>
        <Floating />
        <div className="footer__inner">
          <div className="footer__social__wrap">
            <div className="footer__social">
              <h3 className="footer__social__title">FOLLOW US</h3>
              <div className="footer__social__links">
                <a href="https://www.facebook.com/sonykorea" target="_blank"
                   rel="noreferrer" className="footer__social__link"><img
                  src={facebook} alt="facebook" /></a>
                <a href="https://www.instagram.com/sonykorea" target="_blank"
                   rel="noreferrer" className="footer__social__link"><img
                  src={instagram} alt="instagram" /></a>
                <a href="https://www.youtube.com/user/sonystyleblog"
                   target="_blank" rel="noreferrer"
                   className="footer__social__link"><img src={youtube}
                                                         alt="youtube" /></a>
                <a href="https://stylezineblog.com/?intcmp=Main_Blog"
                   target="_blank" rel="noreferrer"
                   className="footer__social__link"><img src={blog}
                                                         alt="blog" /></a>
              </div>
            </div>
            <div className="footer__family">
              <div className="footer__family__links" ref={footerRef}>
                <div className={`footer__family__link footer__pc ${pcActive && 'footer__family__link--active'}`}>
                  <button type="button" className="footer__family__link__trigger" aria-label="소니코리아 계열사 목록 펼침" onClick={ () => isMobile ? setMoActive() : setPcActive() }>Sony Family</button>
                  <div className="footer__family__link__inner">
                    <h4 className="optgroup__label">Sony Family</h4>
                    <ul className="optgroup">
                      {
                        SONY_FAMILY.map(({ url, name }) => (
                          <li className="option" key={`footer-ul-family-${name}`}><a href={url} target="_blank" rel="noreferrer" onClick={ () => setPcActive(false) }>{ name }</a></li>
                        ))
                      }
                    </ul>
                    <h4 className="optgroup__label">Family Company</h4>
                    <ul className="optgroup">
                      {
                        SONY_COMPANY.map(({ url, name }) => (
                          <li className="option" key={`footer-ul-company-${name}`}><a href={url} target="_blank" rel="noreferrer" onClick={ () => setPcActive(false) }>{ name }</a></li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <select defaultValue="default" ref={selectRef} onChange={e => {
                  window.open(e.target.value);
                  selectRef.current.value='default';
                }} className={`footer__family__link footer__mo ${moActive && 'footer__family__link--active'}`}>
                  <option value="default" disabled hidden>Sony Family</option>
                  <optgroup label="Sony Family" >
                    {
                      SONY_FAMILY.map(({ url, name }) => <option value={url} key={`footer-option-family-${name}`}>{ name }</option>)
                    }
                  </optgroup>
                  <optgroup label="Family Company">
                    {
                      SONY_COMPANY.map(({ url, name }) => <option value={url}  key={`footer-ul-company-${name}`}>{ name }</option>)
                    }
                  </optgroup>
                </select>
              </div>
              <a href="https://www.sony.com/" className="footer__family__global" target="_blank" rel="noreferrer">Sony Global</a>
            </div>
          </div>
          <div className="footer__legal">
            <div className="footer__legal__links">
              <Link to="/footer/terms" className="footer__legal__link">이용약관</Link>
              <a href="https://www.sony.co.kr/handler/ProductInfo-Start?PageName=jsp/footer/CF_policy.jsp" target="_blank" rel="noreferrer"  className="footer__legal__link privacy">개인정보처리방침</a>
              <a href="/"  onClick={(e)=>{e.preventDefault(); setPop(true)}} className="footer__legal__link" >소비자 피해 보상보험</a>
              <Link to="/footer/sitemap" className="footer__legal__link">사이트맵</Link>
            </div>
            <div className="footer__legal__warning">
              <p>본 사이트의 컨텐츠는 저작권법의 보호를 받는 바, 상업적 목적의 무단전재, 복사, 배포 등을 금합니다.</p>
              <p>고객님의 안정한 거래를 위해 현금 등의 거래를 통한 결제를 하실 경우,<br /> KG이니시스의 구매
                안전서비스(채무지급보증)를 이용하실 수 있습니다.
                <a className="escrow"
                   href="https://mark.inicis.com/mark/escrow_popup_v3.php?mid=SonyKoreat"
                   style={{
                     backgroundImage: 'url(https://image.inicis.com/mkt/certmark/escrow/escrow_43x43_gray.png)',
                   }} target="_blank" rel="noreferrer">클릭하시면 이니시스 결제시스템의 유효성을
                  확인하실 수 있습니다.</a>
              </p>
            </div>
          </div>
          <address className="address">
            <span>사업장주소 : 서울특별시 영등포구 국제금융로 10 원아이에프씨 24F</span>
            <span>사업자 등록번호 : 106-81-23810 통신판매번호 2012-서울영등포-1038 소니코리아㈜</span>
            <span>대표이사 : Okura Kikuo</span>
            <span>개인정보관리책임자 : Okura Kikuo</span>
            {
              isMobile ? <span><a href="tel:1588-0911">TEL : 소니코리아 고객센터 1588-0911</a></span> : <span>TEL : 소니코리아 고객센터 1588-0911</span>
            }
            <span>E-MAIL : <a href="mailto:cshelp@sony.co.kr">cshelp@sony.co.kr</a></span>
            <span>Copyright © Sony Korea Corporation. All rights reserved.</span>
          </address>
        </div>
        <script type="text/javascript" src="//image.sony.co.kr/omniture/omni_dev/sonystore_code_2013.js"></script>
      </footer>

      {
        isPop === true &&
        <InsurePop setPop={setPop} />
      }
    </>
  );
}