import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { useScroll } from 'hooks';

// 컬러칩
const ColorChip = ({ setSelectedOptionNo, productGroup }) => {
    const { handleTop } = useScroll();

    const pg = _.chain(productGroup).values().flatten().value();

    const [color, setColor] = useState('');

    useEffect(
        () =>
            setColor(
                _.chain(pg)
                    .take(1)
                    .map(({ colors }) => colors)
                    .head()
                    .last()
                    .value(),
            ),
        [productGroup, pg],
    );

    const clickHandler = (e, code, no) => {
        e.preventDefault();
        setColor(code);
        setSelectedOptionNo(no);
        handleTop();
    };

    return (
        <div className='cont line'>
            <div className='color_select'>
                <p className='tit'>색상</p>
                <ul className='circle_color_box'>
                    {pg.map(({ optionNo, colors }, idx) => {
                        if (!colors) return null;
                        const [label, code] = colors;
                        return (
                            <li
                                key={`${label}${code}${idx}`}
                                className={`${color === code && 'on'}`}
                            >
                                <a
                                    href={`#${label}`}
                                    className='color_btn'
                                    onClick={(e) =>
                                        clickHandler(e, code, optionNo)
                                    }
                                >
                                    <span className='circle_color'>
                                        <span
                                            className='c_bg'
                                            data-slide-img-type={code}
                                            style={{ background: code }}
                                        />
                                    </span>
                                    <span className='color_name'>{label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

ColorChip.propTypes = {
    setSelectedOptionNo: PropTypes.func.isRequired,
    productGroup: PropTypes.array.isRequired,
};

export default ColorChip;
