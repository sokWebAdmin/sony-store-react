import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/css/contents.css"
import "../../assets/css/support.css"

export default function Notice() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="container full">
  <div className="content">
    <div className="faq_notice_head">
      <div className="common_head first_tit">
        <h1 className="common_head_name">FAQ &amp; 공지사항</h1>
        <p className="common_head_txt">소니스토어에 많이 물어보시는 질문과<br className="pc_none" />새로운 소식을 만나보세요.</p>
      </div>
      <div className="tab_link_zone">
        <ul className="tab_link_inner">
          <li className="tabs">
            <a href="/faq" className="tab_btn" title="FAQ 보기"><span className="tit">FAQ</span></a>
          </li>
          <li className="tabs on">
            <a href="/notice-list" className="tab_btn" title="공지사항 보기"><span className="tit">공지사항</span></a>
          </li>
        </ul>
      </div>
    </div>
    {/* 
    확인을 위해 안내와 당첨자 발표 두 가지 노출 되고 있으니,
    참고 부탁드립니다.
  */}
    {/* [공지사항] type1 : 안내 */}
    <div className="faq_notice_inner">
      <div className="notice_detail">
        <div className="notice_detail_head">
          <p className="tit">고객센터 정상 업무 안내</p>
        </div>
        <div className="notice_detail_inner">
          <div className="notice_cont_tit">
            <p className="notice_date">등록일<span className="val">21.05.31</span></p>
            <p className="notice_pv">조회수<span className="val">10,874</span></p>
          </div>
          <div className="notice_cont">
            <p className="txt">소니코리아 고객센터를 애용해 주시는 고객 여러분께<br />진심으로 감사의 말씀을 드립니다.</p>
            <br />
            <p className="txt">코로나19 예방 차원에서 진행되었던 고객센터 전 직원의 재택근무가 종료됨에 따라 소니코리아 고객센터가 정상 업무로 전환됨을 안내드립니다.<br /> 3월 3일(수) 부터 전화, 이메일, 채팅 상담 모두 정상적으로 이용이 가능하오니 고객센터 이용에 참고해 주시기 바랍니다.</p>
            <br />
            <p className="txt">그동안 고객님들의 양해에 감사 말씀드리며,<br /> 앞으로도 소니코리아 고객센터는 고객님들의 문의에 최선을 다해 응대해 드리도록 하겠습니다.</p>
            <br />
            <ul className="list_dot">
              <li className="bar strong">고객센터 정상 영업 재개일: 2021년 3월 3일(수) 부터 정상 영업</li>
              <li className="bar strong">고객센터 운영시간: 평일 오전 9시~오후 6시</li>
            </ul>
            <br />
            <p className="txt">감사합니다.</p>
          </div>
          <div className="btn_article">
            <a href="../../html/support/noticeList.html" className="button button_positive" type="button">목록</a>
          </div>
        </div>
      </div>
      {/* // e : [공지사항] type1 : 안내 */}
      {/* [공지사항] type2 : 당첨자 발표  */}
      <div className="notice_detail">
        <div className="notice_detail_head">
          <p className="tit">[당첨자 발표]<br className="pc_none" />6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</p>
        </div>
        <div className="notice_detail_inner">
          <div className="notice_cont_tit">
            <p className="notice_date">등록일<span className="val">21.08.05</span></p>
            <p className="notice_pv">조회수<span className="val">19,123</span></p>
          </div>
          <div className="notice_cont">
            <p className="tit">6월 소니스토어 온라인 설문조사 이벤트 당첨자 발표</p>
            <ul className="base_list">
              <li className="txt">강성*kan*******@naver.com</li>
              <li className="txt">강재*dyb****@naver.com</li>
              <li className="txt">김경*k77***@naver.com</li>
              <li className="txt">김경*don*******@naver.com</li>
              <li className="txt">김동*oko******@naver.com</li>
              <li className="txt">김영*goo***@naver.com</li>
              <li className="txt">김영*dod*******@naver.com</li>
              <li className="txt">김재*ice******@gmail.com</li>
              <li className="txt">김주*ceo****@naver.com</li>
              <li className="txt">김주*kjp*******@gmail.com</li>
              <li className="txt">송진*sji****@naver.com</li>
              <li className="txt">원규*iki*****@hanmail.net</li>
              <li className="txt">이수*sjb******@naver.com</li>
              <li className="txt">이영*xen*****@naver.com</li>
              <li className="txt">이준*sen*****@naver.com</li>
              <li className="txt">이형*092****@naver.com</li>
              <li className="txt">장귀*rnl*******@naver.com</li>
              <li className="txt">장선*aqu****@naver.com</li>
              <li className="txt">최천*sgn**@naver.com</li>
              <li className="txt">홍성*tjd********@naver.com</li>
            </ul>
            <div className="bg_box">
              <ul className="list_dot">
                <li className="bar strong">사은품 : 소니스토어 5,000 마일리지</li>
                <li className="bar strong">
                  소니스토어 5,000 마일리지는 2021년 7월 13일(화) 일괄 적립되며, 적립된 마일리지의 유효기간은 1년입니다.<br />
                  (개별 공지는 하지 않습니다.)
                </li>
              </ul>
            </div>
          </div>
          <div className="btn_article">
            <a href="../../html/support/notice.html" className="button button_positive" type="button">목록</a>
          </div>
        </div>
      </div>
      {/* // e: [공지사항] type2 : 당첨자 발표  */}
    </div>
  </div>
</div>

        </>
    );
}