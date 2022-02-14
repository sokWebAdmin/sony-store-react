import { Link } from 'react-router-dom';
import { chain } from 'lodash';
import PropTypes from 'prop-types';

import ViewMore from 'components/common/ViewMore';
import { highlightCategory } from 'utils/html';
import { categoriesExtraDataMap, displayCategoryMap } from 'const/category';
import { PAGE_SIZE } from 'const/search';
import 'assets/scss/product.scss';

const getCategoryNo = (category) => {
    return chain(category)
        .pickBy((_, k) => k.includes('CategoryNo'))
        .filter((v) => Boolean(v))
        .last()
        .value();
};

const getCategoryLabel = (category, keyword) => {
    return chain(category)
        .pickBy((_, k) => k.includes('Label'))
        .filter((v) => Boolean(v))
        .map((v) => highlightCategory(v, keyword))
        .value()
        .join('');
};

const convertCategory = (category, keyword) => {
    return {
        categoryNo: getCategoryNo(category),
        label: getCategoryLabel(category, keyword),
    };
};

export default function CategoryResult({
    fetchCategory,
    categoryList,
    categoryCount,
    keyword,
}) {
    const getNextUrl = (no) => {
        // esp
        const esp = [81644, 81643, 81645];
        if (esp.includes(no)) {
            return {
                pathname: '/esp',
                state: { categoryNo: no },
            };
        }

        // 기획전
        if (displayCategoryMap[no]) {
            return {
                pathname: '/event/list',
                state: { categoryNo: no },
                search: `?tab=${displayCategoryMap[no]['tab']}`,
            };
        }

        const pathname = chain(categoriesExtraDataMap)
            .filter(({ categoryNo }) => categoryNo === no)
            .map(({ url }) => url)
            .head()
            .value();

        return { pathname, state: { categoryNo: no } };
    };

    return (
        <>
            <div className='section_top'>
                <h2 className='title'>
                    카테고리<span>({categoryCount})</span>
                </h2>
            </div>
            <div className='result_list on search'>
                <ul className='category'>
                    {categoryList
                        .map((category) => convertCategory(category, keyword))
                        .map(({ categoryNo, label }) => (
                            <li key={categoryNo}>
                                <Link
                                    to={{ ...getNextUrl(categoryNo) }}
                                    dangerouslySetInnerHTML={{
                                        __html: label,
                                    }}
                                />
                            </li>
                        ))}
                </ul>
            </div>
            {categoryCount >= 10 && (
                <ViewMore
                    totalCount={categoryCount}
                    viewMore={fetchCategory}
                    pageSize={PAGE_SIZE.CATEGORY}
                />
            )}
        </>
    );
}

CategoryResult.propTypes = {
    fetchCategory: PropTypes.func.isRequired,
    categoryList: PropTypes.array.isRequired,
    categoryCount: PropTypes.number.isRequired,
    keyword: PropTypes.string.isRequired,
};
