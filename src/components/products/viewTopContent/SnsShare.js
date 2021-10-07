import { useState } from "react";
import Share from "../../popup/Share";

export default function SnsShare({ productName, className }) {
  const [ shareVisible, setShareVisible ] = useState(false);

  const link = window.location.href;

  const clickHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    setShareVisible(true);
  }

  return (
    <>
      {
        className ? (
          <a href="#none" className="event_share popup_comm_btn" onClick={ clickHandler }>공유하기</a>
        ) : (
          <ul className="social_list">
            <li className="share">
              <a href="#none" className="ico_btn" data-popup="popup_share" onClick={ clickHandler }>공유하기</a>
            </li>
          </ul>
        )
      }
      {
        shareVisible && <Share className={className} link={link} label={productName} setShareVisible={setShareVisible} />
      }
    </>
  )
}