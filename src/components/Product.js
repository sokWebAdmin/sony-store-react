
import React from "react";

//util
import { wonComma } from '../utils/utils';


export default function Product({product}) {
  
  return (
    <>
    <div className="product">
            { product.badge  && (
                product.badge == "best" ?     
                    <span className={`badge__text badge__text__best`}>BEST</span> :
                    ( product.badge == "event" ? <span className={`badge__text badge__text__event`}>EVENT</span> : <span className={`badge__text badge__text__hot`}>HOT</span> )
            )}
            <div className="product__pic">
            <a href={`/product-view/${product.productNo}`} className="product__pic__link">
                {
                    product.listImageUrls && product.listImageUrls.map((image, imageIndex)=>{
                        return (
                            <img src={image} alt={product.productName} className={`product__pic__img ${imageIndex == 0 && "product__pic__img--visible"}`} />
                        )
                    })
                }
            </a>
            </div>
            {product.colors &&
                <div className="colorchip">
                <span className="sr-only">전체 색상</span>
                    {
                        product.colors.map((color, colorIndex) =>{
                            return (
                                <span className={`colorchip__item ${colorIndex == 0 && "colorchip__item--active"}`}>
                                    <span className="colorchip__item__label" style={{backgroundColor:`#${color.code}`}}>
                                        <span className="sr-only">{color.label}</span>
                                    </span>
                                </span>
                            )
                        })
                    }
                </div>
            }
            
            <a href={`/product-view/${product.productNo}`} className="product__title">
            <strong className="product__title__name">{product.productName}</strong>
            { product.badge_label && (
                product.badge_label == "reserve" ?     
                    <span className="badge__label badge__label__reserve">예약판매</span> :
                    ( product.badge_label == "outstock" ? <span className={`badge__label badge__label__outofstock`}>일시품절</span> : (
                        product.badge_label == "soldout" ? <span className={`badge__label badge__label__soldout`}>품절</span> : 
                        <span className={`badge__label badge__label__release`}>출시예정</span>
                    ) )
            )}
            
            </a>
            { product.productNameEn &&
                <a href={`/product-view/${product.productNo}`} className="product__info">
                {product.productNameEn}
            </a>
            }
            
            <div className="product__price">
            <span className="product__price__num">{wonComma(product.salePrice)}</span>
                {/* 원 단위 콤마 필수  */}
            <span className="product__price__unit">원</span>
            </div>
        </div>
    </>
  );
}


                                    