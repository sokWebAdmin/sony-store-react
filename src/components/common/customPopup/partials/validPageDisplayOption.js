const validPageDisplayOption = (
  popup, currentPage, { pathNo, categoryNos }) => {
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
      return validCategoryPage(popup.pageInfos, categoryNos);
    case 'EVENT': // 기획전
      return validEventPage(popup.pageInfos, pathNo);
    case 'PRODUCT': // 상품 상세
      return validProductPage(popup.pageInfos, pathNo);
    default:
      return true;
  }
};

function validCategoryPage (
  { displayCategoryAll, displayCategoryInfos }, categoryNos = null) {
  if (displayCategoryAll === 'Y' || categoryNos === null) {
    return true;
  }
  const displayCategoriesNos = displayCategoryInfos.map(
    info => info.displayCategoryNo);
  return displayCategoriesNos.some(
    no => displayCategoriesNos.include(no));
}

function validEventPage ({ eventInfos }, pathNo) {
  return eventInfos.includes(pathNo);
}

function validProductPage ({ mallProductInfos }, pathNo) {
  return mallProductInfos.includes(pathNo);
}

export default validPageDisplayOption;