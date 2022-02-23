import { React, useEffect, useMemo, useState, useCallback } from 'react';
import _ from 'lodash';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getProductSearch } from '../../api/product';

//css
// import '../../assets/scss/contents.scss';
import '../../assets/scss/category.scss';

//lib
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
    Controller,
} from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

//components
import ResultTop from '../../components/search/ResultTop';
import ProductResult from '../../components/search/ProductResult';
import EventResult from '../../components/search/EventResult';
import CategoryResult from '../../components/search/CategoryResult';
import NoticeResult from '../../components/search/NoticeResult';
import Tab from '../../components/search/Tab';
import {
    fetchBoardConfig,
    useBoardDispatch,
    useBoardState,
} from '../../context/board.context';
import { getBoards } from '../../api/manage';
import {
    getCategoryListByKeyword,
    getDisplayEventsByTitle,
} from '../../api/display';
import { orderList, PAGE_SIZE } from '../../const/search';
import moment from 'moment';
import SearchResultNone from './SearchResultNone';
import { useHistory } from 'react-router';

export default function SearchResult({ match }) {
    const history = useHistory();
    const initalKeyword = decodeURIComponent(match.params.keyword).replace(
        '&#47',
        '/',
    );

    const { config } = useBoardState();
    const dispatch = useBoardDispatch();

    const [reset, setReset] = useState(false);
    const [tabState, setTabState] = useState('ALL');
    const [keyword, setKeyword] = useState(initalKeyword);
    const [orderBy, setOrderBy] = useState('RECENT_PRODUCT');
    const [newest, setNewest] = useState(true);
    const [noticeNewest, setNoticeNewest] = useState(true);

    useEffect(() => {
        const word = _.chain(history.location.pathname)
            .split('search-result/')
            .last()
            .value();
        word && handleSearch(word);
    }, [history.location.pathname]);

    const [productList, setProductList] = useState([]);
    const [initialEventList, setInitialEventList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [initialCategoryList, setInitialCategoryList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);

    const [productCount, setProductCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [noticeCount, setNoticeCount] = useState(0);

    const getProductQuery = useCallback(
        (keyword, orderBy, pageNumber = 1, pageSize = PAGE_SIZE.PRODUCT) => {
            const orderByQuery = _.chain(orderList)
                .filter(({ orderBy: ob }) => ob === orderBy)
                .map(({ query }) => query)
                .head()
                .value();

            return {
                ...orderByQuery,
                'filter.keywords': keyword,
                'filter.soldout': true,
                hasTotalCount: true,
                pageNumber,
                pageSize,
                hasOptionValues: true,
            };
        },
        [],
    );

    const searchProduct = useCallback(
        async (keyword, orderBy, pageNumber = 1) => {
            try {
                const { data } = await getProductSearch(
                    getProductQuery(keyword, orderBy, pageNumber),
                );
                const ret = data.items.filter(({ hsCode }) => !hsCode);
                setProductList((prev) =>
                    pageNumber > 1 ? prev.concat(ret) : ret,
                );
                // setProductCount((prev) => (pageNumber > 1 ? prev + ret.length : ret.length || 0));
                setProductCount(data.totalCount);
            } catch (e) {
                console.error(e);
            }
        },
        [],
    );

    const searchEvent = useCallback(async (keyword) => {
        try {
            const { data } = await getDisplayEventsByTitle(keyword);
            const filteredEvents = data.filter(({ tag }) => tag);
            setInitialEventList(filteredEvents);
            setEventCount(filteredEvents?.length || 0);
            fetchEvent(1, filteredEvents);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const fetchEvent = (pageNumber, data, pageSize = PAGE_SIZE.EVENT) => {
        if (pageNumber === 1) {
            setEventList(data.slice(0, pageSize));
        } else {
            const start = (pageNumber - 1) * pageSize;
            const end = start + pageSize;
            setEventList((prev) =>
                prev.concat(initialEventList.slice(start, end)),
            );
        }
    };

    const sortEvents = (data = eventList) => {
        const sortByLatestCreationDate = (a, b) => {
            const dateL = moment(a.startYmdt).toDate().getTime();
            const dateR = moment(b.startYmdt).toDate().getTime();
            return dateL < dateR ? 1 : -1;
        };
        const sortByOldestCreationDate = (a, b) => {
            const dateL = moment(a.startYmdt).toDate().getTime();
            const dateR = moment(b.startYmdt).toDate().getTime();
            return dateL > dateR ? 1 : -1;
        };
        const sortData = newest
            ? [...data].sort(sortByLatestCreationDate)
            : [...data].sort(sortByOldestCreationDate);
        setEventList(sortData);
    };

    const fetchCategory = (pageNumber, data, pageSize = PAGE_SIZE.CATEGORY) => {
        if (pageNumber === 1) {
            setCategoryList(data.slice(0, pageSize));
        } else {
            const start = (pageNumber - 1) * pageSize;
            const end = start + pageSize;
            setCategoryList((prev) =>
                prev.concat(initialCategoryList.slice(start, end)),
            );
        }
    };

    const searchCategory = useCallback(async (keyword) => {
        try {
            const { data } = await getCategoryListByKeyword(keyword);
            setInitialCategoryList(data.flatCategories);
            // setCategoryList(data.flatCategories);
            setCategoryCount(data.flatCategories.length || 0);
            fetchCategory(1, data.flatCategories);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const searchNotice = useCallback(
        async (keyword, boardNo, noticeNewest = true, pageNumber = 1) => {
            if (!keyword || !boardNo) return;
            const pathParams = {
                boardNo,
            };
            const params = {
                hasTotalCount: true,
                keyword,
                pageNumber,
                pageSize: PAGE_SIZE.NOTICE,
                direction: !noticeNewest ? 'ASC' : 'DESC',
                // searchType: 'title',
            };
            try {
                const { data } = await getBoards({ pathParams, params });
                setNoticeList((prev) =>
                    pageNumber > 1 ? prev.concat(data.items) : data.items,
                );
                setNoticeCount(data.totalCount || 0);
            } catch (e) {
                console.error(e);
            }
        },
        [],
    );

    const handleSearch = (newKeyword) => {
        if (keyword === newKeyword) return;
        const mapNewKeyword = newKeyword.replace('/', '&#47');
        setKeyword(newKeyword);
        searchProduct(mapNewKeyword);
        searchNotice(mapNewKeyword, config.notice.boardNo);
        searchEvent(mapNewKeyword);
        searchCategory(mapNewKeyword);
        setReset(false);
    };

    const isAll = useMemo(() => tabState === 'ALL', [tabState]);

    const count = useMemo(
        () => ({
            ALL: productCount + eventCount + categoryCount + noticeCount,
            PRODUCT: productCount,
            EVENT: eventCount,
            CATEGORY: categoryCount,
            NOTICE: noticeCount,
        }),
        [productCount, eventCount, categoryCount, noticeCount],
    );

    useEffect(
        () => fetchBoardConfig(dispatch, config.notice?.boardNo),
        [dispatch, config.notice?.boardNo],
    );
    useEffect(() => {
        if (config.notice.boardNo > 0) {
            searchProduct(keyword, orderBy);
            searchNotice(keyword, config.notice.boardNo);
            searchEvent(keyword);
            searchCategory(keyword);
        }
    }, [
        keyword,
        orderBy,
        searchProduct,
        searchNotice,
        searchEvent,
        searchCategory,
        config?.notice.boardNo,
    ]);

    useEffect(() => eventList.length && sortEvents(), [newest]);

    useEffect(
        () => searchNotice(keyword, config.notice.boardNo, noticeNewest),
        [noticeNewest],
    );

    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

    return (
        <>
            <SEOHelmet title={'검색 결과 페이지'} />
            <div className='contents category'>
                <div className='container'>
                    <div className='content no_margin'>
                        {/* 검색 영역 페이지에 no_margin 클래스 추가 */}
                        <ResultTop
                            handleSearch={handleSearch}
                            allCount={count.ALL}
                            initalKeyword={initalKeyword}
                            setReset={setReset}
                        />
                        <Tab
                            tabState={tabState}
                            setTabState={setTabState}
                            count={count}
                            setReset={setReset}
                        />
                        {count.ALL === 0 ? (
                            <SearchResultNone />
                        ) : (
                            <>
                                <div style={{ margin: '0 24px' }}>
                                    {(isAll || tabState === 'PRODUCT') && (
                                        <ProductResult
                                            productList={productList}
                                            productCount={productCount}
                                            orderBy={orderBy}
                                            setOrderBy={setOrderBy}
                                            searchProduct={searchProduct}
                                            keyword={keyword}
                                        />
                                    )}
                                    {(isAll || tabState === 'EVENT') && (
                                        <EventResult
                                            fetchEvent={fetchEvent}
                                            eventList={eventList}
                                            eventCount={eventCount}
                                            setNewest={setNewest}
                                            newest={newest}
                                        />
                                    )}
                                    {(isAll || tabState === 'CATEGORY') && (
                                        <CategoryResult
                                            fetchCategory={fetchCategory}
                                            keyword={keyword}
                                            categoryList={categoryList}
                                            categoryCount={categoryCount}
                                        />
                                    )}
                                    {(isAll || tabState === 'NOTICE') && (
                                        <NoticeResult
                                            noticeList={noticeList}
                                            noticeCount={noticeCount}
                                            keyword={keyword}
                                            noticeNewest={noticeNewest}
                                            setNoticeNewest={setNoticeNewest}
                                            searchNotice={searchNotice}
                                            boardNo={config.notice.boardNo}
                                        />
                                    )}
                                </div>
                                {/* {
                    (isAll || tabState === 'CATEGORY') 
                      && 
                      <CategoryResult
                        fetchCategory={fetchCategory}
                        keyword={keyword}
                        categoryList={categoryList}
                        categoryCount={categoryCount}
                      />
                  }
                  {
                    (isAll || tabState === 'NOTICE') 
                      && 
                      <NoticeResult 
                        noticeList={noticeList}
                        noticeCount={noticeCount}
                        keyword={keyword}
                        noticeNewest={noticeNewest}
                        setNoticeNewest={setNoticeNewest}
                        searchNotice={searchNotice}
                      />
                  } */}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
