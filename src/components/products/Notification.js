import { Link } from "react-router-dom";
import { notificationInfo } from "../../const/productView";

export default function Notification({ type, setNotificationVisible, unusableIcon, fetchOrderSheetNo }) {
  const isOrder = type === 'order';
  const info = notificationInfo[type];
  const { title, label1, label2, to, toLabel } = info;

  const closePopup = e => {
    e.preventDefault();
    setNotificationVisible(false);
    isOrder && e.target.className !== 'delete' && fetchOrderSheetNo();
  }
  return (
    <div className={`popup_cart layer ${type}`} style={{ display: 'block' }}>
      <div className="layer_wrap">
        <div className="layer_container">
          { isOrder && <a href="#none" class="delete" onClick={ closePopup }>삭제</a> }
          <p className={`layer_title ${ !unusableIcon && `ico ${type}` }`}>{ title }</p>
          <p className="text">{ label1 }<br /> { label2 }{ info?.label3 ? `\n${info.label3}` : '' }</p>
          <div className="btn_article size2">
            <a href="#none" onClick={ closePopup } className="btn close white">{info?.cancelLabel || '쇼핑 계속하기'}</a>
            <Link to={to} className="btn cart">{ toLabel }</Link>
          </div>
        </div>
      </div>
    </div>
  )
}