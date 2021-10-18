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
  displayTypes: ['PC', 'MOBILE_WEB'],
  pageTypes: ['MAIN', 'CATEGORY'],
};
/**
 *
 * @type : LAYER
 * @displayTypes : PC, MOBILE_WEB
 * @pageTypes : MAIN, CATEGORY ( 카테고리 세부설정 불가 )
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
    return 'UNDEFINED';
  }, [location]);

  function getDisplayType () {
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
    return popups.filter(popup => popup.type === 'LAYER').
      filter(popup => popup.displayTypes.includes(getDisplayType())).
      filter(popup => popup.pageTypes.includes(currentPage));
  }

  return (
    <>
      {popups.map(popup => <LayerPopup popup={popup} todayNotShow={todayNotShow}
                                       key={popup.popupNo} />)}
    </>
  );
};

export default CustomPopup;

