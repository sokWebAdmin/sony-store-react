const heightStyle = (height, headerHeight) => {
   const marginTop = (headerHeight / 2) *- 1;

   if (height - headerHeight < 500) {
      return ({
            height: '500px',
            marginTop,
      })
   };

   return ({
      height: `${ height }px`,
      marginTop,
   })
}

export const getMainSliderStyle = ({ width, height }, headerHeight) => {
   return width > 1280 
      ? heightStyle(height, headerHeight) 
      : { display: 'block' };
}

export const getInfoLinks = () => [
   {
      name: 'alpha',
      href: 'https://www.sony.co.kr/alpha/handler/NAlpha-Main',
      imgUrl: '/images/product/ico__relation_alpha.png',
      label: '소니 알파 사이트'
   },
   {
      name: 'youtube',
      href: 'https://www.youtube.com/user/sonystyleblog',
      imgUrl: '/images/product/ico__relation_youtube.png',
      label: '소니코리아 공식 유튜브'
   },
   {
      name: 'manual',
      href: 'https://www.sony.co.kr/electronics/support',
      imgUrl: '/images/product/ico__relation_download.png',
      label: '매뉴얼 다운로드'
   },
];

export const mapContents = ({ contentHeader, content, contentFooter }) => ([
      {
        tabName: 'intro',
        label: '제품 개요',
        content: contentHeader,
     },
     {
        tabName: 'detail',
        label: '제품 상세',
        content: content,
     }, 
     {
        tabName: 'terms',
        label: '배송/환불규정',
        content: contentFooter,
     }
  ]);