import React, { useState, useMemo, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { getAgent } from '../../../utils/detectAgent';

import todayNotShow from './partials/todayNotShow';

// components
import LayerPopup from './partials/LayerPopup';
import validPageDisplayOption from './partials/validPageDisplayOption';
import { useGetCategoryByKey } from '../../../context/category.context';

const SPEC = {
  type: 'LAYER',
  displayTypes: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
  pageTypes: ['MAIN', 'CATEGORY', 'EVENT', 'PRODUCT'],
};
/**
 * spec
 *
 * @type : LAYER
 * @displayTypes : PC, MOBILE_WEB, MOBILE_APP
 * @pageTypes : MAIN, CATEGORY, EVENT, PRODUCT
 */
const CustomPopup = ({ match, location, data }) => {
  const [popups, setPopups] = useState([]);

  const isSupportEnvironment = () => {
    return SPEC.displayTypes.includes(getDisplayType());
  };

  const init = () => {
    setPopups(getValidPopups(data));
  };

  useEffect(() => isSupportEnvironment() && init(), [location]);

  const currentPage = useMemo(() => {
    const { pathname } = location;
    if (pathname === '/') {
      return 'MAIN';
    }
    if (pathname.includes('/products/')) {
      return 'CATEGORY';
    }
    if (pathname.includes('/event/detail/')) {
      return 'EVENT';
    }
    if (pathname.includes('/product-view/')) {
      return 'PRODUCT';
    }
    return 'UNDEFINED';
  }, [location]);

  function getDisplayType () {
    if (getAgent().isApp) {
      return 'MOBILE_APP';
    }
    return isMobile ? 'MOBILE_WEB' : 'PC';
  }

  const currentRouteInfo = {
    pathNo: location.pathname.split('/').find(v => v && !Number.isNaN(v * 1)) *
      1 || null,
    categoryNos: useGetCategoryByKey('url', location.url),
  };

  function getValidPopups (popups) {
    return popups.
      filter(popup => popup.type === 'LAYER'). // layer 여부
      filter(popup => popup.displayTypes.includes(
        getDisplayType())). // 노출 환경(pc or mob) 일치 여부
      filter(popup => validPageDisplayOption(popup,
        currentPage, currentRouteInfo)). // 페이지 / 노출 세부 설정 일치 여부
      filter(popup => validTodayNotShow(popup.popupNo)); // 오늘 하루 보지 않음 여부
  }

  function validTodayNotShow (popupNo) {
    const period = todayNotShow.get(popupNo);
    return !period || period < Date.now();
  }

  return (
    <>
      {popups.map(
        (popup, index) => <LayerPopup popup={popup} todayNotShow={todayNotShow}
                                      key={popup.popupNo} index={index} />)}
    </>
  );
};

export default CustomPopup;

