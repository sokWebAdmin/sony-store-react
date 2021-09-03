import { React } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api


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
            <a >추천 제품</a>
          </li>
          <li>
            <a >선물 제안</a>
          </li>
        </ul>
      </div>
      <div className="sitemap__grid sitemap__product">
        <h2 className="title">제품</h2>
        <ul>
          <li>
            <a >카메라</a>
            <ul className="product_box">
              <li>
                <a >렌즈교환식 카메라</a>
              </li>
              <li>
                <a >컴팩트 카메라</a>
              </li>
            </ul>
          </li>
          <li>
            <a >비디오카메라</a>
            <ul className="product_box">
              <li>
                <a >시네마 라인 카메라</a>
              </li>
              <li>
                <a >캠코더</a>
              </li>
              <li>
                <a >액션캠</a>
              </li>
            </ul>
          </li>
          <li>
            <a >오디오</a>
            <ul className="product_box">
              <li>
                <a >헤드폰/이어폰</a>
              </li>
              <li>
                <a >스피커</a>
              </li>
              <li>
                <a >홈 오디오</a>
              </li>
              <li>
                <a >워크맨/녹음기</a>
              </li>
            </ul>
          </li>
          <li>
            <a >액세서리</a>
            <ul className="product_box">
              <li>
                <a >카메라 액세서리</a>
              </li>
              <li>
                <a >오디오 액세서리</a>
              </li>
            </ul>
          </li>
          <li>
            <a >PlayStation®</a>
            <ul className="product_box">
              <li>
                <a >PlayStation</a>
              </li>
              <li>
                <a >게임타이틀 및 주변기기</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="sitemap__grid sitemap__plan">
        <h2 className="title">기획전</h2>
        <ul>
          <li>
            <a >소니스토어 단독</a>
          </li>
          <li>
            <a >혜택존</a>
          </li>
          <li>
            <a >예약판매</a>
          </li>
          <li>
            <a >정품 등록 이벤트</a>
          </li>
          <li>
            <a >LIVE ON</a>
          </li>
        </ul>
      </div>
      <div className="sitemap__grid">
        <h2 className="title">멤버십</h2>
        <ul>
          <li>
            <a >등급&amp;혜택 안내</a>
          </li>
        </ul>
      </div>
      <div className="sitemap__grid sitemap__customer">
        <h2 className="title">고객 서비스</h2>
        <ul>
          <li>
            <a >FAQ&amp;공지사항</a>
          </li>
          <li>
            <a >정품등록 안내</a>
          </li>
          <li>
            <a >제품 지원</a>
          </li>
          <li>
            <a >구매 상담</a>
          </li>
          <li>
            <a >직영점 안내</a>
          </li>
          <li>
            <a >동영상 강좌</a>
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