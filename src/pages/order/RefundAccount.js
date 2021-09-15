import LayerPopup from '../../components/common/LayerPopup';
import { useEffect, useState } from 'react';
import { getProfileClaimApplyInfoByOrderOptionNo } from '../../api/claim';

import '../../assets/scss/contents.scss';
import '../../assets/scss/mypage.scss';

export default function RefundAccount({ setVisible, orderOptionNo }) {
  const close = () => setVisible(false);
  const [bankSelectBoxVisible, setBankSelectBoxVisible] = useState(false);
  const [bankSelectList, setBackSelectList] = useState([]);

  useEffect(async () => {
    const res = await getProfileClaimApplyInfoByOrderOptionNo({
      path: { orderOptionNo },
      params: { claimType: 'CANCEL' },
    });
    setBackSelectList(res.data.availableBanks);
    console.log('res:', res.data.availableBanks);
  }, []);

  return (
    <>
      <LayerPopup className="refund_account" onClose={close}>
        <p className="pop_tit">환불계좌 입력</p>
        <div className="pop_cont_scroll">
          <div className="form_zone">
            <div className="input_item">
              <div className="group">
                <div className="inp_box">
                  <div className="select_ui_zone btm_line">
                    <a
                      href="#"
                      className="selected_btn"
                      data-default-text="은행을 선택해주세요."
                      onClick={(e) => {
                        e.preventDefault();
                        setBankSelectBoxVisible(!bankSelectBoxVisible);
                      }}
                    >
                      은행을 선택해주세요.
                    </a>
                    <div className="select_inner" style={{ display: bankSelectBoxVisible ? 'block' : 'none' }}>
                      <p className="prd_tag">환불 받을 은행</p>
                      <ul className="select_opt">
                        {bankSelectList.map(({ bank, label }) => (
                          <li key={bank}>
                            <a href="#" className="opt_list">
                              <div className="item">{label}</div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="error_txt">
                  <span className="ico"></span>은행을 선택하세요.
                </div>
              </div>
              <div className="group">
                <div className="inp_box">
                  <label className="inp_desc" htmlFor="refund_account">
                    <input type="text" id="refund_account" className="inp center" placeholder="&nbsp;" />
                    <span className="label">계좌번호</span>
                    <span className="focus_bg"></span>
                  </label>
                </div>
                <div className="error_txt">
                  <span className="ico"></span>계좌번호를 입력하세요.
                </div>
              </div>
              <div className="group">
                <div className="inp_box">
                  <label className="inp_desc" htmlFor="refund_name">
                    <input type="text" id="refund_name" className="inp center" placeholder="&nbsp;" />
                    <span className="label">예금주명</span>
                    <span className="focus_bg"></span>
                  </label>
                </div>
                <div className="error_txt">
                  <span className="ico"></span>예금주명을 입력하세요.
                </div>
              </div>
            </div>
            <div className="btn_article">
              <button
                className="button button_positive button-full"
                type="button"
                //   onClick="common.makeAlert('complete', '환불계좌 등록이 완료되었습니다.')"
              >
                저장
              </button>
            </div>
            <div className="guide_list">
              <p className="tit info_tit">[안내]</p>
              <ul className="list_dot">
                <li>주문 취소 접수 후에 환불받으실 계좌를 지정하실 수 있습니다.</li>
                <li>환불 계좌 지정은 각 주문 번호당 주문 취소 접수 전 한 번만 가능합니다. </li>
                <li>
                  환불 계좌를 지정하지 않고 취소하시는 경우, 소니코리아 고객지원센터(1588-0911)에 통장 사본을
                  FAX(02-6333-4600)로 보내 주셔야 가능합니다.
                </li>
                <li>마일리지로 환불한 경우, 해당 마일리지는 마일리지 정책에 따라 사용 가능합니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </LayerPopup>
    </>
  );
}
