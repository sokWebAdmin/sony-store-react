import { getShareList } from "../../const/share";
import { useAlert } from "../../hooks";
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
    
    navigator.clipboard.writeText(link).then(() => {
      openAlert('링크가 복사되었습니다.');
    });
  };

  const shareKakaoButton = link => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
      }
      kakao.Link.sendDefault({
        objectType: 'text',
        text: label,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      });
    }
  };

  const shareKakaoStoryButton = link => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
      }
      kakao.Story.share({
        text: label,
        url: link,
      });
    }
  };

  const clickHandler = (e, name, link) => {
    e.preventDefault();
    switch(name) {
      case 'kakaotalk':
        shareKakaoButton(link);
        break;
      case 'kakaostory':
        shareKakaoStoryButton(link);
        break;
      default:
        window.open(link, '_blank');
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
              <li className="lists">
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