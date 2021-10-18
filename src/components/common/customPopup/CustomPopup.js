import React, { useState, useMemo, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { getAgent } from '../../../utils/detectAgent';

import todayNotShow from './partials/todayNotShow';

// api
import {
  getDisplayPopups,
  getDisplayPopupsPopupNos,
} from '../../../api/display';

// components
import LayerPopup from './partials/LayerPopup';

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
const CustomPopup = ({ location }) => {
  const [popups, setPopups] = useState([]);

  const isSupportEnvironment = () => {
    const withoutPredicates = [
      () => getAgent().isApp === false,
      () => SPEC.displayTypes.includes(getDisplayType()),
    ];

    return withoutPredicates.every(predicate => predicate());
  };

  const init = () => {
    fetchPopupNos().
      then(nos => nos.toString()).
      then(fetchPopups).
      then(getValidPopups).
      then(setPopups);
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
      return 'MOBILE_APP'
    }
    return isMobile ? 'MOBILE_WEB' : 'PC';
  }

  function fetchPopupNos () {
    const map = data => data.map(({ popupNo }) => popupNo);

    return getDisplayPopups().then(({ data }) => data).then(map);
  }

  function fetchPopups (no) {
    return getDisplayPopupsPopupNos(no).then(({ data }) => data);
  }

  function getValidPopups (popups) {
    return popups.
      filter(popup => popup.type === 'LAYER'). // layer 여부
      filter(popup => popup.displayTypes.includes(
        getDisplayType())). // 노출 환경(pc or mob) 일치 여부
      filter(validPageDisplayOption). // 페이지 / 노출 세부 설정 일치 여부
      filter(popup => validTodayNotShow(popup.popupNo)); // 오늘 하루 보지 않음 여부
  }

  function validPageDisplayOption (popup) {
    if (!popup.pageTypes.includes(currentPage)) {
      return false;
    }

    console.log(popup);

    return true;
  }

  function validTodayNotShow (popupNo) {
    const period = todayNotShow.get(popupNo);
    return !period || period < Date.now();
  }

  return (
    <>
      {popups.map(popup => <LayerPopup popup={popup} todayNotShow={todayNotShow}
                                       key={popup.popupNo} />)}
    </>
  );
};

export default CustomPopup;

