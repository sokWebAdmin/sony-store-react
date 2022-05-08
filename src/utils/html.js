const highlightCategory = (label, keyword) => {
    if (label.includes(keyword)) {
        const [prev, next] = label.split(keyword);
        return `<span className="keyword categoryList">${prev}${keyword}${next}</span>`;
    }

    return `<span className="categoryList">${label}</span>`;
};

const highlightKeyword = (title, keyword) => {
    if (title.includes(keyword)) {
        const [prev, next] = title.split(keyword);
        return `${prev}<strong className="keyword">${keyword}</strong>${next}`;
    }
    return title;
};

const getLinkTarget = (target) => {
    return target === 'CURRENT' ? '_self' : '_blank';
};

export { highlightCategory, highlightKeyword, getLinkTarget };
