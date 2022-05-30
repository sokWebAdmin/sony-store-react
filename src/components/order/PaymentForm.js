import { forwardRef, useImperativeHandle, useState, useRef } from 'react';

import paymentType from '../../const/paymentType';
import InvoiceGuide from '../popup/InvoiceGuide';
import InvoicePublish from '../popup/InvoicePublish';
import {DateUtils, getStrYear} from '../../utils/dateFormat';

import '../../assets/scss/partials/payModal.scss';

const PaymentForm = ({ payment, setPayment, orderSheetNo }) => {
  const changePaymentType = ({ pgType, payType }) => {
    setPayment({
      pgType,
      payType,
    });

  };

  // const [sgicYn, setSgicYn] = useState('off');
  const [sgicCheckOn, setSgicCheckOn] = useState('off');
  const [sgicgenderradio, setSgicgenderradio] = useState('1');
  const [privateYn, setPrivateYn] = useState('N');
  const onChangeSgicYn = (e) => setSgicCheckOn(e.target.value);
  const onChangeSgicgenderradio = (e) => setSgicgenderradio(e.target.value);
  const onChangePrivateYn = (e) => setPrivateYn(e.target.value);

  // const sgicEmail = useRef();
  // const gender = useRef();
  // const privateAgree = useRef();
  // const sgicYear = useRef();
  // const sgicMonth = useRef();
  // const sgicDay = useRef();


  // useImperativeHandle( () => ({
  //   fieldValidation () {
  //     const refs = { sgicEmail, gender, privateAgree, sgicYear, sgicMonth, sgicDay };
  //
  //     if (sgicCheckOn === 'on') {
  //       return true;
  //     }
  //   },
  // }));

  const [viewInvoiceGuide, setViewInvoiceGuide] = useState(false);
  const [viewInvoicePublish, setViewInvoicePublish] = useState(false);



  function dateOptListrendering(standard, minusLange, plusLange) {

    const dateOptListrendering = () => {
      const result = [];

      let start = standard-minusLange;
      if (start === 0) {
        start = 1;
      }

      for (let i = start; i < standard+plusLange; i++) {
        result.push(<li key={"optYear"+i}>
                      <a href={'#!'} key={"optYear"+i} className="opt_list">
                        <div className="item" key={"optYear"+i}>{i}</div>
                      </a>
                    </li>);
      }
      return result;
    };

    return <ul className="select_opt">{dateOptListrendering()}</ul>;
  }

  function dayOptListrendering(year, month) {
    const dayOptListrendering = () => {
      const result = [];

      let date = new Date(year, month, 0);
      date.getDate();

      for (let i = 1; i < date.getDate()+1; i++) {
        result.push(<li>
          <a href={'#!'} className="opt_list">
            <div className="item">{i}</div>
          </a>
        </li>);
      }
      return result;
    };

    return <ul className="select_opt">{dayOptListrendering()}</ul>;
  }

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
                      <div className="radio_box" key={p.payType}>
                        <input type="radio"
                               className="inp_radio"
                               id={p.payType} name="paymentType"
                               defaultChecked={payment.payType === p.payType}
                               onChange={() => changePaymentType(p)} />
                        <label htmlFor={p.payType}
                               className="contentType">{p.label}</label>
                      </div>
                    )
                ))
              }
            </div>
            <div className="tabResult">
              {payment.payType !== 'VIRTUAL_ACCOUNT' && <div
                className="result_cont radio_tab1 on">
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
              </div>}
              {payment.payType === 'VIRTUAL_ACCOUNT' &&
              <div className="result_cont radio_tab2 on">
                <div className="bg_recipe_box">
                  <strong className="info_tit2">전자 세금
                    계산서
                    발행</strong>
                  <ul className="list_dot">
                    <li>2011년 1월부터 전자 세금계산서 제도를 시행하고 있습니다.
                    </li>
                    <li>구매 후 다음달 8일 이후에 요청되는 세금계산서는 발행이
                      불가합니다.
                    </li>
                  </ul>
                  <div className="btn_recipe_box">
                    <button
                      className="button button_negative button-m popup_comm_btn"
                      data-popup-name="tax_invoice1"
                      onClick={() => setViewInvoiceGuide(true)}
                      type="button">전자 세금계산서 발행 안내
                    </button>
                    {viewInvoiceGuide &&
                    <InvoiceGuide close={() => setViewInvoiceGuide(false)} />}
                    <button
                      className="button button_positive button-m popup_comm_btn"
                      data-popup-name="tax_invoice2"
                      onClick={() => setViewInvoicePublish(true)}
                      type="button">전자 세금계산서 신청하기
                    </button>
                    {viewInvoicePublish && <InvoicePublish
                      basketid={orderSheetNo}
                      isView={viewInvoicePublish}
                      close={() => setViewInvoicePublish(false)} />}
                  </div>
                  <div className="cash_box">
                    <strong className="cash_box_tit">현금영수증 발행</strong>
                    <ul className="cash_box_list">
                      <li>가상 계좌 발급 후 3일 이내에 입금하여 주시기 바랍니다.<br />
                        미 입금 시 주문 취소되며 재주문을 통한 가상 계좌 재발급을 받으셔야 합니다.
                      </li>
                      <li>현금영수증 발행 관련 문의는 1588-0911 또는 <a
                        href="mailto:sonystore3@sony.co.kr"
                        className="link_mail">sonystore3@sony.co.kr</a>로 연락 바랍니다.
                      </li>
                    </ul>
                  </div>
                  <div className="sgic_box">
                    <strong className="sgic_box_tit">소비자 피해보상보험 서비스</strong>
                    <div className="acc_radio">
                      <div className="radio_box">
                        <input type="radio" className="inp_radio" key={"sgic_tab_radio1"} id="sgic_tab_radio1" value={'on'} checked={sgicCheckOn === 'on'} onChange={onChangeSgicYn} name="sgictabradio"/>
                          <label htmlFor="sgic_tab_radio1" className="contentType">신청함</label>
                      </div>
                      <div className="radio_box">
                        <input type="radio" className="inp_radio" key={"sgic_tab_radio2"} id="sgic_tab_radio2" value={'off'} checked={sgicCheckOn === 'off'} onChange={onChangeSgicYn} name="sgictabradio" />
                        <label htmlFor="sgic_tab_radio2" className="contentType">신청안함</label>
                      </div>
                    </div>

                    {sgicCheckOn === 'on' && <div className="sgic_box_result_cont sgic_tab_radio1">
                      {/*<input type="hidden" className="inp" id="sgic_email" ref={sgicEmail} value={'zespy225@daum.net'} />*/}
                      {/*<input type="hidden" className="inp_radio" id="sgic_gender_radio1" ref={gender} name="sgicgenderradio" value={'1'} />*/}
                      {/*<input type="hidden" className="inp_radio" id="sgic_agree_radio1" ref={privateAgree} value={'Y'} name="sgicagree" />*/}
                      {/*<input type="hidden" className="inp" ref={sgicYear} id="sgic_year" value={'2022'} />*/}
                      {/*<input type="hidden" className="inp" ref={sgicMonth} id="sgic_month" value={'05'} />*/}
                      {/*<input type="hidden" className="inp" ref={sgicDay} id="sgic_day" value={'24'} />*/}

                      <div className="acc_form">
                        <div className="acc_cell vat">
                        <label htmlFor="sgic_birth">생년월일</label>
                        </div>
                        <div className="acc_cell parent">
                          <div className="select_ui_zone btm_line">
                            <a href={'#!'} className="selected_btn" data-default-text="선택"
                            >선택</a>
                            <div className="select_inner" style={{display:"none"}}>
                              {
                                dateOptListrendering(Number(getStrYear()), 100, -14)
                              }
                            </div>
                          </div>
                          <span className="sgic_birth_txt">년</span>

                          <div className="select_ui_zone btm_line">
                            <a href={'#!'} className="selected_btn" data-default-text="선택">선택</a>
                            <div className="select_inner" style={{display:"none"}}>
                              <ul className="select_opt">
                                <li>
                                  <a href={'#!'} className="opt_list">
                                    <div className="item">01</div>
                                  </a>
                                </li>
                                <li>
                                  <a href={'#!'} className="opt_list">
                                    <div className="item">02</div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <span className="sgic_birth_txt">월</span>

                          <div className="select_ui_zone btm_line">
                            <a href={'#!'} className="selected_btn" data-default-text="선택">선택</a>
                            <div className="select_inner" style={{display:"none"}}>
                              <ul className="select_opt">
                                <li>
                                  <a href={'#!'} className="opt_list">
                                    <div className="item">01</div>
                                  </a>
                                </li>
                                <li>
                                  <a href={'#!'} className="opt_list">
                                    <div className="item">02</div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <span className="sgic_birth_txt">일</span>
                        </div>
                      </div>

                      <div className="acc_form">
                        <div className="acc_cell vat">
                          <label htmlFor="sgic_gender_radio1">성별</label>
                        </div>
                        <div className="acc_cell parent">
                          <div className="acc_radio">
                            <div className="radio_box">
                              <input type="radio" className="inp_radio" id="sgic_gender_radio1" name="sgicgenderradio" value={'1'} checked={sgicgenderradio === '1'} onChange={onChangeSgicgenderradio} />
                                <label htmlFor="sgic_gender_radio1" className="contentType">남자</label>
                            </div>
                            <div className="radio_box">
                              <input type="radio" className="inp_radio" id="sgic_gender_radio2" name="sgicgenderradio" value={'2'} checked={sgicgenderradio === '2'} onChange={onChangeSgicgenderradio} />
                                <label htmlFor="sgic_gender_radio2" className="contentType">여자</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="acc_form">
                        <div className="acc_cell vat">
                          <label htmlFor="sgic_email">이메일</label>
                        </div>
                        <div className="acc_cell parent">
                          <div className="acc_inp type3">
                            <input type="text" className="inp" id="sgic_email" placeholder='(예 : sony@sony.co.kr)' />
                              <span className="focus_bg"></span>
                          </div>
                        </div>
                      </div>

                      <div className="acc_form">
                        <div className="acc_cell vat">
                          <label htmlFor="sgic_agree_radio1">개인정보 이용동의</label>
                        </div>
                        <div className="acc_cell parent">
                          <div className="acc_radio">
                            <div className="radio_box">
                              <input type="radio" className="inp_radio" id="sgic_agree_radio1" defaultChecked={privateYn === 'Y'} value={'Y'} name="sgicagree" onChange={onChangePrivateYn} />
                                <label htmlFor="sgic_agree_radio1" className="contentType">동의함</label>
                            </div>
                            <div className="radio_box">
                              <input type="radio" className="inp_radio" id="sgic_agree_radio2" name="sgicagree" checked={privateYn === 'N'} value={'N'} onChange={onChangePrivateYn} />
                                <label htmlFor="sgic_agree_radio2" className="contentType">동의안함</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="sgic_noti">
                        <p className="sgic_noti_txt">입력하신 개인정보는 서울보증보험㈜의 증권발급을 위해 필요한 정보이며, 다른 용도로 사용되지 않습니다.</p>

                        <ul className="list_dot">
                          <li>고객님은 안전거래를 위해 현금 결제 시 소니스토어가 가입한 구매안전서비스 “소비자피해보상보험서비스”를 이용하실 수 있습니다.</li>
                          <li>물품 대금결제 시 구매자의 피해보호를 위해 ㈜서울보증보험의 보증보험증권이 발급됩니다.</li>
                          <li>구매안전서비스를 통하여 주문하시고 서울보증보험에서 발행하는 보험계약체결내역서를 반드시 확인하시기 바랍니다.</li>
                          <li>보상대상 : 미배송, 반송/환불거부, 쇼핑몰부도</li>
                          <li>보험기간 : 주문일로부터 37일간(37일 보증)</li>
                          <li>본 전자보증을 신청하시면 물품대금 결제 시에 소비자에게 서울보증보험의 쇼핑몰보증보험 계약 체결서를 인터넷상으로 자동 발급하여, 인터넷 쇼핑몰에서 발행할 수 있는
                            소비자 피해를 서울보증보험㈜가 보상하는 서비스 입니다.
                          </li>
                          <li>현금결제 시 순결제금액 기준에 보증보험 전자보증서를 발급받으실 수 있습니다.</li>
                          <li>본 보증서는 주문 시 신청한 고객에 한해 발급되며, 서비스 제공 기간 동안 유효합니다.</li>
                          <li>보증금액은 현 주문결제금액 기준으로 발급되며, 주문 변경으로 인한 재발급 및 다른 주문과의 합산발급은 되지 않습니다.</li>
                          <li>보증보험 전자보증서에 대한 보다 상세한 사항은&nbsp;<a href="http://www.usafe.co.kr/u_esafe.asp"
                                                                target="_blank" className="under_line"><em
                              className="color">여기</em></a>를 클릭하여 주시기 바랍니다.
                          </li>
                        </ul>

                        <div className="common__table__wrap">
                          <table className="common__table" role="presentation">
                            <caption>개인정보를 제공받는 자 등의 정보</caption>
                            <colgroup>
                              <col width="26%" />
                                <col width="74%" />
                            </colgroup>
                            <tbody>
                            <tr>
                              <th scope="row">제공받는 자</th>
                              <td>㈜서울보증보험, ㈜유세이프</td>
                            </tr>
                            <tr>
                              <th scope="row">제공하는 항목</th>
                              <td>구매자명,구매자 생년월일,구매자 성별,구매자 연락처 (일반전화 및 핸드폰),구매자 이메일,주문번호,배송지정보,주문금액</td>
                            </tr>
                            <tr>
                              <th scope="row">제공목적</th>
                              <td>쇼핑몰 보증보험 가입 및 보험가입 제반사항</td>
                            </tr>
                            <tr>
                              <th scope="row">보유 및 이용기간</th>
                              <td>개별서비스 제공기간</td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>}

                  </div>
                </div>

              </div>}
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
