import React, { createContext, useContext, useReducer } from "react";
import {tagColorMap, categoriesExtraDataMap, espCategoryNo, gnbCategories} from '../const/category';

const initialState = {
  tagColorMap,
  categories: [],
  espCategory: {},
  gnbCategories: []
};

const getCategoryByNo = (categories, categoryNo) => {
  let arrTarget = [...categories];

  while (arrTarget.length > 0) {
    const target = arrTarget.shift();

    if (target.categoryNo === categoryNo) {
      return target;
    }

    if (target.children) {
      arrTarget = arrTarget.concat(target.children);
    }
  }

  return null;
}

const getConvertCategories = categories => {
  return categories
    .filter(c => categoriesExtraDataMap.some(ce => ce.categoryNo === c.categoryNo))
    .map(c => {
      const extra = categoriesExtraDataMap.filter(ce => ce.categoryNo === c.categoryNo)[0] || {};

      return {
        ...c,
        children: getConvertCategories(c.children),
        ...extra
      };
    });
};

/**
 * category data init
 * --- 서버에서 가져온 카테고리 데이터에 extra data 추가
 * --- extra data 가 없는 카테고리는 제외 (하드코딩 정보가 있어야 함)
 * --- esp 카테고리 별도 분리
 * --- gnbCategories 내 [제품] 하위에 카테고리 데이터 추가
 */
const initCategoryState = multiLevelCategories => {
  const categories = getConvertCategories(multiLevelCategories);

  const espCategory = getCategoryByNo(multiLevelCategories, espCategoryNo) || {};

  const newGnbCategories = [...gnbCategories];
  newGnbCategories[1].children = categories.map(c => {
    return {
      label: c.label,
      route: c.url,
    }
  });

  return { categories, espCategory, gnbCategories: newGnbCategories };
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_CATEGORY':
      return {
        ...state,
        ...initCategoryState(action.data)
      };
    default:
      throw new Error('INVALID_CATEGORY_ACTION_TYPE');
  }
}


const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(categoryReducer, initialState);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  )
};

export const useCategoryDispatch = () => {
  const { dispatch } = useContext(CategoryContext);
  return dispatch;
}

export const useCategoryState = () => {
  const { state } = useContext(CategoryContext);
  return state;
}

export const initCategory = (dispatch, data) => {
  dispatch({type: 'INIT_CATEGORY', data: data?.multiLevelCategories || []});
};