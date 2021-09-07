// 주문자 정보
const OrdererForm = prop => {
  // ordererName, ordererContact1, ordererEmail
  const { orderer, setOrderer } = prop

  const handleChange = e => {
    const { name, value } = e.target;

    setOrderer(prevState => ({
      ...prevState,
      [name]: value
    }))
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
                     onChange={handleChange}
              />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />이름을 입력해 주세요.</p>
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
              />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />이메일 아이디를 입력해 주세요.</p>
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
              />
              <span className="focus_bg" />
            </div>
            <p className="error_txt"><span
              className="ico" />휴대폰 번호를 입력해 주세요.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdererForm