import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/event.scss"

export default function asc() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />

        <div className="container full">{/* full : max-width 1920 */}
  <div className="content employee">
    <div className="event_header">
      <div className="event_header_inner refined">
        <h1 className="event_header_title">정품등록 특가몰</h1>
        <p className="event_header_desc">제품을 구입하신 고객님들께 감사의 마음을 담아<br />소니 제품을 특별한 가격으로 구매하실 수 있는 혜택을 드립니다.</p>
      </div>
    </div>
    <div className="event_tablist type1">
      <div className="employee_prd">
        {/* event list*/}
        <div className="event_prd_list">
          <div className="product">
            <span className="badge_txt">20,000 <span className="unit">원</span> OFF</span>
            <div className="product_pic">
              <a href="#" className="product_link">
                <img src="../../images/_tmp/item640x640_01.png" alt="" />
              </a>
              <div className="sold_out"><span>SOLD OUT</span></div>
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
                <button type="button" className="button button_positive button-s">바로 구매</button>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product_pic">
              <span className="badge_txt">20,000 <span className="unit">원</span> OFF</span>
              <a href="#" className="product_link">
                <img src="../../images/_tmp/item640x640_01.png" alt="" />
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
                <button type="button" className="button button_primary button-s">예약 구매</button>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product_pic">
              <span className="badge_txt">20,000 <span className="unit">원</span> OFF</span>
              <a href="#" className="product_link">
                <img src="../../images/_tmp/item640x640_01.png" alt="" />
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
                <button type="button" className="button button_positive button-s">바로 구매</button>
              </div>
            </div>
          </div>
          <div className="product">
            <span className="badge_txt">20,000 <span className="unit">원</span> OFF</span>
            <div className="product_pic">
              <a href="#" className="product_link">
                <img src="../../images/_tmp/item640x640_01.png" alt="" />
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
                <button type="button" className="button button_positive button-s">바로 구매</button>
              </div>
            </div>
          </div>
        </div>
        <div className="btn_area">
          <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
        </div>
        {/*// event list*/}
      </div>
    </div>
  </div>
</div>

        </>
    );
}