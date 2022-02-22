import _, { uniq } from 'lodash';

const heightStyle = (height, headerHeight) => {
    const marginTop = headerHeight > 0 ? (headerHeight / 2) * -1 : 0;

    if (height - headerHeight < 500) {
        return {
            height: '500px',
            marginTop,
        };
    }

    return {
        height: `${height}px`,
        marginTop,
    };
};

export const getMainSliderStyle = ({ width, height }, headerHeight) => {
    return width > 1280
        ? heightStyle(height, headerHeight)
        : { display: 'block' };
};

export const getColorChipValues = (value) => {
    if (!value.includes('_#')) return [];

    value = value.includes('|') ? _.head(value.split('|')) : value;

    const colors = value.split('_');

    const [label, code] = colors;

    const isBlack = label.includes('블랙') || label.includes('검정');
    if (isBlack && !code.includes('#000000')) {
        colors[1] = '#000000';
    }

    return colors;
};

export const colorsGroupByOptionNo = (options) => {
    return _.chain(options)
        .flatMap(({ optionNo, value }) => ({
            optionNo,
            value: getColorChipValues(value),
        }))
        .groupBy('optionNo')
        .value();
};

export const getColorChipInfo = (hasColor, productName, values, option) => {
    if (hasColor && values) {
        const [label, code] = values;
        return {
            label: `${productName}${label ? ` / ${label}` : ''}`,
            background: code,
        };
    } else {
        const { label, value } = option;
        const keys = label.split('|');
        const values = value.split('|');

        if (label === value) {
            return { label: `${value}` };
        } else {
            return {
                label: _.chain()
                    .range(keys.length)
                    .map((i) => `${keys[i]}: ${values[i]}`)
                    .join(' | ')
                    .value(),
            };
        }
    }
};

const getNoneCountType = (statusType) => {
    if (statusType === 'STOP') {
        return 'SOLDOUT';
    }

    return 'READY';
};

const reservationStatusType = (statusType, date, cnt) => {
    if (cnt === 0) {
        return getNoneCountType(statusType);
    }

    const { reservationStartYmdt } = date;
    const rvStart = new Date(reservationStartYmdt).getTime();
    const now = new Date().getTime();

    if (rvStart > now) {
        return 'READY_RESERVE'; // 출시예정
    }

    if (rvStart <= now) {
        return 'RESERVE'; // 예약판매
    }
};

const isEnded = (reservationDate) => {
    if (reservationDate === null) return true;
    if (reservationDate?.reservationEndYmdt) {
        const rvEnd = new Date(reservationDate.reservationEndYmdt).getTime();
        const now = new Date().getTime();
        return rvEnd < now;
    }
    return false;
};

export const getSaleStatus = (
    status,
    reservationDate,
    stockCnt,
    reservationStockCnt,
) => {
    const { saleStatusType } = status;

    const isNotReserved = isEnded(reservationDate);
    if (isNotReserved && stockCnt === 0) {
        return getNoneCountType(saleStatusType);
    }

    if (!isNotReserved && reservationDate?.reservationStartYmdt) {
        return reservationStatusType(
            saleStatusType,
            reservationDate,
            reservationStockCnt,
        );
    }

    return '';
};

export const mapOptionData = (
    { saleType, stockCnt, reservationStockCnt },
    reservationData,
) => {
    return {
        status: {
            saleStatusType:
                saleType === 'SOLD_OUT' || saleType === 'SOLDOUT'
                    ? 'SOLDOUT'
                    : 'ONSALE',
        },
        reservationData,
        stockCnt,
        reservationStockCnt,
    };
};

export const checkUniqStatus = (optionStatus) =>
    uniq(optionStatus).length === 1 ? optionStatus[0] : '';

export const getSaleStatusForOption = (options, reservationData) => {
    const optionStatus = options
        .map((o) => mapOptionData(o, reservationData))
        .map(({ status, reservationData, stockCnt, reservationStockCnt }) =>
            getSaleStatus(
                status,
                reservationData,
                stockCnt,
                reservationStockCnt,
            ),
        );
    return checkUniqStatus(optionStatus);
};

export const getPricePerProduct = ({
    salePrice,
    immediateDiscountAmt,
    additionDiscountAmt,
}) => {
    const discount = salePrice - immediateDiscountAmt - additionDiscountAmt;

    return salePrice !== discount
        ? { origin: salePrice, discount }
        : { discount };
};
