import React, { useCallback, useState } from "react";
import { useToggle } from "../../hooks";
import BoxSelector from "./selectbox/Box";
import DropDownSelector from "./selectbox/DropDown";

const selector = {
  box: BoxSelector,
  dropdown: DropDownSelector
};


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

export default function SelectBox({ defaultInfo, selectOption, ...props }) {
  const [isOpened, onToggle] = useToggle(false);
  const [selectedValue, setSelectedValue] = useState(defaultInfo.placeholder);
  
  const onToggleHandler = useCallback((event) => {
    event.preventDefault();
    onToggle(!isOpened);
  }, [isOpened, onToggle]);

  const onClickHandler = useCallback((event, option) => {
    event.preventDefault();
    try {
      selectOption(option);
      setSelectedValue(option.label);
    } catch (error) {
      throw error;
    } finally {
      onToggle(false);
    }
  }, [selectOption, onToggle]);

  return (
    <>
      {
        React.createElement(selector[defaultInfo.type], {
          ...props,
          onToggleHandler,
          onClickHandler,
          display: isOpened ? 'block' : 'none',
          selectedValue,
          tag: defaultInfo.tag,
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