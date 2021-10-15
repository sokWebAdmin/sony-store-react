import React, { useState } from 'react';

// components
import LayerPopup from '../../common/LayerPopup';

// stylesheet
import '../../../assets/scss/contents.scss';
import { postCart } from '../../../api/order';
import EspAddCartComplete from './EspAddCartComplete';
import { getProductOptions } from '../../../api/product';

export default function EspAddCart({ product, onClose }) {
  const [showCompletePopup, setShowCompletePopup] = useState(false);

  const _addCart = async () => {
    let success = false;
    console.log(product);
    const options = await _getProductOptions(product.modelcod);
    debugger;
    if (options.length > 0) {
      success = await _postCart(product.modelcod, options[0].optionNo, [
        { inputLabel: 'serialNo', inputValue: product.serialno },
        { inputLabel: 'sonyProductNo', inputValue: product.modelcod },
      ]);
    }
    console.log(success);
    debugger;
    if (success) {
      setShowCompletePopup(true);
    }
  };

  const _getProductOptions = async (productNo) => {
    let flatOptions = [];

    try {
      const { status, data } = await getProductOptions(productNo);

      if (status === 200 && data?.flatOptions?.length > 0) {
        flatOptions = data.flatOptions;
      }
    } catch (e) {
      console.error(e);
    }

    return flatOptions;
  };

  const _postCart = async (productNo, optionNo, optionInputs) => {
    try {
      const { status } = await postCart([
        {
          productNo,
          optionNo,
          optionInputs,
          orderCnt: 1,
        },
      ]);

      if (status === 200) {
        return true;
      }
    } catch (e) {
      console.error(e);
    }

    return false;
  };

  return (
    <>
      <LayerPopup className="esp_pop" size={'m'} popContClassName={'scrollH'} onClose={onClose}>
        <p className="pop_tit">연장 서비스 플랜 이용약관</p>
        <div className="pop_cont_scroll" style={{ height: '573.703px' }}>
          <p className="pop_txt txt_l">
            본 이용약관은 고객님께서 Sony(이하 본문의 "Sony"는 Sony Korea Corporation을 의미)로부터 주문하신 연장 서비스
            플랜(Extended Service Plan, 이하 "ESP")의 범위 및 조건이 명시되어 있습니다.
          </p>
          <div className="inner_scroll">
            <div className="related_laws">
              <ul className="dot_line">
                <li>
                  <p className="tit">1조. ESP 대상 고객 및 제품</p>
                  <p className="desc">
                    본 ESP는 Sony 또는 Sony의 공식대리점을 통해 판매된 제품 중 지정된 모델을 구매한 고객이 대상이
                    됩니다. (등급 제품 제외) 본 ESP는 해당 제품과 동시에 구입하거나 제품 구매일로부터 1년 이내에
                    구입해야 합니다.
                  </p>
                </li>
                <li>
                  <p className="tit">2조. ESP 유효 기간</p>
                  <p className="desc">
                    본 ESP가 적용되는 유효기간 기산을 위한 기준일은 ESP가 적용되는 제품(본체)의 최초 구매일 입니다. 당해
                    구매일을 기준으로 ESP의 유효기간이 산정되며 당해 유효기간의 종료일에 ESP의 효력이 종료됩니다. 제품
                    구매일자의 확인은 보증서 또는 구입 영수증과 당사 제품 관리 전산시스템을 기준으로 합니다. 본 ESP의
                    유효기간은 연장되거나 갱신 되지 않습니다.
                  </p>
                </li>
                <li>
                  <p className="tit">3조. ESP 제공 내용</p>
                  <p className="desc">
                    본 ESP는 ESP의 유효기간 동안 ESP에 지정된 제품에 한해 고장 발생시 본 이용약관 제4조 무상 수리 조건에
                    근거하여 횟수에 관계없이 전액 무상 수리 서비스를 제공합니다. 단 본 이용약관 제5조의 무상 수리가
                    제외되는 각 항목에 해당하는 경우는 예외로 합니다.
                  </p>
                </li>
                <li>
                  <p className="tit">4조. 무상 수리 조건</p>
                  <p className="desc">
                    본 이용약관에 근거하여, 무상 수리는 표준 사용법을 준수한 상태에서(사용설명서, 라벨, 제품과 함께
                    제공된 인쇄물에 명시된) 발생한 제품 또는 기능 문제에 대해서만 무상으로 적용됩니다. 본 ESP는 제품의
                    액세서리(배터리, 리모컨 등)에는 적용되지 않으며, 사용설명서, 라벨 및 구매 시 포함된 인쇄물 등을
                    포함하지 않습니다.
                  </p>
                </li>
                <li>
                  <p className="tit">5조. ESP에 의한 무상 수리에서 제외되는 경우</p>
                  <p className="desc">
                    아래의 각각에 해당하는 경우에는 ESP에 의한 무상 수리 대상에서 제외되어 유상 수리로 처리됩니다.
                  </p>
                  <ol>
                    <li className="desc">1. 표면손상</li>
                    <li className="desc">
                      2. 사고로 인한 경우, 올바르지 않은 사용, 제품의 용법에 의한 사용이 아닌 경우, 관리 소홀, 상업적인
                      사용, 제품의 개조로 인한 손상
                    </li>
                    <li className="desc">3. 부적절한 제품의 작동이나 유지 보수</li>
                    <li className="desc">4. 올바르지 않은 전원 공급으로 인한 손상</li>
                    <li className="desc">5. 제품 구매 후 운송 중 발생한 손상. 떨어뜨리거나 가열로 인한 손상</li>
                    <li className="desc">
                      6. 천재지변으로 인한 손상; 화재, 지진, 수해, 번개, 환경오염, 급격한 전류 변화
                    </li>
                    <li className="desc">
                      7. Sony 공식 서비스 센터가 아닌 다른 업체를 이용하여 수리한 경우 발생한 손상
                    </li>
                    <li className="desc">
                      8. Sony 제품 자체에 결함이 아닌, 액세서리, 타사 제품, 보조제품, 주변 장치 등을 연결 사용 발생한
                      제품 고장
                    </li>
                    <li className="desc">
                      9. 공장 출하 시 매겨진 시리얼 번호가 수정, 손상 또는 제거되어 확인 할 수 없는 제품
                    </li>
                    <li className="desc">10. 도난, 분실, 화재 등에 의한 제품의 멸실</li>
                    <li className="desc">
                      11. 설치 후 소비자의 부주의(이동,낙하,충격,파손,무리한 작동 등)로 발생된 고장, 파손, 손상 발생시
                    </li>
                    <li className="desc">12. 영업 및 영리 목적으로 지속적으로 사용되는 제품</li>
                  </ol>
                </li>
                <li>
                  <p className="tit">6조. 수리 요청 방법</p>
                  <p className="desc">
                    본 약관에 근거하여 수리가 필요하다면, 고객님이 현재 위치하고 계시는 지역의 Sony공식서비스센터 또는
                    고객지원 콜센터로 전화를 하셔서 수리 서비스를 요청하실 수 있습니다.
                  </p>
                </li>
                <li>
                  <p className="tit">7조. 면책</p>
                  <p className="desc">
                    Sony는 본 약관에 명시한 사항 이외에는 어떠한 명시적 또는 묵시적 보증도 하지 않으며 어떤 경우에도
                    고객에게 발생한 우연적 또는 결과적 손해에 대하여 책임을 지지 않습니다. 이러한 손해의 범위에는 이익
                    손실, 수입 손실, 데이터 손실, 제품 사용 기회의 상실, 관련 장비의 미사용으로 인한 피해, 시스템 정지
                    및 구매 중단으로 인한 시간 비용 및 이와 유사한 손실을 포함합니다. 또한 Sony는 제품의 시장성 또는
                    제품의 특정한 용도의 적합성 여부에 관하여 어떠한 의미의 보증도 하지 않습니다.
                  </p>
                </li>
                <li>
                  <p className="tit">8조. 개인 정보(사생활 보호)</p>
                  <p className="desc">
                    Sony는 고객에게 서비스를 제공하기 위해 제품의 제조번호, 제품 및 서비스 구입일 뿐만 아니라 고객의
                    개인정보(예를 들어 고객 이름, 주소, 전화번호, 여권번호). (이하 “고객정보”)를 요구할 수 있습니다.
                    고객정보는 외부 유출되지 않으며, 서비스 센터에서 필요한 기간 동안 보관됩니다. 지원요건 확인 및
                    서비스 제공 목적을 위해 Sony는 고객정보를 Sony 내 관련부서와 공유할 수 있습니다. 고객은 언제든
                    자신의 최근 정보를 Sony측에 제공할 수 있으며, 만약 잘못된 정보의 경우 요청하여 수정하실 수 있습니다.
                    개인정보와 관련된 고객의 권리는 관련 법률에 의거하여 보호됩니다. 개인정보에 대한 문의는 고객지원
                    콜센터로 문의하시기 바랍니다.
                  </p>
                </li>
                <li>
                  <p className="tit">9조. 양도</p>
                  <p className="desc">
                    본 ESP는 ESP가 적용되는 제품과 함께 양도가 가능합니다. 즉 제품과 분리하여 ESP만 양도할 수 없습니다.
                    양도에 관한 자세한 절차는 고객지원 콜센터로 문의해 주시기 바랍니다.
                  </p>
                </li>
                <li>
                  <p className="tit">10조. 취소/환불</p>
                  <ol>
                    <li className="desc">
                      1) 본 ESP는, ESP에 의한 무상 수리 연장기간이 적용되는 시점 이후에는 환불이 불가합니다.
                    </li>
                    <li className="desc">
                      2) 본 ESP가 적용되는 제품이 Sony귀책으로 인해 교환, 환불되는 경우 ESP의 효력은 자동으로 종료되며
                      Sony는 고객님께 ESP구입금액 전액을 환불합니다. 단, ESP 환불은 제품의 교환, 환불과 함께 자동으로
                      이루어지지 않으며 일반적인 취소, 환불 절차에 따라 고객지원 콜센터 및 이메일 (cshelp@sony.co.kr) 을
                      통해 별도로 요청해주셔야 합니다.
                    </li>
                  </ol>
                </li>
                <li>
                  <p className="tit">11조. 유의사항</p>
                  <ol>
                    <li className="desc">
                      1) 수리 요청으로 인해 발생되는 모든 배송비는 Sony 택배서비스 기준에 적용됩니다
                    </li>
                    <li className="desc">
                      2) 본 ESP의 유효기간은 품질보증기간이 아닙니다. 즉 품질보증기간이 연장되는 것이 아니므로 당해
                      유효기간 동안 소비자기본법상 제품의 교환/환불에 해당하는 사유가 발생되어도 제품의 교환, 환불은
                      불가합니다.
                    </li>
                    <li className="desc">
                      3) 수리시에 새 부품이거나 품질이 보증된 재사용 부품을 사용할 수 있습니다. 이때 교체되는 부품은
                      Sony의 재산입니다.
                    </li>
                    <li className="desc">
                      4) 본 ESP는 Sony Korea가 발행하였으며, 제공 서비스는 대한민국 내에서만 유효합니다.
                    </li>
                  </ol>
                </li>
                <li>
                  <p className="tit">12조. 기타</p>
                  <ol>
                    <li className="desc">
                      1) 상기에 언급되지 않은 사항들은 Sony의 수리 기준 또는 소비자기본법에 준합니다.
                    </li>
                    <li className="desc">
                      2) Sony는 언제라도 서비스의 특성이나 내용을 변경할 수 있는 권리를 유보합니다.
                    </li>
                  </ol>
                </li>
                <li>
                  <p className="desc">
                    본 이용약관에 근거한 ESP를 주문하시는 것은 이용약관에 기재된 내용을 모두 이해하고 준수하는 데
                    동의하신 것으로 간주됩니다.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="agree_check_box">
          <div className="check">
            <input type="checkbox" className="inp_check" id="agree_check" onChange={_addCart} />
            <label htmlFor="agree_check">동의합니다.</label>
          </div>
          <p>
            '연장 서비스플랜 이용약관' 동의 시<span className="mo"> 장바구니에 상품이 담깁니다.</span>
          </p>
        </div>
      </LayerPopup>
      {showCompletePopup && <EspAddCartComplete onClose={onClose} />}
    </>
  );
}
