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
    // await syncCoupon();
    fetchCoupons({ pageNumber: 1, pageSize: 10 });
  }, []);

  const fetchCoupons = async ({ pageNumber, pageSize }) => {
    const mock = [
      {
        couponIssueNo: 4460511,
        couponName: '(최종)정품등록 감사 액세서리 10%할인 쿠폰',
        couponNo: 4978,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 10,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:17',
        limitPayType: null,
        maxDiscountAmt: 9999999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'CATEGORY',
        couponTargets: [
          '액세서리>카메라 액세서리>메모리카드/SSD',
          '액세서리>카메라 액세서리>배터리, 충전기/어댑터',
          '액세서리>카메라 액세서리>세로 그립',
          '액세서리>카메라 액세서리>플래시/조명',
          '액세서리>카메라 액세서리>마이크',
          '액세서리>카메라 액세서리>뷰파인더/모니터',
          '액세서리>카메라 액세서리>삼각대/리모콘',
          '액세서리>카메라 액세서리>케이스/커버/스트랩',
          '액세서리>카메라 액세서리>기타',
          '액세서리>카메라 액세서리>액세서리 키트',
        ],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460512,
        couponName: '(최종)정품등록 감사 액세서리 10%할인 쿠폰',
        couponNo: 4978,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 10,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:18',
        limitPayType: null,
        maxDiscountAmt: 9999999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'CATEGORY',
        couponTargets: [
          '액세서리>카메라 액세서리>메모리카드/SSD',
          '액세서리>카메라 액세서리>배터리, 충전기/어댑터',
          '액세서리>카메라 액세서리>세로 그립',
          '액세서리>카메라 액세서리>플래시/조명',
          '액세서리>카메라 액세서리>마이크',
          '액세서리>카메라 액세서리>뷰파인더/모니터',
          '액세서리>카메라 액세서리>삼각대/리모콘',
          '액세서리>카메라 액세서리>케이스/커버/스트랩',
          '액세서리>카메라 액세서리>기타',
          '액세서리>카메라 액세서리>액세서리 키트',
        ],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460513,
        couponName: '(최종)정품등록 감사 액세서리 10%할인 쿠폰',
        couponNo: 4978,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 10,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:18',
        limitPayType: null,
        maxDiscountAmt: 9999999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'CATEGORY',
        couponTargets: [
          '액세서리>카메라 액세서리>메모리카드/SSD',
          '액세서리>카메라 액세서리>배터리, 충전기/어댑터',
          '액세서리>카메라 액세서리>세로 그립',
          '액세서리>카메라 액세서리>플래시/조명',
          '액세서리>카메라 액세서리>마이크',
          '액세서리>카메라 액세서리>뷰파인더/모니터',
          '액세서리>카메라 액세서리>삼각대/리모콘',
          '액세서리>카메라 액세서리>케이스/커버/스트랩',
          '액세서리>카메라 액세서리>기타',
          '액세서리>카메라 액세서리>액세서리 키트',
        ],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460514,
        couponName: '(최종)첫 구매 감사 5% 할인 쿠폰',
        couponNo: 4979,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 5,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:18',
        limitPayType: null,
        maxDiscountAmt: 9999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'PRODUCT',
        couponTargets: ['DSC-W810/B'],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460515,
        couponName: '(최종)정품등록 감사 액세서리 10%할인 쿠폰',
        couponNo: 4978,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 10,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:19',
        limitPayType: null,
        maxDiscountAmt: 9999999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'CATEGORY',
        couponTargets: [
          '액세서리>카메라 액세서리>메모리카드/SSD',
          '액세서리>카메라 액세서리>배터리, 충전기/어댑터',
          '액세서리>카메라 액세서리>세로 그립',
          '액세서리>카메라 액세서리>플래시/조명',
          '액세서리>카메라 액세서리>마이크',
          '액세서리>카메라 액세서리>뷰파인더/모니터',
          '액세서리>카메라 액세서리>삼각대/리모콘',
          '액세서리>카메라 액세서리>케이스/커버/스트랩',
          '액세서리>카메라 액세서리>기타',
          '액세서리>카메라 액세서리>액세서리 키트',
        ],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460516,
        couponName: '(최종)정품등록 감사 액세서리 10%할인 쿠폰',
        couponNo: 4978,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 10,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:19',
        limitPayType: null,
        maxDiscountAmt: 9999999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'CATEGORY',
        couponTargets: [
          '액세서리>카메라 액세서리>메모리카드/SSD',
          '액세서리>카메라 액세서리>배터리, 충전기/어댑터',
          '액세서리>카메라 액세서리>세로 그립',
          '액세서리>카메라 액세서리>플래시/조명',
          '액세서리>카메라 액세서리>마이크',
          '액세서리>카메라 액세서리>뷰파인더/모니터',
          '액세서리>카메라 액세서리>삼각대/리모콘',
          '액세서리>카메라 액세서리>케이스/커버/스트랩',
          '액세서리>카메라 액세서리>기타',
          '액세서리>카메라 액세서리>액세서리 키트',
        ],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460517,
        couponName: '(최종)첫 구매 감사 5% 할인 쿠폰',
        couponNo: 4979,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 5,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:19',
        limitPayType: null,
        maxDiscountAmt: 9999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'PRODUCT',
        couponTargets: ['DSC-W810/B'],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460518,
        couponName: '(최종)정품등록 감사 액세서리 10%할인 쿠폰',
        couponNo: 4978,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 10,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:19',
        limitPayType: null,
        maxDiscountAmt: 9999999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'CATEGORY',
        couponTargets: [
          '액세서리>카메라 액세서리>메모리카드/SSD',
          '액세서리>카메라 액세서리>배터리, 충전기/어댑터',
          '액세서리>카메라 액세서리>세로 그립',
          '액세서리>카메라 액세서리>플래시/조명',
          '액세서리>카메라 액세서리>마이크',
          '액세서리>카메라 액세서리>뷰파인더/모니터',
          '액세서리>카메라 액세서리>삼각대/리모콘',
          '액세서리>카메라 액세서리>케이스/커버/스트랩',
          '액세서리>카메라 액세서리>기타',
          '액세서리>카메라 액세서리>액세서리 키트',
        ],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460519,
        couponName: '(최종)첫 구매 감사 5% 할인 쿠폰',
        couponNo: 4979,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 5,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:19',
        limitPayType: null,
        maxDiscountAmt: 9999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'PRODUCT',
        couponTargets: ['DSC-W810/B'],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
      {
        couponIssueNo: 4460520,
        couponName: '(최종)정품등록 감사 액세서리 10%할인 쿠폰',
        couponNo: 4978,
        couponType: 'PRODUCT',
        discountAmt: 0,
        discountRate: 10,
        fixedAmt: false,
        issueYmdt: '2021-09-30 16:44:19',
        limitPayType: null,
        maxDiscountAmt: 9999999999,
        maxSalePrice: 0,
        minSalePrice: 30000,
        otherCouponUsable: true,
        skipsAccumulation: false,
        usablePlatforms: ['PC', 'MOBILE_WEB', 'MOBILE_APP'],
        useEndYmdt: '2021-10-30 23:59:59',
        useYmdt: null,
        used: false,
        couponTargetType: 'CATEGORY',
        couponTargets: [
          '액세서리>카메라 액세서리>메모리카드/SSD',
          '액세서리>카메라 액세서리>배터리, 충전기/어댑터',
          '액세서리>카메라 액세서리>세로 그립',
          '액세서리>카메라 액세서리>플래시/조명',
          '액세서리>카메라 액세서리>마이크',
          '액세서리>카메라 액세서리>뷰파인더/모니터',
          '액세서리>카메라 액세서리>삼각대/리모콘',
          '액세서리>카메라 액세서리>케이스/커버/스트랩',
          '액세서리>카메라 액세서리>기타',
          '액세서리>카메라 액세서리>액세서리 키트',
        ],
        couponExcludeTargets: [],
        memberGradeNames: null,
        minDeliveryAmt: null,
        fiexdAmt: false,
      },
    ];
    // const res = await getCoupons({
    //   query: { pageNumber, pageSize, usable: true },
    // });
    setCoupons(mock);

    showLoadMoreBtn(mock);
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
    setCoupons([...coupons, ...res.data.items]);
    nextPage.current += 1;
  };

  // 다음 페이지가 없는 경우 loadmore 버튼 숨김
  const showLoadMoreBtn = (newCoupons) => {
    if (newCoupons.length < 0) {
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
            href="https://www.sony.co.kr/scs/handler/SCSWarranty-Start"
            target="_blank"
            title="새 창 열림"
            className="box_link_inner ico_type2"
          >
            <div className="txt_box">
              <p className="tit">정품등록 관리</p>
              <p className="txt">소니 제품 구매 후 정품등록하고 쿠폰을 받으세요!</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
