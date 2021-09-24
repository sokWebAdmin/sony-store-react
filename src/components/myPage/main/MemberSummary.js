import { useEffect, useMemo } from 'react';
import {
  useProfileState,
  fetchMyProfile,
  useProileDispatch,
} from '../../../context/profile.context';

import { Link } from 'react-router-dom';

const memberGradeClassName = {
  membership: 'family',
  vip: 'vip',
  vvip: 'vvip',

};

const MemberSummary = () => {
  const { my, profile } = useProfileState();
  const profileDispatch = useProileDispatch();

  useEffect(() => {
    if (!my && profile?.memberId) {
      fetchMy(profile.memberId);
    }
  }, [my, profile]);

  function fetchMy (customerid) {
    fetchMyProfile(profileDispatch, { type: '30', customerid }).
      catch(console.error);
  }

  const gradeClassName = useMemo(() => {
    const grade = profile?.memberGradeName?.toLowerCase();
    const key = Object.keys(memberGradeClassName).find(k => k === grade);

    return key ? 'val ' + memberGradeClassName[key] : 'val';

  }, [profile]);

  return (
    <div className="my_user">
      <div className="user_profile">
        <p className="user_name"><span className="name">{profile?.memberName ||
        ''}</span>님
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
                              className={gradeClassName}>{profile?.memberGradeName ||
                            ''}</span>{/* class: 별 등급 색상 지정 vvip / vip / family */}
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