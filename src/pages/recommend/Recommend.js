
import { React ,useState, useEffect, useContext, useRef } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/recommend.scss"

//context
import GlobalContext from '../../context/global.context';

//util
import { wonComma } from '../../utils/utils';

//library
import { Controller, Scene } from 'react-scrollmagic';

export default function Recommend({match}) {

    return(
        <>
        <div className="contents recommend">
        <div className="container">
  <div className="content">
    <div className="reco">
      {/* kv */}
      <div className="reco_kv">
        <div className="reco_kv_inner">
          <div className="reco_kv_copy">
            <h1 className="reco_kv_title">Sony Store<br />Products</h1>
            <p className="reco_kv_desc">당신의 삶을 특별하게 해줄 스마트한 <br />소니 스토어 추천 제품을 살펴보세요.</p>
          </div>
          <div id="reco_kv_img-1" className="reco_kv_img reco_kv_img-1"><img src="../../images/recommend/kv1.jpg" alt="분위기 잡는 사진 1" /></div>
          <div id="reco_kv_img-2" className="reco_kv_img reco_kv_img-2"><img src="../../images/recommend/kv2.jpg" alt="분위기 잡는 사진 2" /></div>
          <div id="reco_kv_img-3" className="reco_kv_img reco_kv_img-3"><img src="../../images/recommend/kv3.jpg" alt="분위기 잡는 사진 3" /></div>
        </div>
        <div className="trigger trigger-1" />
        <div className="trigger trigger-2" />
        <div className="trigger trigger-3" />
        <div className="trigger trigger-4" />
        <div className="trigger trigger-end" />
      </div>
      {/* //kv */}
      {/* flex */}
      <div className="reco_items">
        <div className="reco_item">
          <div className="reco_item_inner">
            <a href="#" className="reco_prod">
              <img src="../../images/recommend/img1.jpg" alt="PS-LX310BT" className="reco_prod_img" />
            </a>
            <h2 className="reco_title">PS-LX310BT</h2>
            <p className="reco_desc">간편하게 즐기는 바이닐 사운드</p>
            <div className="reco_hashes">
              <a href="#" className="reco_hash">#이벤트</a>
            </div>
          </div>
        </div>
        <div className="reco_item">
          <div className="reco_item_inner">
            <a href="#" className="reco_prod">
              <img src="../../images/recommend/img2.jpg" alt="WH-1000XM4/L" className="reco_prod_img" />
            </a>
            <h2 className="reco_title">WH-1000XM4/L</h2>
            <p className="reco_desc">몰입을 넘어 소통까지 </p>
            <div className="reco_hashes">
              <a href="#" className="reco_hash">#벗지 않는 헤드폰</a>
            </div>
          </div>
        </div>
        <div className="reco_item">
          <div className="reco_item_inner">
            <a href="#" className="reco_prod">
              <img src="../../images/recommend/img3.jpg" alt="WH-1000XM4/W" className="reco_prod_img" />
            </a>
            <h2 className="reco_title">WH-1000XM4/W</h2>
            <p className="reco_desc">몰입을 넘어 소통까지 </p>
            <div className="reco_hashes">
              <a href="#" className="reco_hash">#벗지 않는 헤드폰</a>
            </div>
          </div>
        </div>
        <div className="reco_item">
          <div className="reco_item_inner">
            <a href="#" className="reco_prod">
              <img src="../../images/recommend/img4.jpg" alt="SRS-RA3000H" className="reco_prod_img" />
            </a>
            <h2 className="reco_title">SRS-RA3000H</h2>
            <p className="reco_desc">어떤 공간이든 스며든다, 디퓨저 사운드 스피커</p>
            <div className="reco_hashes">
              <a href="#" className="reco_hash">#인테리어</a>
            </div>
          </div>
        </div>
        <div className="reco_banner" style={{backgroundImage: 'url(../../images/recommend/banner_bg.png)'}}>
          <div className="reco_banner_img">
            <img src="../../images/recommend/banner_item.png" alt="WF-1000XM4/S,Sony Earphones,Silver" />
          </div>
        </div>
        <div className="reco_item">
          <div className="reco_item_inner">
            <a href="#" className="reco_prod">
              <img src="../../images/recommend/img5.jpg" alt="WF-1000XM4/S" className="reco_prod_img" />
            </a>
            <h2 className="reco_title">WF-1000XM4/S</h2>
            <p className="reco_desc">새로운 차원의 몰입을 경험하다</p>
            <div className="reco_hashes">
              <a href="#" className="reco_hash">#노이즈캔슬링</a>
            </div>
          </div>
        </div>
        <div className="reco_item">
          <div className="reco_item_inner">
            <a href="#" className="reco_prod">
              <img src="../../images/recommend/img6.jpg" alt="WF-1000XM4/B" className="reco_prod_img" />
            </a>
            <h2 className="reco_title">WF-1000XM4/B</h2>
            <p className="reco_desc">새로운 차원의 몰입을 경험하다</p>
            <div className="reco_hashes">
              <a href="#" className="reco_hash">#노이즈캔슬링</a>
            </div>
          </div>
        </div>
        <div className="reco_item">
          <div className="reco_item_inner">
            <a href="#" className="reco_prod">
              <img src="../../images/recommend/img7.jpg" alt="WH-1000XM4/W" className="reco_prod_img" />
            </a>
            <h2 className="reco_title">WH-1000XM4/W</h2>
            <p className="reco_desc">몰입을 넘어 소통까지</p>
            <div className="reco_hashes">
              <a href="#" className="reco_hash">#벗지 않는 헤드폰</a>
            </div>
          </div>
        </div>
      </div>
      {/* //flex */}
      {/* 기획전 슬라이드 */}
      <div className="exhibitions_slider swiper-container">
        <ul className="swiper-wrapper">
          <li className="swiper-slide">
            <div className="exhibitions_box">
              <img className="bg_img" src="../../images/product/banner_thumb_01.png" alt="" />{/* 슬라이드 배경 */}
              <div className="txt_box">
                <span className="tag" style={{color: '#5865f5'}}>기획전</span>
                <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
              </div>
            </div>
          </li>
          <li className="swiper-slide">
            <div className="exhibitions_box">
              <img className="bg_img" src="../../images/product/banner_thumb_01.png" alt="" />
              <div className="txt_box">
                <span className="tag" style={{color: '#5865f5'}}>기획전</span>
                <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
              </div>
            </div>
          </li>
          <li className="swiper-slide">
            <div className="exhibitions_box">
              <img className="bg_img" src="../../images/product/banner_thumb_01.png" alt="" />
              <div className="txt_box">
                <span className="tag" style={{color: '#5865f5'}}>기획전</span>
                <p className="tit">원핸드 컴팩트 풀프레임<br />G 렌즈 예약판매</p>
              </div>
            </div>
          </li>
        </ul>
        <div className="arrow_btn">
          <a className="arrow swiper-button-prev"><img src="../../images/common/arrow_19_34.png" alt="이전" /></a>
          <a className="arrow swiper-button-next"><img src="../../images/common/arrow_19_34.png" alt="다음" /></a>
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  </div>
</div>
</div>
        </>
    )
}