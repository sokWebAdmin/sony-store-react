import { useEffect, useRef } from 'react';

// module
import TuiDatePicker from 'tui-date-picker';
import 'tui-date-picker/dist/tui-date-picker.css';

// style
import '../../assets/scss/partials/datePicker.scss';

const datePicker = {
  instance: null,
};

const createInstance = (wrapperHTMLElement, inputHTMLElement) => {
  datePicker.instance = new TuiDatePicker(wrapperHTMLElement, {
    date: new Date(),
    language: 'ko',
    input: {
      element: inputHTMLElement,
      format: 'yyyy-MM-dd',
    },
  });
};

const DatePicker = () => {
  const datePickerInput = useRef();
  const wrapper = useRef();

  useEffect(() => createInstance(wrapper.current, datePickerInput.current), []);

  return (
    <div className="date_picker_wrapper">
      <div className="tui-datepicker-input tui-datetime-input tui-has-focus">
        <input type="text" id="inputIdTest" className="inp"
               ref={datePickerInput} />
        <span className="tui-ico-date"></span>
      </div>
      <div ref={wrapper}></div>
    </div>
  );
};

export default DatePicker;