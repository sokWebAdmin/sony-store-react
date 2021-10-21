import { useEffect, useState } from 'react';
import Tabs from '../common/Tabs';

export default function BottomContent({ contents }) {
  useEffect(() => {
    const windowWidth = window.innerWidth;
    const mobileWidth = 640;
    const regImg = document.querySelectorAll('.detail_info .regImg');

    const images = document.querySelectorAll('img');

    images.forEach((elem) => {
      elem.setAttribute('style', 'display: block; margin: 0px auto;');
    });

    if (windowWidth <= mobileWidth) {
      regImg.forEach((elem) => {
        let imgsrc = elem.getAttribute('src');

        imgsrc = imgsrc.replace(/pc_/g, 'mo_');
        elem.setAttribute('src', imgsrc);
      });
    }
  }, [contents]);

  const [tabState, setTabState] = useState('intro');
  return (
    <div className="product_cont">
      <div className="detail_tab tab_ui size3">
        <Tabs tabs={contents} tabState={tabState} setTabState={setTabState} />
      </div>
      <div className="detail_info_zone tab_ui_info">
        {contents.map(({ tabName, content }) => (
          <div key={`tab_content_${tabName}`} className={`detail_info tab_ui_inner ${tabState === tabName && 'view'}`}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
