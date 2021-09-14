
import React, { useState, useEffect } from 'react';

//util
import Product from './Product';
import Banner from './Banner';
import { getProductSearch } from '../../api/product';

const orderList = [
  {orderBy: 'RECENT_PRODUCT', title: '최신순', query: { 'order.by': 'RECENT_PRODUCT' }},
  {orderBy: 'TOP_PRICE', title: '높은 가격순', query: { 'order.by': 'DISCOUNTED_PRICE' }},
  {orderBy: 'LOW_PRICE', title: '낮은 가격순', query: { 'order.by': 'DISCOUNTED_PRICE', 'order.direction': 'ASC' }},
];

export default function ProductList({category}) {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState({ number: 0, update: false });

  const [totalCount, setTotalCount] = useState(0);

  const [currentOrder, setCurrentOrder] = useState({ index: 0, update: false });

  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    setTotalCount(0);
    setCurrentOrder({ index: 0, update: false });
    setOrderOpen(false);

    setPage({ number: 1, update: false });
  }, [category]);

  useEffect(async () => {
    if (page.number > 0) {
      const result = await _getProducts();

      setTotalCount(result.totalCount);

      if (page.update) {
        setProducts([...products, ...result.list]);
      } else {
        setProducts([...result.list]);
      }
    }
  }, [page]);

  useEffect(() => {
    if (currentOrder.update) {
      setPage(() => ({ number: 1, update: false }));
    }
  }, [currentOrder]);

  const _getProducts = async () => {
    const result = { list: [], page: page.number, totalCount: 0 };

    try {
      const { status, data } = await getProductSearch({
        categoryNos: category.categoryNo,
        pageNumber: page.number,
        pageSize: 5,
        ...orderList[currentOrder.index].query
      });

      if (status !== 200) {
        throw 'get produts is not 200';
      }

      result.list = data.items;
      result.totalCount = data.totalCount;
    }
    catch (e) {
      console.error(e);
    }

    return result;
  }

  return (
    <div className="product__list__wrapper">
      <h2 className="list__info">
        <span className="list__info__name">제품</span>
        <span className="list__info__num">({totalCount})</span>
      </h2>
      <div className={`itemsort ${orderOpen ? "itemsort--open" : ""}`} aria-label="상품 정렬">
        <button className="itemsort__button" onClick={e => {
          setOrderOpen(true);
          e.preventDefault();
        }}>
          <span className="itemsort__button__label sr-only">정렬기준:</span>
          <span className="itemsort__button__selected">{ orderList[currentOrder.index].title }</span>
        </button>
        <div className="itemsort__drawer">
          <ul className="itemsort__items">
            {orderList.map((o, index) => {
              return <li className={`itemsort__item ${ currentOrder.index === index ? "itemsort__item--active" : ""}`} key={`product-list-order-${index}`}>
                <a href="#" className="itemsort__item__link" onClick={e => {
                  setCurrentOrder({index, update: true});
                  setOrderOpen(false);
                  e.preventDefault();
                }
                }>{o.title}</a>
              </li>
            })}
          </ul>
        </div>
      </div>

      <div className="product__list">
        {products.map((product, index) => {
          return <React.Fragment key={`category-product-${index}`}>
            {
              index === 6 && !category.parent && <Banner category={category} />
            }
            <Product product={product} />
          </React.Fragment>
          })
        }
      </div>

      {
        products.length > 0 && products.length < totalCount - 1 &&
        <div className="btn_area">
          <button type="button" className="btn_more" title="기획전 더보기" style={{backgroundColor: 'gray'}} onClick={() => {
            setPage({ number: page.number + 1, update: true });
          }}>더보기 버튼 - 마크업 요청중<span className="ico_plus"></span></button>
        </div>
      }
    </div>
  );
}


                                    