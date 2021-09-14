import { useImperativeHandle, forwardRef, useRef } from 'react';
import { handleChange } from '../../utils/state';

// 주문자 정보
const OrdererForm = forwardRef((prop, ref) => {
  // ordererName, ordererContact1, ordererEmail
  const { orderer, setOrderer } = prop;

  const handleOrdererChange = event => {
    if (event.target.value.trim()) {
      event.target.parentNode.classList.remove(
        'error');
    }
    handleChange(event)(setOrderer);
  };

  const ordererName = useRef();
  const ordererContact1 = useRef();
  const ordererEmail = useRef();

  console.log(ref);
  useImperativeHandle(ref, () => ({
    fieldValidation () {
      const emptyIndex = Object.values(orderer).findIndex(value => value === '');
      if (emptyIndex === -1) {
        return true;
      }

      const refs = [ordererName, ordererEmail, ordererContact1];
      attachError(refs[emptyIndex]);
      return false;
    },
  }));

  function attachError (ref) {
    console.log('attachError');
    const el = ref.current;
    el.parentNode.classList.add('error');
    el.focus();
  }

  return (
    <>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_name">이름<i
            className="necessary" /></label>
        </div>
        <div className="acc_cell">
          <div
            className="acc_group parent">{/* error 문구 제어 */}
            <div className="acc_inp type3">
              <input type="text" className="inp"
                     id="user_name"
                     placeholder="이름을 입력하세요."
                     value={orderer.ordererName}
                     name="ordererName"
                     onChange={handleOrdererChange}
                     ref={ordererName}
              />
              <span className="focus_bg" />
              <p className="error_txt"><span
                className="ico" />이름을 입력해 주세요.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_email">이메일<i
            className="necessary" /></label>
        </div>
        <div className="acc_cell">
          <div
            className="acc_group parent">
            <div className="acc_inp type3">
              <input type="text" className="inp"
                     id="user_email"
                     placeholder="이메일 아이디 (예 : sony@sony.co.kr)"
                     value={orderer.ordererEmail}
                     name="ordererEmail"
                     onChange={handleOrdererChange}
                     ref={ordererContact1}
              />
              <span className="focus_bg" />
              <p className="error_txt"><span
                className="ico" />이메일 아이디를 입력해 주세요.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_number">휴대폰 번호<i
            className="necessary" /></label>
        </div>
        <div className="acc_cell">
          <div
            className="acc_group parent">
            <div className="acc_inp type3">
              <input type="text" className="inp"
                     id="user_number"
                     value={orderer.ordererContact1}
                     name="ordererContact1"
                     onChange={handleOrdererChange}
                     ref={ordererEmail}
              />
              <span className="focus_bg" />
              <p className="error_txt"><span
                className="ico" />휴대폰 번호를 입력해 주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default OrdererForm