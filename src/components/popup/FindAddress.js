import { useState } from 'react'

// components
import LayerPopup from "../common/LayerPopup"

// 주소 찾기 팝업
const FindAddress = () => {
  // LayerPopup 상태관리
  const [test, setTest] = useState(true)
  const close = () => {
    setTest(false);
  }
  const nonMemberOrder = () => {
    console.log('비회원 구매');
    close();
  }
  const memberOrder = () => {
    console.log('회원 구매');
    close();
  }

  return (
    <>
      {test&& <LayerPopup className="login_chk_order" onClose={close}>
        <>
          <p className="pop_tit">로그인 후 주문해주세요.</p>
          <p className="pop_txt">소니스토어 회원으로 로그인 하시고 다양한 멤버십 혜택을 누리세요!
            비회원으로 제품을 구매하시면 소니스토어의 쿠폰 및 마일리지 적립 혜택을 받으실 수 없습니다. </p>
          <div className="btn_article">
            <button className="button button_negative button-m closed" type="button" onClick={nonMemberOrder}>비회원 구매</button>
            <button className="button button_positive button-m" type="button" onClick={memberOrder}>회원 구매</button>
          </div>
        </>
      </LayerPopup>}
      {/*   컴포넌트 내부 마크업   */}
    </>
  );
};

export default FindAddress;
