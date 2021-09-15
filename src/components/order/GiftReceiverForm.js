const GiftReceiverForm = () => {
  return (
    <>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_name3">수령인 이름<i
            className="necessary"></i></label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type2">
              <input type="text" id="user_name3" className="inp" />
              <span className="focus_bg"></span>
              <p className="error_txt"><span className="ico"></span>선물 받으실 분의
                이름을
                입력해 주세요.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell vat">
          <label htmlFor="user_number3">휴대폰 번호<i
            className="necessary"></i></label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type2">
              <input type="text" id="user_number3" className="inp" />
              <span className="focus_bg"></span>
              <p className="error_txt"><span className="ico"></span>휴대폰 번호를 입력해
                주세요.</p>
            </div>

          </div>
          <ul className="list_dot">
            <li>선물 받으실 분의 휴대폰 번호를 입력하시면, 받으실 분의 휴대폰 번호로 직접 배송<br />받으실 주소를 입력하실
              수
              있는 URL이 전송됩니다.
            </li>
            <li>선물 받으시는 분의 배송지 정보가 등록이 되면, 배송 조회는 MY PAGE에서 하실 수 있습니다.</li>
            <li>소니스토어의 모든 제품은 무료 배송입니다.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GiftReceiverForm;