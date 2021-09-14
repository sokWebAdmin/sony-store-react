import LayerPopup from '../common/LayerPopup';

const PickRecentAddresses = ({ recentAddresses }) => {
  console.log(recentAddresses);
  return (
    <LayerPopup
      size={'m'}
      popContClassName={'scrollH'}
    >
      <p className="pop_tit">최근 배송지</p>
      <p className="pop_txt">최근에 입력하신 배송지 5개까지 노출됩니다.</p>
      <div className="chk_select_zone">
        <ul className="chk_select_inner">
          <li className="chk_select_list">
            <div
              className="chk_select_item label_click">
              <div className="radio_box radio_only chk_select">
                <input type="radio" className="inp_radio" id="addr_chk1"
                       name="addr_chk1" checked="checked" />
                <label htmlFor="addr_chk1"
                       className="contentType">radio1</label>
              </div>
              <div className="chk_select_info">
                <p className="txt">
                  <strong className="name">김소니</strong>
                  <span className="number">010 0000 0000</span>
                </p>
                <p className="txt">서울특별시 영등포구 여의도동 국제금융로 10 One IFC 24층
                  ㈜소니코리아 (080080)</p>
              </div>
            </div>
          </li>
          <li className="chk_select_list">
            <div
              className="chk_select_item label_click">
              <div className="radio_box radio_only chk_select">
                <input type="radio" className="inp_radio" id="addr_chk2"
                       name="addr_chk1" />
                <label htmlFor="addr_chk2"
                       className="contentType">radio1</label>
              </div>
              <div className="chk_select_info">
                <p className="txt">
                  <strong className="name">김소니</strong>
                  <span className="number">010 0000 0000</span>
                </p>
                <p className="txt">서울시 구로구 구로동 12-1</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="btn_article">
        <button className="button button_positive button-m" type="button">확인
        </button>
      </div>
    </LayerPopup>
  );
};

export default PickRecentAddresses;