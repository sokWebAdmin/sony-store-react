import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/css/contents.css"
import "../../assets/css/event.css"
import "../../assets/css/liveon.css"

export default function liveon() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
      
        <div className="container full">{/* full : max-width 1920 */}
  <div className="content liveon">
    <div className="event_video">
      <div className="event_video_bgbox">
        <div className="event_video_inner">
          <span className="event_video_badge">LIVE ON</span>
          <h1 className="event_video_title">SRS-XP500 <span className="block">런칭 라이브온</span></h1>
          <p className="event_video_desc">한 층 더 업그레이드 된 사운드와 조명으로 공간을 밝히는 스피커<br />지금 라이브온에서 만나보세요!</p>
          <div className="event_video_playbox">
            <div className="video_container">
              <iframe src="https://www.youtube.com/embed/c0llCoHilCU" frameBorder={0} width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
      <div className="event_video_inner prd_inner">
        {/* event list*/}
        <div className="event_prd">
          <h2 className="event_prd_title">LIVE ON 제품</h2>
          <div className="event_prd_list">
            <div className="product">
              <span className="badge_txt">20,000 <span className="unit">원</span> OFF</span>
              <div className="product_pic">
                <a href="#" className="product_link">
                  <img src="/images/_tmp/item640x640_01.png" alt="" />
                </a>
              </div>
              <div className="product_name">
                <a href="#" className="product_name_title">SRS-XP500 (1+1)</a>
                <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                  1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                  1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                  1인치 핸디캠</p>
                <div className="product_name_price">
                  <div className="original">179,000 <span className="unit">원</span></div>
                  <div className="sale">159,000 <span className="unit">원</span></div>
                </div>
                <div className="product_btn_wrap">
                  <button type="button" className="button button_secondary button-s"><i className="ico gift" />선물</button>
                  <button type="button" className="button button_positive button-s">바로 구매</button>
                </div>
              </div>
            </div>
            <div className="product">
              <span className="badge_txt">20,000 <span className="unit">원</span> OFF</span>
              <div className="product_pic">
                <a href="#" className="product_link">
                  <img src="/images/_tmp/item640x640_01.png" alt="" />
                </a>
              </div>
              <div className="product_name">
                <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                  1인</p>
                <div className="product_name_price">
                  <div className="original">179,000 <span className="unit">원</span></div>
                  <div className="sale">159,000 <span className="unit">원</span></div>
                </div>
                <div className="product_btn_wrap">
                  <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                  <button type="button" className="button button_secondary button-s"><i className="ico gift" />선물</button>
                  <button type="button" className="button button_primary button-s">예약 구매</button>
                </div>
              </div>
            </div>
            <div className="product">
              <span className="badge_txt">20,000 <span className="unit">원</span> OFF</span>
              <div className="product_pic">
                <a href="#" className="product_link">
                  <img src="/images/_tmp/item640x640_01.png" alt="" />
                </a>
              </div>
              <div className="product_name">
                <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                  1인치 핸디캠</p>
                <div className="product_name_price">
                  <div className="original" />
                  <div className="sale">159,000 <span className="unit">원</span></div>
                </div>
                <div className="product_btn_wrap">
                  <button type="button" className="button button_secondary button-s view"><i className="ico search" />제품 보기</button>
                  <button type="button" className="button button_secondary button-s"><i className="ico gift" />선물</button>
                  <button type="button" className="button button_positive button-s">바로 구매</button>
                </div>
              </div>
            </div>
            <div className="product">
              {/* <span class="badge_txt">20,000 <span class="unit">원</span> OFF</span> */}
              <div className="product_pic">
                <a href="#" className="product_link">
                  <img src="/images/_tmp/item640x640_01.png" alt="" />
                </a>
              </div>
              <div className="product_name">
                <a href="#" className="product_name_title">WH-1000XM4/SME</a>
                <p className="product_name_desc">4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                  1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                  1인치 핸디캠4K HDR(HLG), Fast Hybrid AF가 탑재된 전문가급
                  1인치 핸디캠</p>
                <div className="product_name_price">
                  <div className="original">179,000 <span className="unit">원</span></div>
                  <div className="sale">159,000 <span className="unit">원</span></div>
                </div>
                <div className="product_btn_wrap">
                  <button type="button" className="button button_secondary button-s"><i className="ico gift" />선물</button>
                  <button type="button" className="button button_positive button-s">바로 구매</button>
                </div>
              </div>
            </div>
          </div>
          <div className="btn_area">
            <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
          </div>
          <div className="button_wrap">
            <a href="#" className="button button_positive">목록</a>
          </div>
        </div>
        {/*// event list*/}
      </div>
    </div>
  </div>
</div>

        </>
    );
}