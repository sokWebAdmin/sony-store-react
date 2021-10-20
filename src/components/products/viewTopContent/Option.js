import { useCallback, useEffect, useState } from "react";
import { colorsGroupByOptionNo, getColorChipInfo } from "../../../utils/product";
import _ from "lodash";
import SelectBox from "../../common/SelectBox";
import CountBox from "../../common/CountBox";
import { wonComma } from "../../../utils/utils";

const getDisabledLabel = (reserved, o) => {
  if (o.reservationStockCnt > 0) return '';
  if (o.stockCnt > 0) return '';
  if (o.saleType === 'SOLDOUT') return '일시품절';
  if (o.stockCnt === 0 || o.reservationStockCnt === 0) return '일시품절';
  return '';
};

// 선택된 옵션 리스트
export default function Option({
  productName,
  options,
  hasColor, 
  selectedOption, 
  setSelectedOption, 
  setTotalCnt, 
  setTotalPrice,
  totalCnt,
  totalPrice,
  saleStatus,
  optionVisible,
  isMobileSize
}) {
  const reserved = saleStatus === 'RESERVE';

  const colorByOptionNo = colorsGroupByOptionNo(options, productName);
  const getSelectOptions = useCallback(o => {
    const colorChipInfo = getColorChipInfo(
                        hasColor, 
                        productName, 
                        _.head(colorByOptionNo[o.optionNo])?.value,
                        o
                      );

    const disabledLabel = getDisabledLabel(reserved, o);
    return {
      ...o,
      disabled: !!disabledLabel,
      disabledLabel,
      label: colorChipInfo?.label,
      background: colorChipInfo?.background
    }
  }, [colorByOptionNo, hasColor, productName]);

  const [deleteOptionNo, setDeleteOptionNo] = useState(0);

  const showOption = options && ((!isMobileSize) || (isMobileSize && optionVisible));

  useEffect(() => isMobileSize && !optionVisible && setSelectedOption(() => []), [optionVisible])

  return (
    <div className="prd_select_inner">
            
      <div className="prd_select_box">
        <p className="tit">제품선택</p>
        {
          showOption && <SelectBox
            selectOptions={options.map(getSelectOptions)}
            selectOption={
              option => {
                setSelectedOption(prev => prev.concat({
                  ...option,
                  buyCnt: 1,
                }));
                setTotalCnt(totalCnt + 1);
                setTotalPrice(totalPrice + option.buyPrice);
            }}
            deleteOptionNo={deleteOptionNo}
            setDeleteOptionNo={setDeleteOptionNo}
            open={ isMobileSize && optionVisible }
          />
        }
                
      </div>
      
        
      <div className={`selected_opt ${isMobileSize && optionVisible && 'on'}`}>
        {selectedOption.length > 0 && selectedOption.map((item, itemIndex) => (
          <div className="opt_info" key={itemIndex}>
            <p className="opt_tag">제품</p>
            <div className="opt_item">
              <div className="item">
                {
                  item?.background && (
                      <span className="circle_color">
                        <span className="c_bg" style={{ background: item?.background }}></span>
                      </span>
                    )
                }
                <span className="opt_name">{item.label}</span>
              </div>
            </div>
            <div className="opt_count">
              <CountBox
                initialCount={item?.buyCnt}
                maxCount={reserved ? item.reservationStockCnt : item.stockCnt}
                changedCount={currentCount => {
                  if (!currentCount) return;
                  const { buyCnt: prevBuyCnt, buyPrice } = selectedOption[itemIndex];

                  const tempOptionList = selectedOption;
                  tempOptionList[itemIndex] = {
                    ...item,
                    buyCnt: currentCount,
                  };
          
                  setSelectedOption(() => tempOptionList);

                  setTotalCnt(
                    () => _.chain(tempOptionList)
                            .map(({ buyCnt }) => buyCnt)
                            .sum()
                            .value()
                  )
                  setTotalPrice(() => totalPrice - (prevBuyCnt * buyPrice) + (currentCount * buyPrice))
                }}
              />
      
              <p className="opt_price">
                <strong className="price">{wonComma(item.buyPrice * item.buyCnt)}</strong>원
              </p>
            </div>
            <a 
              href="#delete" 
              className="prd_delete" 
              onClick={ event => {
    
                event.preventDefault();
                const tempOptionList = selectedOption.filter(({ optionNo }) => optionNo !== item.optionNo);
              
                setTotalCnt(totalCnt - item.buyCnt);
                setTotalPrice(totalPrice - (item.buyCnt * item.buyPrice));

                setSelectedOption(() => tempOptionList);

                setDeleteOptionNo(item.optionNo)
      
              }}>구매 목록에서 삭제</a>
          </div>
        ))}
      </div>
    </div>
  )
}