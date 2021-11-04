import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { handleChange } from '../../utils/state';

const GiftReceiverForm = forwardRef(({ shipping, setShipping }, ref) => {
  const receiverName = useRef();
  const shippingInfoLaterInputContact = useRef();

  const onChangeInput = (event) => {
    const el = event.target;

    if (el.value.trim()) {
      el.parentNode.querySelector('.error_txt').style.display = 'none';
    } else {
      el.parentNode.querySelector('.error_txt').style.display = 'block';
    }
    handleChange(event)(setShipping);
  };

  const onChangeContact = (event) => {
    const value = event.target.value.toString();
    const phoneNo = value.replace(/[^0-9]/g, '');

    if (phoneNo.trim()) {
      event.target.parentNode.querySelector('.error_txt').style.display = 'none';
    } else {
      event.target.parentNode.querySelector('.error_txt').style.display = 'block';
    }

    setShipping({ ...shipping, shippingInfoLaterInputContact: phoneNo });
  };

  // 선물하기시 shipping member value 을 injectValue 으로 채움. BE 요청
  const shippingStateDefaultValueInject = () => {
    const usedFieldKeys = ['receiverName', 'shippingInfoLaterInputContact'];
    const injectValue = null;
    const injectObject = Object.keys(shipping)
      .filter((key) => !usedFieldKeys.some((uKey) => uKey === key))
      .reduce((acc, key) => {
        acc = { ...acc, ...{ [key]: injectValue } };
        return acc;
      }, {});
    setShipping({
      // async
      ...shipping,
      ...injectObject,
      usesShippingInfoLaterInput: true,
    });
  };

  useEffect(shippingStateDefaultValueInject, []);

  useImperativeHandle(ref, () => ({
    fieldValidation() {
      const refs = {
        receiverName,
        shippingInfoLaterInputContact,
      };

      const invalidPhoneNo = !shipping.shippingInfoLaterInputContact.match(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g);
      if (invalidPhoneNo) {
        alert('휴대폰 번호를 확인하여주세요.')
        shippingInfoLaterInputContact.current?.focus()
        return false;
      }


      const emptyRef = Object.entries(refs).find(([k]) => !shipping[k])?.[1];
      if (!emptyRef) {
        return true;
      }

      attachError(emptyRef);
      return false;
    },
  }));

  function attachError(ref) {
    const el = ref.current;
    el.parentNode.classList.add('error');
    el.focus();
  }

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      shippingInfoLaterInputContact.current.focus();
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_name3">
            수령인 이름<i className="necessary"></i>
          </label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type2">
              <input
                type="text"
                id="user_name3"
                className="inp"
                maxLength="50"
                name="receiverName"
                value={shipping.receiverName}
                onChange={onChangeInput}
                onKeyDown={handleEnter}
                ref={receiverName}
              />
              <span className="focus_bg"></span>
              <p className="error_txt">
                <span className="ico"></span>선물 받으실 분의 이름을 입력해 주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_number3">
            휴대폰 번호<i className="necessary"></i>
          </label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type2">
              <input
                type="text"
                id="user_number3"
                className="inp"
                name="shippingInfoLaterInputContact"
                value={shipping.shippingInfoLaterInputContact}
                ref={shippingInfoLaterInputContact}
                onChange={onChangeContact}
              />
              <span className="focus_bg"></span>
              <p className="error_txt">
                <span className="ico"></span>휴대폰 번호를 입력해 주세요.
              </p>
            </div>
          </div>
          <ul className="list_dot">
            <li>
              선물 받으실 분의 휴대폰 번호를 입력하시면, 받으실 분의 휴대폰 번호로 직접 배송 받으실 주소를 입력하실 수
              있는 URL이 전송됩니다.
            </li>
            <li>선물 받으시는 분의 배송지 정보가 등록이 되면, 배송 조회는 MY PAGE에서 하실 수 있습니다.</li>
            <li>소니스토어의 모든 제품은 무료 배송입니다.</li>
          </ul>
        </div>
      </div>
    </>
  );
});

export default GiftReceiverForm;
