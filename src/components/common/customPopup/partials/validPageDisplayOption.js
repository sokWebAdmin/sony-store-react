const validPageDisplayOption = (popup, currentPage) => {
  if (!popup?.pageInfos?.pageTypes) {
    return true;
  }

  if (!popup.pageInfos.pageTypes.includes(currentPage)) {
    return false;
  }

  switch (currentPage) {
    case 'MAIN': // 메인
      return true;
    case 'CATEGORY': // 카테고리
      return validCategoryPage(popup.pageInfos);
    case 'EVENT': // 기획전
      return validEventPage(popup.pageInfos);
    case 'PRODUCT': // 상품 상세
      return validProductPage(popup.pageInfos);
    default:
      return true;
  }
};

function validCategoryPage ({ displayCategoryAll, displayCategoryInfos }) {
  if (displayCategoryAll === 'Y') {
    return true;
  }
  const displayCategoriesNos = displayCategoryInfos.map(
    info => info.displayCategoryNo);
  console.log(displayCategoriesNos);
  return true;
}

function validEventPage () {
  return true;
}

function validProductPage () {
  return true;
}

export default validPageDisplayOption;