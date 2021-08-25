import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/contents.scss"

export default function sitemap() {

    return (
        <>
        <SEOHelmet title={"구매상담 이용약관 동의"} />
        <div className="contents">
        <div className="container">
  <div className="content">
    {/* 서브페이지 타이틀 영역 */}
    <div className="page">
      <h1 className="page__title">사이트맵</h1>
    </div>
    {/*// 서브페이지 타이틀 영역 */}
    <div className="sitemap">
      <div className="sitemap__grid">
        <h2 className="title">스토어 추천 제품</h2>
        <ul>
          <li>
            <a href="#">추천 제품</a>
          </li>
          <li>
            <a href="#">선물 제안</a>
          </li>
        </ul>
      </div>
      <div className="sitemap__grid sitemap__product">
        <h2 className="title">제품</h2>
        <ul>
          <li>
            <a href="#">카메라</a>
            <ul className="product_box">
              <li>
                <a href="#">렌즈교환식 카메라</a>
              </li>
              <li>
                <a href="#">컴팩트 카메라</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">비디오카메라</a>
            <ul className="product_box">
              <li>
                <a href="#">시네마 라인 카메라</a>
              </li>
              <li>
                <a href="#">캠코더</a>
              </li>
              <li>
                <a href="#">액션캠</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">오디오</a>
            <ul className="product_box">
              <li>
                <a href="#">헤드폰/이어폰</a>
              </li>
              <li>
                <a href="#">스피커</a>
              </li>
              <li>
                <a href="#">홈 오디오</a>
              </li>
              <li>
                <a href="#">워크맨/녹음기</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">액세서리</a>
            <ul className="product_box">
              <li>
                <a href="#">카메라 액세서리</a>
              </li>
              <li>
                <a href="#">오디오 액세서리</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">PlayStation®</a>
            <ul className="product_box">
              <li>
                <a href="#">PlayStation</a>
              </li>
              <li>
                <a href="#">게임타이틀 및 주변기기</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="sitemap__grid sitemap__plan">
        <h2 className="title">기획전</h2>
        <ul>
          <li>
            <a href="#">소니스토어 단독</a>
          </li>
          <li>
            <a href="#">혜택존</a>
          </li>
          <li>
            <a href="#">예약판매</a>
          </li>
          <li>
            <a href="#">정품 등록 이벤트</a>
          </li>
          <li>
            <a href="#">LIVE ON</a>
          </li>
        </ul>
      </div>
      <div className="sitemap__grid">
        <h2 className="title">멤버십</h2>
        <ul>
          <li>
            <a href="#">등급&amp;혜택 안내</a>
          </li>
        </ul>
      </div>
      <div className="sitemap__grid sitemap__customer">
        <h2 className="title">고객 서비스</h2>
        <ul>
          <li>
            <a href="#">FAQ&amp;공지사항</a>
          </li>
          <li>
            <a href="#">정품등록 안내</a>
          </li>
          <li>
            <a href="#">제품 지원</a>
          </li>
          <li>
            <a href="#">구매 상담</a>
          </li>
          <li>
            <a href="#">직영점 안내</a>
          </li>
          <li>
            <a href="#">동영상 강좌</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
        </>
    );
}