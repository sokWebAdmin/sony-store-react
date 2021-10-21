import { useEffect, useContext, useState, useMemo, useRef } from "react";
import { useHistory } from "react-router";
import GlobalContext from "../../context/global.context";
import { useMallState } from "../../context/mall.context";
import { useAlert, useScroll, useToggle } from "../../hooks";
import Alert from "./Alert";
import Confirm from "./Confirm";

const MOBILE_WIDTH = 640;

const getMessage = tel => ({
  alert: `고객님께서 원하시는 제품을 <br /> 빠르고 정확하게 구매하실 수 있도록 <br />도와드리겠습니다. <br /> 고객지원센터: ${tel}`,
  confirm: `카톡 상담을 위해선 로그인이 필요합니다. <br /> 로그인 하시겠습니까?`
});

const chat = () => {
  const params = {
    uuid: process.env.REACT_APP_KAKAO_SERVICE_CENTER_ID
  };

  const $form = document.createElement('form');
  $form.setAttribute('action', 'https://bizmessage.kakao.com/chat/open');
  $form.setAttribute('method', 'post');
  document.body.appendChild($form);

  for (const k in params) {
    const $hiddenField = document.createElement("input");
    $hiddenField.setAttribute("type", "hidden");
    $hiddenField.setAttribute("name", k);
    $hiddenField.setAttribute("value", params[k]);
    $form.appendChild($hiddenField);
  }

  $form.submit();
}

export default function Floating ({ scrollAction }) {
  const history = useHistory();

  const info = useMallState();
  const TEL = info?.mall?.serviceCenter.phoneNo;
  const message = getMessage(TEL);

  const windowWidth = window.innerWidth;
  const isMobile = useMemo(() => windowWidth <= MOBILE_WIDTH, [windowWidth]);

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
    if (isMobile && type === 'cs') return;

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

  useEffect(() => scrollY < 250 && toggle(false), [scrollY, toggle]);

  // 푸터영역에 고정
  const sidebarRef = useRef(null);
  const $footer = document.querySelector('.footer');
  const prevScrollY = window.scrollY;
  const [reachend, setReachend] = useState(false);
  
  const handleSidebarReachend = ($footer, $sidebar, currScrollY) => {
    const winHeight = window.innerHeight;
    if (!$footer && $sidebar) return;
    const end = $footer.offsetTop - winHeight + $sidebar.offsetHeight + parseInt(getComputedStyle($sidebar).right) * 2;
    setReachend(() => currScrollY >= end)
  };

  const handleSidebar = () => {
    const currScrollY = window.scrollY;
    if (prevScrollY === currScrollY) return;

    sidebarRef.current && $footer &&
    handleSidebarReachend($footer, sidebarRef.current, currScrollY);
  };

  useEffect(() => {
    handleSidebar();
    return () => {
      handleSidebar();
    };
  });

  const scrollStyle = useMemo(() => {
    if (reachend) {
      toggle(false);
      return {
        position: 'absolute',
        top: '24px',
        bottom: 'auto',
      };
    }

    if (scrollAction === 'down') {
      return {
        position: 'fixed',
        bottom: '24px',
      };
    }

    if (scrollAction === 'up') {
      return {
        position: 'fixed',
        bottom: '88px',
      };
    }

  }, [reachend, scrollAction]);

  return (
    <nav ref={sidebarRef} className={`sidebar ${active && 'sidebar--active'}`}
         style={scrollStyle}>
      <div className="sidebar__inner">
        <a href="#none" onClick={e => handleClick(e, 'kakao')}
           className="sidebar__btn sidebar__btn__link kakao"><span>카톡 상담</span></a>
        <a href={isMobile ? `tel:${TEL}` : '#none'}
           onClick={e => handleClick(e, 'cs')}
           className="sidebar__btn sidebar__btn__link customer"><span>고객 센터</span></a>
        <a href="#header" onClick={e => handleClick(e, 'top')}
           className="sidebar__btn top"><span>페이지 상단</span></a>
      </div>
      <button onClick={() => active ? toggle(false) : toggle()}
              className="sidebar__btn sidebar__btn__toggle" type="button"><img
        src="../../images/common/ic_sidebar1.svg" alt="메뉴토글" /></button>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      {confirmVisible &&
      <Confirm onClose={closeConfirm}>{message.confirm}</Confirm>}
    </nav>
  )
}