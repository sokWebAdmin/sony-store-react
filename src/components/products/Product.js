
import React  from 'react';

//util
import { wonComma } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { useCategoryState } from '../../context/category.context';

// TODO color 로직 확인

export default function Product({product}) {
  const {tagColorMap} = useCategoryState();

  let saleStatus = 'READY';

  if (product.reservationData) {
    const {reservationStartYmdt, reservationEndYmdt} = product.reservationData;
    const reservStart = (new Date(reservationStartYmdt)).getTime();
    const reservEnd = (new Date(reservationEndYmdt)).getTime();
    const now = (new Date()).getTime();

    if (reservStart > now) {
      saleStatus = 'READY_RESERVE';
    } else if (reservEnd >= now) {
      saleStatus = 'RESERVE';
    }
  }

  if (product.stockCnt === 0) {
    saleStatus = 'SOLDOUT';
  }

  if (['ONSALE', 'FINISHED', 'STOP', 'PROHIBITION'].includes(product.saleStatusType)) {
    saleStatus = '';
  }

  return (
    <div className="product">
      { product?.stickerLabels?.length > 0 && tagColorMap[product.stickerLabels[0]] &&
        <span className="badge__text" style={{ color: tagColorMap[product.stickerLabels[0]] }}>{product.stickerLabels[0]}</span>
      }

      <div className="product__pic">
        <Link to={`/product-view/${product.productNo}`} className="product__pic__link" >
          {
            product.listImageUrls && product.listImageUrls.map((image, imageIndex) => {
              return (
                <img
                  src={image}
                  alt={product.productName}
                  className={`product__pic__img ${imageIndex === 0 && "product__pic__img--visible"}`}
                  key={`product-list-image-${imageIndex}`} />
              )
            })
          }
        </Link>
      </div>

      {/*{product.colors &&*/}
      {/*<div className="colorchip">*/}
      {/*  <span className="sr-only">전체 색상</span>*/}
      {/*  {*/}
      {/*    product.colors.map((color, colorIndex) =>{*/}
      {/*      return (*/}
      {/*        <span className={`colorchip__item ${colorIndex == 0 && "colorchip__item--active"}`}>*/}
      {/*                              <span className="colorchip__item__label" style={{backgroundColor:`#${color.code}`}}>*/}
      {/*                                  <span className="sr-only">{color.label}</span>*/}
      {/*                              </span>*/}
      {/*                          </span>*/}
      {/*      )*/}
      {/*    })*/}
      {/*  }*/}
      {/*</div>*/}
      {/*}*/}

      <Link to={`/product-view/${product.productNo}`} className="product__title">
        <strong className="product__title__name">{product.productName}</strong>
        {saleStatus === 'RESERVE' && <span className="badge__label badge__label__reserve">예약판매</span>}
        {saleStatus === 'READY' && <span className={`badge__label badge__label__outofstock`}>일시품절</span>}
        {saleStatus === 'SOLDOUT' && <span className={`badge__label badge__label__soldout`}>Sold out</span>}
        {saleStatus === 'READY_RESERVE' && <span className={`badge__label badge__label__release`}>출시예정</span>}
      </Link>

      { product.productNameEn &&
      <Link to={`/product-view/${product.productNo}`} className="product__info">{product.productNameEn}</Link>
      }

      <div className="product__price">
        <span className="product__price__num">{wonComma(product.salePrice)}</span>
        {/* 원 단위 콤마 필수  */}
        <span className="product__price__unit">원</span>
      </div>
    </div>
  );
}


                                    