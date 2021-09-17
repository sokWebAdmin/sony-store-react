import React, {useState, useEffect} from 'react';
import { toCurrencyString } from '../../utils/unit';
import { Link, useHistory } from 'react-router-dom';

const EventProducts = ({event, filterLabel, grade}) => {
  const history = useHistory();
  const [section, setSection] = useState(event?.section.flatMap(({ products }) => products));

  useEffect(() => {
    if (!filterLabel || filterLabel === '전체') {
      setSection(event?.section.flatMap(({ products }) => products));
      return;
    }
    const newSection = event.section.find(({label}) => label === filterLabel).products;
    newSection && setSection(newSection);
  }, [filterLabel]);

  useEffect(() => {
    if (!grade) return;

    const newSection = !filterLabel || filterLabel === '전체' ? event?.section.flatMap(({ products }) => products) : event.section.find(({label}) => label === filterLabel).products;
    const newGradeSection = newSection.filter(({stickerLabels}) => stickerLabels.length > 0 && stickerLabels[0] === grade)
    newGradeSection && setSection(newGradeSection);
  }, [grade, filterLabel]);

  return (
    <>
      <div className="event_prd_list">
        {section.length > 0 ? section.map((product) => {
          return (
            <div className="product" key={product.productNo}>
              {product.immediateDiscountAmt + product.additionDiscountAmt > 0 && <span className="badge_txt">
                          {toCurrencyString(product.immediateDiscountAmt + product.additionDiscountAmt)}
                <span className="unit">원</span> OFF
                        </span>}
              {product.stickerLabels.length > 0 && <span className={`badge_state state_${product.stickerLabels[0].substring(0, 1).toLowerCase()}`}>{product.stickerLabels[0].substring(0, 1)}<span className="txt">급</span></span>}
              <div className="product_pic">
                <Link to={`/product-view/${product.productNo}`}>
                  <img
                    src={product.imageUrls[0]}
                    alt={product.productName}
                  />
                </Link>
                {!product.stockCnt && <div className="sold_out">
                  <span>SOLD OUT</span>
                </div>}
              </div>
              <div className="product_name">
                <a href="javascript:void(0)" className="product_name_title">
                  {product.productName}
                </a>
                <p className="product_name_desc">
                  {product.promotionText}
                </p>
                <div className="product_name_price">
                  {product.salePrice !== product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt ?
                    <>
                      <div className="original">
                        {toCurrencyString(product.salePrice)} <span className="unit">원</span>
                      </div>
                      <div className="sale">
                        {toCurrencyString(product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt)} <span className="unit">원</span>
                      </div>
                    </> :
                    <>
                      <div className="sale">
                        {toCurrencyString(product.salePrice - product.immediateDiscountAmt - product.additionDiscountAmt)} <span className="unit">원</span>
                      </div>
                    </>}
                </div>
                <div className="product_btn_wrap">
                  <button type="button" className="button button_secondary button-s view"><i
                    className="ico search" onClick={() => history.push(`/product-view/${product.productNo}`)} />제품 보기
                  </button>
                  <button
                    type="button"
                    className="button button_positive button-s"
                  >
                    바로 구매
                  </button>
                </div>
              </div>
            </div>
          );
        }) : <div className="no_data">
          <span className="ico_no_data">등록된 상품이 없습니다.</span>
        </div>}
      </div>
    </>
  );
};

export default EventProducts;
