import { useMemo } from 'react';

export default function DropdownSelector({
  selectOptions,
  onToggleHandler,
  onClickHandler,
  display,
  selectedLabel,
  tag,
  className,
}) {
  const isOpened = useMemo(() => display === 'block', [display]);
  return (
    <div className={`select_ui_zone btm_line ${isOpened ? 'open' : ''} ${className || ''}`}>
      <a href="#select" className="selected_btn" onClick={onToggleHandler}>
        {selectedLabel}
      </a>
      <div className="select_inner" style={{ display }}>
        <p className="prd_tag">{tag}</p>
        <ul className="select_opt">
          {selectOptions.map((option) => {
            const { label, optionNo } = option;
            return (
              <li key={optionNo}>
                {
                  // @fixme: "적용 안함" 사용하실 때 a 태그에 클래스명 not_opt 추가 해주세요!
                }
                <a
                  href={`#${label}`}
                  className={`opt_list ${option?.disabled && 'disabled'}`}
                  onClick={(event) => onClickHandler(event, option)}
                >
                  <div className="item">{label}</div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

DropdownSelector.defaultProps = {
  defaultInfo: {
    type: 'dropbox',
    placeholder: '쿠폰을 선택해주세요.',
    tag: '쿠폰',
  },
};
