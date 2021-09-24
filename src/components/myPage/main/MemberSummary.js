import { Link } from 'react-router-dom';

const MemberSummary = () => {
  return (
    <div className="my_user">
      <div className="user_profile">
        <p className="user_name"><span className="name">김소니</span>님
          안녕하세요 :)</p>
        <Link to="/my-page/member" className="user_modify under_line">회원정보
          수정</Link>
      </div>
      <div className="user_info">
        <ul>
          <li className="user_item grade">
            <a className="user_tabs">
                      <span className="ico_txt"><span
                        className="txt_arrow">회원등급</span></span>
              <span className="val_txt">
                            <span
                              className="val vvip">VVIP</span>{/* class: 별 등급 색상 지정 vvip / vip / family */}
                        </span>
            </a>
          </li>
          <li className="user_item mileage">
            <a className="user_tabs">
                      <span className="ico_txt"><span
                        className="txt_arrow">마일리지</span></span>
              <span className="val_txt"><span
                className="val">153,248</span>M</span>
            </a>
          </li>
          <li className="user_item coupon">
            <a className="user_tabs">
                      <span className="ico_txt"><span
                        className="txt_arrow">쿠폰</span></span>
              <span className="val_txt"><span className="val">0</span> 장</span>
            </a>
          </li>
          <li className="user_item like">
            <a className="user_tabs">
                      <span className="ico_txt"><span
                        className="txt_arrow">찜</span></span>
              <span className="val_txt"><span
                className="val">0</span></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemberSummary;