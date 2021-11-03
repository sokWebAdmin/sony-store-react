import React, { useState, useEffect, useContext } from 'react';

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

import GlobalContext from '../../context/global.context';
import { getRegisteredProduct } from '../../api/sony/product';
import { useProfileState } from '../../context/profile.context';
import EspAddCart from '../../components/popup/esp/EspAddCart';
import qs from 'qs';
import { getProductDetail } from '../../api/product';

export default function EspList({history}) {

  const { isLogin } = useContext(GlobalContext);

  if (!isLogin) {
    history.replace('/');
  }

  const { profile } = useProfileState();

  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [initial, setInitial] = useState(false);

  const [targetProduct, setTargetProduct] = useState(null);

  useEffect(async () => {
    if (!profile) {
      return;
    }

    const isExist = await _isExistProduct();
    if (!isExist) {
      history.replace('/');
      return;
    }

    const result = await _getRegisteredProduct();

    setInitial(true);
    setTotalCount(result.totalCount);

    if (pageIndex === 1) {
      setProducts([...result.list]);
    } else {
      setProducts([...products, ...result.list]);
    }
  },[pageIndex, profile]);

  const _isExistProduct = async () => {
    const query = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    });

    if (!query?.productNo) {
      return false;
    }

    try {
      const { data } = await getProductDetail(query.productNo);

      if (data?.stock?.stockCnt > 0) {
        return true;
      }
    }
    catch (e) {
      console.error(e);
    }

    return false;
  }

  const _getRegisteredProduct = async () => {
    const query = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    });

    const result = {list: [], totalCount: 0};
    const requsetBody = {
      customerid: profile?.memberId || '',
      espProductid: query?.productNo || '',
      rowsPerPage: 10,
      pageIdx: pageIndex
    };

    try {
      const { data } = await getRegisteredProduct({ requsetBody });

      if (data?.errorCode === '0000') {
        result.totalCount = data?.paginationInfo?.totalCount || totalCount;
        result.list = data?.body || [];
      }
    }
    catch (e) {
      console.error(e);

      // const testResponse = {"errorCode":"0000","errorMessage":"성공","responseTime":"2021-10-19 15:52:52","paginationInfo":{"rowsPerPage":10,"pageIdx":1,"totalCount":26},"body":[{"modelcod":"80814680","serialno":"1135699","lastdate":"2021-10-12 17:32:27","slipReceiveDate":"2021-10-12 17:32:28","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-W810","purSgtPsbYn":"Y","mallProductNo":"102007713"},{"modelcod":"80814680","serialno":"1121679","lastdate":"2021-10-12 17:32:28","slipReceiveDate":"2021-10-12 17:32:28","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-W810","purSgtPsbYn":"Y","mallProductNo":"102007713"},{"modelcod":"80814680","serialno":"1122550","lastdate":"2021-10-12 17:32:29","slipReceiveDate":"2021-10-12 17:32:28","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-W810","purSgtPsbYn":"Y","mallProductNo":"102007713"},{"modelcod":"80814680","serialno":"1122536","lastdate":"2021-10-12 17:32:30","slipReceiveDate":"2021-10-12 17:32:28","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-W810","purSgtPsbYn":"Y","mallProductNo":"102007713"},{"modelcod":"80815580","serialno":"4741026","lastdate":"2021-10-12 17:33:59","slipReceiveDate":"2021-10-12 17:33:59","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-HX400V","purSgtPsbYn":"Y","mallProductNo":"102007710"},{"modelcod":"80815580","serialno":"4741131","lastdate":"2021-10-12 17:33:59","slipReceiveDate":"2021-10-12 17:33:59","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-HX400V","purSgtPsbYn":"Y","mallProductNo":"102007710"},{"modelcod":"80815580","serialno":"4741206","lastdate":"2021-10-12 17:33:59","slipReceiveDate":"2021-10-12 17:33:59","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-HX400V","purSgtPsbYn":"Y","mallProductNo":"102007710"},{"modelcod":"80815580","serialno":"4741218","lastdate":"2021-10-12 17:33:59","slipReceiveDate":"2021-10-12 17:33:59","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-HX400V","purSgtPsbYn":"Y","mallProductNo":"102007710"},{"modelcod":"80815381","serialno":"4993898","lastdate":"2021-10-12 17:39:28","slipReceiveDate":"2021-10-12 17:39:28","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-W830","purSgtPsbYn":"Y","mallProductNo":"102007711"},{"modelcod":"80815381","serialno":"4993752","lastdate":"2021-10-12 17:39:28","slipReceiveDate":"2021-10-12 17:39:28","customernr":"2780336","customerid":"scs@test.com","modelname":"DSC-W830","purSgtPsbYn":"Y","mallProductNo":"102007711"}]};
      // testResponse.body = testResponse.body.map((t, i) => ({...t, purSgtPsbYn: i % 3 === 0 ? 'Y' : i % 3 === 1 ? 'E' : 'N'}));
      // result.totalCount = testResponse?.paginationInfo?.totalCount || totalCount;
      // result.list = testResponse?.body || [];
    }

    return result;
  }

  const _openGenuineRegisterSite = () => {
    window.openWindow("https://www.sony.co.kr/scs/handler/SCSWarranty-Start", "_blank");
  }

  const _closePopup = () => {
    setTargetProduct(null);
  }

  // 왜 있는지 모르겠지만 다른데도 다 있길래 추가했습니다.
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  return (
    <>
      <SEOHelmet title={`연장 서비스 플랜 ESP`} />
      <div className="category">
        <div className="contents">
          <div className="container">
            <div className="content esp_page">
              <div className="common_head first_tit">
                <a href="#" className="common_head_back" onClick={e => {
                  history.goBack();
                  e.preventDefault();
                }}>연장 서비스 플랜 ESP</a>
                <h1 className="common_head_name">정품/보증기간/연장 서비스 플랜</h1>
              </div>
              {
                products?.length === 0 &&
                <div className="empty_buy_box">
                  {
                    initial &&
                    <>
                      <i className="empty_buy_ico"></i>
                      <strong className="empty_tit">구매 가능한 ESP가 없습니다.</strong>
                      <p className="empty_desc">My SCS에서 정품등록 여부를 먼저 확인하세요!</p>
                      <div className="button_wrap">
                        <button type="button" className="button button_negative" onClick={() => {
                          _openGenuineRegisterSite();
                        }}>정품등록 바로가기</button>
                      </div>
                    </>
                  }

                </div>
              }
              {
                products?.length > 0 &&
                <div className="esp_list_box">
                  <div className="esp_tbl_wrap">
                    <div className="col_table_wrap">
                      <div className="col_table">
                        <div className="col_table_head">
                          <div className="col_table_row">
                                <div className="col_table_cell">모델명</div>
                                <div className="col_table_cell">정품등록일</div>
                                <div className="col_table_cell">보증기간 만료일 (제품번호)</div>
                                <div className="col_table_cell">연장 서비스 플랜 구매 신청</div>
                            </div>
                        </div>
                        <div className="col_table_body">
                          {
                            products.map((product, index) => {
                              return <div className="col_table_row" key={`esp-product-${index}`}>
                                <div className="col_table_cell">
                                  <div className="prd_name">{product.modelname}</div>
                                </div>
                                <div className="col_table_cell">
                                  <div className="prd_date">{product.slipReceiveDate}</div>
                                </div>
                                <div className="col_table_cell">
                                  <div className="prd_num">{`${product.slipReceiveDate} (${product.serialno})`}</div>
                                </div>
                                <div className="col_table_cell">
                                  {
                                    product.purSgtPsbYn === 'Y' &&
                                    <button className="button button_primary button-s popup_comm_btn" type="button" onClick={() => {
                                      setTargetProduct(product);
                                    }}>구매 신청
                                    </button>
                                  }
                                  {
                                    product.purSgtPsbYn === 'E' &&
                                    <button className="button button_secondary button-s popup_comm_btn" type="button" disabled>선택불가</button>
                                  }
                                  {
                                    product.purSgtPsbYn === 'N' &&
                                    <button className="button button_secondary button-s popup_comm_btn" type="button" disabled>구매불가</button>
                                  }
                                </div>
                              </div>
                            })
                          }
                        </div>
                      </div>
                    </div>
                    {
                      products.length < totalCount &&
                      <div className="btn_area">
                        <button type="button" className="btn_more" title="기획전 더보기" onClick={() => {
                          setPageIndex(pageIndex + 1);
                        }}>더보기<span className="ico_plus"></span></button>
                      </div>
                    }
                  </div>
                  <div className="esp_info">
                    <strong className="esp_tit">[안내]</strong>
                    <ul className="list_dot">
                      <li>고객님의 아이디로 정품등록 되어진 모델에 대한 정보입니다.</li>
                      <li>연장 서비스 플랜을 구매하실 수 있는 경우 &lt;구매신청&gt;버튼이 노출되며, 클릭하시면 장바구니 페이지로 이동합니다.</li>
                      <li><em className="color">구매불가 : ESP 상품을 구매할 수 있는 정품등록 제품이 없습니다.</em></li>
                      <li><em className="color">선택불가 : 정품등록하신 제품과 구매하신 ESP 상품이 매칭되지 않습니다.</em></li>
                      <li className="bar">자세한 사항은 고객센터를 통해 문의 부탁 드립니다.</li>
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {
        targetProduct && 
        <EspAddCart product={targetProduct} onClose={_closePopup} history={history} />
      }
      
    </>
  );
}