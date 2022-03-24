import { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { chain, map, head } from 'lodash';

import Product from 'components/products/Product';
import ViewMore from 'components/common/ViewMore';
import { postProductsGroupManagementCode } from 'api/product';
import { orderList, PAGE_SIZE } from 'const/search';

const ProductResult = ({
    productList,
    orderBy,
    setOrderBy,
    productCount,
    searchProduct,
    keyword,
}) => {
    const [mobileOrderOpen, setMobileOrderOpen] = useState(false);
    const [products, setProducts] = useState(productList);

    const fetchGroupManagementMappingProducts = async (
        groupManagementCodes,
        productList,
    ) => {
        const { data } = await postProductsGroupManagementCode({
            groupManagementCodes,
            saleStatus: 'ALL_CONDITIONS',
            isSoldOut: true,
        });

        const groupByCode = chain(data)
            .map(({ groupManagementMappingProducts, groupManagementCode }) => ({
                groupManagementCode,
                groupManagementMappingProducts,
            }))
            .groupBy('groupManagementCode')
            .value();

        setProducts(() => {
            let products = map(productList, (p) => ({
                ...p,
                groupManagementMappingProducts: head(
                    groupByCode[p.groupManagementCode],
                )?.groupManagementMappingProducts,
            }));
            if (orderBy === 'OLD_PRODUCT') {
                products.reverse();
            }
            return products;
        });
    };

    const getOrderByLabel = () => {
        switch (orderBy) {
            case 'RECENT_PRODUCT':
                return '최신순';
            case 'LOW_PRICE':
                return '낮은 가격순';
            case 'DISCOUNTED_PRICE':
                return '높은 가격순';
            case 'OLD_PRODUCT':
                return '오래된 순';
            case 'POPULAR':
                return '정확도 순';
            default:
                throw new Error('Unknown orderBy type');
        }
    };

    const codes = chain(productList)
        .flatMap(({ groupManagementCode }) => groupManagementCode)
        .compact()
        .uniq()
        .value();

    useEffect(
        () => fetchGroupManagementMappingProducts(codes, productList),
        [productList],
    );

    return (
        <>
            <div className='section_top'>
                <h2 className='title'>
                    제품<span>({productCount})</span>
                </h2>
                <div
                    className={`itemsort ${
                        mobileOrderOpen ? 'itemsort--open' : ''
                    }`}
                    aria-label='상품 정렬'
                >
                    <button
                        className='itemsort__button'
                        onClick={() => {
                            setMobileOrderOpen(!mobileOrderOpen);
                        }}
                    >
                        <span className='itemsort__button__label sr-only'>
                            정렬기준:
                        </span>
                        <span className='itemsort__button__selected'>
                            {getOrderByLabel()}
                        </span>
                    </button>
                    <div className='itemsort__drawer'>
                        <ul className='itemsort__items'>
                            {orderList.map((order, idx) => (
                                <li
                                    key={`${order.label}${idx}`}
                                    className={`itemsort__item ${
                                        orderBy === order.orderBy
                                            ? 'itemsort__item--active'
                                            : ''
                                    }`}
                                >
                                    <a
                                        href={`#${order.orderBy}`}
                                        className='itemsort__item__link'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOrderBy(order.orderBy);
                                            setMobileOrderOpen(
                                                !mobileOrderOpen,
                                            );
                                        }}
                                    >
                                        {order.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='product__list product__list--lite'>
                {products &&
                    products.map((item, itemIndex) => (
                        <Product key={itemIndex} product={item} />
                    ))}
            </div>
            {productCount >= 9 && (
                <ViewMore
                    totalCount={productCount}
                    viewMore={(pageNumber) =>
                        searchProduct(keyword, orderBy, pageNumber)
                    }
                    pageSize={PAGE_SIZE.PRODUCT}
                />
            )}
        </>
    );
};

ProductResult.propTypes = {
    productList: PropTypes.array.isRequired,
    orderBy: PropTypes.string.isRequired,
    setOrderBy: PropTypes.func.isRequired,
    productCount: PropTypes.number.isRequired,
    searchProduct: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired,
};

export default memo(ProductResult);
