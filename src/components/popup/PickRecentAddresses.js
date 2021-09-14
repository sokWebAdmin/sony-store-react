import { useState, useEffect } from 'react';

import LayerPopup from '../common/LayerPopup';

const PickRecentAddresses = ({ recentAddresses }) => {

  const [pickAddressNo, setPickAddressNo] = useState(null);

  useEffect(() => {
    if (!recentAddresses.length) {
      return;
    }

    setPickAddressNo(recentAddresses[0].addressNo);
  }, [recentAddresses]);

  return (
    <LayerPopup
      size={'m'}
      popContClassName={'shipping_addr'}
    >
      <p className="pop_tit">최근 배송지</p>
      <p className="pop_txt">최근에 입력하신 배송지 5개까지 노출됩니다.</p>
      <div className="chk_select_zone">
        <ul className="chk_select_inner">
          {
            recentAddresses.map(address => (
              <li className="chk_select_list" key={address.addressNo}
                  onClick={() => setPickAddressNo(address.addressNo)}>
                <div
                  className="chk_select_item label_click">
                  <div className="radio_box radio_only chk_select">
                    <input type="radio" className="inp_radio"
                           id={address.addressNo}
                           name="addr_chk1"
                           checked={pickAddressNo === address.addressNo}
                           onChange={() => setPickAddressNo(
                             address.addressNo)} />
                    <label htmlFor={address.addressNo}
                           className="contentType"></label>
                  </div>
                  <div className="chk_select_info">
                    <p className="txt">
                      <strong className="name">{address.receiverName}</strong>
                      <span className="number">{address.receiverContact1}</span>
                    </p>
                    <p className="txt">{address.receiverAddress}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="btn_article">
        <button className="button button_positive button-m" type="button">확인
        </button>
      </div>
    </LayerPopup>
  );
};

export default PickRecentAddresses;