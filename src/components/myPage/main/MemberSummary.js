import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { toCurrencyString } from 'utils/unit';
import { getCouponsSummary } from 'api/promotion';
import { syncCoupon } from 'api/sony/coupon';
import { profileMemberGrade } from 'utils/constants';

const MemberSummary = ({
    tabChange,
    profile,
    availableMileage,
    wishCount,
    memberName,
}) => {
    const [couponCount, setCouponCount] = useState(0);

    const grade = useMemo(
        () => profileMemberGrade[profile?.memberGradeName?.toLowerCase()],
        [profile],
    );

    useEffect(() => {
        Promise.all([fetchCouponCount()]).catch(console.error);
    }, []);

    async function fetchCouponCount() {
        await syncCoupon();
        const {
            data: { usableCouponCnt },
        } = await getCouponsSummary();
        setCouponCount(usableCouponCnt);
    }

    return (
        <div className='my_user'>
            <div className='user_profile'>
                <p className='user_name'>
                    <span className='name'>{memberName || ''}</span>님
                    안녕하세요 :)
                </p>
                <Link to='/my-page/member' className='user_modify under_line'>
                    회원정보 수정
                </Link>
            </div>
            <div className='user_info'>
                <ul>
                    <li className='user_item grade'>
                        <Link to='/membership/benefit' className='user_tabs'>
                            <span className='ico_txt'>
                                <span className='txt_arrow'>회원등급</span>
                            </span>
                            <span className='val_txt'>
                                <span className={`val ${grade?.className}`}>
                                    {grade?.label || ''}
                                </span>
                            </span>
                        </Link>
                    </li>
                    <li className='user_item mileage'>
                        <HashLink
                            smooth
                            to='/my-page/#mileage-tit'
                            className='user_tabs'
                            onClick={() => {
                                tabChange('mileage');
                            }}
                        >
                            <span className='ico_txt'>
                                <span className='txt_arrow'>마일리지</span>
                            </span>
                            <span className='val_txt'>
                                <span className='val'>
                                    {toCurrencyString(availableMileage)}
                                </span>
                                M
                            </span>
                        </HashLink>
                    </li>
                    <li className='user_item coupon'>
                        <HashLink
                            smooth
                            to='/my-page/#coupon-tit'
                            className='user_tabs'
                            onClick={() => tabChange('coupon')}
                        >
                            <span className='ico_txt'>
                                <span className='txt_arrow'>쿠폰</span>
                            </span>
                            <span className='val_txt'>
                                <span className='val'>{couponCount}</span> 장
                            </span>
                        </HashLink>
                    </li>
                    <li className='user_item like'>
                        <HashLink
                            smooth
                            to='/my-page/#wish-tit'
                            className='user_tabs'
                            onClick={() => tabChange('wish')}
                        >
                            <span className='ico_txt'>
                                <span className='txt_arrow'>찜</span>
                            </span>
                            <span className='val_txt'>
                                <span className='val'>{wishCount}</span>
                            </span>
                        </HashLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MemberSummary;
