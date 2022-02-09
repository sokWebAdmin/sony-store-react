export const getMileageDetail = (type) => {
    if (type === 10 || type === '10') {
        return '적립';
    }
    if (type === 11 || type === '11') {
        return '적립 취소';
    }
    if (type === 20 || type === '20') {
        return '사용';
    }
    if (type === 21 || type === '21') {
        return '사용 취소';
    }
    return '-';
};
