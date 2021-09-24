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

// TODO 연동 테스트 해야함

export default function EspList({history}) {

  const { isLogin } = useContext(GlobalContext);

  if (!isLogin) {
    history.replace('/');
  }

  const { profile } = useProfileState();

  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState([]);

  const [targetProduct, setTargetProduct] = useState(null);

  useEffect(async () => {
      const result = await _getRegisteredProduct();

      setTotalCount(result.totalCount);

      if (pageIndex === 1) {
          setProducts([...result.list]);
      } else {
          setProducts([...products, ...result.list]);
      }
  },[pageIndex]);

  const _getRegisteredProduct = async () => {
    const result = {list: [], totalCount: 0};

    try {
      const { data } = await getRegisteredProduct({
        customerid: profile?.memberId || '',
        rowsPerPage: 10,
        pageIdx: pageIndex
      });

      if (data?.resultCode === '0000') {
        result.totalCount = data?.paginationInfo?.totalCount || totalCount;
        result.list = data?.body || [];
      }
    }
    catch (e) {
      console.error(e);

      // TODO test 를 위한 더미 데이터
  //     result.list = [
  //         {
  //             "serialno": "2081560",
  //             "lastdate": "2007-07-03 00:00:00",
  //             "slipReceiveDate": "2017-11-29 10:27:55",
  //             "customernr": "2780336",
  //             "customerid": "scs@test.com",
  //             "modelname": "DSC-RX100M4",
  //             "purSgtPsbYn": "Y"
  //         },
  //         {
  //             "serialno": "9153020",
  //             "lastdate": "2007-07-08 00:00:00",
  //             "slipReceiveDate": "2020-09-15 16:20:29",
  //             "customernr": "2780336",
  //             "customerid": "scs@test.com",
  //             "modelname": "CMT-NEZ3",
  //             "purSgtPsbYn": "N"
  //         },
  //         {
  //         "serialno": "9151333",
  //       "lastdate": "2007-09-11 00:00:00",
  //       "slipReceiveDate": "2020-09-15 13:54:38",
  //       "customernr": "2780336",
  //       "customerid": "scs@test.com",
  //       "modelname": "MHC-EC50",
  //       "purSgtPsbYn": "N"
  // },
  //         {
  //             "serialno": "2710150",
  //           "lastdate": "2007-10-10 00:00:00",
  //           "slipReceiveDate": "2017-11-29 14:28:25",
  //           "customernr": "2780336",
  //           "customerid": "scs@test.com",
  //           "modelname": "DSC-RX100M4",
  //           "purSgtPsbYn": "N"
  //         },
  //         {
  //             "serialno": "1843185",
  //           "lastdate": "2007-10-10 00:00:00",
  //           "slipReceiveDate": "2017-11-29 14:28:25",
  //           "customernr": "2780336",
  //           "customerid": "scs@test.com",
  //           "modelname": "DSC-RX100M4",
  //           "purSgtPsbYn": "N"
  //         },
  //         {
  //             "serialno": "9165530",
  //           "lastdate": "2007-10-22 00:00:00",
  //           "slipReceiveDate": "2020-09-15 12:08:40",
  //           "customernr": "2780336",
  //           "customerid": "scs@test.com",
  //           "modelname": "CMT-GPZ6",
  //           "purSgtPsbYn": "N"
  //         },
  //         {
  //             "serialno": "0127604",
  //           "lastdate": "2008-02-13 00:00:00",
  //           "slipReceiveDate": "2020-09-15 11:44:57",
  //           "customernr": "2780336",
  //           "customerid": "scs@test.com",
  //           "modelname": "M-475",
  //           "purSgtPsbYn": "N"
  //         },
  //         {
  //             "serialno": "9999999",
  //           "lastdate": "2011-05-19 00:00:00",
  //           "slipReceiveDate": "2020-04-01 14:45:15",
  //           "customernr": "2780336",
  //           "customerid": "scs@test.com",
  //           "modelname": "VGN-SR45L",
  //           "purSgtPsbYn": "N"
  //         },
  //         {
  //             "serialno": "5188256",
  //           "lastdate": "2015-02-06 00:00:00",
  //           "slipReceiveDate": "2017-10-17 09:25:32",
  //           "customernr": "2780336",
  //           "customerid": "scs@test.com",
  //           "modelname": "ILCE-5000L",
  //           "purSgtPsbYn": "N"
  //         },
  //         {
  //             "serialno": "982674",
  //           "lastdate": "2015-03-28 00:00:00",
  //           "slipReceiveDate": "2017-10-20 18:02:44",
  //           "customernr": "2780336",
  //           "customerid": "scs@test.com",
  //           "modelname": "VX9137C",
  //           "purSgtPsbYn": "N"
  //         }
  //     ];
  //     result.totalCount = 11;
    }

    return result;
  }

  const _openGenuineRegisterSite = () => {
    window.open("https://www.sony.co.kr/scs/handler/SCSWarranty-Start", "_blank");
  }

  const _closePopup = () => {
    setTargetProduct(null);
  }

  // 왜 있는지 모르겠지만 다른데도 다 있길래 추가했습니다.
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  return (
    <>
      <SEOHelmet title={`연장서비스플랜 ESP`} />
      <div className="category">
        <div className="contents">
          <div className="container">
            <div className="content esp_page">
              <div className="common_head first_tit">
                <a href="#" className="common_head_back" onClick={e => {
                  history.goBack();
                  e.preventDefault();
                }}>연장서비스플랜 ESP</a>
                <h1 className="common_head_name">정품/보증기간/연장서비스플랜</h1>
              </div>
              {
                products?.length === 0 &&
                <div className="empty_buy_box">
                  <i className="empty_buy_ico"></i>
                  <strong className="empty_tit">구매 가능한 ESP가 없습니다.</strong>
                  <p className="empty_desc">My SCS에서 정품등록 여부를 먼저 확인하세요!</p>
                  <div className="button_wrap">
                    <button type="button" className="button button_negative" onClick={() => {
                      _openGenuineRegisterSite();
                    }}>정품등록 바로가기</button>
                  </div>
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
                                <div className="col_table_cell">연장서비스플랜 구매 신청</div>
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
                                    <button className="button button_secondary button-s popup_comm_btn" type="button" onClick={() => {
                                      setTargetProduct(product);
                                    }}>구매 신청
                                    </button>
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
                      <li>연장서비스플랜을 구매하실 수 있는 경우 &lt;구매신청&gt;버튼이 노출되며, 클릭하시면 장바구니 페이지로 이동합니다.</li>
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
        <EspAddCart product={targetProduct} onClose={_closePopup}/>
      }
      
    </>
  );
}