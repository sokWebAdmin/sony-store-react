import { React } from 'react';

const Calculator = ({ submit }) => {
  return (
    <div className="payment_box">
      <div className="inner">
        <div className="payment_list">
          <dl className="total">
            <dt className="tit">결제 예정 금액</dt>
            <dd className="price">N<span
              className="unit">원</span></dd>
          </dl>
          <div className="order_detailbox">
            <div className="view_headline">
              <span className="view_tit">주문 금액</span>
              <em
                className="view_price"><strong>N</strong>원</em>
            </div>
            <div className="view_detail">
              <span className="view_tit">제품 금액</span>
              <em
                className="view_price"><strong>N</strong>원</em>
            </div>
            <div className="view_detail">
              <span className="view_tit">구매 수량</span>
              <em
                className="view_price"><strong>1</strong>개</em>
            </div>
          </div>
          <div className="saleToggle">
            <div className="sale_item">{/* on 클래스 제어 */}
              <div className="sale_head">
                <a href="#none" className="sale_btn"
                   title="할인 금액 열기">
                  <div className="view_headline">
                                          <span
                                            className="sale_tit">할인 금액</span>
                    <em
                      className="view_price minus"><strong>-
                      N</strong>원</em>
                  </div>
                  <span className="acc_arrow">상세 보기</span>
                </a>
              </div>
              <div className="sale_inner"
                   style={{ display: 'none' }}>
                <div className="sale_box">
                  <div className="view_detail">
                                          <span
                                            className="sale_tit">프로모션 할인</span>
                    <em className="view_price"><strong>-
                      0</strong>원</em>
                  </div>
                  <div className="view_detail">
                                          <span
                                            className="sale_tit">쿠폰 사용</span>
                    <em className="view_price"><strong>-
                      0</strong>원</em>
                  </div>
                  <div className="view_detail">
                                          <span
                                            className="sale_tit">마일리지 사용</span>
                    <em className="view_price"><strong>-
                      0</strong>원</em>
                  </div>
                </div>
              </div>
            </div>
            {/* // acc_item */}
          </div>
        </div>
        <div className="essential">
          <div className="check">
            <input type="checkbox" className="inp_check"
                   id="essential" />
            <label htmlFor="essential">[필수] 주문할 제품의 거래조건을
              확인 하였으며, 구매에 동의하시겠습니까? (전자상거래법 제8조
              제2항)</label>
          </div>
          {/* pc 결제 버튼 */}
          <div className="pc_pay_btn">
            <button
              className="button button_positive button-full"
              type="button"
              onClick={submit}
            >결제
            </button>
          </div>
        </div>
      </div>
      <ul className="list_dot">
        <li>결제가 팝업창에서 이루어집니다.</li>
        <li>브라우저 설정에서 팝업창 차단을 해제해 주세요.</li>
      </ul>
      {/* 모바일일때 버튼 */}
      <div className="mo_pay_btn">
        <button
          className="button button_positive button-full"
          onClick={submit}
          type="button">총 <em>N</em> 원
          (1개) <span>결제하기</span></button>
      </div>
    </div>
  );
};

export default Calculator;