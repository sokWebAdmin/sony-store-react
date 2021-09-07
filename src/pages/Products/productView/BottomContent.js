import { useState } from "react";

export default function BottomContent({ contents }) {

  const [tabState, setTabState] = useState('intro');

  return (
    <div className="product_cont">
      <div className="detail_tab tab_ui size3">
        <ul>
          {
            contents.map(
              ({ tabName, label }) => (
                <li key={`tab_${tabName}`} className={`tabs ${tabState === tabName && 'on'}`}>
                  <a 
                    className="btn"
                    href={`#${tabName}`} 
                    onClick={ event => {
                      event.preventDefault();
                      setTabState(tabName);
                    }}
                  >{ label }</a>
                </li>
              )
            )
          }
        </ul>
      </div>
      <div className="detail_info_zone tab_ui_info">
        {
          contents.map(
            ({ tabName, content }) => (
              <div key={`tab_content_${tabName}`} className={`detail_info tab_ui_inner ${tabState === tabName && "view"}`}>
                <div dangerouslySetInnerHTML={ {__html: content } }></div>
              </div>
            )
          )
        }
      </div>
    </div>

  )
}