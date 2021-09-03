import { React } from "react";

/**
 * @params selectOption = {
 *            optionNo: number;
 *            label: string;
 *            disabled?: boolean;
 *            useColor?: boolean;
 *            background?: string(only color code); ex) '#fc5227'
 *          }[];
 * @params selectOption (optionNo: number, label: string) => {};
 */

// @TODO color bomee.yoon
export default function SelectBox({ selectOptions, selectOption }) {
  
  const emitSelectedOption = (event, optionNo, label) => {
    event.preventDefault();
    selectOption(optionNo, label);
  };

  return (
    <ul class="select_opt">
      {
        selectOptions.map(option => {
          const { label, optionNo } = option;
          return (
            <li>
              <a href={label} className={ `opt_list ${ option?.disabled && 'disabled' }` } onClick={event => emitSelectedOption(event, optionNo)}>
                <div class="item">
                  if (option?.useColor) {
                    <span class="circle_color">
                    <span class="c_bg" style={{ background:option?.background }}></span>
                    </span>
                  }
                  <span class="opt_name">{ label }</span>
                </div>
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}