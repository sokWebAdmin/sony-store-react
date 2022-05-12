export const TAB_MAP = {
    ALL: '전체',
    PRODUCT: '제품',
    EVENT: '기획전',
    CATEGORY: '카테고리',
    NOTICE: '공지사항',
};

export const orderList = [
    {
        orderBy: 'POPULAR',
        label: '정확도 순',
        query: { 'order.by': 'POPULAR', 'order.direction': 'DESC' },
    },
    {
        orderBy: 'RECENT_PRODUCT',
        label: '최신순',
        query: { 'order.by': 'RECENT_PRODUCT', 'order.direction': 'ASC' },
    },
    {
        orderBy: 'DISCOUNTED_PRICE',
        label: '높은 가격순',
        query: { 'order.by': 'DISCOUNTED_PRICE' },
    },
    {
        orderBy: 'LOW_PRICE',
        label: '낮은 가격순',
        query: { 'order.by': 'DISCOUNTED_PRICE', 'order.direction': 'ASC' },
    },
    {
        orderBy: 'OLD_PRODUCT',
        label: '오래된 순',
        query: { 'order.by': 'RECENT_PRODUCT', 'order.direction': 'ASC' },
    },
];

export const PAGE_SIZE = {
    PRODUCT: 9,
    EVENT: 12,
    CATEGORY: 10,
    NOTICE: 10,
};

export const RECOMMEND_SECTION = {
    development: {
        sectionNo: 5963,
    },
    production: {
        sectionNo: 90113,
    },

    get no() {
        return this[process.env.NODE_ENV]?.sectionNo;
    },
};
