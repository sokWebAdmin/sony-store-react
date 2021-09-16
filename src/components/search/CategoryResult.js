import _ from "lodash";
import React from "react";

const getCategoryNo = category => {
  return _.chain(category)
          .pickBy((_, k) => k.includes('CategoryNo'))
          .filter(v => Boolean(v))
          .last()
          .value()
};

const getLabelHtml = (label, keyword) => {
  if (label.includes(keyword)) {
    const [p, n] = label.split(keyword);
    return `<span class="keword">${p}${keyword}${n}</span>`;
  }

  return `<span>${label}</span>`;
};
const getCategoryLabel = (category, keyword) => {
  return _.chain(category)
          .pickBy((_, k) => k.includes('Label'))
          .filter(v => Boolean(v))
          .map(v => getLabelHtml(v, keyword))
          .value()
          .join('')
};

const convertCategory = (category, keyword) => {
  return {
    categoryNo: getCategoryNo(category),
    label: getCategoryLabel(category, keyword)
  }
}

export default function CategoryResult({ categoryList, categoryCount, keyword }) {
  return (
    <>
      <div className="section_top">
        <h2 className="title">카테고리<span>({categoryCount})</span></h2>
      </div>
      <div className="result_list">
        <ul className="category">
          {
            categoryList
              .map(category => convertCategory(category, keyword))
              .map(({ categoryNo, label }) => (
                <li key={ categoryNo }>
                  <a href="#none" dangerouslySetInnerHTML={{__html: label}} />
                </li>
            ))
          }
        </ul>
      </div>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="카테고리 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
    </>
  )
}