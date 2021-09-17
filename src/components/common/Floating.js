
const SERVICE_CENTER = process.env.REACT_APP_KAKAO_SERVICE_CENTER_KEY;

export default function Floating () {
  return (
    <nav className="sidebar">
      <div className="sidebar__inner">
        <a href="../../html/mypage/myPageMain.html" className="sidebar__btn sidebar__btn__link kakao"><span>카톡 상담</span></a>
        <a href="#none" className="sidebar__btn sidebar__btn__link customer"><span>고객 센터</span></a>
        <a href="#header" className="sidebar__btn top"><span>페이지 상단</span></a>
      </div>
      <button className="sidebar__btn sidebar__btn__toggle" type="button"><img src="../../images/common/ic_sidebar1.svg" alt="메뉴토글" /></button>
    </nav>
  )
}