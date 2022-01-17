import { isTablet } from 'react-device-detect';

export const breakPoint = 1280;
export const breakPointTablet = 640;

export const MOBILE_WIDTH = 640;

export const HOW_MANY_WISH = isTablet ? 9 : 8;

// vvip / vip / family
export const memberGrade = {
    N: { className: 'family', label: 'MEMBERSHIP' }, // 일반도 MEMBERSHIP
    M: { className: 'family', label: 'MEMBERSHIP' },
    V: { className: 'vip', label: 'VIP' },
    VV: { className: 'vvip', label: 'VVIP' },
};
