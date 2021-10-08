import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

//SEO
import SEOHelmet from '../../components/SEOHelmet';
import qs from 'qs';
//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/support.scss';
import { postPurchaseConsulting } from '../../api/sony/support';
import PurchaseConsultingNotice from '../../components/popup/PurchaseConsultingNotice';
import ReCaptcha from '../../components/common/ReCaptcha';
import { useAlert } from '../../hooks';
import Alert from '../../components/common/Alert';

export default function PurchaseConsulting() {
  const history = useHistory();
  const { openAlert, closeModal, alertMessage, alertVisible } = useAlert();

  useEffect(() => {
    const query = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    });
    if (!query?.agreement) {
      history.push('/agreement');
    }
  }, []);

  const [type, setType] = useState('1');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [productName, setProductName] = useState('');
  const [requestQty, setRequestQty] = useState('');
  const [purpose, setPurpose] = useState('');
  const [endUser, setEndUser] = useState('');
  const [dueDateInfo, setDueDateInfo] = useState('');
  const [note, setNote] = useState('');

  //validation
  const [validation, setValidation] = useState({
    name: true,
    company: true,
    email: true,
    mobile: true,
    productName: true,
    requestQty: true,
    purpose: true,
    endUser: true,
    dueDateInfo: true,
    note: true,
  });

  const [noticeVisible, setNoticeVisible] = useState(false);

  const [count, setCount] = useState(0);

  const onChangeNote = (target) => {
    setCount(target.value.length);
    setNote(target.value);
  };

  // 캡챠
  const [captcha, setCaptcha] = useState(false);

  const validationForm = () => {
    let validation = true;

    if (name === '') {
      setValidation((prev) => ({ ...prev, name: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, name: true }));
    }
    if (type === '2' && company === '') {
      setValidation((prev) => ({ ...prev, company: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, company: true }));
    }
    if (type === '2' && company === '') {
      setValidation((prev) => ({ ...prev, company: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, company: true }));
    }
    if (email === '') {
      setValidation((prev) => ({ ...prev, email: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, email: true }));
    }
    if (mobile === '') {
      setValidation((prev) => ({ ...prev, mobile: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, mobile: true }));
    }
    if (productName === '') {
      setValidation((prev) => ({ ...prev, productName: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, productName: true }));
    }
    if (requestQty === '') {
      setValidation((prev) => ({ ...prev, requestQty: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, requestQty: true }));
    }
    if (purpose === '') {
      setValidation((prev) => ({ ...prev, purpose: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, purpose: true }));
    }
    if (endUser === '') {
      setValidation((prev) => ({ ...prev, endUser: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, endUser: true }));
    }

    if (dueDateInfo === '') {
      setValidation((prev) => ({ ...prev, dueDateInfo: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, dueDateInfo: true }));
    }

    if (note === '') {
      setValidation((prev) => ({ ...prev, note: false }));
      validation = false;
    } else {
      setValidation((prev) => ({ ...prev, note: true }));
    }

    if (!captcha) {
      openAlert(`'로봇이 아닙니다.' 인증이 필요합니다.`);
      validation = false;
    }
    return validation;
  };

  const onClickPositiveBtn = async () => {
    if (validationForm() === false) return;
    const data = {
      type,
      name,
      email,
      mobile,
      productname: productName,
      requestqty: requestQty,
      purpose,
      enduser: endUser,
      duedateinfo: dueDateInfo,
      note,
    };
    if (type === '2') {
      data.company = company;
    }
    const res = await postPurchaseConsulting(data);
    if (res?.data?.description === 'email') {
      openAlert('이메일 주소를 확인해 주세요.');
    } else if (res?.data?.errorCode === '0000') {
      openAlert('전송되었습니다.', () => () => history.push('/'));
    } else {
      openAlert('전송을 실패했습니다.');
    }
  };

  const onClickCancel = () => {
    history.goBack();
  };

  const onChangeType = (e) => setType(e.target.value);

  return (
    <>
      <SEOHelmet title={'고객 서비스 : 구매상담입력'} />
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      <div className="contents support">
        <div className="container">
          <div className="purchaseConsulting">
            <div className="support_head">
              <h1 className="support_head_title">구매상담 안내</h1>
              <p className="support_head_desc">
                소니스토어에서 필요하신 상품과 연락처를 알려주시면 담당자가 친절하고 신속하게 상담해 드리겠습니다.
              </p>
            </div>
            <div className="purchase_wrap">
              <div className="purchase_wrap_radio">
                <div className="purchase_wrap_radio_bg">
                  <div className="radio_box">
                    <input
                      type="radio"
                      className="inp_radio"
                      id="tab1"
                      value="1"
                      name="tabradio"
                      onChange={onChangeType}
                      defaultChecked="checked"
                    />
                    <label htmlFor="tab1" className="contentType">
                      일반구매 상담
                    </label>
                  </div>
                  <div className="radio_box">
                    <input
                      type="radio"
                      className="inp_radio"
                      id="tab2"
                      value="2"
                      name="tabradio"
                      onChange={onChangeType}
                    />
                    <label htmlFor="tab2" className="contentType">
                      기업구매 상담
                    </label>
                  </div>
                </div>
                <button className="button button_secondary button-s" onClick={() => setNoticeVisible(true)}>
                  기업구매 시 유의사항
                </button>
                {noticeVisible && <PurchaseConsultingNotice setVisible={setNoticeVisible} />}
              </div>
              <div className="tabResult">
                <div className="result_cont tab1 on">
                  <div className="inp_wrap">
                    <h2 className="inp_wrap_tit">개인정보 입력</h2>
                    <div className="inp_wrap_cont">
                      <p className="inp_wrap_amp">표시는 필수입력 정보</p>
                      {type === '1' && (
                        <div className="inp_wrap_form">
                          <div className="acc_cell vat">
                            <label htmlFor="user_name">
                              이름
                              <i className="necessary" />
                            </label>
                          </div>
                          <div className="acc_cell">
                            <div className="acc_group parent error">
                              {/* error 클래스로 에러문구 제어*/}
                              <div className="acc_inp type1">
                                <input
                                  type="text"
                                  className="inp"
                                  id="user_name"
                                  placeholder="띄어쓰기 없이 입력하세요."
                                  autoComplete="off"
                                  maxLength={50}
                                  value={name}
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />
                                <span className="focus_bg" />
                              </div>
                              {!validation.name && (
                                <p className="error_txt">
                                  <span className="ico" />
                                  이름을 입력해 주세요.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {type === '2' && (
                        <div className="inp_wrap_form">
                          <div className="acc_cell vat">
                            <label htmlFor="enterprise_name">
                              기업명(단체명)
                              <i className="necessary" />
                            </label>
                          </div>
                          <div className="acc_cell">
                            <div className="acc_group parent error">
                              {/* error 클래스로 에러문구 제어*/}
                              <div className="acc_inp type1">
                                <input
                                  type="text"
                                  className="inp"
                                  id="enterprise_name"
                                  placeholder="기업명(단체명)을 입력하세요."
                                  autoComplete="off"
                                  maxLength={50}
                                  value={company}
                                  onChange={(e) => {
                                    setCompany(e.target.value);
                                  }}
                                />
                                <span className="focus_bg" />
                              </div>
                              {!validation.company && (
                                <p className="error_txt">
                                  <span className="ico" />
                                  기업명(단체명)을 입력해 주세요.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {type === '2' && (
                        <div className="inp_wrap_form">
                          <div className="acc_cell vat">
                            <label htmlFor="manager_name">
                              담당자명
                              <i className="necessary" />
                            </label>
                          </div>
                          <div className="acc_cell">
                            <div className="acc_group parent error">
                              {/* error 클래스로 에러문구 제어*/}
                              <div className="acc_inp type1">
                                <input
                                  type="text"
                                  className="inp"
                                  id="manager_name"
                                  placeholder="띄어쓰기 없이 입력하세요."
                                  autoComplete="off"
                                  maxLength={50}
                                  value={name}
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />
                                <span className="focus_bg" />
                              </div>
                              {!validation.name && (
                                <p className="error_txt">
                                  <span className="ico" />
                                  담당자명을 입력해 주세요.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="inp_wrap_form">
                        <div className="acc_cell vat">
                          <label htmlFor="user_email">
                            이메일
                            <i className="necessary" />
                          </label>
                        </div>
                        <div className="acc_cell">
                          <div className="acc_group parent error">
                            {/* error 클래스로 에러문구 제어*/}
                            <div className="acc_inp type1">
                              <input
                                type="text"
                                className="inp"
                                id="user_email"
                                placeholder="예) sony@sony.co.kr"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              />
                              <span className="focus_bg" />
                            </div>
                            {!validation.email && (
                              <p className="error_txt">
                                <span className="ico" />
                                이메일 아이디를 입력해 주세요.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="inp_wrap_form">
                        <div className="acc_cell vat">
                          <label htmlFor="user_number">
                            휴대폰 번호
                            <i className="necessary" />
                          </label>
                        </div>
                        <div className="acc_cell">
                          <div className="acc_group parent error">
                            {/* error 클래스로 에러문구 제어*/}
                            <div className="acc_inp type1">
                              <input
                                type="number"
                                className="inp"
                                id="user_number"
                                maxLength={20}
                                placeholder="- 없이 입력하세요."
                                autoComplete="off"
                                value={mobile}
                                onChange={(e) => {
                                  setMobile(e.target.value);
                                }}
                              />
                              <span className="focus_bg" />
                            </div>
                            {!validation.mobile && (
                              <p className="error_txt">
                                <span className="ico" />
                                휴대폰 번호를 입력해 주세요.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inp_wrap">
                    <h2 className="inp_wrap_tit">상담정보 입력</h2>
                    <div className="inp_wrap_cont">
                      <p className="inp_wrap_amp">표시는 필수입력 정보</p>
                      <div className="inp_wrap_form">
                        <div className="acc_cell vat">
                          <label htmlFor="prd_name">
                            구입 희망 상품
                            <i className="necessary" />
                          </label>
                        </div>
                        <div className="acc_cell">
                          <div className="acc_group parent error">
                            {/* error 클래스로 에러문구 제어*/}
                            <div className="acc_inp">
                              <input
                                type="text"
                                className="inp"
                                id="prd_name"
                                placeholder="예) 디지털카메라"
                                autoComplete="off"
                                maxLength={50}
                                value={productName}
                                onChange={(e) => {
                                  setProductName(e.target.value);
                                }}
                              />
                              <span className="focus_bg" />
                            </div>
                            {!validation.productName && (
                              <p className="error_txt">
                                <span className="ico" />이 정보는 필수 입력사항 입니다.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="inp_wrap_form">
                        <div className="acc_cell vat">
                          <label htmlFor="prd_num">
                            구입 예정 수량
                            <i className="necessary" />
                          </label>
                        </div>
                        <div className="acc_cell">
                          <div className="acc_group parent error">
                            {/* error 클래스로 에러문구 제어*/}
                            <div className="acc_inp">
                              <input
                                type="text"
                                className="inp"
                                id="prd_num"
                                placeholder="예) 220대"
                                maxLength={50}
                                autoComplete="off"
                                value={requestQty}
                                onChange={(e) => {
                                  setRequestQty(e.target.value);
                                }}
                              />
                              <span className="focus_bg" />
                            </div>
                            {!validation.requestQty && (
                              <p className="error_txt">
                                <span className="ico" />이 정보는 필수 입력사항입니다.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="inp_wrap_form">
                        <div className="acc_cell vat">
                          <label htmlFor="prd_purpose">
                            구매 목적
                            <i className="necessary" />
                          </label>
                        </div>
                        <div className="acc_cell">
                          <div className="acc_group parent error">
                            {/* error 클래스로 에러문구 제어*/}
                            <div className="acc_inp">
                              <input
                                type="text"
                                className="inp"
                                maxLength={100}
                                id="prd_purpose"
                                placeholder="예) 직접 사용/납품"
                                autoComplete="off"
                                value={purpose}
                                onChange={(e) => {
                                  setPurpose(e.target.value);
                                }}
                              />
                              <span className="focus_bg" />
                            </div>
                            {!validation.purpose && (
                              <p className="error_txt">
                                <span className="ico" />이 정보는 필수 입력사항입니다.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="inp_wrap_form">
                        <div className="acc_cell vat">
                          <label htmlFor="end_user">
                            최종 사용자
                            <i className="necessary" />
                          </label>
                        </div>
                        <div className="acc_cell">
                          <div className="acc_group parent error">
                            {/* error 클래스로 에러문구 제어*/}
                            <div className="acc_inp">
                              <input
                                type="text"
                                className="inp"
                                id="end_user"
                                placeholder="예) 자사 임직원/납품 시 납품처"
                                autoComplete="off"
                                value={endUser}
                                maxLength={100}
                                onChange={(e) => {
                                  setEndUser(e.target.value);
                                }}
                              />
                              <span className="focus_bg" />
                            </div>
                            {!validation.endUser && (
                              <p className="error_txt">
                                <span className="ico" />이 정보는 필수 입력사항입니다.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="inp_wrap_form">
                        <div className="acc_cell vat">
                          <label htmlFor="fixed_date">
                            정해진 납기일
                            <i className="necessary" />
                          </label>
                        </div>
                        <div className="acc_cell">
                          <div className="acc_group parent error">
                            {/* error 클래스로 에러문구 제어*/}
                            <div className="acc_inp">
                              <input
                                type="text"
                                className="inp"
                                id="fixed_date"
                                placeholder="예) 년,월,일 까지/없음"
                                maxLength={100}
                                autoComplete="off"
                                value={dueDateInfo}
                                onChange={(e) => {
                                  setDueDateInfo(e.target.value);
                                }}
                              />
                              <span className="focus_bg" />
                            </div>
                            {!validation.dueDateInfo && (
                              <p className="error_txt">
                                <span className="ico" />이 정보는 필수 입력사항입니다.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="inp_wrap_form">
                        <div className="acc_cell vat">
                          <label htmlFor="requests">
                            추가 문의 및 요청 사항
                            <i className="necessary" />
                          </label>
                        </div>
                        <div className="acc_cell">
                          <div className="acc_group parent">
                            <div className="acc_inp">
                              <textarea
                                id="requests"
                                className="requests_cont"
                                cols={50}
                                rows={5}
                                maxLength={4000}
                                value={note}
                                onChange={(e) => {
                                  onChangeNote(e.target);
                                }}
                              />
                              <span className="focus_bg" />
                            </div>
                            <div className="byte_count">
                              <strong className="current">{count}</strong> / 4,000자
                            </div>
                            {!validation.node && (
                              <p className="error_txt">
                                <span className="ico" />이 정보는 필수 입력사항입니다.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 자동입력방지 영역 */}
                  <div className="captcha_area">
                    <ReCaptcha setCaptcha={setCaptcha} />
                  </div>
                  {/*//자동입력방지 영역  */}
                  <ul className="list_dot">
                    <li>
                      일반 소비자의 제품 구매 및 A/S 관련 문의는 소니코리아 고객지원센터로 문의해 주시기 바랍니다.
                      (고객지원센터 : 1588-0911)
                    </li>
                    <li>
                      B2B 기업체 특판 구매는 1)모델 2) 수량 3)납기일 4) 납품처 5) 제품 용도 의 정보가 필요합니다. 위의
                      정보를 포함한 메일을 송부 부탁 드립니다.
                    </li>
                    <li>
                      방송용 장비, 프로젝터, 반도체, 기타 부품 소재 관련 문의는 대표전화로 문의해 주시기 바랍니다.
                      (대표전화 : 02-6001-4000)
                    </li>
                  </ul>
                </div>

                <div className="btn_box">
                  <button className="button button_negative" type="button" onClick={onClickCancel}>
                    취소
                  </button>
                  <button className="button button_positive" type="button" onClick={onClickPositiveBtn}>
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
