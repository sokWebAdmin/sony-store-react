import _ from "lodash";
import React from "react";
import { PAGE_SIZE } from "../../const/search";
import ViewMore from "../common/ViewMore";

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

export default function CategoryResult({ fetchCategory, categoryList, categoryCount, keyword }) {
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
                  {/* @TODO 카테고리 클릭했을 때 어디로 보내야하지.. */}
                  <a href="#none" dangerouslySetInnerHTML={{__html: label}} />
                </li>
            ))
          }
        </ul>
      </div>
      <ViewMore 
        totalCount={categoryCount}
        viewMore={fetchCategory}
        pageSize={PAGE_SIZE.CATEGORY}
      />
    </>
  )
}