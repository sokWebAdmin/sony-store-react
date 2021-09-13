import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventByEventNo } from '../../api/display';
import { useMediaQuery } from '../../hooks';

const EventDetail = () => {
  const { eventNo } = useParams();
  const onlyMo = useMediaQuery('(max-width: 640px)');
  const [event, setEvent] = useState(null);

  const fetchDetailEvent = async () => {
    const response = await getEventByEventNo(eventNo, { soldout: true });
    setEvent(response.data);
  };

  useEffect(() => {
    fetchDetailEvent();
  }, []);

  return (
    <>
      {event && <div className="contents events">
        <div className="container full">
          <div className="content employee">
            <div className="event_header">
              <div className="event_header_inner"
                   style={{ background: `url('${onlyMo ? event.top.mobile.url : event.top.pc.url}') no-repeat 0 0` }}>
                <h1 className="event_header_title">{event.label}</h1>
                <p className="event_header_desc">{event.promotionText}</p>
              </div>
            </div>
            <div className="event_tablist type1">
              <div className="employee_prd">
                <div className="event_prd_list">
                  {event?.section.flatMap(({ products }) => products)?.map((product) => {
                    return (
                      <div className="product" key={product.productNo}>
                        <span className="badge_txt">
                          20,000 <span className="unit">원</span> OFF
                        </span>
                        <div className="product_pic">
                          <a href="javascript:void(0)" className="product_link">
                            <img
                              src={product.imageUrls[0]}
                              alt=""
                            />
                          </a>
                          {!product.stockCnt && <div className="sold_out">
                            <span>SOLD OUT</span>
                          </div>}
                        </div>
                        <div className="product_name">
                          <a href="javascript:void(0)" className="product_name_title">
                            {product.productName}
                          </a>
                          <p className="product_name_desc">
                            {product.promotionText}
                          </p>
                          <div className="product_name_price">
                            <div className="original">
                              {product.salePrice.toLocaleString()} <span className="unit">원</span>
                            </div>
                            <div className="sale">
                              {product.salePrice.toLocaleString()} <span className="unit">원</span>
                            </div>
                          </div>
                          <div className="product_btn_wrap">
                            <button
                              type="button"
                              className="button button_positive button-s"
                            >
                              바로 구매
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="btn_area">
                  <button
                    type="button"
                    className="btn_more"
                    title="제품 더보기"
                  >
                    더보기
                    <span className="ico_plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default EventDetail;
