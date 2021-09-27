import { useState } from "react";
import { wonComma } from "../../utils/utils";
import { getPricePerProduct, getSaleStatus } from "../../utils/product";
import { useCategoryState } from "../../context/category.context";

import ButtonGroup from "./viewTopContent/ButtonGroup";
import Option from "./viewTopContent/Option";
import Benefits from "./viewTopContent/Benefits";
import ColorChip from "./viewTopContent/ColorChip";
import SnsShare from "./viewTopContent/SnsShare";
import { toCurrencyString } from "../../utils/unit";


export default function TobContent({
  productData,
  options,
  hasColor,
  productNo,
  setSelectedOptionNo,
  productGroup,
  wish,
  setWish
}) {
  const { tagColorMap } = useCategoryState();
  const { baseInfo, price, deliveryFee, status, reservationData } = productData;
  const { productName, productNameEn, promotionText, stickerLabels } = baseInfo;
  const [selectedOption, setSelectedOption] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const saleStatus = getSaleStatus(status, reservationData);

  const isSoldOut = status.soldout || ['READY_RESERVE', 'SOLDOUT', 'READY'].includes(saleStatus);
  
  const priceInfo = getPricePerProduct(price);
  return (
    <form>
      <div className={`product_view_about ${status.soldout && 'soldout'}`}>
        <div className="cont">
          {
            stickerLabels.length > 0 && <span className={`flag ${tagColorMap[stickerLabels[0]]}`} style={{ color: tagColorMap[stickerLabels[0]], paddingRight: '5px' }}>{stickerLabels[0]}</span>
          }
          {/* {
            stickerLabels?.map((label, idx) => (
              <span key={`${label}${idx}`} className={`flag ${tagColorMap[label]}`} style={{ color: tagColorMap[label], paddingRight: '5px' }}>{label}</span>
            ))
          } */}
          {/* <span className="flag new">NEW</span>class : new / event / best / hot */}
          <p className="product_tit">{productName}</p>
          { productNameEn && <p className="product_txt">{productNameEn}</p> }
          {/* @TODO promotionText 날짜가 api 에서 제공되지 않음 */}
          { promotionText && <p className="product_desc">{promotionText}</p> }
          <SnsShare productName={productName} />
        </div>
        
        {/* 배송 */}
        <div className="cont">
          <p className="delivery_txt">
            {deliveryFee.defaultDeliveryConditionLabel}
            </p>
          <div className="product_price">
            {
              priceInfo?.origin ?
              <>
                <div className="sale">
                  <strong className="price">{toCurrencyString(priceInfo.discount)}</strong> 원
                </div>
                <div className="original">
                  <strong className="price">{toCurrencyString(priceInfo.origin)}</strong> 원
                </div>
              </>
              :
              <div className="sale">
                <strong className="price">{toCurrencyString(priceInfo.discount)}</strong> 원
              </div>
            }
            {saleStatus === 'READY' && <span className={`badge__label badge__label__outofstock`}>일시품절<span className="icon_question">!</span></span>}
            {saleStatus === 'SOLDOUT' && <span className={`badge__label badge__label__soldout`}>품절<span className="icon_question">!</span></span>}
          </div>
        </div>
        
        <Benefits
          price={price}
        />

        {
          hasColor && <ColorChip isSoldOut={isSoldOut} setSelectedOptionNo={setSelectedOptionNo} productGroup={productGroup} />
        }

        {/* prd_select_wrap */}
        <div className="cont prd_select_wrap">
          <Option
            productName={productName}
            options={options}
            hasColor={hasColor}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setTotalCnt={setTotalCnt}
            setTotalPrice={setTotalPrice}
            totalCnt={totalCnt}
            totalPrice={totalPrice}
            productGroup={productGroup}
            saleStatus={saleStatus}
          />
          
          {/* 총 상품금액 */}
          <div className="result_list">
            <div className="result_chk_box">
              <p className="tit">총 상품금액 <span className="s_txt">(총 <span className="count">{totalCnt > 0 ? totalCnt : "-"}</span>개)</span></p>
              <p className="result_price"><span className="num">{totalPrice > 0 ? wonComma(totalPrice) : "-"}</span> 원</p>
            </div>
          </div>
          
          <ButtonGroup
            selectedOption={selectedOption}
            productNo={productNo}
            canBuy={totalCnt > 0}
            wish={wish}
            setWish={setWish}
            saleStatus={saleStatus}
          />
        </div>
      </div>
    </form>
  )
}