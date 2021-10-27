import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";
import { wonComma } from "../../utils/utils";
import { getDisplaySectionsSectionNo } from "../../api/display";
import _ from 'lodash';

export default function SearchResultNone() {

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const fetchRecommendedProducts = async () => {
    try {
      const { data } = await getDisplaySectionsSectionNo({
        pathParams: {
          sectionNo: 5963
        },
        params: {
          by: 'ADMIN_SETTING',
          soldout: true,
          pageNumber: 1,
          pageSize: 4,
        }
      });
      
      setRecommendedProducts(
        _.chain(data)
         .take(1)
         .flatMap(({ products }) => products)
         .map(p => ({ img: _.head(p.imageUrls), ...p}))
         .value()
      );

    } catch(e) {
      console.error(e);
    }
  };

  useEffect(() => fetchRecommendedProducts(), []);

  return (
    <>
      <div className="guidesearch">
        <ul className="guidesearch__list">
          <li>
            <em className="icon"></em>
            <strong>단어를 <span>잘못 입력한 경우</span></strong>
            <p>단어의 철자가 정확한지<br/>한&#47;영을 잘못 입력하지는 않았는지<br/>확인해주세요.</p>
          </li>
          <li>
            <em className="icon"></em>
            <strong>검색어가 지나치게 <span>많은 경우</span></strong>
            <p>검색어의 단어 수를 줄이거나,<br/>보다 일반적인 검색어로<br/>검색해주세요.</p>
          </li>
          <li>
            <em className="icon"></em>
            <strong>정확한 모델명을 <span>모르는 경우</span></strong>
            <p>DSC-RX100M3의 경우<br/>DSC*로 상품명 뒤에 *를 넣어서 검색해주세요.</p>
            <span className="desc">*인기 검색어를 활용하셔도<br/>소니 제품을 쉽게 찾으실 수 있습니다.</span>
          </li>
        </ul>
      </div>
      <div className="slide_box recommned_swiper swiper-container">
        <h2 className="title">추천제품</h2>
        <Swiper
          className="product_List swiper-wrapper"
          slidesPerView={2}
          spaceBetween={10}
          navigation={{
            nextEl : '.swiper-button-next',
            prevEl : '.swiper-button-prev',
          }}
          breakpointsInverse={true}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 24,
            }
          }}
        >
          <>
          {
            recommendedProducts.map(p => (
              <SwiperSlide key={p.productNo}>
                <div className="product_tabArea">
                  <div className="product_img">
                    <Link to={`/product-view/${p.productNo}`}>
                      <div className="img-box">
                        <div className="inner">
                          <img src={p.img} alt={p.productName} />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="product-name">
                    <div className="product-option">
                      <Link to={`/product-view/${p.productNo}`}>
                        <strong>{p.productName}</strong>
                        <p>{p.productNameEn}</p>
                      </Link>
                      <div className="price">
                        <strong>{wonComma(p?.salePrice || 0)}</strong>원
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
          </>
        </Swiper>
        <div className="swiper-button-next">다음</div>
        <div className="swiper-button-prev">이전</div>
      </div>
    </>
  )
}