import { useEffect, useRef, useMemo, useCallback } from 'react';
import TuiDatePicker from 'tui-date-picker';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'assets/scss/partials/datePicker.scss';

const DatePicker = ({
    style,
    disabled,
    bindDate,
    option,
    width,
    height,
    calendarStyle,
    dateValue,
}) => {
    const datePickerInput = useRef();
    const wrapper = useRef();

    const datePicker = useMemo(() => ({ instance: null }), []);

    const createInstance = useCallback(
        (wrapperHTMLElement, inputHTMLElement, option) => {
            datePicker.instance = new TuiDatePicker(wrapperHTMLElement, {
                date: dateValue ?? option?.selectableRanges[0][0] ?? new Date(),
                language: 'ko',
                input: {
                    element: inputHTMLElement,
                    format: 'yyyy-MM-dd',
                },
                selectableRanges: option?.selectableRanges,
            });
        },

        [datePicker, dateValue],
    );
    const bindInstance = useCallback(() => {
        datePicker.instance.on('change', (e) => {
            bindDate(datePicker.instance.getDate());
        });
    }, [bindDate, datePicker.instance]);

    useEffect(() => {
        createInstance(wrapper.current, datePickerInput.current, option);
        bindInstance();
    }, [dateValue, createInstance, bindInstance, option]);

    return (
        <div className='date_picker_wrapper' style={style}>
            <div
                className='tui-datepicker-input tui-datetime-input tui-has-focus'
                style={{ width, height }}
            >
                <input
                    type='text'
                    className='view_date_input'
                    ref={datePickerInput}
                    disabled={disabled}
                    readOnly
                />
                <span className='tui-ico-date'></span>
            </div>
            <div ref={wrapper} style={{ ...calendarStyle }}></div>
        </div>
    );
};

export default DatePicker;
