import LayerPopup from '../common/LayerPopup';

const UseCoupon = ({ setVisible }) => {
  const close = () => setVisible(false);

  return (
    <LayerPopup className="find_address" popContClassName={'scrollH'}
                onClose={close}>
      <p className="pop_tit">쿠폰 조회 및 적용</p>
      <div className="pop_cont_scroll" style={{ height: '651px' }}>
        <div className="chk_select_zone">
          <ul className="chk_select_inner">
            <li className="chk_select_list">
              <div className="chk_select_item table label_click">
                <div className="radio_box radio_only chk_select">
                  <input type="radio" className="inp_radio" id="prd_coupon1"
                         name="prd_coupon" checked="checked" />
                  <label htmlFor="prd_coupon1"
                         className="contentType">radio1</label>
                </div>
                <div className="chk_select_info">
                  <div className="info_cell prd_thumb">
                  <span className="img"><img
                    src="../../images/_tmp/coupon_prd_thumb.png"
                    alt="" /></span>
                  </div>
                  <div className="info_cell prd_info">
                    <p className="prd_tit">PLAYSTATION 5 DIGITAL
                      (CFI-1018B01)</p>
                    <p className="prd_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된
                      전문가급
                      1인치 핸디캠/ LIMITED …</p>
                  </div>
                  <div className="info_cell prd_price">
                    <p className="prd_tit"><span
                      className="price">4,299,000</span>원</p>
                    <p className="prd_desc"><span className="count">1</span>개
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="chk_select_list">
              <div className="chk_select_item table label_click">
                <div className="radio_box radio_only chk_select">
                  <input type="radio" className="inp_radio" id="prd_coupon2"
                         name="prd_coupon" />
                  <label htmlFor="prd_coupon2"
                         className="contentType">radio1</label>
                </div>
                <div className="chk_select_info">
                  <div className="info_cell prd_thumb">
                  <span className="img"><img
                    src="../../images/_tmp/coupon_prd_thumb.png"
                    alt="" /></span>
                  </div>
                  <div className="info_cell prd_info">
                    <p className="prd_tit">PLAYSTATION 5 DIGITAL
                      (CFI-1018B01)</p>
                    <p className="prd_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된
                      전문가급
                      1인치 핸디캠/ LIMITED …</p>
                  </div>
                  <div className="info_cell prd_price">
                    <p className="prd_tit"><span
                      className="price">4,299,000</span>원</p>
                    <p className="prd_desc"><span className="count">1</span>개
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="coupon_info">
          <div className="select_ui_zone tit_btm_line">
            <a href="#" className="selected_btn"
               data-default-text="쿠폰을 선택해주세요.">
              쿠폰을 선택해주세요.
            </a>
            <div className="select_inner">
              <p className="prd_tag">제품</p>
              <ul className="select_opt">
                <li>
                  <a href="#" className="opt_list">
                    <div className="item">첫 구매 감사 5% 할인 쿠폰 (2021.08.10까지)</div>
                  </a>
                </li>
                <li>
                  <a href="#"
                     className="opt_list not_opt">
                    <div className="item">쿠폰 적용 안함</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="btn_article">
            <button className="button button_positive button-m button-full"
                    type="button">쿠폰적용
            </button>
          </div>
          <p className="pop_txt txt_l">사용 가능한 쿠폰만 확인하실 수 있으며, 보유하신 전체 쿠폰은 마이
            페이지에서 확인하세요!</p>
          <div className="guide_list">
            <p className="tit">[쿠폰 이용안내]</p>
            <ul className="list_dot">
              <li>쿠폰은 주문 당 1매씩 사용 가능하며, 상품 1개에만 적용됩니다.</li>
              <li>쿠폰의 경우, 일부 상품(이벤트 할인 상품 등)에 대해 사용이 제한 될 수 있습니다.</li>
              <li>소니스토어 오프라인 매장에서 쿠폰을 사용하시려면 출력된 쿠폰 지참, 혹은 모바일 App 내 마이페이지에서 쿠폰
                내역을 직원에게 제시해 주세요.
              </li>
              <li>주문 시 사용하신 쿠폰은 해당 주문을 취소하시더라도 복원되지 않습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </LayerPopup>
  )
};

export default UseCoupon;