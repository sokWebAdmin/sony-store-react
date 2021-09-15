import { useEffect, useMemo, useState, useRef } from 'react';
import { useHistory } from 'react-router';

// components
import SEOHelmet from '../../components/SEOHelmet';
import SelectBox from '../../components/common/SelectBox';

import FindAddress from '../../components/popup/FindAddress';

//css
import '../../assets/scss/contents.scss';
import '../../assets/css/order.css';
import { getUrlParam } from '../../utils/location';

// api
import { shippingsEncryptedShippingNoLaterInput } from '../../api/order.js';
import { handleChange, setObjectState } from '../../utils/state';
import { deliveryMemos } from '../../const/order';

// const TEST_ENCRYPTED_SHIPPING_NO = 'eW5Pb3NJVndBcTFNZ3RZTHhxQ3dQdz09';
const receiverAddressMap = {
  // from: to
  address: 'receiverAddress',
  jibunAddress: 'receiverJibunAddress',
  zipCode: 'receiverZipCd',
};

const deliveryMemoFixedList = deliveryMemos;

const GiftReceive = ({ location }) => {
  const history = useHistory();

  // data state
  const [latestShipping, setLatestShipping] = useState(null);

  // popup state
  const [findAddressVisible, setFindAddressVisible] = useState(false);

  // ref
  const receiverZipCd = useRef();
  const receiverDetailAddress = useRef();

  // reactive state
  const encryptedShippingNo = useMemo(() => getUrlParam('code'), [location]);

  const init = () => {
    encryptedShippingNo
      ? fetchLatestShipping().
        then(laterInputCompletedCheck).
        then(blankFieldCorrection).
        then(setLatestShipping)
      : guard();
  };
  useEffect(init, []);

  const handleShippingChange = event => {
    if (!event?.target) {
      return;
    }

    if (event.target.value.trim()) {
      event.target.parentNode.classList.remove(
        'error');
    }
    handleChange(event)(setLatestShipping);
  };

  const bindReceiverAddress = selectedAddress => {
    if (!selectedAddress) {
      return;
    }

    Object.entries(receiverAddressMap).
      forEach(
        ([from, to]) => setObjectState(to, selectedAddress[from])(
          setLatestShipping()));

    receiverDetailAddress.current.focus();
  };

  async function fetchLatestShipping () {
    try {
      const { data } = await shippingsEncryptedShippingNoLaterInput(
        encryptedShippingNo);
      return data;
    }
    catch (err) {
      console.error(err);
    }
  }

  function guard () {
    alert('잘못된 접근입니다.');
    history.push('/');
  }

  function laterInputCompletedCheck (data) {
    if (data?.laterInputCompleted) {
      alert('이미 배송지 정보가 입력된 주문입니다.');
      history.push('/');
    }
    return data;
  }

  function blankFieldCorrection (data) {
    const result = {};

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const val = data[key].toString();
        Object.assign(result, { [key]: val === '-' ? '' : val });
      }
    }

    return result;
  }

  function handleShippingChangeParameter (key, value) {
    setObjectState(key,
      value)(setLatestShipping());
  }

  return (
    <>
      <SEOHelmet title={'소니스토어 선물하기'} />
      <div className="orderPresent_container">
        <div className="orderPresent_info">
          <i className="present"><img src="../../images/order/ic_present.svg"
                                      alt="선물상자 이미지" /></i>
          <h2 className="orderPresent_tit">소니스토어 선물하기</h2>
          <p className="orderPresent_dsc">선물 받으실 상품의 배송지 정보를 입력해 주세요!</p>
        </div>
        <div className="order_box__cont">
          <div className="acc">
            <div className="acc_item">
              <div className="acc_head">
                <a href="#" className="acc_btn" title="배송지 정보">
                  <span className="acc_tit">배송지 정보</span>
                </a>
              </div>
              <div className="acc_inner">
                {latestShipping &&
                <div className="acc_box">
                  <p className="acc_dsc_top">표시는 필수입력 정보</p>
                  <div className="acc_form">
                    <div className="acc_cell">
                      <label htmlFor="user_name">수령인 이름<i
                        className="necessary"></i></label>
                    </div>
                    <div className="acc_cell">
                      <div
                        className="acc_group parent">
                        {latestShipping.receiverName}
                      </div>
                    </div>
                  </div>
                  <div className="acc_form">
                    <div className="acc_cell">
                      <label htmlFor="user_number">휴대폰 번호<i
                        className="necessary"></i></label>
                    </div>
                    <div className="acc_cell">
                      <div
                        className="acc_group parent">
                        {latestShipping.receiverContact1}
                      </div>
                    </div>
                  </div>
                  <div className="acc_form">
                    <div className="acc_cell vat">
                      <label htmlFor="user_address">주소<i
                        className="necessary" /></label>
                    </div>
                    <div className="acc_cell">
                      <div
                        className="acc_group parent">
                        <div className="acc_inp type4">
                          <input type="text"
                                 className="inp dynamic_input"
                                 id="user_address"
                                 placeholder="주소를 입력하세요."
                                 name="receiverZipCd"
                                 ref={receiverZipCd}
                                 value={latestShipping.receiverZipCd || ''}
                                 onChange={handleShippingChange}
                                 readOnly
                          />
                          <span className="focus_bg" />
                          <div className="delivery_btn_box type1">
                            <button
                              onClick={() => {
                                setFindAddressVisible(true);
                                receiverZipCd.current.parentNode.classList.remove(
                                  'error');
                              }}
                              className="button button_negative button-s"
                              type="button">우편번호 검색
                            </button>
                            {findAddressVisible &&
                            <FindAddress setVisible={setFindAddressVisible}
                                         setAddress={bindReceiverAddress} />}
                          </div>
                          <p className="error_txt"><span
                            className="ico" />배송 받으실 주소를 입력해 주세요.
                          </p>
                        </div>
                      </div>
                      <div className="acc_group parent">
                        <div className="acc_inp type5">
                          <input type="text" className="inp dynamic_input"
                                 name="receiverAddress"
                                 value={latestShipping.receiverAddress || ''}
                                 onChange={handleShippingChange}
                                 readOnly
                          />
                          <span className="focus_bg" />
                        </div>
                      </div>
                      <div
                        className="acc_group parent">
                        <div className="acc_inp type5">
                          <input type="text" className="inp"
                                 placeholder="상세 주소를 입력하세요."
                                 name="receiverDetailAddress"
                                 ref={receiverDetailAddress}
                                 value={latestShipping.receiverDetailAddress ||
                                 ''}
                                 onChange={handleShippingChange}
                          />
                          <span className="focus_bg" />
                          <p className="error_txt"><span
                            className="ico" />상세 주소를 입력해 주세요.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="acc_form">
                    <div className="acc_cell vat">
                      <label htmlFor="delivery_request">배송 요청 사항</label>
                    </div>
                    <div className="acc_cell">
                      <div className="acc_group parent">
                        <div className="acc_inp type3">
                          <SelectBox
                            defaultInfo={{
                              type: 'dropdown',
                              placeholder: '택배 기사님께 요청하실 내용을 선택하세요.',
                            }}
                            selectOptions={deliveryMemoFixedList}
                            selectOption={
                              ({ optionNo, label }) => optionNo !== 1
                                ? handleShippingChangeParameter('deliveryMemo',
                                  label)
                                : handleShippingChangeParameter('deliveryMemo',
                                  '')
                            }
                          />
                        </div>
                      </div>
                      <div className="acc_group parent">
                        <div className="acc_inp type3">
                          <input type="text" className="inp"
                                 placeholder="배송 메모를 입력하세요."
                                 name="deliveryMemo"
                                 value={latestShipping.deliveryMemo || ''}
                                 onChange={
                                   handleShippingChange
                                 }
                          />
                          <span className="focus_bg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
          <div className="parent">
            <button className="button button_positive button-full"
                    type="button">입력 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftReceive;