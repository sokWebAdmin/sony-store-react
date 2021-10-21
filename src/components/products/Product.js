import React, { useState, useEffect } from 'react';

//util
import { Link, useHistory } from 'react-router-dom';
import { getProductsOptions } from '../../api/product';
import { useCategoryState } from '../../context/category.context';
import { getSaleStatus, getSaleStatusForOption } from '../../utils/product';
import { toCurrencyString } from '../../utils/unit';

export default function Product({ product, category, reset, micro }) {
  const history = useHistory();
  const { tagColorMap } = useCategoryState();

  const [groupProducts, setGroupProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    setColorIndex(0);
  }, [category]);

  useEffect(() => {
    if (!product) return;
    _initGroupProducts();
  }, [product]);

  const _initGroupProducts = () => {
    const newGroupProducts =
      product.groupManagementMappingProducts
        ?.map((gp) => {
          // TODO gp 안에 옵션 정보 포함되어 있어야 함

          const optionValue = gp?.options?.[0]?.value || '';
          const colorLabel = optionValue.split('_')[0] || '';
          const colorCode = optionValue.split('_')[1] || '';

          return {
            imageUrl: gp.mainImageUrl,
            colorLabel,
            colorCode,
            productNo: gp.productNo,
          };
        })
        .filter((gp) => !!gp.colorLabel && !!gp.colorCode) || [];

    if (newGroupProducts.length === 0) {
      const optionValue = product.optionValues?.[0]?.optionValue || '';
      const colorLabel = optionValue.split('_')[0] || '';
      const colorCode = optionValue.split('_')[1] || '';

      newGroupProducts.push({
        imageUrl: product.imageUrls[0],
        colorLabel,
        colorCode,
      });
    }

    setGroupProducts(() => newGroupProducts);
    const productNos = newGroupProducts.map(({ productNo }) => productNo).filter(Boolean);
    productNos.length > 0 && fetchProductGroupOptions(newGroupProducts.map(({ productNo }) => productNo));
  };

  const fetchProductGroupOptions = async (productNos) => {
    const { data } = await getProductsOptions({ productNos });
    setOptions(() => data.optionInfos.flatMap(({ options }) => options));
  };

  const [saleStatus, setSaleStatus] = useState('');
  useEffect(() => {
    const { saleStatusType, reservationData, stockCnt, groupManagementCode } = product;

    if (!groupManagementCode) {
      setSaleStatus(getSaleStatus({ saleStatusType }, reservationData, stockCnt, reservationData?.reservationStockCnt));
    } else {
      if (options?.length > 1) {
        setSaleStatus(getSaleStatusForOption(options, product?.reservationData));
      }
    }
  }, [product, options]);

  return (
    <div
      className="product"
      onClick={(e) => {
        e.preventDefault();
        history.push(`/product-view/${product.productNo}`);
      }}
    >
      {product?.stickerLabels?.length > 0 && tagColorMap[product.stickerLabels[0]] && (
        <span className="badge__text" style={{ color: tagColorMap[product.stickerLabels[0]] }}>
          {product.stickerLabels[0]}
        </span>
      )}

      <div className="product__pic" style={micro ? { height: 'auto', paddingBottom: '100%' } : null}>
        <Link
          onClick={(e) => {
            e.preventDefault();
            reset?.();
          }}
          to={`/product-view/${product.productNo}`}
          className="product__pic__link"
        >
          {groupProducts.map((gp, index) => {
            return (
              <img
                src={gp.imageUrl}
                alt={product.productNameEn}
                className={`product__pic__img ${colorIndex === index && 'product__pic__img--visible'}`}
                key={`product-list-image-${index}`}
              />
            );
          })}
        </Link>
      </div>

      {groupProducts.filter((gp) => !!gp.colorLabel && !!gp.colorCode).length > 0 ? (
        <div className="colorchip">
          <span className="sr-only">전체 색상</span>
          {groupProducts
            .filter((gp) => !!gp.colorLabel && !!gp.colorCode)
            .map((gp, index) => {
              return (
                <span
                  className={`colorchip__item ${colorIndex === index && 'colorchip__item--active'}`}
                  key={`product-colorchip-${index}`}
                  onMouseEnter={() => {
                    setColorIndex(index);
                  }}
                >
                  <span
                    className="colorchip__item__label"
                    style={{ backgroundColor: `${gp.colorLabel === '블랙' ? '#000000' : gp.colorCode}` }}
                  >
                    <span className="sr-only">{gp.colorLabel}</span>
                  </span>
                </span>
              );
            })}
        </div>
      ) : (
        <div className="colorchip"></div>
      )}

      <Link onClick={reset} to={`/product-view/${product.productNo}`} className="product__title">
        <strong className="product__title__name">{product.productName}</strong>
        {saleStatus === 'RESERVE' && <span className="badge__label badge__label__reserve">예약판매</span>}
        {saleStatus === 'READY' && <span className={`badge__label badge__label__outofstock`}>일시품절</span>}
        {saleStatus === 'SOLDOUT' && <span className={`badge__label badge__label__soldout`}>품절</span>}
        {saleStatus === 'READY_RESERVE' && <span className={`badge__label badge__label__release`}>출시예정</span>}
      </Link>

      {product.productNameEn && (
        <Link to={`/product-view/${product.productNo}`} className="product__info">
          {product.productNameEn}
        </Link>
      )}

      <div className="product__price">
        <span className="sale" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="product__price__num">{toCurrencyString(product.salePrice)}</span>
          <span className="product__price__unit">원</span>
        </span>
      </div>
    </div>
  );
}

Product.defaultProps = {
  reset: () => null,
  micro: false,
};
