import React, { useState, useEffect, useRef } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/event.scss';
import { useMediaQuery } from '../../hooks';
import { getEventByEventNo } from '../../api/display';
import { getUrlParam } from '../../utils/location';
import { Link, useHistory, useParams } from 'react-router-dom';
import EventProducts from '../../components/event/EventProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import GradeSelect from '../../components/event/GradeSelect';
import IpChecker from '../../components/event/SonyInHouseIpChecker';

const _scrollView = {
  pc : 5,
  tb : 3,
  mo : 2
};

export default function Employee() {
  const history = useHistory()

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
    new IpChecker().run().then(checked => {
      if (!checked) {
        alert('회사 내에서만 접속이 가능합니다.')
        history.push('/')
      }

      fetchDetailEvent()
    }).catch(() => {
      alert('잘못된 접근입니다.')
      history.push('/')
    });
  }, []);

  return (
    <>
      <SEOHelmet title={'임직원몰'} />
      {showLayer && <div className="layer agree_layer popup_empolyee" style={{display: 'block'}}>
        <div className="layer_wrap">
          <div className="layer_container">
            <div className="layer_title">
              <h1>임직원몰 이용규정</h1>
            </div>
            <div className="layer_content">
              <div className="scroll_inner">
                <div className="foot_cont">
                  <ul>
                    <li>
                      <h5 className="Fh5_tit first">1. 사판 대상제품 및 구매범위</h5>
                      <p>사내 판매는 CP Division Company 에서 취급하는 제품에 한하여 제품 상태에서 따라 A,B,C 등급으로 나눠서 진행됩니다. 소니코리아를 비롯한 소니 관계사의
                        임직원을 대상으로 판매합니다.</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">2. 사판가격</h5>
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
                          1) 사판 가능 시간<br/>
                          A급 제품은 임직원 특가몰에 업로드된 제품을 상시로 구매하실 수 있으며, 등급 제품의 경우, 특정 기간의 판매 기간동안에만 구매하실 수 있습니다.
                        </li>
                        <li className="mt">2) 사판금지품목<br/>
                          영업 정책상 할당제품은 사판이 제한될 수 있습니다.</li>
                        <li className="mt">3) 사판 구매 가능 수량 쿼터제 실시<br/>
                          일부 제품에 대하여 개인당 구매 가능 수량을 제한할 수 있으며, 제품 상황에 따라 그 조건을 변경할 수 있습니다. 이는 전사원에게 사판 구입의 공정한 기회를 제공하기
                          위하여 실시하는 제도 입니다.</li>
                        <li className="mt">4) 사판 구매절차<br/>
                          소니스토어 회원 가입 후 소니코리아 및 관계사 직원 인증을 거친 후에 이용하실 수 있습니다.</li>
                        <li className="mt">5) 결제<br/>
                          모든 결제는 구매 당일에 이루어져야 하며, 하기와 같은 두가지 결제 방식이 있습니다.
                          무통장입금 과 신용카드 (모든 종류의 신용카드 가능하며 본인 및 타인 소유의 카드 결제 가능)로 결제 하여야 합니다. 결제내역등은 변경이 불가합니다.<br/>무통장 입금
                          계좌 번호는 주문 완료 시 메일과 SMS(주문자 핸드폰번호)을 통해 계좌번호를 보내 드립니다.</li>
                        <li className="mt">6) 배송<br/>
                          배송기간은 사판 제품 구매 후 최종 발송 완료 메일을 받은 후로 약 2일정도 소요됩니다. 단, 교통 및 일부 지역적인 사정에 따라 배송이 지연되는 경우가 발생할 수
                          있습니다. 일요일, 공휴일은 배송되지 않습니다.</li>
                        <li className="mt">7) 제품 보증기간<br/>
                          사내 판매를 통해서 구입하신 B, C등급품의 경우 A급 제품과 동일한 기준으로 보증기간이 산정 됩니다. [SCS 고객지원사이트(<a
                          href={window.anchorProtocol + 'scs.sony.co.kr'} onClick={window.openBrowser} target="_blank" title="새창열림">http://scs.sony.co.kr</a>) 참조]
                          단, B,C 등급 제품의 경우 이쿠폰 발행은 적용되지 않으며, 연장 서비스 플랜 구매가 불가합니다.
                          A급 제품의 경우 연장 서비스 플랜 구매는 가능하며, 이쿠폰은 발행되지 않습니다.
                        </li>
                        <li className="mt">8) AS<br/>
                          이 필요한 경우 가까운 서비스센터(1588-0911)를 통해 구입자 본인이 직접 연락하셔야 합니다. 액세서리 누락의 경우, CS(080-021-2000)로 연락해주시기
                          바랍니다.</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">4. 사판 구입 시 주의사항</h5>
                      <ol>
                        <li>1) 반품<br/>
                          - 제품을 구매하기 전에 반드시 구매하고자 하는 제품인지를 확인하고 제품을 신청하여야 하며 구입이후 제품의 중요한 결함이 없는 경우 반품이 불가능 합니다.<br/>
                          - 사내판매는 재판매를 금지하고 있으며, 일반적인 고객변심등의 사유로는 반품 불가합니다.<br/>
                          - 제품 반품의 경우에는 반드시 고객서비스센터에 구입자 본인이 방문하여, 수리불가 판정을 받은 경우에 한해서만 반품 및 환불이 가능합니다.
                        </li>
                        <li>
                          2) 제3자에게 등급제품 소개시 준수사항<br/>
                          - 등급 제품 소개시 등급품에 대한 내용을 충분히 설명해주시기 바랍니다.<br/>
                          - 제품의 최종 수령까지 제품의 인수여부를 확인해주시기 바랍니다.<br/>
                          - CS의 대응이 필요한 경우에는 하자 내용 확인 후 구매한 직원이 내용 확인 후 신속한 조치를 취해주시기 바랍니다.<br/>
                          - 임직원 외 제3고객이 사내판매를 통해 구매한 제품을 문제없이 사용할 수 있도록 임직원으로서 책임감을 가지고 대응해주시기 바랍니다.
                        </li>
                        <li>3) 재 판매 금지<br/>
                          사내판매는 브랜드 이미지 관리를 위하여 엄격하게 재판매를 금지하고 있습니다. 적발 시 회사 브랜드에 심각한 이미지 손상을 한 책임을 물어 아래와 같은 조치를 취할 수
                          있으니 각별히 유의해주시기 바랍니다.<br/>
                          - 사내판매 구입자격 박탈<br/>
                          - 사안이 심각한 경우 인사조치 등으로 제재 가능</li>
                      </ol>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">5. 사내판매 담당자 연락처</h5>
                      <p>담당자: (e-mail: <a href="mailto:internalsales@sony.co.kr"
                                          title="새 창">internalsales@sony.co.kr</a>)</p>
                    </li>
                    <li>
                      <h5 className="Fh5_tit">6. 기타사항</h5>
                      <p>상기 내용 이외의 사항 또는 예측할 수 없는 상황의 발생에 대하여는 주관부서의 협의를 거쳐시행 합니다.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button className="layer_close close" title="팝업창 닫기" onClick={() => closeLayer()}>
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
                }}>임직원몰 이용규정</a></div>
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
                    <GradeSelect tabState={tabState} grade={grade} setGrade={setGrade}/>
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