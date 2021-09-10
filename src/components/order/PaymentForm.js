import paymentType from '../../const/paymentType';
import { setObjectState } from '../../utils/state';

const PaymentForm = ({ payment, setPayment }) => {
  const changePaymentType = ({ pgType, payType }) => {
    setObjectState('pgType', pgType)(setPayment);
    setObjectState('payType', payType)(setPayment);
  };

  return (
    <>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="payment1">결제 수단 선택</label>
        </div>
        <div className="acc_cell vat">
          <div className="acc_group parent">
            <div className="acc_radio">
              {
                Object.values(paymentType).map((p =>
                    (
                      <div className="radio_box">
                        <input type="radio"
                               className="inp_radio"
                               id={p.payType} name="paymentType"
                               defaultChecked="checked"
                               checked={payment.payType === p.payType}
                               onChange={() => changePaymentType(p)} />
                        <label htmlFor={p.payType}
                               className="contentType">{p.label}</label>
                      </div>
                    )
                ))
              }
            </div>
            <div className="tabResult">
              <div
                className="result_cont radio_tab1 on">
                <div className="check">
                  <input type="checkbox"
                         className="inp_check"
                         id="chk01" />
                  <label htmlFor="chk01">지금 선택한 결제수단을
                    다음에도
                    사용</label>
                </div>
                <strong className="info_tit">신용카드 무이자 할부
                  유의사항</strong>
                <ul className="list_dot">
                  <li>무이자 할부 개월 수가 다른 제품을 한꺼번에 결제하면 할부
                    개월
                    수가 낮은 제품을 기준으로 할부가 됩니다.
                  </li>
                  <li>무이자 할부 개월 수가 다른 제품을 따로 결제하면 해당 제품에
                    적용된 무이자 할부 혜택을 받으실 수 없습니다.
                  </li>
                </ul>
              </div>
              <div className="result_cont radio_tab2">
                <div className="check">
                  <input type="checkbox"
                         className="inp_check"
                         id="chk02" />
                  <label htmlFor="chk02">지금 선택한 결제수단을
                    다음에도
                    사용</label>
                </div>
                <div className="bg_recipe_box">
                  <strong className="info_tit2">전자 세금
                    계산서
                    발행</strong>
                  <ul className="list_dot">
                    <li>2011년 1월부터 전자세금서 제도를 시행하고 있습니다.
                    </li>
                    <li>구매 후 다음달 8일 이후에 요청되는 세금계산서는 발행이
                      불가합니다.
                    </li>
                  </ul>
                  <div className="btn_recipe_box">
                    <button
                      className="button button_negative button-m popup_comm_btn"
                      data-popup-name="tax_invoice1"
                      type="button">전자 세금계산서 발행 안내
                    </button>
                    <button
                      className="button button_positive button-m popup_comm_btn"
                      data-popup-name="tax_invoice2"
                      type="button">전자 세금계산서 신청하기
                    </button>
                  </div>
                </div>
                <strong className="info_tit3">[소비자
                  피해보상보험
                  서비스 안내]</strong>
                <ul className="list_dot">
                  <li>고객님은 안전거래를 위해 현금 결제 시 소니스토어가 가입한
                    구매안전서비스 소비자피해보상보험서비스를 이용하실 수 있습니다.
                  </li>
                  <li>보상대상 : 미배송, 반송/환불거부, 쇼핑몰부도</li>
                  <li>구매안전서비스를 통하여 주문하시고 서울보증보험에서 발행하는
                    보험계약체결내역서를 반드시 확인하시기 바랍니다.
                  </li>
                </ul>
              </div>
              <div className="result_cont radio_tab3">
                <div className="check">
                  <input type="checkbox"
                         className="inp_check"
                         id="chk03" />
                  <label htmlFor="chk03">지금 선택한 결제수단을
                    다음에도
                    사용</label>
                </div>
                <strong className="info_tit">신용카드 무이자 할부
                  유의사항</strong>
                <ul className="list_dot">
                  <li>무이자 할부 개월 수가 다른 제품을 한꺼번에 결제하면 할부
                    개월
                    수가 낮은 제품을 기준으로 할부가 됩니다.
                  </li>
                  <li>무이자 할부 개월 수가 다른 제품을 따로 결제하면 해당 제품에
                    적용된 무이자 할부 혜택을 받으실 수 없습니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;