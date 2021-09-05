import React, { useCallback, useState } from "react";
import { useToggle } from "../../hooks";
import BoxSelector from "./selectbox/Box";
import DropDownSelector from "./selectbox/DropDown";

const selector = {
  box: BoxSelector,
  dropdown: DropDownSelector
};

const validator = {
  isDuplicated(selectedOptions, selectedNo) {
    return selectedOptions.some(option => option.optionNo === selectedNo);
  },
}


/**
 * SelectBox
 * 
 * @params defaultInfo = {
 *            type?: 'dropdown' | 'box'; default = 'box';
 *            placeholder?: string;
 *            tag?: string;
 *          }
 * @params selectOptions = {
 *            optionNo: number;
 *            label: string;
 *            disabled?: boolean;
 *            useColor?: boolean;
 *            background?: string(only color code); ex) '#fc5227';
 *          }[];
 * @params selectOption (optionNo: number, label: string) => {};
 */

export default function SelectBox({ defaultInfo, selectOption, selectOptions }) {
  const [isOpened, onToggle] = useToggle(false);
  const [selectedValue, setSelectedValue] = useState({
    label: defaultInfo.placeholder,
    options: [],
  });
  
  const onToggleHandler = useCallback((event) => {
    event.preventDefault();
    onToggle(!isOpened);
  }, [onToggle, isOpened])

  const onClickHandler = useCallback((event, option) => {
    event.preventDefault();
    
    if (validator.isDuplicated(selectedValue.options, option.optionNo)) {
      alert('이미 선택된 옵션입니다.');
    } else {
      setSelectedValue(({ options }) => ({
        label: option.label,
        options: options.concat(option)
      }));
      selectOption(option);
    }
    
    onToggle(false);

  }, [setSelectedValue, selectOption, onToggle, selectedValue.options])

  return (
    <>
      {
        React.createElement(selector[defaultInfo.type], {
          selectOptions,
          display: isOpened ? 'block' : 'none',
          selectedLabel: selectedValue.label,
          tag: defaultInfo.tag,
          onToggleHandler,
          onClickHandler,
        })
      }
    </>
  )
}

SelectBox.defaultProps = {
  defaultInfo: {
    type: 'box',
    placeholder: '제품을 선택해주세요.',
    tag: '제품',
  }
}