import React, { useState, useEffect } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//lib
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';


//css
import "../../assets/scss/category.scss";
import "../../assets/scss/contents.scss";
import "../../assets/scss/esp.scss";


//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"
import { getProductSearch } from '../../api/product';
import EspProduct from '../../components/EspProduct';
import { useCategoryState } from '../../context/category.context';

export default function EspMain() {

    const { espCategory } = useCategoryState();

    // child category 카테고리
    const [focusCategory, setFocusCategory] = useState(null);

    // 상품 리스트
    const [product, setProduct] = useState({ list: [], page: 1, totalCount: 0 });

    // 탭 포커스 이동
    useEffect(() => {
        if (espCategory?.children?.length > 0) {
            setFocusCategory(espCategory.children[0]);
        }
    },[espCategory]);

    // 탭 포커스 이동
    useEffect(async () => {
        _initProduct();
    },[focusCategory]);

    const _initProduct = async () => {
        const data = await _getEspProducts(1);

        if (data.list.length === 0) {
            data.totalCount = 0;
        }

        setProduct(data);
    }

    const _addProduct = async () => {
        const data = { ...product };
        const addData = await _getEspProducts(data.page + 1);
        const getListLength = data.list.length;


        if (getListLength === 0) {
            return;
        }

        data.list = data.list.concat(addData.list);
        ++data.page;

        setProduct(data);
    }

    const _getEspProducts = async (pageNumber) => {
        const result = { list: [], page: pageNumber, totalCount: 0 };

        try {
            if (focusCategory) {
                const { status, data } = await getProductSearch({
                    categoryNos: focusCategory.categoryNo,
                    'order.by': 'MD_RECOMMEND',
                    pageNumber: pageNumber,
                    pageSize: 15,
                    hasOptionValues: true,
                    'filter.soldout': true,
                });

                if (status !== 200) {
                    throw 'get produts is not 200';
                }

                result.list = data.items;
                result.totalCount = data.totalCount;
            }
        }
        catch (e) {
            console.error(e);
        }

        return result;
    }

    // 왜 있는지 모르겠지만 다른데도 다 있길래 추가했습니다.
    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

    return (
        <>
            <SEOHelmet title={`연장 서비스 플랜 ESP`} />
            <div className="category">
                <div className="container">
                    <div className="contents">
                        <div className="category__header">
                            <h1 className="category__header__name">연장 서비스 플랜 ESP</h1>
                            <p className="category__header__desc">보다 편리하게 소니 상품을 이용하실 수 있는 소니스토어 프리미엄 서비스를 경험해 보세요.</p>
                        </div>
                        <div className="espinfo">
                            <h2 className="espinfo__title">연장 서비스 플랜 구매 안내</h2>
                            <div className="problem-solving">
                                <div className="graph">
                                    <table>
                                        <caption>기본 품질 보증기간 이후의 연장 서비스 플랜에 대한 설명</caption>
                                        <thead>
                                        <tr>
                                            <th scope="col">1년</th>
                                            <th scope="col">2년</th>
                                            <th scope="col">3년</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="basic">기본 품질<br className="m-br-block" /> 보증기간(1년)</td>
                                            <td colSpan="2" className="extended">연장 서비스 플랜 적용기간
                                                <span>2년 ESP 구매 시<br className="m-br-block" /> 2년 무상수리</span>
                                                <span>3년 ESP 구매 시<br className="m-br-block" /> 3년 무상수리</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="txt_plan">* ESP : Extended Service Plan(연장 서비스 플랜)</p>
                            </div>
                            <h3 className="espinfo__title2">연장 서비스 플랜 상품 구매방법</h3>
                            <ul className="list_dot">
                                <li>제품 구매일로부터 1년 이내에 구매하셔야 합니다.</li>
                                <li>정품등록 후 구매하실 수 있습니다. <strong>단, VAIO의 경우 구입일로부터 30일 이내 정품등록 및 제품설문을 통한 3개월 보증기간 연장 후
                                    구매하실 수 있습니다.</strong></li>
                                <li>렌즈교환식 카메라의 경우 바디만 적용되며, 렌즈 및 액세서리(번들 액세서리 포함)는 적용되지 않습니다.</li>
                                <li>본 서비스 상품을 구매하시면 7일 이내에 소니코리아 고객지원 사이트(https://www.sony.co.kr/electronics/support)의
                                    ‘My SCS’메뉴에서 연장된 서비스 기간을 조회하실 수 있습니다.
                                </li>
                                <li>연장 서비스 플랜 상품은 정품 1개당 1회(1개)에 한해 구매하실 수 있습니다.</li>
                                <li><strong>연장 서비스 플랜 적용은 상품 구매일로부터 7일 이후 자동 적용됩니다.</strong></li>
                                <li><strong>연장 서비스 플랜 상품은 무형 상품으로 별도 배송되지 않습니다.</strong></li>
                            </ul>
                            <h3 className="espinfo__title2">고객지원센터를 통한 전화구매도 가능합니다!</h3>
                            <ol className="step_box">
                                <li>
                                    <span className="icon step2_1"></span>
                                    <div className="txt_box">
                                        <span className="stat">1</span>
                                        <strong>구매한 제품 정품 등록</strong>
                                    </div>
                                </li>
                                <li>
                                    <span className="icon step2_2"></span>
                                    <div className="txt_box">
                                        <span className="stat">2</span>
                                        <strong>고객지원센터를 통한 자세한 <span className="br">상담 및 구매</span></strong>
                                    </div>
                                </li>
                            </ol>
                            <p className="txt_buy">※ 소니코리아 고객지원센터 : 1588-0911 / 운영시간 : 월~금 09:00~18:00 (토,일요일, 공휴일은 휴무)</p>
                            <div className="caution_buy">
                                <strong className="tit">구매 시 유의사항</strong>
                                <ul className="list_dot">
                                    <li>단, 고객과실이나 천재지변으로 인한 손상의 경우 무상 수리에서 제외됩니다.</li>
                                    <li>본 연장 서비스 플랜은 제품 구매일로부터 1년 이내에 구입 가능합니다.</li>
                                    <li><strong>연장 서비스 플랜 적용은 상품 구매일로부터 7일 이후 자동 적용됩니다.</strong></li>
                                    <li><strong>연장 서비스 플랜 상품은 무형 상품으로 별도 배송되지 않습니다.</strong></li>
                                    <li><strong>본 상품은 타 상품과 함께 장바구니에 담으실 수 없습니다.</strong></li>
                                </ul>
                            </div>
                            <div className="esp_tabBox">
                                <div className="tab_ui size3">
                                    <ul>
                                        {
                                            espCategory?.children?.map(category => {
                                                return (
                                                  <li className={category.categoryNo === focusCategory?.categoryNo ? 'tabs on' : 'tabs'} key={category.categoryNo}>
                                                      <a href="#" className="btn" onClick={e => {
                                                          setFocusCategory(category);
                                                          e.preventDefault();
                                                      }}>
                                                          {category.label}
                                                      </a>
                                                  </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="tab_ui_info">
                                    <div className="tab_ui_inner view">
                                        <div className="fixBox">
                                            <ul className="fixBox__list">
                                                {
                                                    product.list.map(p => {
                                                        return (
                                                          <EspProduct product={p} key={`esp-product-${p.productNo}`}></EspProduct>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <div className="btn_area">
                                                {
                                                    (product.totalCount%15 !== 0 && product.list.length !== product.totalCount) ?
                                                      <button type="button" className="btn_more" title="ESP 상품 더보기" onClick={() => {
                                                          _addProduct();
                                                      }}>
                                                          더보기<span className="ico_plus"></span>
                                                      </button> : ''
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
