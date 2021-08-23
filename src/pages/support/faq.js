import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/css/contents.css"
import "../../assets/css/support.css"

export default function Faq() {

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
          <li className="tabs on">
            <a href="/faq" className="tab_btn" title="FAQ 보기"><span className="tit">FAQ</span></a>
          </li>
          <li className="tabs">
            <a href="/notice-list" className="tab_btn" title="공지사항 보기"><span className="tit">공지사항</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div className="faq_notice_inner">
      <div className="faq_notice_cont faq_list">
        <div className="category_center">
          <div className="category_slide_tab swiper-container">
            <ul className="swiper-wrapper">
              <li className="swiper-slide on" data-view-category="category_all">
                <a href="#" className="btn"><span>전체</span></a>
              </li>
              <li className="swiper-slide" data-view-category="category_01">
                <a href="#" className="btn"><span>쿠폰/마일리지</span></a>
              </li>
              <li className="swiper-slide" data-view-category="category_02">
                <a href="#" className="btn"><span>주문/결제</span></a>
              </li>
              <li className="swiper-slide" data-view-category="category_03">
                <a href="#" className="btn"><span>세금계산서/영수증</span></a>
              </li>
              <li className="swiper-slide" data-view-category="category_04">
                <a href="#" className="btn"><span>배송</span></a>
              </li>
              <li className="swiper-slide" data-view-category="category_05">
                <a href="#" className="btn"><span>취소/환불/AS</span></a>
              </li>
              <li className="swiper-slide" data-view-category="category_06">
                <a href="#" className="btn"><span>회원관련</span></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="category_list">
          <div className="acc acc_ui_zone">
            <div className="acc_item category_01"> {/* 분류 class : category_01~ . . .  */}
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">쿠폰/마일리지</span>
                  <span className="acc_tit">마일리지로 ESP(연장서비스 쿠폰/마일리지 플랜) 구입이 가능한가요?</span>
                  <span className="acc_arrow">선택됨/상세 닫기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'block'}}>
                <div className="acc_box">
                  <p className="txt">ESP는 마일리지로 구입 가능합니다. (단, ESP 구매 시 마일리지 적립은 되지 않습니다.)</p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_01">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">쿠폰/마일리지</span>
                  <span className="acc_tit">온라인 쿠폰을 소니스토어 직영점 및 전화 주문 시에도 사용할 수 있나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'block'}}>
                <div className="acc_box">
                  <p className="txt">
                    소니스토어 매장 방문 시 출력된 쿠폰을 지참하시면 사용하실 수 있습니다.<br />
                    전화주문 시에는 쿠폰 번호를 알려주시면 결제 시 적용 받으실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_01">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">쿠폰/마일리지</span>
                  <span className="acc_tit">E-Coupon은 언제 사용할 수 있나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">
                    상품 1개당 한 개의 쿠폰만 사용하실 수 있으며, 쿠폰에 안내된 사용기간 내에만 가능합니다.
                    단, 정품 등록 후 발급되는 쿠폰의 경우는 2개 이상 상품주문이 가능합니다.(1개의 주문으로 복수 주문 시로만 가능)<br />
                    쿠폰금액이 판매가를 초과할 경우, 쿠폰이 적용 되지 않습니다.
                  </p>
                  <ul className="list_dot">
                    <li className="bar">주문 후 반품, 환불의 경우 한번 사용하신 쿠폰은 다시 사용하실 수 없습니다.</li>
                    <li className="bar">쿠폰 사용 시 마일리지는 쿠폰 사용금액을 제외한 실 결제금액을 기준으로 적립됩니다.</li>
                    <li className="bar">적용 상품이 제한되어 있는 할인쿠폰은 해당 적용 상품 외에는 사용하실 수 없습니다.</li>
                  </ul>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_02">{/* 분류 class : category_01~ . . .  */}
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">주문/결제</span>
                  <span className="acc_tit">결제방법에는 무엇이 있나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">가상 계좌와 신용카드로 결제 가능하며, 쿠폰 및 마일리지를 보유하신 경우에는 동시에 사용하실 수 있습니다.</p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_02">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">주문/결제</span>
                  <span className="acc_tit">가상계좌 입금 시 입금 확인은 어떻게 하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">
                    주문 완료 후 ‘가상계좌 결제’를 선택한 경우, 가상 계좌번호가 확인되며 SMS와 알림톡을 통해서도 해당 내역이 전송 됩니다. 전송 된 계좌로 입금해 주시면 입금 확인 후 배송이 진행 됩니다.<br />
                    가상 계좌를 통한 입금수수료는 주문자 부담이며 입금 확인은 오전 및 오후 2회씩 진행되고 있습니다.<br />
                    주문 후 3일 이내에 입금되지 않을 경우는 주문이 자동으로 취소됩니다.<br />
                    입금 후 확인 되지 않을 경우 반드시 고객지원센터(1588-0911)나 이메일(sonystore@sony.co.kr)로 연락 주시기 바랍니다.
                  </p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_02">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">주문/결제</span>
                  <span className="acc_tit">신용카드 무이자할부 혜택은 어디서 확인하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">무이자 할부는 해당 상품 상세 페이지 및 결제 페이지에서 확인하실 수 있습니다.</p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_02">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">주문/결제</span>
                  <span className="acc_tit">대량 구매 문의는 어디로 해야 하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">B2B 기업체 특판 구매는 <strong>1) 모델 2) 수량 3) 납기일 4) 납품처 5) 제품 용도</strong> 의 정보가 필요합니다.<br /> 위의 정보를 포함한 메일을 송부 부탁 드립니다. </p>
                  <a href="https://store.sony.co.kr/handler/Support-StartCompany" className="button button_negative button-s" type="button">구매상담 가기</a>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_03">{/* 분류 class : category_01~ . . .  */}
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">세금계산서/영수증</span>
                  <span className="acc_tit">신용카드 영수증 출력은 어떻게 하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">신용카드 영수증은 고객님께서 입력해주신 e-mail로 보내드리는 결제확인메일의 &lt;영수증 출력&gt;버튼을 클릭하시면 바로 출력 하실 수 있습니다. 만약 e-mail을 지우셨을 경우 이니시스 웹사이트(www.inicis.com)의 사용내역 및 청구내역 조회에서 발급 받으실 수 있습니다.</p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_03">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">세금계산서/영수증</span>
                  <span className="acc_tit">현금영수증 발급은 가능한가요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">5,000원 이상 현금 구매 시 현금 영수증을 받으실 수 있습니다. 입금이 확인된 후 ‘마이 페이지’ (비회원의 경우 배송조회 메뉴)에서 현금영수증 발급 버튼을 누르시면 즉시 발급됩니다.</p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_04">{/* 분류 class : category_01~ . . .  */}
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">배송</span>
                  <span className="acc_tit">배송 일정 및 배송 현황 조회는 어디서 하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">
                    고객님께서 주문해주신 상품은 입금확인 후 발송 준비되며, 지역에 따라 3~7일 이내 전국 어디든 배송 가능합니다.<br />
                    예약판매 상품 등 일부 상품에 대해서는 상품 수급 사정에 의해 배송이 지연될 수 있습니다. 주문상품에 대한 상세한 확인 및 배송상황은 '<a href="../../html/mypage/myPageMain.html" className="under_line">마이페이지</a>'에서 모두 확인하실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_04">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">배송</span>
                  <span className="acc_tit">배송료 부담은 누가하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">소니스토어는 무료 배송을 원칙으로 하고 있습니다. 다만 산간 도서지방의 경우는 상품 특성에 따라 배송료를 부담하실 수도 있습니다.</p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_04">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">배송</span>
                  <span className="acc_tit">비회원 주문 시 주문 및 배송 조회는 어디서 하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">비회원 주문 시 페이지 우측 상단의 &lt;주문/배송조회&gt;을 클릭하신 후 주문번호 및 비밀번호(주문 시 입력하신 비밀번호) 를 입력하시면 됩니다.</p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_05">{/* 분류 class : category_01~ . . .  */}
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">취소/환불/AS</span>
                  <span className="acc_tit">주문취소 및 반품 신청은 어떻게 하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">주문취소 및 반품신청은 e-mail 및 고객지원센터로 요청하실 수 있습니다.
                    (e-mail : cshelp@sony.co.kr / 전화 : 1588-0911)</p>
                  <p className="txt">e-mail을 통한 신청 시 운영시간 이후에는 익일 처리되므로 다소 지연될 수 있습니다.
                    구입하신 상품에 대해서는 제품을 받으신 날로부터 7일 이내에 교환 및 반품이 가능합니다.
                    단, 구입하신 상품의 내용이 표시, 광고 내용과 다르거나 계약 내용과 다르게 이행된 경우에는 해당상품을 공급 받은 날부터 3개월 이내,
                    그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 가능합니다. 제품하자가 아닌 변심으로 인한 반품 시에는
                    고객님께서 반품 비용을 부담하셔야 합니다.
                  </p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_05">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">취소/환불/AS</span>
                  <span className="acc_tit">가상계좌 주문 건의 경우, 환불은 어떻게 처리되나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">
                    소니스토어 온라인에서 주문 취소/환불을 신청하시면, 환불 계좌번호를 등록하실 수 있습니다.<br />
                    등록된 계좌번호로 환불이 진행되며 잘못 입력하셨거나 계좌번호 변경이 필요한 경우 고객센터(1588-0911)를 통해 환불 신청이 가능합니다.<br />
                    환불은 신청하신 날로부터 3영업일 이내에 완료됩니다.
                  </p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_06">{/* 분류 class : category_01~ . . .  */}
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">회원관련</span>
                  <span className="acc_tit">소니스토어 회원 가입은 어떻게 해야 하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">소니스토어 온라인사이트에서 회원 가입을 하시면 누구나 소니스토어 회원이 되실 수 있습니다.</p>
                </div>
              </div>
            </div>{/* // acc_item */}
            <div className="acc_item category_06">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="상세 내용 토글">
                  <span className="category_tit">회원관련</span>
                  <span className="acc_tit">개명한 경우 이름을 어떻게 변경 하나요?</span>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="acc_inner" style={{display: 'none'}}>
                <div className="acc_box">
                  <p className="txt">
                    개명하신 경우 기존 아이디로 로그인 하신 후, 회원정보를 수정하실 수 있습니다.<br />
                    다만, 개명한 이름으로 실명인증이 가능해야 합니다
                  </p>
                </div>
              </div>
            </div>{/* // acc_item */}
          </div>{/* // acc_ui_zone */}
          <div className="btn_article comm_more">
            <a href="#" className="more_btn" title="더보기">더보기</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    );
}