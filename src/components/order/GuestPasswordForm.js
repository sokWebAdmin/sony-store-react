export default function GuestPasswordForm () {
  return (
    <>
      <dl className="pw_info">
        <dt>비회원 배송 조회 시 사용하실 비밀번호를 입력해 주세요.</dt>
        <dd>비밀번호는 12자 이상이어야 하며, 대문자/소문자/숫자가 하나 이상 포함되어야 합니다.</dd>
      </dl>
      <div className="acc_form">
        <div className="acc_cell">
          <label htmlFor="user_pwd">비밀번호</label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type3">
              <input type="text" id="user_pwd" className="inp" />
              <span className="focus_bg"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="acc_form">
        <div className="acc_cell">
          <label htmlFor="user_pwd2">비밀번호 확인</label>
        </div>
        <div className="acc_cell">
          <div className="acc_group parent">
            <div className="acc_inp type3">
              <input type="text" id="user_pwd2" className="inp" />
              <span className="focus_bg"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}