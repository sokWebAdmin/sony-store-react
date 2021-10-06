import React, { useState } from 'react';

const grades = ['전체', 'A급', 'B급', 'C급'];

const GradeSelect = ({ tabState, grade, setGrade }) => {
  const [sortSelect, setSortSelect] = useState(false);

  return (
    <div className="section_top">
      <h2 className="title">{tabState}</h2>
      <div className={`itemsort ${sortSelect ? 'itemsort--open' : ''}`} aria-label="상품 정렬">
        <button className="itemsort__button" onClick={() => setSortSelect(!sortSelect)}>
          <span className="itemsort__button__label sr-only">정렬기준:</span>
          <span className="itemsort__button__selected">{grade}</span>
        </button>
        <div className="itemsort__drawer">
          <ul className="itemsort__items">
            {grades.map((value) => {
              return (
                <li className={`itemsort__item ${grade === value ? 'itemsort__item--active' : ''}`}><a
                  href="javascript:void(0)" onClick={() => {
                  setGrade(value);
                  setSortSelect(false);
                }}
                  className="itemsort__item__link">{value}</a></li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GradeSelect;
