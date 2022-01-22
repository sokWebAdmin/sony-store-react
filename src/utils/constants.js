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

export const SONY_RESPONSE = {
    SUCCESS: '0000', // 성공
    MISSING_PARAMETER: '1000', // 입력 파라미터가 누락되었습니다.
    INCORRECT_REQUEST: '1001', // 요청 정보가 잘못되었습니다.
    INVALID_REQUEST: '1002', // 입력 파라미터가 누락되었거나 요청 정보가 잘못되었습니다.
    NO_RESULT: '2000', // 결과가 존재하지 않습니다.
    ALREADY_EMAIL_EXIST: '3000', // 이미 존재하는 메일 주소 입니다.
    SLEEP_ACCOUNT: '3001', // 휴면계정입니다.
    ACTIVATE_ACCOUNT_FAIL: '3005', // 휴면 계정 활성화 전환에 실패하였습니다.
    MEMBER_NOT_FOUND: '3006', // 회원정보가 존재하지 않습니다.
    LOGIN_REQUIRED: '3007', // 로그인이 필요합니다.
    MILEAGE_EARN_HISTORY_NOT_EXIST: '3104', // 해당 마일리지 적립 내역이 존재하지 않습니다.
    NOT_ENOUGH_MILEAGE: '3105', // 현재 사용가능한 마일리지가 부족합니다.
    MILEAGE_USE_HISTORY_NOT_EXIST: '3106', // 해당 마일리지 사용 내역이 존재하지 않습니다.
    METHOD_NOT_ALLOWED: ' 9995', //허용되지 않은 요청입니다.
    INVALID_TOKEN: '9996', //토큰이 유효하지 않습니다.
    COMMUNICATION_ERROR: '9997', // 통신 오류가 발생하였습니다.
    SYSTEM_ERROR: '9998', // 시스템 오류가 발생하였습니다.
    ABNORMAL_ERROR: '9999', // 비정상적인 오류가 발생하였습니다.
};
