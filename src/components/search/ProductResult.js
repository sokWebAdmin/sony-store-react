import { useEffect, useState } from "react";
import { orderList } from "../../const/search";
import Product from "../products/Product";

import _ from 'lodash';
import { postProductsGroupManagementCode } from "../../api/product";

export default function ProductResult({ productList, orderBy, setOrderBy, productCount }) {

  const [mobileOrderOpen, setMobileOrderOpen] = useState(false);
  const [products, setProducts] = useState(productList);
  
  const fetchGroupManagementMappingProducts = async (groupManagementCodes, productList) => {
    const { data } = await postProductsGroupManagementCode({
      groupManagementCodes,
      saleStatus: 'ALL_CONDITIONS',
    });

    const groupByCode = _.chain(data)
                         .map(({groupManagementMappingProducts, groupManagementCode}) => ({
                           groupManagementCode,
                           groupManagementMappingProducts
                         }))
                         .groupBy('groupManagementCode')
                         .value();

    setProducts(productList.map((p) => ({...p, groupManagementMappingProducts: _.head(groupByCode[p.groupManagementCode])?.groupManagementMappingProducts})))

  }

  useEffect(() => {
    fetchGroupManagementMappingProducts(
      _.chain(productList)
       .flatMap(({ groupManagementCode }) => groupManagementCode)
       .compact()
       .uniq()
       .value(),
      productList
    );
  }, [productList]);

  return (
    <>
      <div className="section_top">
        <h2 className="title">제품<span>({productCount})</span></h2>
        <div className={`itemsort ${mobileOrderOpen ? "itemsort--open" : ""}`} aria-label="상품 정렬">
          <button className="itemsort__button" onClick={()=>{
              setMobileOrderOpen(!mobileOrderOpen)
          }}>
            <span className="itemsort__button__label sr-only">정렬기준:</span>
            <span className="itemsort__button__selected">{orderBy === "RECENT_PRODUCT" ? "최신순" : (orderBy === "TOP_PRICE" ? "높은 가격순" : "낮은 가격순")}</span>
          </button>
          <div className="itemsort__drawer">
            <ul className="itemsort__items">
              {
                orderList.map((order, idx) => (
                  <li key={`${order.label}${idx}`} className={`itemsort__item ${orderBy === order.orderBy ? "itemsort__item--active" : ""}`}>
                    <a 
                      href={`#${order.orderBy}`} 
                      className="itemsort__item__link" 
                      onClick={ e => {
                        e.preventDefault();
                        setOrderBy(order.orderBy);
                      }}
                    >{ order.label }</a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>      
      </div>
      {/* item-list */}
      <div className="product__list product__list--lite">
        {/* item */}
        {products && products.map((item, itemIndex) => <Product key={itemIndex} product={item} />)}
      </div>
      {/* 더보기 버튼영역 */}
      <div className="btn_area">
        <button type="button" className="btn_more" title="제품 더보기">더보기<span className="ico_plus" /></button>
      </div>
      {/*// 더보기 버튼영역 */}
      </>
    // </div>
  )
} 