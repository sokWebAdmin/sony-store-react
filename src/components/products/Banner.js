
import React, {useState, useEffect} from "react";

//util
import { loadBanner } from '../../api/display';

export default function Banner({category}) {
  const [banners, setBanner] = useState([]);

  useEffect(() => {
    _initBanner();
  }, [category]);

  const _initBanner = async () => {
    try {
      const { data } = await loadBanner(category.bannerSectionCodes);

      setBanner(data?.[0]?.accounts?.[0]?.banners || []);
    }
    catch (e) {
      console.error(e);
    }
  }

  const moveLink = banner => {
    if (!!banner?.landingUrl) {
      window.open(banner.landingUrl, banner.browerTargetType === 'CURRENT' ? '' : '_blank');
    }
  }

  return (
    <>
      {/* 배너 영역 추가 */}
      <div className="product product__banner product__banner--shadow" style={{backgroundImage: `url(${banners?.[0]?.imageUrl})`, cursor: 'pointer'}} onClick={() => {
        moveLink(banners?.[0]);
      }}>
      </div>
      {/* <!--  아이템 갯수 css 를 위해 빈 아이템 ".blank" 추가 --> */}
      <div className="product blank"></div>
    </>
  );
}


                                    