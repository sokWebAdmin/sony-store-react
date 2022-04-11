const highlightCategory = (label, keyword) => {
    if (label.includes(keyword)) {
        const [prev, next] = label.split(keyword);
        return `<span class="keyword categoryList">${prev}${keyword}${next}</span>`;
    }

    return `<span class="categoryList">${label}</span>`;
};

const highlightKeyword = (title, keyword) => {
    if (title.includes(keyword)) {
        const [prev, next] = title.split(keyword);
        return `${prev}<strong class="keyword">${keyword}</strong>${next}`;
    }
    return title;
};

const getLinkTarget = (target) => {
    return target === 'CURRENT' ? '_self' : '_blank';
};

const splitStr = (str) => {
    if (str) {
        const strList = str.split('/');
        return strList?.reduce((acc, string, index) => {
            acc += index + 1 !== strList.length ? `${string}<br />` : string;
            return acc;
        }, '');
    }
};

export { highlightCategory, highlightKeyword, getLinkTarget, splitStr };
