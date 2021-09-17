import React,{useState} from "react";

//utils
import { Link, useHistory } from "react-router-dom";


//img
import facebook from "../assets/images/common/ic_facebook.svg";
import instagram from "../assets/images/common/ic_instagram.svg";
import youtube from "../assets/images/common/ic_youtube.svg";
import blog from "../assets/images/common/ic_blog.svg";

import sidebar1 from "../assets/images/common/ic_sidebar1.svg";
import InsurePop from "./InsurePop";
import Floating from "./common/Floating";

export default function Footer() {
  const history = useHistory();

  const [isPop, setPop] = useState(false);

  return (
    <>
        <footer className="footer">
          <Floating />
      <nav className="sidebar">
        <div className="sidebar__inner">
          <a  onClick={()=>{history.push('/mypage/myPageMain.html')}} className="sidebar__btn sidebar__btn__link kakao"><span>카톡 상담</span></a>
          <a  className="sidebar__btn sidebar__btn__link customer"><span>고객 센터</span></a>
          <a href="#header" className="sidebar__btn top"><span>페이지 상단</span></a>
        </div>
        <button className="sidebar__btn sidebar__btn__toggle" type="button"><img src={sidebar1} alt="메뉴토글" /></button>
      </nav>
      <div className="footer__inner">
        <div className="footer__social__wrap">
          <div className="footer__social">
            <h3 className="footer__social__title">FOLLOW US</h3>
            <div className="footer__social__links">
              <a  className="footer__social__link"><img src={facebook} alt="facebook" /></a>
              <a  className="footer__social__link"><img src={instagram} alt="instagram" /></a>
              <a  className="footer__social__link"><img src={youtube} alt="youtube" /></a>
              <a  className="footer__social__link"><img src={blog} alt="blog" /></a>
            </div>
          </div>
          <div className="footer__family">
            <div className="footer__family__links">
              <div className="footer__family__link footer__pc">
                <button type="button" className="footer__family__link__trigger" aria-label="소니코리아 계열사 목록 펼침">Sony Family</button>
                <div className="footer__family__link__inner">
                  <h4 className="optgroup__label">Sony Family</h4>
                  <ul className="optgroup">
                    <li className="option"><a  target="_blank">소니코리아</a></li>
                    <li className="option"><a  target="_blank">소니코리아 고객지원</a></li>
                    <li className="option"><a  target="_blank">소니 알파 α</a></li>
                    <li className="option"><a  target="_blank">소니 방송/업무용 솔루션</a></li>
                    <li className="option"><a  target="_blank">소니 방송 업무용 솔루션 고객지원</a></li>
                  </ul>
                  <h4 className="optgroup__label">Family Company</h4>
                  <ul className="optgroup">
                    <li className="option"><a  target="_blank">소니 인터렉티브 엔터테인먼트 코리아</a></li>
                    <li className="option"><a  target="_blank">소니 뮤직 엔터테인먼트 코리아</a></li>
                    <li className="option"><a  target="_blank">소니 ATV 뮤직 퍼블리싱 코리아</a></li>
                    <li className="option"><a  target="_blank">소니 픽쳐스 엔터테인먼트 코리아</a></li>
                    <li className="option"><a  target="_blank">소니 픽쳐스 텔레비전 코리아</a></li>
                  </ul>
                </div>
              </div>
              <select className="footer__family__link footer__mo">
                <optgroup label="Sony Family">
                  <option>소니코리아</option>
                  <option>소니코리아 고객지원</option>
                  <option>소니 알파 α</option>
                  <option>소니 방송/업무용 솔루션</option>
                  <option>소니 방송 업무용 솔루션 고객지원</option>
                </optgroup>
                <optgroup label="Family Company">
                  <option>소니 인터렉티브 엔터테인먼트 코리아</option>
                  <option>소니 뮤직 엔터테인먼트 코리아</option>
                  <option>소니 ATV 뮤직 퍼블리싱 코리아</option>
                  <option>소니 픽쳐스 엔터테인먼트 코리아</option>
                  <option>소니 픽쳐스 텔레비전 코리아</option>
                </optgroup>
              </select>
            </div>
            <a href="https://www.sony.com/" className="footer__family__global" target="_blank">Sony Global</a>
          </div>
        </div>
        <div className="footer__legal">
          <div className="footer__legal__links">
            <Link to="/footer/terms" className="footer__legal__link">이용약관</Link>
            <Link to="/footer/policy"  className="footer__legal__link privacy">개인정보처리방침</Link>
            <a  onClick={()=>{setPop(true)}} className="footer__legal__link" data-modal-target="modal__customer__insurance" style={{cursor:"pointer"}}>소비자 피해 보상보험</a>
            <Link to="/footer/sitemap" className="footer__legal__link">사이트맵</Link>
          </div>
          <div className="footer__legal__warning">
            <p>본 사이트의 컨텐츠는 저작권법의 보호를 받는 바, 상업적 목적의 무단전재, 복사, 배포 등을 금합니다.</p>
            <p>고객님의 안정한 거래를 위해 현금 등의 거래를 통한 결제를 하실 경우,<br /> KG이니시스의 구매 안전서비스(채무지급보증)를 이용하실 수 있습니다.<a  className="escrow">에스크로결제</a></p>
          </div>
        </div>
        <address className="address">
          <span>사업장주소 : 서울특별시 영등포구 국제금융로 10 원아이에프씨 24F</span>
          <span>사업자 등록번호 : 106-81-23810 통신판매번호 2012-서울영등포-1038 소니코리아㈜</span>
          <span>대표이사 : Okura Kikuo</span>
          <span>개인정보관리책임자 : Okura Kikuo</span>
          <span>TEL : 소니코리아 고객센터 1588-0911</span>
          <span>E-MAIL : <a href="mailto:cshelp@sony.co.kr">cshelp@sony.co.kr</a></span>
          <span>Copyright © Sony Korea Corporation. All rights reserved.</span>
        </address>
      </div>
    </footer>

    {
      isPop === true && 
      <InsurePop setPop={setPop} />
    }
    </>
  );
}