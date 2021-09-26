import { React, useEffect, useMemo, useState, useCallback } from 'react';
import _ from 'lodash';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getProductSearch } from "../../api/product";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/category.scss"

//lib
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"

//components
import ResultTop from '../../components/search/ResultTop';
import ProductResult from '../../components/search/ProductResult';
import EventResult from '../../components/search/EventResult';
import CategoryResult from '../../components/search/CategoryResult';
import NoticeResult from '../../components/search/NoticeResult';
import Tab from '../../components/search/Tab';
import { fetchBoardConfig, useBoardDispatch, useBoardState } from '../../context/board.context';
import { getBoards } from '../../api/manage';
import { getCategoryListByKeyword, getDisplayEvents } from '../../api/display';
import { orderList } from '../../const/search';


export default function SearchResult({match}) {
  const initalKeyword = match.params.keyword;

  const { config } = useBoardState();
  const dispatch = useBoardDispatch();

  const [tabState, setTabState] = useState("ALL");

  const [keyword, setKeyword] = useState(initalKeyword);

  const [orderBy, setOrderBy] = useState('RECENT_PRODUCT');

  const [productList, setProductList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);

  const [productCount, setProductCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [noticeCount, setNoticeCount] = useState(0);

  const getProductQuery = (keyword, orderBy, pageNumber=1, pageSize=9) => {

    const orderByQuery = _.chain(orderList)
                          .filter(({ orderBy: ob }) => ob === orderBy)
                          .map(({ query }) => query)
                          .head()
                          .value();

    return {
      ...orderByQuery,
      keywords: keyword,
      pageNumber,
      pageSize
    }
  }
  const searchProduct = useCallback(
    async(keyword, orderBy, pageNumber = 1) => {
      try {
        const { data } = await getProductSearch(getProductQuery(keyword, orderBy, pageNumber))
        
        setProductList(prev => pageNumber > 1 ? prev.concat(data.items) : data.items)
        setProductCount(data.totalCount || 0);
      } catch(e) {
        console.error(e);
      }
    },
    [],
  );

  const searchEvent = useCallback(
    async (keyword) => {
      try {
        const { data } = await getDisplayEvents(keyword);
        setEventList(data);
        setEventCount(data.length || 0);
      } catch(e) {
        console.error(e);
      }
    },
    [],
  )

  const searchCategory = useCallback(
    async (keyword) => {
      try {
        const { data } = await getCategoryListByKeyword(keyword);
        setCategoryList(data.flatCategories);
        setCategoryCount(data.flatCategories.length);
      } catch(e) {
        console.error(e);
      }
    },
    [],
  )

  const searchNotice = useCallback( 
    async (keyword, boardNo) => {
      const pathParams = {
        boardNo,
      };
      const params = {
        hasTotalCount: true,
        keyword,
        // searchType: 'title',
      }
      try {
        const { data } = await getBoards({ pathParams, params});
        setNoticeList(data.items);
        setNoticeCount(data.totalCount || 0);
      } catch(e) {
        console.error(e);
      }
    }, []
  )

  const handleSearch = newKeyword => {
    if (keyword === newKeyword) return;

    setKeyword(newKeyword);
    searchProduct(newKeyword);
    searchNotice(newKeyword, config.notice.boardNo);
    searchEvent(newKeyword);
    searchCategory(newKeyword);
  }

  const isAll = useMemo(() => tabState === 'ALL', [tabState]);

  const count = useMemo(() => ({
    ALL: productCount + eventCount + categoryCount + noticeCount,
    PRODUCT: productCount,
    EVENT: eventCount,
    CATEGORY: categoryCount,
    NOTICE: noticeCount,
  }), [productCount, eventCount, categoryCount, noticeCount]);

  useEffect(() => fetchBoardConfig(dispatch, config.notice?.boardNo), [dispatch, config.notice?.boardNo])

  useEffect(()=> {
    if (config.notice.boardNo > 0) {
      searchProduct(keyword, orderBy);
      searchNotice(keyword, config.notice.boardNo);
      searchEvent(keyword);
      searchCategory(keyword);
    }
  }, [keyword, orderBy, searchProduct, searchNotice, searchEvent, searchCategory, config?.notice.boardNo]);

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
  
  return (
    <>
      <SEOHelmet title={"검색 결과 페이지"} />
        <div className="contents category">
          <div className="container">
            <div className="content no_margin">{/* 검색 영역 페이지에 no_margin 클래스 추가 */}
            <ResultTop 
              handleSearch={handleSearch}
              allCount={count.ALL}
              initalKeyword={initalKeyword}
            />
            <Tab 
              tabState={tabState}
              setTabState={setTabState}
              count={count}
            />
            <div className="product">
            {
              (isAll || tabState === 'PRODUCT') 
                && 
                <ProductResult 
                  productList={productList} 
                  productCount={productCount} 
                  orderBy={orderBy} 
                  setOrderBy={setOrderBy} 
                  searchProduct={searchProduct}
                  keyword={keyword}
                />
            }
            {
              (isAll || tabState === 'EVENT') 
                && 
                <EventResult 
                  eventList={eventList}
                  eventCount={eventCount}
                />
            }
            </div>
            {
              (isAll || tabState === 'CATEGORY') 
                && 
                <CategoryResult 
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
                />
            }
          </div>
        </div>
      </div>
    </>
  );
}
