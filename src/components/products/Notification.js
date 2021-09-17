import { Link } from "react-router-dom";
import { notificationInfo } from "../../const/productView";

export default function Notification({ type, setNotificationVisible }) {
  const { title, label1, label2, to, toLabel } = notificationInfo[type];
  return (
    <div className="popup_cart layer" style={{ display: 'block' }}>
      <div className="layer_wrap">
        <div className="layer_container">
          <p className={`layer_title ico ${type}`}>{ title }</p>
          <p className="text">{ label1 }<br /> { label2 }</p>
          <div className="btn_article size2">
            <a href="#none" onClick={ e => {
              e.preventDefault();
              setNotificationVisible(false);
            }} className="btn close white">쇼핑 계속하기</a>
            <Link to={to} className="btn cart">{ toLabel }</Link>
          </div>
        </div>
      </div>
    </div>
  )
}