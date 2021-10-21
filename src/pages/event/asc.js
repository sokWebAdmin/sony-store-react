import React, { useState, useEffect, useRef } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/event.scss';
import { useMediaQuery } from '../../hooks';
import { Link, useParams } from 'react-router-dom';
import { getEventByEventNo } from '../../api/display';
import { getUrlParam } from '../../utils/location';
import EventProducts from '../../components/event/EventProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import GradeSelect from '../../components/event/GradeSelect';

const _scrollView = {
  pc : 5,
  tb : 3,
  mo : 2
};

export default function Refurbish() {
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { eventNo } = useParams();
  const onlyMo = useMediaQuery('(max-width: 640px)');
  const [event, setEvent] = useState(null);
  const [tabState, setTabState] = useState(getUrlParam('tab') || '전체');
  const [showLayer, setShowLayer] = useState(false);
  const [grade, setGrade] = useState('전체');

  const fetchDetailEvent = async () => {
    const response = await getEventByEventNo(eventNo, { soldout: true });
    setEvent(response.data);
  };

  const closeLayer = () => {
    document.body.style.overflow = 'auto';
    setShowLayer(false);
  }

  useEffect(() => {
    fetchDetailEvent();
  }, []);

  return (
    <>
      <SEOHelmet title={'ASC몰'} />
      {showLayer && <div className="layer agree_layer popup_empolyee" style={{display: 'block'}}>
        <div className="layer_wrap">
          <div className="layer_container">
            <div className="layer_title">
              <h1>ASC몰 이용 규정</h1>
            </div>
            <div className="layer_content">
              <div className="scroll_inner">
                <div className="foot_cont">
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first">1. 등급 대상제품 및 구매범위</h5>
                      <p>등급 판매는 소니코리아에서 취급하는 제품에 한하여 제품 상태에서 따라 A, B ,C 등급으로 나눠서 진행됩니다. 본 몰에서 판매되는 제품은 ASC를 대상으로만
                        판매합니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">2. 등급가격</h5>
                      <p>각 등급별 제품의 가격은 아래와 같이 적용됩니다.</p>
                      <ol>
                        <li>A등급: Base Price(출고가격)의 103% 판매 (VAT 포함)</li>
                        <li>B등급: Base Price(출고가격)의 80% 판매 (VAT 포함)</li>
                        <li>C등급: Base Price(출고가격)의 60% 판매 (VAT 포함)</li>
                      </ol>
                      <p className="mt">각 제품에 따라서 판매시마다 특별 가격을 부여할 수 있습니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">3. 운영방법</h5>
                      <ol>
                        <li>
                          1) 등급 가능 시간<br/>
                          특정 기간의 판매 기간 동안에만 구매하실 수 있습니다.
                        </li>
                        <li className="mt">2) 등급 금지품목<br/>
                          영업 정책상 할당제품은 등급이 제한될 수 있습니다.</li>
                        <li className="mt">3) 사판 구매 가능 수량 쿼터제 실시<br/>
                          일부 제품에 대하여 ASC당 구매 가능 수량을 제한할 수 있으며, 제품 상황에 따라 그 조건을 변경할 수 있습니다. 이는 전 ASC에 등급 구입의 공정한 기회를 제공하기
                          위하여 실시하는 제도 입니다.</li>
                        <li className="mt">4) 등급 구매절차<br/>
                          소니 스토어에 회원 가입 후 ASC 인증을 거친 후에 이용하실 수 있습니다. 해당 몰 접속은 ASC내에서만 가능합니다.</li>
                        <li className="mt">5) 결제<br/>
                          모든 결제는 구매 당일에 이루어져야 하며, 하기와 같은 두 가지 결제 방식이 있습니다.<br/>무통장입금 과 신용카드 (모든 종류의 신용카드 가능하며 본인 및 타인 소유의
                          카드 결제 가능)로 결제 하여야 합니다. 결제내역 등은 변경이 불가합니다.<br/>
                            무통장 입금 계좌 번호는 아래와 같습니다.<br/>무통장 입금계좌: 우리은행 940-001346-13-004
                        </li>
                        <li className="mt">6) 배송<br/>
                          배송기간은 등급 제품 구매 후 최종 발송 완료 메일을 받은 후로 약 2일정도 소요됩니다. 단, 교통 및 일부 지역적인 사정에 따라 배송이 지연되는 경우가 발생할 수
                          있습니다. 일요일, 공휴일은 배송되지 않습니다.</li>
                        <li className="mt">7) 제품 보증기간<br/>
                          등급 판매를 통해서 구입하신 B, C등급품의 경우 구입일로부터 1년간 무상보증수리를 받으실 수가 있으나, SCS 고객지원사이트(<a
                          href="http://scs.sony.co.kr" target="_blank" title="새창열림">http://scs.sony.co.kr</a>) 또는 제품
                          박스 내에 동봉되어 있는 보증연장신청서를 통한 보증연장신청 및 이쿠폰 발행은 적용되지 않습니다. 단, A급 제품의 경우 보증연장신청은 할 수 있으나 이 쿠폰은 발행되지
                          않습니다.
                        </li>
                        <li className="mt">8) AS<br/>
                          이 필요한 경우 가까운 서비스센터(1588-0911)를 통해 구입자 본인이 직접 연락하셔야 합니다. 액세서리 누락의 경우, CS(080-021-2000)로 연락해주시기
                          바랍니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">4. 등급 구입시 주의사항</h5>
                      <ol>
                        <li>1) 반품<br/>
                          - 제품을 구매하기 전에 반드시 구매하고자 하는 제품인지를 확인하고 제품을 신청하여야 하며 구입 이후 제품의 중요한 결함이 없는 경우 반품이 불가능 합니다.<br/>
                          - 일반적인 고객변심 등의 사유로는 반품 불가합니다.<br/>
                          - 일반적인 고객변심 등의 사유로는 반품 불가합니다.
                        </li>
                        <li className="mt">
                          2) 고객에게 등급제품 소개시 준수사항<br/>
                          - 등급 제품 소개시 등급품에 대한 내용을 충분히 설명해주시기 바랍니다.<br/>
                          - 제품의 최종 수령까지 제품의 인수여부를 확인해주시기 바랍니다.<br/>
                          - 차후 논란이 발생하지 않도록 꼭 CS Net이 아니더라도 판매 일지에 작성하여 고객에게 판매된 증빙을 남겨 주시기 바랍니다.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">5. 등급판매 담당자 연락처</h5>
                      <p>담당자: (e-mail: <a href="mailto:sok-ts@sony.co.kr" title="새 창">sok-ts@sony.co.kr</a>)</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">6. 기타사항</h5>
                      <p>상기 내용 이외의 사항 또는 예측할 수 없는 상황의 발생에 대하여는 주관부서의 협의를 거쳐시행 합니다.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button onClick={() => closeLayer()} className="layer_close close" title="팝업창 닫기">
              <span>팝업창 닫기</span>
            </button>
          </div>
        </div>
      </div>}
      {event && <div className="contents events">
        <div className="container full">
          <div className="content employee">
            <div className="event_header">
              <div className="event_header_inner"
                   style={{ background: `url('${onlyMo ? event.top.mobile.url : event.top.pc.url}') no-repeat 0 0` }}>
                <h1 className="event_header_title">{event.label}</h1>
                <p className="event_header_desc">{event.promotionText}</p>
                <div className="event_header_link"><a href="javascript:void(0)" onClick={() => {
                  document.body.style.overflow = "hidden";
                  setShowLayer(true);
                }}>ASC 이용규정</a></div>
              </div>
            </div>
            <div className="event_tablist">
              <div className="tab_ui scroll category_evnet swiper-container">
                <Swiper
                  className="swiper-wrapper"
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  slidesPerView={_scrollView.pc}
                  breakpoints={{
                    320: {
                      slidesPerView: _scrollView.mo,
                    },
                    641: {
                      slidesPerView: _scrollView.tb,
                    },
                    1281: {
                      slidesPerView: _scrollView.pc,
                    },
                  }}
                  on={{
                    init: swiper => {
                      swiper.params.navigation.prevEl = prevRef.current
                      swiper.params.navigation.nextEl = nextRef.current
                      swiper.navigation.update()
                    },
                  }}
                >
                  <SwiperSlide className={`tabs swiper-slide ${tabState === '전체' ? 'on' : ''}`}>
                    <Link to={`?tab=전체`} onClick={() => setTabState('전체')} className="btn">전체</Link>
                  </SwiperSlide>
                  {event.section.map(({label}) => {
                    return (
                      <SwiperSlide key={`tab_${label}`} className={`tabs swiper-slide ${tabState === label ? 'on' : ''}`}>
                        <Link to={`?tab=${label}`} onClick={() => setTabState(label)} className="btn">{label}</Link>
                      </SwiperSlide>
                    )
                  })}
                  <div className="swiper-button-prev" ref={prevRef}></div>
                  <div className="swiper-button-next" ref={nextRef}></div>
                </Swiper>
              </div>
              <div className="tab_ui_info">
                <div className="tab_ui_inner view">
                  <div className="employee_prd">
                    <GradeSelect tabState={tabState} grade={grade} setGrade={setGrade} />
                    <EventProducts event={event} filterLabel={tabState} grade={grade} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}