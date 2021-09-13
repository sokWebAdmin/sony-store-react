import LayerPopup from '../../components/common/LayerPopup';

export default function RefundAccount({ setVisible }) {
  const close = () => setVisible(false);

  return (
    <>
      <LayerPopup className="refund_account" onClose={close}>
        <p class="pop_tit">환불계좌 입력</p>
        <div class="pop_cont_scroll">
          <form action="">
            <div class="form_zone">
              <div class="input_item">
                <div class="group">
                  <div class="inp_box">
                    <div class="select_ui_zone btm_line">
                      <a href="#" class="selected_btn" data-default-text="은행을 선택해주세요.">
                        은행을 선택해주세요.
                      </a>
                      <div class="select_inner" style="display: none;">
                        <p class="prd_tag">환불 받을 은행</p>
                        <ul class="select_opt">
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">한국은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">한국산업은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">중소기업은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">국민은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">한국외환은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">한국외환은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">한국수출입은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">농협</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">우리은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">조흥은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">제일은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">하나은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">하나은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">신한은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">한국씨티은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">대구은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">부산은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">광주은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">제주은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">전북은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">경남은행</div>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="opt_list">
                              <div class="item">새마을금고(MG)</div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="error_txt">
                    <span class="ico"></span>은행을 선택하세요.
                  </div>
                </div>
                <div class="group">
                  <div class="inp_box">
                    <label class="inp_desc" for="refund_account">
                      <input
                        type="text"
                        id="refund_account"
                        class="inp center"
                        placeholder="&nbsp;"
                        autocomplete="off"
                      />
                      <span class="label">계좌번호</span>
                      <span class="focus_bg"></span>
                    </label>
                  </div>
                  <div class="error_txt">
                    <span class="ico"></span>계좌번호를 입력하세요.
                  </div>
                </div>
                <div class="group">
                  <div class="inp_box">
                    <label class="inp_desc" for="refund_name">
                      <input type="text" id="refund_name" class="inp center" placeholder="&nbsp;" autocomplete="off" />
                      <span class="label">예금주명</span>
                      <span class="focus_bg"></span>
                    </label>
                  </div>
                  <div class="error_txt">
                    <span class="ico"></span>예금주명을 입력하세요.
                  </div>
                </div>
                <div class="check">
                  <input type="checkbox" class="inp_check" id="refund_mileage" name="refund_mileage" />
                  <label for="refund_mileage">마일리지 적립으로 환불</label>
                </div>
              </div>
              <div class="btn_article">
                <button
                  class="button button_positive button-full"
                  type="button"
                  onclick="common.makeAlert('complete', '환불계좌 등록이 완료되었습니다.')"
                >
                  저장
                </button>
              </div>
              <div class="guide_list">
                <p class="tit info_tit">[안내]</p>
                <ul class="list_dot">
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
          </form>
        </div>
      </LayerPopup>
    </>
  );
}
