import { useEffect, useRef, useState, useMemo } from 'react';
import Tabs from '../common/Tabs';

export default function BottomContent({ contents }) {
  const detailRef = useRef(null);

  const [tabState, setTabState] = useState('intro');

  const isMobile = useMemo(() => {
    const windowWidth = window?.innerWidth;
    const mobileWidth = 640;
    return windowWidth <= mobileWidth;
  }, [window?.innerWidth]);

  useEffect(() => {
    const regImg = document.querySelectorAll('.detail_info .regImg');

    const images = document.querySelectorAll('img');

    detailRef.current.style.margin = '24px 0 160px';

    images.forEach((elem) => {
      elem.setAttribute('style', 'display: block; margin: 0px auto;');
    });

    if (isMobile) {
      detailRef.current.style.margin = '16px 0 120px';

      regImg.forEach((elem) => {
        let imgsrc = elem.getAttribute('src');

        imgsrc = imgsrc.replace(/pc_/g, 'mo_');
        elem.setAttribute('src', imgsrc);
      });
    }
  }, [contents]);

  return (
    <div className="product_cont">
      <div className="detail_tab tab_ui size3">
        <Tabs tabs={contents} tabState={tabState} setTabState={setTabState} />
      </div>
      <div ref={detailRef} className="detail_info_zone tab_ui_info">
        {contents.map(({ tabName, content }) => (
          <div key={`tab_content_${tabName}`} className={`detail_info tab_ui_inner ${tabState === tabName && 'view'}`}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
