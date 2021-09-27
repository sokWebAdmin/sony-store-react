const OrderSummary = () => {
  return (
    <div className="cont history_order">
      <div className="tit_head">
        <h3 className="cont_tit">주문/배송 내역</h3>
        <div className="btn_article right">
          <a className="button button_secondary button-s">자세히 보기</a>
        </div>
      </div>
      <div className="history_inner">
        <div className="my_order">
          <ul className="order_list">
            <li className="step_1 on">
              {/* 1건 이상 부터 class: on 추가 */}
              <div className="ship_box">
                <span className="ico_txt">입금대기</span>
                <a className="val_txt">
                  <span className="val">4</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className="step_2">
              <div className="ship_box">
                <span className="ico_txt">결제완료</span>
                <a className="val_txt">
                  <span className="val">0</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className="step_3">
              <div className="ship_box">
                <span className="ico_txt">배송준비</span>
                <a className="val_txt">
                  <span className="val">0</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className="step_4 on">
              <div className="ship_box">
                <span className="ico_txt">배송중</span>
                <a className="val_txt">
                  <span className="val">1</span>
                  <span>건</span>
                </a>
              </div>
            </li>
            <li className="step_5 on">
              <div className="ship_box">
                <span className="ico_txt">배송완료</span>
                <a className="val_txt">
                  <span className="val">1</span>
                  <span>건</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="my_claim">
          <p className="txt cancel on">
            주문 취소{' '}
            <a title="주문 취소 건">
              <strong className="val_txt">
                <span className="val">4</span> 건
              </strong>
            </a>
          </p>
          <p className="txt return">
            교환 반품{' '}
            <a title="교환 반품 건">
              <strong className="val_txt">
                <span className="val">0</span> 건
              </strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
