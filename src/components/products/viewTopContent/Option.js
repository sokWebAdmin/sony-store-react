import { useCallback, useState } from "react";
import { colorsGroupByOptionNo, getColorChipInfo } from "../../../utils/product";
import _ from "lodash";
import SelectBox from "../../common/SelectBox";
import CountBox from "../../common/CountBox";
import { wonComma } from "../../../utils/utils";

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
    const disabled = o.forcedSoldOut || reserved ? o.reservationStockCnt === 0 : o.stockCnt === 0;
    return {
      ...o,
      disabled,
      label: colorChipInfo?.label,
      background: colorChipInfo?.background
    }
  }, [colorByOptionNo, hasColor, productName]);

  const [deleteOptionNo, setDeleteOptionNo] = useState(0);

  return (
    <div className="prd_select_inner">
            
      <div className="prd_select_box">
        <p className="tit">제품선택</p>

        {
          options &&
          <SelectBox
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
        />
        }
                
      </div>
      
        
      <div className="selected_opt">
        {selectedOption.length > 0 && selectedOption.map((item, itemIndex) => (
          <div className="opt_info" key={itemIndex}>
            <p className="opt_tag">제품</p>
            <div className="opt_item">
              <div className="item">
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