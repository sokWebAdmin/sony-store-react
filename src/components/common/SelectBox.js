import React, { useCallback, useEffect, useMemo, useState, createRef } from 'react';
import { useClickOutside, useToggle } from '../../hooks';
import BoxSelector from './selectbox/Box';
import DropdownSelector from './selectbox/Dropdown';
import DropdownHighlightSelector from './selectbox/DropdownHighlight';

const selector = {
  box: BoxSelector,
  dropdown: DropdownSelector,
  dropdownHighlight: DropdownHighlightSelector,
};

const validator = {
  isDuplicated(selectedOptions, selectedNo) {
    return selectedOptions.some((option) => option.optionNo === selectedNo);
  },
};

/**
 * SelectBox
 *
 * @params defaultInfo = {
 *            type?: 'dropdown' | 'dropdownHighlight' | 'box'; default = 'box';
 *            placeholder?: string;
 *            tag?: string;
 *          }
 * @params (required) selectOptions = {
 *            optionNo: number;
 *            label: string;
 *            disabled?: boolean;
 *            useColor?: boolean;
 *            background?: string(only color code); ex) '#fc5227';
 *          }[];
 * @params selectOption (optionNo: number, label: string) => {};
 * @params customOption = {
 *            optionNo: number;
 *            label: string;
 *            disabled?: boolean;
 *            useColor?: boolean;
 *            background?: string(only color code); ex) '#fc5227';
 *          }; || reset 이 필요한 경우 {}
 */
export default function SelectBox({
  defaultInfo,
  selectOption,
  selectOptions,
  customOption,
  deleteOptionNo,
  setDeleteOptionNo,
  open,
}) {
  const initialSelectedState = useMemo(
    () => ({
      label: defaultInfo.placeholder,
      options: [],
    }),
    [defaultInfo.placeholder],
  );

  const [isOpened, onToggle] = useToggle(false);
  const [selectedValue, setSelectedValue] = useState({ ...initialSelectedState });

  const selectBoxRef = createRef(null);
  useClickOutside(selectBoxRef, () => onToggle(false));

  const onToggleHandler = useCallback(
    (event) => {
      event.preventDefault();
      onToggle(!isOpened);
    },
    [onToggle, isOpened],
  );

  const onClickHandler = useCallback(
    (event, option) => {
      event.preventDefault();
      if (validator.isDuplicated(selectedValue.options, option.optionNo)) {
        alert('이미 선택된 옵션입니다.');
      } else {
        setSelectedValue(({ options }) => ({
          label: option.label,
          options: [option],
        }));
        selectOption(option);
      }
      onToggle(false);
    },
    [setSelectedValue, selectOption, onToggle, selectedValue.options],
  );

  useEffect(() => {
    if (!customOption) return;

    if (!customOption?.optionNo) {
      setSelectedValue({ ...initialSelectedState });
      return;
    }

    const isDuplicated = validator.isDuplicated(selectedValue.options, customOption.optionNo);

    setSelectedValue(({ options }) => ({
      label: customOption.label,
      options: isDuplicated ? [...options] : options.concat(customOption),
    }));
  }, [customOption, initialSelectedState, selectedValue.options]);

  useEffect(() => {
    if (!deleteOptionNo) return;
    setSelectedValue((prev) => {
      prev.options = prev.options.filter((o) => o.optionNo !== deleteOptionNo);
      return prev;
    });

    setDeleteOptionNo(0);
  }, [deleteOptionNo]);

  useEffect(() => {}, []);

  return (
    <div ref={selectBoxRef}>
      {React.createElement(selector[defaultInfo.type], {
        selectOptions,
        display: isOpened ? 'block' : 'none',
        selectedLabel: selectedValue.label,
        tag: defaultInfo.tag,
        className: defaultInfo.className,
        onToggleHandler,
        onClickHandler,
        open,
      })}
    </div>
  );
}

SelectBox.defaultProps = {
  defaultInfo: {
    type: 'box',
    placeholder: '제품을 선택하세요.',
    tag: '제품',
  },
  customOptionNo: null,
  deleteOptionNo: 0,
  setDeleteOptionNo: () => null,
  open: false,
};
