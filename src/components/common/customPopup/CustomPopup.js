import React, { useState, useEffect } from 'react';

// api
import {
  getDisplayPopups,
  getDisplayPopupsPopupNos,
} from '../../../api/display';

// components
import Popup from './partials/Popup';

const CustomPopup = () => {
  const [popups, setPopups] = useState([]);

  const init = () => {
    fetchPopupNos().
      then(nos => nos.toString()).
      then(fetchPopups).
      then(setPopups);
  };

  useEffect(init, []);

  function fetchPopupNos () {
    const map = data => data.map(({ popupNo }) => popupNo);

    return getDisplayPopups().then(({ data }) => data).then(map);
  }

  function fetchPopups (no) {
    return getDisplayPopupsPopupNos(no).then(({ data }) => data);
  }

  return (
    <div style={{ padding: '100px', maxWidth: '100%' }}>
      {popups.map(popup => <Popup popup={popup} />)}
    </div>
  );
};

export default CustomPopup;

