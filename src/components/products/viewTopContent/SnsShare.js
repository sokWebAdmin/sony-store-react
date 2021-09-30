import { useState } from "react";
import Share from "../../popup/Share";

export default function SnsShare({ productName }) {
  const [ shareVisible, setShareVisible ] = useState(false);

  const link = window.location.href;

  const clickHandler = e => {
    e.preventDefault();
    setShareVisible(true);
  }

  return (
    <>
      <ul className="social_list">
        <li className="share">
          <a href="#none" className="ico_btn" data-popup="popup_share" onClick={ clickHandler }>공유하기</a>
        </li>
      </ul>
      {
        shareVisible && <Share link={link} label={productName} setShareVisible={setShareVisible} />
      }
    </>
  )
}