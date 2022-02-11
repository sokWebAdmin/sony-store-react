import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import ViewMore from 'components/common/ViewMore';
import Newest from 'components/search/Newest';
import { hightLightKeyword } from 'utils/product';
import { PAGE_SIZE } from 'const/search';

export default function NoticeResult({
    noticeList,
    noticeCount,
    keyword,
    noticeNewest,
    setNoticeNewest,
    searchNotice,
    boardNo,
}) {
    const [mobileOrderOpen, setMobileOrderOpen] = useState(false);

    return (
        <>
            <div className='section_top'>
                <h2 className='title'>
                    공지사항<span>({noticeCount})</span>
                </h2>
                <div
                    className={`itemsort ${
                        mobileOrderOpen ? 'itemsort--open' : ''
                    }`}
                    aria-label='게시판 정렬'
                >
                    <button
                        className='itemsort__button'
                        onClick={() => {
                            setMobileOrderOpen((prev) => !prev);
                        }}
                    >
                        <span className='itemsort__button__label sr-only'>
                            정렬기준:
                        </span>
                        <span className='itemsort__button__selected'>
                            최신순
                        </span>
                    </button>
                    <Newest newest={noticeNewest} setNewest={setNoticeNewest} />
                </div>
            </div>
            <div className='result_list on search'>
                <ul className='noti'>
                    {noticeList.map(({ articleNo, title, registerYmdt }) => {
                        return (
                            <li key={articleNo}>
                                <Link to={`/notice/${articleNo}`}>
                                    <span className='num'>{articleNo}</span>
                                    <span
                                        className='tit'
                                        dangerouslySetInnerHTML={{
                                            __html: hightLightKeyword(
                                                title,
                                                keyword,
                                            ),
                                        }}
                                    />
                                    <span className='date'>
                                        {dayjs(registerYmdt).format(
                                            'YYYY. MM. DD',
                                        )}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {noticeCount >= 10 && (
                <ViewMore
                    totalCount={noticeCount}
                    viewMore={(pageNumber) =>
                        searchNotice(keyword, boardNo, noticeNewest, pageNumber)
                    }
                    pageSize={PAGE_SIZE.NOTICE}
                />
            )}
        </>
    );
}

NoticeResult.propTypes = {
    noticeList: PropTypes.array.isRequired,
    noticeCount: PropTypes.number.isRequired,
    keyword: PropTypes.string.isRequired,
    noticeNewest: PropTypes.bool.isRequired,
    setNoticeNewest: PropTypes.func.isRequired,
    searchNotice: PropTypes.func.isRequired,
    boardNo: PropTypes.number.isRequired,
};
