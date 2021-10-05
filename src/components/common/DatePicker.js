import { useEffect, useRef } from 'react';

// module
import TuiDatePicker from 'tui-date-picker';
import 'tui-date-picker/dist/tui-date-picker.css';

// style
import '../../assets/scss/partials/datePicker.scss';

const DatePicker = (prop) => {
  const { style, disabled, bindDate, option, width, height, calendarStyle, dateValue } = prop;

  const datePickerInput = useRef();
  const wrapper = useRef();

  const datePicker = {
    instance: null,
  };

  const createInstance = (wrapperHTMLElement, inputHTMLElement, option) => {
    datePicker.instance = new TuiDatePicker(wrapperHTMLElement, {
      date: dateValue ?? option?.selectableRanges[0][0] ?? new Date(),
      language: 'ko',
      input: {
        element: inputHTMLElement,
        format: 'yyyy-MM-dd',
      },
      selectableRanges: option?.selectableRanges,
    });
  };

  const bindInstance = () => {
    datePicker.instance.on('change', () => bindDate(datePicker.instance.getDate()));
  };

  useEffect(() => {
    createInstance(wrapper.current, datePickerInput.current, option);
    bindInstance();
  }, [dateValue]);

  return (
    <div className="date_picker_wrapper" style={style}>
      <div className="tui-datepicker-input tui-datetime-input tui-has-focus" style={{ width, height }}>
        <input type="text" className="view_date_input" ref={datePickerInput} disabled={disabled} />
        <span className="tui-ico-date"></span>
      </div>
      <div ref={wrapper} style={{...calendarStyle}}></div>
    </div>
  );
};

export default DatePicker;
