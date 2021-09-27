import { useState, useMemo } from 'react';
import { toCurrencyString } from '../../../utils/unit.js';

const WishList = ({ wishList, wishCount, more }) => {
  const [checkedProductNos, setCheckedProductNos] = useState([]);

  const allChecked = useMemo(
    () => wishList.length === checkedProductNos.length,
    [wishList, checkedProductNos]);

  const check = productNo => {
    const newList = checkedProductNos.includes(productNo)
      ? checkedProductNos.filter(no => no !== productNo)
      : [...checkedProductNos, productNo];
    setCheckedProductNos(newList);
  };

  const allCheck = all => {
    if (all) {
      const allProductNos = wishList.map(({ productNo }) => productNo);
      setCheckedProductNos(allProductNos);
    }
    else {
      setCheckedProductNos([]);
    }
  };

  return (
    <div className="cont history_like">
      <div className="cont_head">
        <h3 className="cont_tit" id="wish-tit">찜</h3>
        {/* s : 찜 목록이 없을 경우 display:none */}
        <div className="like_select_btn">
          <button className="button button_secondary button-s"
                  type="button">선택 삭제
          </button>
          <button
            className="button button_positive button-s popup_comm_btn"
            type="button" data-popup-name="cart_pop">
            <span>선택 제품</span> 장바구니 담기
          </button>
        </div>
        {/* e : 찜 목록이 없을 경우 display:none */}
      </div>
      <div className="history_inner">
        <div className="history_list">
          {wishList?.length > 0
            ?
            <div className="like_inner on">
              <div className="all_checked check">
                <input type="checkbox" className="inp_check check_all"
                       id="allChk" name="likeChk" checked={allChecked}
                       onChange={() => allCheck(!allChecked)} />
                <label htmlFor="allChk">전체</label>
              </div>
              <div className="like_prd_inner">
                <Products list={wishList} check={check}
                          checkedProductNos={checkedProductNos} />
              </div>
              {
                wishList.length <= wishCount &&
                <div className="btn_article line">
                  <a href="#" className="more_btn" onClick={more}>더보기</a>
                </div>
              }
            </div>
            :
            <div className="no_data on">
              <span>내역이 없습니다.</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

const Products = ({ list, check, checkedProductNos }) => {
  return (
    <ul className="like_prd_list">
      {
        list.map(item => (
          <li className="like_list" key={item.productNo}>
            <div className="item">
              <div className="check check_only">
                <input type="checkbox" className="inp_check"
                       checked={checkedProductNos.includes(item.productNo)}
                       name="likeChk" onChange={() => check(item.productNo)} />
              </div>
              <div className="img"><img
                src={item.listImageUrls}
                alt={item.productName} /></div>
              <div className="prd_info">
                <p className="tit">{item.productName}</p>
                <p className="txt">{item.productNameEn}</p>
                <p className="prd_price"><span
                  className="price">{toCurrencyString(item.salePrice)}</span>원
                </p>
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

export default WishList;