import { useEffect, useState, useContext, useRef } from 'react';
import GlobalContext from '../../context/global.context';

// components
import DatePicker from '../../components/common/DatePicker';

import SelectBox from '../../components/common/SelectBox';
import FindAddress from '../../components/popup/FindAddress';

// utils
import { handleChange, setObjectState } from '../../utils/state';

// const
import { deliveryMemos } from '../../const/order';

// stylesheet
import '../../assets/scss/interaction/field.dynamic.scss';

const receiverAddressMap = {
  // from: to
  address: 'receiverAddress',
  jibunAddress: 'receiverJibunAddress',
  zipCode: 'receiverZipCd',
};

// 배송지 정보
const ShippingAddressForm = prop => {
  const { isLogin } = useContext(GlobalContext);
  const detailAddressInput = useRef();

  // popup state
  const [findAddressVisible, setFindAddressVisible] = useState(false);

  // addressNo, countryCd, addressName, receiverName, receiverZipCd,
  // receiverAddress, receiverDetailAddress, receiverJibunAddress,
  // receiverContact1, receiverContact2, customsIdNumber, deliveryMemo
  const { shipping, setShipping, orderer } = prop;
  // TODO. 배송일자 선택 바인딩 안됨. 매칭되는 프로퍼티 확인 필요

  const bindReceiverAddress = selectedAddress => {
    if (!selectedAddress) {
      return;
    }

    Object.entries(receiverAddressMap).
      forEach(
        ([from, to]) => setObjectState(to, selectedAddress[from])(setShipping));
    detailAddressInput.current.focus();
  };

  const ordererMap = {
    receiverName: orderer.ordererName,
    receiverContact1: orderer.ordererContact1,
  };

  const deliveryMemoFixedList = deliveryMemos;

  const handleShippingChange = event => handleChange(event)(setShipping);

  const handleShippingChangeParameter = (key, value) => setObjectState(key,
    value)(setShipping);

  const [sameAsOrderer, setSameAsOrderer] = useState(false);

  useEffect(() => {
    sameAsOrderer
      ? Object.entries(ordererMap).
        forEach(([key, value]) => handleShippingChangeParameter(key, value))
      : Object.keys(ordererMap).
        forEach(key => handleShippingChangeParameter(key, ''));
  }, [sameAsOrderer]);

  return (
    <>
      {isLogin &&
      <div className="acc_form">
        <div className="acc_cell">
          <label htmlFor="delivery_choice">배송지 선택</label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type4">
              <p className="delivery_txt">배송지를 선택하세요.</p>
              <div className="delivery_btn_box">
                <button
                  className="button button_negative button-s popup_comm_btn"
                  type="button"
                  data-popup-name="shipping_addr">최근 배송지
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_name2">수령인 이름<i
            className="necessary" /></label>
        </div>
        <div className="acc_cell">
          <div
            className="acc_group parent">
            <div className="acc_inp type3">
              <input type="text" className="inp"
                     id="user_name2"
                     placeholder="이름을 입력하세요."
                     name="receiverName"
                     value={shipping.receiverName}
                     onChange={handleShippingChange}
              />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />이름을 입력해 주세요.</p>
          </div>
          <div className="check email_check">
            <input type="checkbox" className="inp_check"
                   id="chkSame"
                   checked={sameAsOrderer}
                   onChange={evt => setSameAsOrderer(evt.target.checked)}
            />
            <label htmlFor="chkSame">주문자 정보와 동일</label>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_number2">휴대폰 번호<i
            className="necessary" /></label>
        </div>
        <div className="acc_cell">
          <div
            className="acc_group parent">
            <div className="acc_inp type5">
              <input type="text" className="inp"
                     id="user_number2"
                     name="receiverContact1"
                     value={shipping.receiverContact1}
                     onChange={handleShippingChange}
              />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />휴대폰 번호를 입력해주세요.</p>
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
                     value={shipping.receiverZipCd}
                     onChange={handleShippingChange}
                     readOnly
              />
              <span className="focus_bg" />
              <div className="delivery_btn_box type1">
                <button
                  onClick={() => setFindAddressVisible(true)}
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
                     value={shipping.receiverAddress}
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
                     value={shipping.receiverDetailAddress}
                     onChange={handleShippingChange}
                     ref={detailAddressInput}
              />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />상세 주소를 입력해 주세요.</p>
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
                    ? handleShippingChangeParameter('deliveryMemo', label)
                    : handleShippingChangeParameter('deliveryMemo', '')
                }
              />
            </div>
          </div>
          <div className="acc_group parent">
            <div className="acc_inp type3">
              <input type="text" className="inp"
                     placeholder="배송 메모를 입력하세요."
                     name="deliveryMemo"
                     value={shipping.deliveryMemo}
                     onChange={() => {
                       alert(
                         'select option 을 orderNo: 1 로 리셋해야하는데.. SelectBox랑 협업필요');
                       handleShippingChange();
                     }}
              />
              <span className="focus_bg" />
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="delivery_choice">배송일 선택</label>
        </div>
        <div className="acc_cell vat">
          <div className="acc_group parent">
            <div className="acc_inp">
              <div className="acc_radio">
                <div className="radio_box">
                  <input type="radio"
                         className="inp_radio"
                         id="delivery_radio1"
                         name="deliveryradio"
                         defaultChecked="checked" />
                  <label htmlFor="delivery_radio1"
                         className="contentType">정상 배송</label>
                </div>
                <div className="radio_box">
                  <input type="radio"
                         className="inp_radio"
                         id="delivery_radio2"
                         name="deliveryradio" />
                  <label htmlFor="delivery_radio2"
                         className="contentType">출고일 지정</label>
                </div>
              </div>
            </div>
          </div>
          <div className="acc_group">
            <div className="calendar_box">
              <input type="text"
                     className="inp datepicker"
                     autoComplete="off" />
              <DatePicker />
            </div>
          </div>
          <ul className="list_dot">
            <li>정상 배송이 제일 빠른 배송입니다.</li>
            <li>출고일 지정 배송의 경우 주문 날짜의 3일 후부터 선택이
              가능하며,<br />지정된 출고일에 맞춰서 제품이 발송되고, 출고일 기준
              2~3일 이내 수령이 가능합니다.
            </li>
            <li>소니스토어의 모든 제품은 무료 배송 입니다.</li>
            <li>배송기간은 서울, 경기일 경우 2~3일(주문일 포함), 기타 지역은
              3~5일
              정도 걸립니다.<br />(정오(낮12시) 이전 결제완료 기준)
            </li>
            <li>단, 지역 및 교통 사정에 따라 배송이 지연되는 경우가 발생할 수
              있습니다.
            </li>
            <li>일요일, 공휴일은 배송되지 않습니다. (예:토요일 주문 시 월요일에
              접수되어
              화요일 이후 배송)
            </li>
            <li>예약판매는 별도의 배송 일정을 따릅니다.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShippingAddressForm;