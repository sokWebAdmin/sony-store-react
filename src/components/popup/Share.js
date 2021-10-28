import { getShareList } from "../../const/share";
import { useAlert } from "../../hooks";
import { shareKakaoButton, shareKakaoStoryButton } from "../../utils/share";
import Alert from "../common/Alert";
import LayerPopup from "../common/LayerPopup";

export default function Share({ link, label, setShareVisible }) {
  const shareList = getShareList(link, label);

  const {
    openAlert,
    closeModal,
    alertVisible,
    alertMessage,
  } = useAlert();

  const copyLink = e => {
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText(link).then(() => {
      openAlert('링크가 복사되었습니다.');
    });
  };

  const clickHandler = (e, name, link) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    switch(name) {
      case 'kakaotalk':
        shareKakaoButton(link, label);
        break;
      case 'kakaostory':
        shareKakaoStoryButton(link, label);
        break;
      default:
        window.openWindow(link, '_blank');
        break;
    }
  }

  return (
    <>
    {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
    <LayerPopup className="pop_share" onClose={() => setShareVisible(false)}>
      <p className="pop_tit">공유하기</p>
      <div className="copy_box">
        <span className="copy_txt">{link}</span>
        <a href="#none" className="copy_url" onClick={ copyLink }>링크 복사</a>
      </div>
      <div className="share_list">
        <ul>
          {
            shareList.map(({ name, link, label }) => (
              <li className="lists" key={name}>
                <a 
                  href="#none" 
                  className={`share_btn ${name}`} 
                  onClick={e => clickHandler(e, name, link)}>{ label }</a>
              </li>
            ))
          }
        </ul>
      </div>
    </LayerPopup>
    </>
  )
}