import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/mypage.scss"

export default function orderDetail() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents mypage">
        <div className="container">
  <div className="content">
    <div className="common_head">
      <a href="../../html/mypage/orderList.html" className="common_head_back">주문/배송내역</a>
      <h1 className="common_head_name">주문 상세 조회</h1>
    </div>
    <div className="my_order order_process">
      <ul className="order_list">
        {/* 현상태만 class: on 추가, .ico_txt 내부에 <strong> 추가 */}
        <li className="step_1">
          <div className="ship_box">
            <span className="ico_txt">입금대기</span>
          </div>
        </li>
        <li className="step_2">
          <div className="ship_box">
            <span className="ico_txt">결제완료</span>
          </div>
        </li>
        <li className="step_3 on">
          <div className="ship_box">
            <span className="ico_txt"><strong>배송준비</strong></span>
          </div>
        </li>
        <li className="step_4">
          <div className="ship_box">
            <span className="ico_txt">배송중</span>
          </div>
        </li>
        <li className="step_5">
          <div className="ship_box">
            <span className="ico_txt">배송완료</span>
          </div>
        </li>
      </ul>
    </div>
    <div className="o_summary">
      <dl className="o_summary_status">
        <dt className="o_summary_term">처리상태</dt>
        <dd className="o_summary_desc">
          <strong>배송준비</strong>
          <button type="button" className="button button_positive button-s">배송조회</button>
        </dd>
      </dl>
      <dl className="o_summary_date">
        <dt className="o_summary_term">주문날짜</dt>
        <dd className="o_summary_desc">2021-05-12</dd>
      </dl>
      <dl className="o_summary_number">
        <dt className="o_summary_term">주문번호</dt>
        <dd className="o_summary_desc">20210512-663W24</dd>
      </dl>
    </div>
    {/* 제품 정보 */}
    <div className="order_detail_cont">
      <div className="col_table_wrap order_list">
        <div className="col_table">
          <div className="col_table_head">
            <div className="col_table_row">
              <div className="col_table_cell">제품</div>
              <div className="col_table_cell">가격</div>
              <div className="col_table_cell">수량</div>
              <div className="col_table_cell">합계</div>
            </div>
          </div>
          <div className="col_table_body">
            <div className="col_table_row">
              <div className="col_table_cell prd_wrap">
                <div className="prd">
                  <div className="prd_thumb">
                    <img className="prd_thumb_pic" src="../../images/_tmp/item640x640_01.png" alt="상품명입력" />
                  </div>
                  <div className="prd_info">
                    <div className="prd_info_name">AK-47 Hi-Res 헤드폰 앰프</div>
                    <p className="prd_info_option">128Bit/피아노블랙</p>
                  </div>
                </div>
              </div>
              <div className="col_table_cell prd_price">
                4,299,000 <span className="won">원</span>
              </div>
              <div className="col_table_cell prd_count">
                2 <span className="unit">개</span>
              </div>
              <div className="col_table_cell prd_total">
                8,598,000 <span className="won">원</span>
              </div>
            </div>
            <div className="col_table_row">
              <div className="col_table_cell prd_wrap">
                <div className="prd">
                  <div className="prd_thumb">
                    <img className="prd_thumb_pic" src="../../images/_tmp/item640x640_02.png" alt="상품명입력" />
                  </div>
                  <div className="prd_info">
                    <div className="prd_info_name">AK-74 Hi-Res Aux 3.5mm 케이블 (16.5m)</div>
                    <p className="prd_info_option">AK-47 전용 고해상도 Aux 케이블 AK-47 전용 고해상도 Aux 케이블 AK-47 전용 고해상도 Aux 케이블 AK-47 전용 고해상도 Aux 케이블 AK-47 전용 고해상도 Aux 케이블 벗지않는 선글라스</p>
                  </div>
                </div>
              </div>
              <div className="col_table_cell prd_price">
                9,000 <span className="won">원</span>
              </div>
              <div className="col_table_cell prd_count">
                2 <span className="unit">개</span>
              </div>
              <div className="col_table_cell prd_total">
                18,000 <span className="won">원</span>
              </div>
            </div>
            <div className="col_table_row">
              <div className="col_table_cell prd_wrap">
                <div className="prd">
                  <div className="prd_thumb">
                    <img className="prd_thumb_pic" src="../../images/_tmp/item640x640_03.png" alt="상품명입력" />
                  </div>
                  <div className="prd_info">
                    <div className="prd_info_name">PLAYSTATION 5 DIGITAL (CFI-1018B01)</div>
                    <p className="prd_info_option">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급 1인치 핸디캠/ LIMITED EDITION(사일런트 화이트)</p>
                  </div>
                </div>
              </div>
              <div className="col_table_cell prd_price">
                4,299,000 <span className="won">원</span>
              </div>
              <div className="col_table_cell prd_count">
                2 <span className="unit">개</span>
              </div>
              <div className="col_table_cell prd_total">
                8,598,000 <span className="won">원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*// 제품 정보 */}
    {/* 주문 정보 */}
    <div className="cont order_info">
      <h3 className="cont_tit">주문 정보</h3>
      <div className="order_info_inner">
        <dl className="order">
          <dt className="order_term">주문자 정보</dt>
          <dd className="order_desc">김소니(01056781234)</dd>
          <dt className="order_term">수령인</dt>
          <dd className="order_desc">김소니(01056781234)</dd>
          <dt className="order_term">배송지</dt>
          <dd className="order_desc">서울특별시 영등포구 여의도동 국제금융로 10 One IFC 24층 ㈜ 소니코리아 서울특별시 영등포구 여의도동 국제금융로 10 One IFC 24층 ㈜ 소니코리아</dd>
          <dt className="order_term">배송 요청사항</dt>
          <dd className="order_desc">파손의 위험이 있는 상품이니 조심히 다뤄주세요.</dd>
          <dt className="order_term">배송일 선택</dt>
          <dd className="order_desc">정상 배송 </dd>
        </dl>
      </div>
    </div>
    {/* // 주문 정보 */}
    {/* 결제 정보 */}
    <div className="cont purchase_info">
      <h3 className="cont_tit">결제 정보</h3>
      <div className="purchase_info_inner">
        <dl className="purchase">
          <dt className="purchase_term purchase_price">총 주문금액</dt>
          <dd className="purchase_desc purchase_price">4,299,000<span className="won">원</span></dd>
          <dt className="purchase_term purchase_discount">할인 금액</dt>
          <dd className="purchase_desc purchase_discount">- 2,300  <span className="won">원</span></dd>
          <dt className="purchase_term purchase_discount_sub">프로모션 할인</dt>
          <dd className="purchase_desc purchase_discount_sub">- 2,000 <span className="won">원</span></dd>
          <dt className="purchase_term purchase_discount_sub">쿠폰 사용</dt>
          <dd className="purchase_desc purchase_discount_sub">- 0 <span className="won">원</span></dd>
          <dt className="purchase_term purchase_discount_sub">마일리지 사용</dt>
          <dd className="purchase_desc purchase_discount_sub">- 300 <span className="won">원</span></dd>
          <dt className="purchase_term purchase_detail">결제 내역</dt>
          <dd className="purchase_desc purchase_detail">
            <div className="purchase_detail_price">4,299,000 <span className="won">원</span></div>
            {/* 결제정보 현금 */}
            <div className="purchase_detail_method">가상 계좌 : KB국민은행(1234-2345-32456)</div>
            <button type="button" className="button button_negative button-s popup_comm_btn" data-popup-name="cash_receipt">현금영수증 신청</button>
            {/*// 결제정보 현금 */}
            {/* 결제정보 신용카드
        <div class="purchase_detail_method">삼성카드 / 일시불</div>
        <button type="button" class="button button_negative button-s">신용카드 영수증</button>
        */}
          </dd>
        </dl>
      </div>
    </div>
    {/* // 결제 정보 */}
    {/* buttons */}
    <div className="cont button_wrap">
      <button type="button" className="button button_negative">주문 취소</button>
      <button type="button" className="button button_negative only-pc" onclick="onPrint()">주문 정보 프린트</button>
      <a  className="button button_positive">목록</a>
    </div>
    {/* // buttons */}
  </div>
</div>
</div>
        </>
    );
}