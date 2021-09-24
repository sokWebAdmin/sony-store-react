import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import GlobalContext from "../../context/global.context";
import { useAlert, useScroll, useToggle } from "../../hooks";
import Alert from "./Alert";
import Confirm from "./Confirm";

const SERVICE_CENTER = process.env.REACT_APP_KAKAO_SERVICE_CENTER_KEY; // http://pf.kakao.com/_xbxhExaj
const JS_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY; // @FIXME 소니코리아 고객센터의 jsKey 로 연결해야 함.

const message = {
  alert: '고객님께서 원하시는 제품을 \n 빠르고 정확하게 구매하실 수 있도록 도와드리겠습니다. \n 고객지원센터: 1588-0911',
  confirm: '카톡 상담을 위해선 로그인이 필요합니다. \n 로그인 하시겠습니까?'
};

const chat = () => {
  window.Kakao.Channel.chat({ channelPublicId: SERVICE_CENTER });
}

export default function Floating () {
  const history = useHistory();
  
  const { isLogin } = useContext(GlobalContext);
  const [ active, toggle ] = useToggle(false);
  const {
    scrollY,
    handleTop
  } = useScroll();

  const {
    openAlert,
    closeModal,
    alertVisible,
    alertMessage,
  } = useAlert();

  const [ confirmVisible, setConfirmVisible ] = useState(false); 

  const closeConfirm = state => {
    if (state === 'ok') {
      history.push('/member/login');
    };
    setConfirmVisible(false);
  }

  const handleClick = (e, type) => {
    e.preventDefault();
    switch(type) {
      case 'kakao':
        isLogin ? chat() : setConfirmVisible(true);
        break;
      case 'cs':
        openAlert(message.alert);
        break;
      case 'top':
        handleTop();
        break;
      default:
        break;
    }
    toggle(false);
  };

  useEffect(() => window?.Kakao.init(JS_KEY), []);

  useEffect(() => scrollY < 300 && toggle(false), [scrollY, toggle]);

  return (
    <nav className={`sidebar ${scrollY >= 300 && 'sidebar--visible'} ${active && 'sidebar--active'}`}>
      <div className="sidebar__inner">
        <a href="#none" onClick={ e => handleClick(e, 'kakao') } className="sidebar__btn sidebar__btn__link kakao"><span>카톡 상담</span></a>
        <a href="#none" onClick={ e=> handleClick(e, 'cs') } className="sidebar__btn sidebar__btn__link customer"><span>고객 센터</span></a>
        <a href="#header" onClick={ e=> handleClick(e, 'top') } className="sidebar__btn top"><span>페이지 상단</span></a>
      </div>
      <button onClick={toggle} className="sidebar__btn sidebar__btn__toggle" type="button"><img src="../../images/common/ic_sidebar1.svg" alt="메뉴토글" /></button>
      { alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert> }
      { confirmVisible && <Confirm onClose={closeConfirm}>{message.confirm}</Confirm> }
    </nav>
  )
}