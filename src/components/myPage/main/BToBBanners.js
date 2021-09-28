import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loadBanner } from '../../../api/display';

import '../../../assets/scss/partials/myPageBanner.scss';

const BToBBanners = () => {
  const history = useHistory();

  const [banners, setBanners] = useState([]);

  const init = () => {
    fetchBanner().then(mapData);
  };

  useEffect(init, []);

  async function fetchBanner () {
    const { data } = await loadBanner('018'); // 리퍼비시/임직원몰/특가몰
    return data;
  }

  function mapData (data) {
    const result = data.flatMap(section => section.accounts).
      flatMap(account => account.banners);
    setBanners(result);
  }

  return (
    <div className="cont_inner">
      <div className="b2b_banner">
        {banners.map(banner => (
          <Banner banner={banner} />
        ))}

        <a onClick={() => {history.push('/event/employee');}}
           className="b2b_link executives">
          <div className="txt_box">
            <p className="tit">임직원몰(마크업)</p>
            <p className="txt">맞춤형 임직원몰에서 특별한 혜택 누리세요!</p>
          </div>
        </a>
        <a onClick={() => {history.push('/event/refined');}}
           className="b2b_link refined_article">
          <div className="txt_box">
            <p className="tit">정품등록 특가몰(마크업)</p>
            <p className="txt">정품등록을 완료하신 고객님께 특별한 혜택을 드립니다!</p>
          </div>
        </a>
        <a onClick={() => {history.push('/event/asc');}}
           className="b2b_link asc">
          <div className="txt_box">
            <p className="tit">ASC몰(마크업)</p>
            <p className="txt">ASC 임직원을 위해 준비한 다양한 제품을 특별한 가격으로 만나보세요!</p>
          </div>
        </a>
      </div>
    </div>
  );
};

const Banner = ({ banner }) => (
  <a href={banner.landingUrl}
     target="_blank" // TODO. landingUrlType check
     className="b2b_link"
     style={{ background: `linear-gradient(to right, ${banner.leftSpaceColor}, ${banner.rightSpaceColor})` }}
  >
    <img className="banner_icon" src={banner.imageUrl}
         alt={banner.name + ' 아이콘'} />
    <div className="txt_box">
      <p className="tit">{banner.name}</p>
      <p className="txt">{banner.description}</p>
    </div>
  </a>
);

export default BToBBanners;