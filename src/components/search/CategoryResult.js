import _ from 'lodash';
import React from 'react';
import { categoriesExtraDataMap } from '../../const/category';
import { PAGE_SIZE } from '../../const/search';
import ViewMore from '../common/ViewMore';
import { useHistory } from 'react-router';
import '../../assets/scss/product.scss';

const getCategoryNo = (category) => {
  return _.chain(category)
    .pickBy((_, k) => k.includes('CategoryNo'))
    .filter((v) => Boolean(v))
    .last()
    .value();
};

const getLabelHtml = (label, keyword) => {
  if (label.includes(keyword)) {
    const [p, n] = label.split(keyword);
    return `<span class="keword categoryList">${p}${keyword}${n}</span>`;
  }

  return `<span class="categoryList">${label}</span>`;
};
const getCategoryLabel = (category, keyword) => {
  return _.chain(category)
    .pickBy((_, k) => k.includes('Label'))
    .filter((v) => Boolean(v))
    .map((v) => getLabelHtml(v, keyword))
    .value()
    .join('');
};

const convertCategory = (category, keyword) => {
  return {
    categoryNo: getCategoryNo(category),
    label: getCategoryLabel(category, keyword),
  };
};

export default function CategoryResult({ fetchCategory, categoryList, categoryCount, keyword }) {
  const history = useHistory();

  const getNextUrl = (no) => {
    const esp = [81644, 81643, 81645];
    if (esp.includes(no)) return '/esp';

    return _.chain(categoriesExtraDataMap)
      .filter(({ categoryNo }) => categoryNo === no)
      .map(({ url }) => url)
      .head()
      .value();
  };

  const clickHandler = (e, categoryNo) => {
    e.preventDefault();

    history.push({
      pathname: getNextUrl(categoryNo),
      state: { categoryNo },
    });
  };

  return (
    <>
      <div className="section_top">
        <h2 className="title">
          카테고리<span>({categoryCount})</span>
        </h2>
      </div>
      <div className="result_list on">
        <ul className="category">
          {categoryList
            .map((category) => convertCategory(category, keyword))
            .map(({ categoryNo, label }) => (
              <li key={categoryNo}>
                <a
                  href="#none"
                  onClick={(e) => clickHandler(e, categoryNo)}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              </li>
            ))}
        </ul>
      </div>
      {categoryCount >= 10 && (
        <ViewMore totalCount={categoryCount} viewMore={fetchCategory} pageSize={PAGE_SIZE.CATEGORY} />
      )}
    </>
  );
}
