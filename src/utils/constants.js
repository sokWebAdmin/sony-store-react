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

export const profileMemberGrade = {
    일반: { className: 'family', label: 'MEMBERSHIP' }, // 일반도 MEMBERSHIP
    membership: { className: 'family', label: 'MEMBERSHIP' },
    vip: { className: 'vip', label: 'VIP' },
    vvip: { className: 'vvip', label: 'VVIP' },
};

export const CONSULT_INDIVIDUAL = '1';
export const CONSULT_COMPANY = '2';
