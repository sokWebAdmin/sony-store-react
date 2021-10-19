const validPageDisplayOption = (
  popup, currentPage, { eventNo, categoryNos }) => {
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
      return validEventPage(popup.pageInfos, eventNo);
    case 'PRODUCT': // 상품 상세
      return validProductPage(popup.pageInfos);
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

function validEventPage ({ eventInfos }, eventNo) {
  console.log(eventInfos);
  console.log(eventNo);
  return true;
}

function validProductPage () {
  return true;
}

export default validPageDisplayOption;