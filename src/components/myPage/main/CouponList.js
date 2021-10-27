import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getCoupons } from '../../../api/promotion';
import { syncCoupon } from '../../../api/sony/coupon';
import CouponListItem from './CouponListItem';

const CouponList = () => {
  const [loadMoreBtnVisible, setLoadMoreBtnVisible] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const nextPage = useRef(2);

  useEffect(async () => {
    await syncCoupon();
    fetchCoupons({ pageNumber: 1, pageSize: 10 });
  }, []);

  const fetchCoupons = async ({ pageNumber, pageSize }) => {
    const res = await getCoupons({
      query: { pageNumber, pageSize, usable: true },
    });

    setCoupons(renameCoupons(res.data.items));
    showLoadMoreBtn(res.data.items);

    nextPage.current = 2;
  };

  const onClickLoadMore = (e) => {
    e.preventDefault();
    loadMore(nextPage.current, 10);
  };

  const loadMore = async (pageNumber, pageSize) => {
    const res = await getCoupons({
      params: { pageNumber, pageSize, usable: true },
    });
    showLoadMoreBtn(res.data.items);
    setCoupons([...coupons, ...renameCoupons(res.data.items)]);
    nextPage.current += 1;
  };

  // 다음 페이지가 없는 경우 loadmore 버튼 숨김
  const showLoadMoreBtn = (newCoupons) => {
    if (newCoupons.length < 10) {
      setLoadMoreBtnVisible(false);
      return;
    }

    setLoadMoreBtnVisible(true);
  };

  const divideCoupons = (coupons) => {
    if (!coupons) return;
    let result = [];
    for (let i = 0; i < coupons.length; i += 2) {
      result.push(coupons.slice(i, i + 2));
    }
    return result;
  };

  const hasCoupons = (coupons) => {
    return coupons.length > 0;
  };

  // '/'이 들어간 쿠폰명들은 개행처리한다.
  const renameCoupons = (conponResponseItems) => {
    return conponResponseItems.map((coupon) => {
      const newCouponName = coupon.couponName.split('/').reduce((acc, splitName, index, splitNames) => {
        if (index === splitNames.length - 1) {
          acc += `${splitName}`;
        } else {
          acc += `${splitName}<br />`;
        }

        return acc;
      }, '');

      return { ...coupon, couponName: newCouponName };
    });
  };

  return (
    <div className="cont history_coupon">
      <h3 className="cont_tit" id="coupon-tit">
        쿠폰
      </h3>
      <div className="history_inner">
        <div className="history_list">
          <div className={`coupon_inner ${hasCoupons(coupons) ? 'on' : ''}`}>
            {/* class : on 내역이 있을 경우 on */}
            {divideCoupons(coupons)?.map((couponList, index) => {
              return (
                <div className="coupon_list" key={index}>
                  {couponList?.map((coupon) => (
                    <CouponListItem
                      key={coupon.couponIssueNo}
                      couponIssueNo={coupon.couponIssueNo}
                      couponName={coupon.couponName}
                      discountRate={coupon.discountRate}
                      minSalePrice={coupon.minSalePrice}
                      issueYmdt={coupon.issueYmdt}
                      useEndYmdt={coupon.useEndYmdt}
                    />
                  ))}
                </div>
              );
            })}
            {loadMoreBtnVisible && (
              <div className="btn_article line">
                <a href="#" className="more_btn" onClick={onClickLoadMore}>
                  더보기
                </a>
              </div>
            )}
          </div>
          <div className={`no_data ${hasCoupons(coupons) ? '' : 'on'}`}>
            {/* class : on 내역이 없을 경우 on */}
            <span>내역이 없습니다.</span>
          </div>
        </div>
        <div className="guide_list">
          <p className="tit">[쿠폰 사용 안내]</p>
          <ul className="list_dot">
            <li>
              쿠폰은 <strong>주문당 1매씩 사용 가능하며, 제품 1개에만 적용</strong>됩니다.
            </li>
            <li>쿠폰 할인은 결제 시점에서 자동으로 할인 금액만큼 차감되며 결제 예정금액이 표시됩니다.</li>
            <li>쿠폰은 주문 후 취소할 경우 재발급되지 않으니 사용에 유의하여 주시기 바랍니다.</li>
            <li>소니스토어에서 발행하는 쿠폰은 행사 내용에 따라 기간 및 해당 제품 등 적용 방법이 다를 수 있습니다.</li>
          </ul>
        </div>
        <div className="ico_box_link">
          {/* TODO: 멤버십 > 쿠폰안내 탭으로 이동 가능해야함 */}
          <Link
            to={{
              pathname: `membership/benefit`,
              state: { type: 'coupon' },
            }}
            className="box_link_inner ico_type1"
          >
            <div className="txt_box">
              <p className="tit">소니스토어의 쿠폰 보기</p>
              <p className="txt">첫 구매 등 소니스토어의 다양한 쿠폰 혜택을 받으세요!</p>
            </div>
          </Link>
          <a
            href={window.anchorProtocol + "www.sony.co.kr/scs/handler/SCSWarranty-Start"}
            onClick={window.openBrowser}
            target="_blank"
            title="새 창 열림"
            className="box_link_inner ico_type2"
          >
            <div className="txt_box">
              <p className="tit">정품등록 관리</p>
              <p className="txt" style={{ paddingRight: '20px' }}>
                소니 제품 구매 후 정품등록하고 쿠폰을 받으세요!
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
