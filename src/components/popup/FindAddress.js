import { useState } from 'react'

// components
import LayerPopup from "../common/LayerPopup"

// stylesheet
import '../../assets/scss/partials/popup/findAddress.scss'

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
      {test&& <LayerPopup className="find_address" onClose={close}>
        <>
          <p className="pop_tit">우편번호 찾기</p>
          <form className="search_container">
            <input
              type="text"
              placeholder="검색어(도로명,지번,건물명)를 입력해주세요"
              className="search_input"
            />
            <button type="submit" className="search_button button button_negative">검색</button>
          </form>
        </>
      </LayerPopup>}
      {/*   컴포넌트 내부 마크업   */}
    </>
  );
};

export default FindAddress;
