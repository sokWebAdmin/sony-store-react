export const shareKakaoButton = (link, label) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
    kakao.Link.sendDefault({
      objectType: 'feed',
      title: label,
      link: {
        mobileWebUrl: link,
        webUrl: link,
      },
      installTalk: true,
    });
  }
};

export const shareKakaoStoryButton = (link, label) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
    kakao.Story.open({
      text: label,
      url: link,
    });
  }
};
