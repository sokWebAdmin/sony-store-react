import { useState, useMemo } from 'react';
import { useWindowSize, wonComma } from '../../utils/utils';
import { getPricePerProduct, getSaleStatus } from '../../utils/product';
import { useCategoryState } from '../../context/category.context';

import ButtonGroup from './viewTopContent/ButtonGroup';
import Option from './viewTopContent/Option';
import Benefits from './viewTopContent/Benefits';
import ColorChip from './viewTopContent/ColorChip';
import SnsShare from './viewTopContent/SnsShare';
import { toCurrencyString } from '../../utils/unit';

export default function TobContent({
  productData,
  options,
  hasColor,
  productNo,
  setSelectedOptionNo,
  productGroup,
  wish,
  setWish,
  naverPayBtnKey,
  saleStatus,
  isMapping,
  accumulationUseYn,
}) {
  const size = useWindowSize();
  const isMobileSize = size.width <= 1280;
  const { tagColorMap } = useCategoryState();
  const { baseInfo, price, deliveryFee, status, limitations } = productData;
  const { productName, productNameEn, promotionText, stickerLabels } = baseInfo;
  const [selectedOption, setSelectedOption] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [optionVisible, setOptionVisible] = useState(false);

  const isSoldOut = useMemo(
    () => ['READY_RESERVE', 'SOLDOUT', 'READY'].includes(saleStatus),
    [status?.soldout, saleStatus],
  );

  const priceInfo = getPricePerProduct(price);

  const hsCode = useMemo(() => productData?.baseInfo?.hsCode ?? null, [productData]);
  return (
    <form>
      <div className={`product_view_about ${isSoldOut && 'soldout'}`}>
        <div className="cont" style={{ marginTop: '0', padding: '0 30px 0 0' }}>
          {stickerLabels.length > 0 && (
            <span
              className={`flag ${tagColorMap[stickerLabels[0]]}`}
              style={{
                color: tagColorMap[stickerLabels[0]],
                paddingRight: '5px',
              }}
            >
              {stickerLabels[0]}
            </span>
          )}
          {/* {
            스티커 복수개 노출 시 주석 해제 후 윗 부분 삭제
            stickerLabels?.map((label, idx) => (
              <span key={`${label}${idx}`} className={`flag ${tagColorMap[label]}`} style={{ color: tagColorMap[label], paddingRight: '5px' }}>{label}</span>
            ))
          } */}
          {/* <span className="flag new">NEW</span>class : new / event / best / hot */}
          <p className="product_tit">{productName}</p>
          {productNameEn && <p className="product_txt">{productNameEn}</p>}
          {promotionText && <p className="product_desc">{promotionText}</p>}
          <SnsShare productName={productName} />
        </div>

        {/* 배송 */}
        <div className="cont">
          <p className="delivery_txt">{deliveryFee?.defaultDeliveryConditionLabel}</p>
          <div className="product_price">
            {/* {
              priceInfo?.origin ?
              <>
                <div className="sale">
                  <strong className="price">{toCurrencyString(price.discount)}</strong> 원
                </div>
                <div className="original">
                  <strong className="price">{toCurrencyString(priceInfo.origin)}</strong> 원
                </div>
              </>
              : */}
            <div className="sale">
              <strong className="price">{toCurrencyString(price.salePrice)}</strong> 원
            </div>
          </div>
        </div>

        <Benefits price={price} accumulationUseYn={productData?.baseInfo?.accumulationUseYn} />

        {hasColor && (
          <ColorChip setSelectedOptionNo={setSelectedOptionNo} productGroup={productGroup} />
        )}

        {/* prd_select_wrap */}
        <div className={`cont prd_select_wrap ${isMobileSize && optionVisible && 'view'}`}>
          <Option
            isMapping={isMapping}
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
            optionVisible={optionVisible}
            isMobileSize={isMobileSize}
          />

          {/* 총 상품금액 */}
          <div className={`result_list ${selectedOption?.length > 0 && 'on'}`}>
            <div className="result_chk_box">
              <p className="tit">
                총 상품금액{' '}
                <span className="s_txt">
                  (총 <span className="count">{totalCnt > 0 ? totalCnt : '-'}</span>개)
                </span>
              </p>
              <p className="result_price">
                <span className="num">{totalPrice > 0 ? wonComma(totalPrice) : '-'}</span> 원
              </p>
            </div>
          </div>

          <ButtonGroup
            selectedOption={selectedOption}
            productNo={productNo}
            canBuy={totalCnt > 0}
            wish={wish}
            setWish={setWish}
            saleStatus={saleStatus}
            memberOnly={limitations?.memberOnly}
            hsCode={hsCode}
            optionVisible={optionVisible}
            setOptionVisible={setOptionVisible}
            isMobileSize={isMobileSize}
            limitaions={limitations}
          />
        </div>
      </div>
    </form>
  );
}
