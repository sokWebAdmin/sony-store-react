export const getInfoLinks = () => [
    {
        name: 'alpha',
        href: 'https://www.sony.co.kr/alpha/handler/NAlpha-Main',
        imgUrl: '/images/product/ico__relation_alpha.png',
        label: '소니 알파 사이트',
    },
    {
        name: 'youtube',
        href: 'https://www.youtube.com/user/sonystyleblog',
        imgUrl: '/images/product/ico__relation_youtube.png',
        label: '소니코리아 공식 유튜브',
    },
    {
        name: 'manual',
        href: 'https://www.sony.co.kr/electronics/support',
        imgUrl: '/images/product/ico__relation_download.png',
        label: '매뉴얼 다운로드',
    },
];

export const mapContents = ({ contentHeader, content, contentFooter }) => [
    {
        tabName: 'intro',
        label: '제품 개요',
        content: contentHeader,
    },
    {
        tabName: 'detail',
        label: '제품 상세',
        content: content,
    },
    {
        tabName: 'terms',
        label: '배송/환불규정',
        content: contentFooter,
    },
];

export const notificationInfo = {
    cart: {
        title: '장바구니 담기 완료',
        label1: '해당 상품이 장바구니에 담겼습니다.',
        label2: '장바구니로 이동하시겠습니까?',
        to: '/cart',
        toLabel: '장바구니 이동',
    },
    gift: {
        title: '소니스토어 선물하기',
        label1: '선물하기는 소니스토어 회원만',
        label2: '이용하실 수 있습니다.',
        to: '/member/login',
        toLabel: '로그인',
    },
    wish: {
        title: '찜하기',
        label1: '찜하기는 소니스토어 회원만',
        label2: '이용하실 수 있습니다.',
        to: '/member/login',
        toLabel: '로그인',
    },
    order: {
        title: '로그인 후 주문해주세요.',
        label1: '소니스토어 회원으로 로그인 하시고 다양한 멤버십 혜택을 누리세요! 비회원으로 제품을 구매하시면 소니스토어의 쿠폰 및 마일리지 적립 혜택을 받으실 수 없습니다.',
        label2: '비회원으로 제품을 구매하시면 소니스토어의 쿠폰 및 마일리지 적립 혜택을',
        label3: '받으실 수 없습니다.',
        to: '/member/login',
        toLabel: '회원 구매',
        cancelLabel: '비회원 구매',
    },
};

export const espList = [81644, 81643, 81645];
