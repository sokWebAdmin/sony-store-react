import { useEffect } from 'react';

const WishList = () => {
  useEffect(() => {
    fetchWish().catch(console.error);
  }, []);

  async function fetchWish () {

  }

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
          <div className="like_inner on">{/* class : on 내역이 있을 경우 on */}
            <div className="all_checked check">
              <input type="checkbox" className="inp_check check_all"
                     id="allChk" name="likeChk" />
              <label htmlFor="allChk">전체</label>
            </div>
            <div className="like_prd_inner">
              <Products />
            </div>
            <div className="btn_article line">
              <a className="more_btn">더보기</a>
            </div>
          </div>
          <div className="no_data on">{/* class : on 내역이 없을 경우 on */}
            <span>내역이 없습니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <ul className="like_prd_list">
      <li className="like_list">
        <div className="item">
          <div className="check check_only">
            <input type="checkbox" className="inp_check"
                   name="likeChk" />
          </div>
          <div className="img"><img
            src="../../images/_tmp/item640x640_01.png"
            alt="" /></div>
          <div className="prd_info">
            <p className="tit">PLAYSTATION 5 DIGITAL
              (CFI-1018B01)</p>
            <p className="txt">4K HDR(HLGAF가 탑재)</p>
            <p className="prd_price"><span
              className="price">899,000</span>원</p>
          </div>
        </div>
      </li>
      <li className="like_list">
        <div className="item">
          <div className="check check_only">
            <input type="checkbox" className="inp_check"
                   name="likeChk" />
          </div>
          <div className="img"><img
            src="../../images/_tmp/item640x640_01.png"
            alt="" /></div>
          <div className="prd_info">
            <p className="tit">PLAYSTATION 5 DIGITAL
              (CFI-1018B01)</p>
            <p className="txt">4K HDR(HLG), Fast Hybrid AF</p>
            <p className="prd_price"><span
              className="price">899,000</span>원</p>
          </div>
        </div>
      </li>
      <li className="like_list">
        <div className="item">
          <div className="check check_only">
            <input type="checkbox" className="inp_check"
                   name="likeChk" />
          </div>
          <div className="img"><img
            src="../../images/_tmp/item640x640_01.png"
            alt="" /></div>
          <div className="prd_info">
            <p className="tit">PLAYSTATION 5 DIGITAL
              (CFI-1018B01)</p>
            <p className="txt">4K HDR(HLG), Fast Hybrid AF가
              탑재된 전문가급 1인치 핸디캠</p>
            <p className="prd_price"><span
              className="price">899,000</span>원</p>
          </div>
        </div>
      </li>
      <li className="like_list">
        <div className="item">
          <div className="check check_only">
            <input type="checkbox" className="inp_check"
                   name="likeChk" />
          </div>
          <div className="img"><img
            src="../../images/_tmp/item640x640_01.png"
            alt="" /></div>
          <div className="prd_info">
            <p className="tit">PLAYSTATION 5 DIGITAL
              (CFI-1018B01)</p>
            <p className="txt">4K HDR(HLG), Fast Hybrid AF가
              탑재된 전문가급 1인치 핸디캠</p>
            <p className="prd_price"><span
              className="price">899,000</span>원</p>
          </div>
        </div>
      </li>
      <li className="like_list">
        <div className="item">
          <div className="check check_only">
            <input type="checkbox" className="inp_check"
                   name="likeChk" />
          </div>
          <div className="img"><img
            src="../../images/_tmp/item640x640_01.png"
            alt="" /></div>
          <div className="prd_info">
            <p className="tit">PLAYSTATION 5 DIGITAL
              (CFI-1018B01)</p>
            <p className="txt">4K HDR(HLG), Fast Hybrid </p>
            <p className="prd_price"><span
              className="price">899,000</span>원</p>
          </div>
        </div>
      </li>
      <li className="like_list">
        <div className="item">
          <div className="check check_only">
            <input type="checkbox" className="inp_check"
                   name="likeChk" />
          </div>
          <div className="img"><img
            src="../../images/_tmp/item640x640_01.png"
            alt="" /></div>
          <div className="prd_info">
            <p className="tit">PLAYSTATION 5 DIGITAL
              (CFI-1018B01)</p>
            <p className="txt">4K HDR(HLG), Fast Hybrid AF가
              탑재된 전문가급 1인치 핸디캠</p>
            <p className="prd_price"><span
              className="price">899,000</span>원</p>
          </div>
        </div>
      </li>
      <li className="like_list">
        <div className="item">
          <div className="check check_only">
            <input type="checkbox" className="inp_check"
                   name="likeChk" />
          </div>
          <div className="img"><img
            src="../../images/_tmp/item640x640_01.png"
            alt="" /></div>
          <div className="prd_info">
            <p className="tit">PLAYSTATION 5 DIGITAL
              (CFI-1018B01)</p>
            <p className="txt">4K HDR(HLG), Fast Hybrid AF가
              탑재된 전문가급 1인치 핸디캠</p>
            <p className="prd_price"><span
              className="price">899,000</span>원</p>
          </div>
        </div>
      </li>
      <li className="like_list">
        <div className="item">
          <div className="check check_only">
            <input type="checkbox" className="inp_check"
                   name="likeChk" />
          </div>
          <div className="img"><img
            src="../../images/_tmp/item640x640_01.png"
            alt="" /></div>
          <div className="prd_info">
            <p className="tit">PLAYSTATION 5 DIGITAL
              (CFI-1018B01)</p>
            <p className="txt">4K HDR(HLG), Fast Hybrid AF가
              탑재된 전문가급 1인치 핸디캠</p>
            <p className="prd_price"><span
              className="price">899,000</span>원</p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default WishList;