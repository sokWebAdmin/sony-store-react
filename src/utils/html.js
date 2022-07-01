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

const getRecommendedBannerNames = (bannerInfoList) => {
    bannerInfoList.forEach((bannerInfo) => {
        const bannerNameList = bannerInfo.banners[0].name.split('/');
        bannerInfo.banners[0].nameList = bannerNameList.reduce(
            (acc, bannerName, index) => {
                if (bannerNameList.length - 1 === index) {
                    acc += `${bannerName}`;
                } else {
                    acc += `${bannerName}<br />`;
                }
                return acc;
            },
            '',
        );
    });
};

const getSlideBannerNames = (bannerInfoList) => {
    bannerInfoList.forEach((bannerInfo) => {
        let bannerNameList = bannerInfo.banners[0].name.split('/');
        bannerNameList = bannerNameList.map((name) => name.split(' '));
        let count = 0;
        bannerInfo.banners[0].nameList = bannerNameList.reduce(
            (acc, bannerName) => {
                const nameHtml = bannerName.reduce((acc, name) => {
                    acc += `<span class="copy-${count}"><span>${name}</span></span>`;
                    count++;
                    return acc;
                }, '');
                acc += `<div class="kv__head__copy">${nameHtml}</div>`;
                return acc;
            },
            '',
        );
    });
};

const getAcademyBannerNames = (bannerInfoList) => {
    if (Object.keys(bannerInfoList).length === 0) return;
    const bannerNames = bannerInfoList.banners[0].name.split('/');
    bannerInfoList.banners[0].nameList = bannerNames.reduce(
        (acc, bannerName, index) => {
            const { length } = bannerNames;
            acc += index - 1 === length ? bannerName : bannerName + '<br />';
            return acc;
        },
        '',
    );
};

const splitExhibitionsName = (str) => {
    if (!str) return;
    const strList = str.split('/');
    return strList?.reduce((acc, string, index) => {
        acc += index + 1 !== strList.length ? `${string}<br />` : string;
        return acc;
    }, '');
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

export {
    highlightCategory,
    highlightKeyword,
    getLinkTarget,
    getRecommendedBannerNames,
    getSlideBannerNames,
    getAcademyBannerNames,
    splitExhibitionsName,
    splitStr,
};
