import { useRef } from "react";

// @TODO color bomee.yoon
export default function BoxSelector({ selectOptions, onToggleHandler, onClickHandler, display, selectedValue, tag }) {
  
  return (
    <div className="select_ui_zone">
      <div>
        <a
          href="#select"
          className="selected_btn"
          onClick={ onToggleHandler }
        >
          { selectedValue }
        </a>
        <div className="select_inner" style={{ display }}>
          <p class="prd_tag">{ tag }</p>
          <ul className="select_opt">
            {
              selectOptions.map(option => {
                const { label, optionNo } = option;
                return (
                  <li key={ optionNo }>
                    <a
                      href={ `#${label}` }
                      className={`opt_list ${option?.disabled && 'disabled'}`}
                      onClick={ event => onClickHandler(event, option) }
                    >
                      <div className="item">
                        {
                          !option?.useColor ? '' : (
                              <span className="circle_color">
                                <span className="c_bg" style={{ background:option?.background }}></span>
                              </span>
                            )
                        }
                        <span className="opt_name">{ label }</span>
                      </div>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

BoxSelector.defaultProps = {
  defaultInfo: {
    type: 'box',
    placeholder: '제품을 선택해주세요.',
    tag: '제품',
  }
}