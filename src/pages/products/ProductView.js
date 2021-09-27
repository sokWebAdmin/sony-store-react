import { React ,useState, useEffect, useCallback, useMemo } from 'react';
import { getEventByProductNo } from '../../api/display';
import _ from 'lodash';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//lib
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"

//api
import { getProductDetail, getProductOptions, getProductSearch, getProductsOptions, postProductsGroupManagementCode } from "../../api/product";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/product.scss"

//util
import {useWindowSize} from '../../utils/utils';
import { getInfoLinks, mapContents } from '../../const/productView';
import { getColorChipValues, getMainSliderStyle } from '../../utils/product';


import MainImage from '../../components/products/MainImage';
import TobContent from '../../components/products/ViewTopContent';
import RelatedProducts from '../../components/products/RelatedProducts';
import Event from '../../components/products/Event';
import BottomContent from '../../components/products/ViewBottomContent';

export default function ProductView({ match }) {
  const productNo = Number(match.params?.productNo) || 0;

  //ui
  const [headerHeight, setHeaderHeight] = useState(0);
  const size = useWindowSize();

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  useEffect(()=>{
    const header = document.getElementsByClassName("header").clientHeight;
    setHeaderHeight(header);
  },[]);
  
  //data
  const [selectedOptionNo, setSelectedOptionNo] = useState(0);
  const [productData, setProductData] = useState();
  const [productOptions, setProductOptions] = useState({
    flatOptions: [],
    hasColor: false,
  });
  const [productGroup, setProductGroup] = useState([]);
  const [contents, setContents] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productEvents, setProductEvents] = useState([]);
  const [wish, setWish] = useState(false);

  // product init data
  const mapProductData = useCallback(([productData, { flatOptions, ...rest }]) => {
    setWish(productData.liked);
    setProductData(productData);
    setProductOptions({
      ...rest,
      flatOptions: flatOptions.length > 0 ? flatOptions : []
    });
    setContents(mapContents(productData.baseInfo));
  }, []);

  const fetchProductData = useCallback(async (productNo) => {
    const ret = await  Promise.all([
      getProductDetail(productNo),
      getProductOptions(productNo),
    ]);
    mapProductData(ret.map(({ data }) => data));
  }, []);

  const fetchProductGroupOptions = async (productNos) => {
    const { data } = await getProductsOptions({ productNos });
    const flatOptions = _.chain(data.optionInfos)
                         .flatMap(({ options, mallProductNo }) => ({
                           ..._.head(options),
                           productNo: mallProductNo,
                         }))
                         .map(({ children, ...rest }) => ({ ...rest }))
                         .map(o => ({ ...o, colors: getColorChipValues(o.value) }))
                         .value();

    const hasColor = flatOptions?.length > 0;
      
    setProductOptions({
      flatOptions,
      hasColor,
    });
  }
  // @TODO 101988965 컬러 테스트 상품 번호
  const mapProductGroupInfo = (({ mainImageUrl, options }) => {
    const { optionNo, value } = _.head(options);
    return {
      img: mainImageUrl,
      optionNo,
      colors: getColorChipValues(value),
    }
  });

  const fetchProductGroupData = useCallback( async (groupCode) => {
    const { data } = await postProductsGroupManagementCode({
      groupManagementCodes: [ groupCode ],
      saleStatus: 'ALL_CONDITIONS',
      isSoldOut: true,
    });
    
    const gp = data.flatMap(({ groupManagementMappingProducts }) => groupManagementMappingProducts)
    
    setProductGroup(
      _.chain(gp)
       .map(mapProductGroupInfo)
       .value()
    );

    fetchProductGroupOptions(
      _.chain(gp)
       .flatMap(({ productNo }) => productNo)
       .join()
       .value()
    )
  }, []);

  const fetchRelatedProducts = useCallback(async (categories) => {
    if (!categories) return;
    
    const ret = await getProductSearch({
      'order.by': 'POPULAR',
      categoryNos: categories
                      .flatMap(({ categories }) => categories)
                      .flatMap(({ categoryNo }) => categoryNo)
                      .join()
    });
    
    setRelatedProducts(_.reject(ret.data.items, ({ productNo: no }) => no === productNo));
  }, [productNo]);

  const fetchEvent = useCallback(async productNo => {
    if (!productNo) return;

    const ret = await getEventByProductNo({ pathParams: { productNo }});
    setProductEvents(ret.data);
  }, [])

  useEffect(() => fetchProductData(productNo), [fetchProductData, productNo]);
  useEffect(() => productData?.groupManagementCode && fetchProductGroupData(productData.groupManagementCode), [fetchProductGroupData, productData?.groupManagementCode, productNo])
  useEffect(() => {
    if (!productData?.categories) return;
    fetchRelatedProducts(productData?.categories);
    fetchEvent(productNo);
  }, [fetchRelatedProducts, fetchEvent, productNo, productData?.categories]);

  const reset = () => {
    setProductData();
    setProductOptions({
      flatOptions: [],
      hasColor: false,
    });
    setProductGroup([]);
    setContents([]);
    setRelatedProducts([]);
    setProductEvents([]);
    setSelectedOptionNo(0);
  };

  const imageUrls = useMemo(() => selectedOptionNo > 0 
                                  ? 
                                    _.chain(productGroup) 
                                     .filter(({ optionNo }) => optionNo === selectedOptionNo)
                                     .map(({ img }) => img)
                                     .value()
                                  : 
                                    productData?.baseInfo?.imageUrls, 
                                  [selectedOptionNo, productData?.baseInfo?.imageUrls]
                            )

  //
  const showProductDetail = useMemo(() => (headerHeight > 0 || size.height < 1280) && productData, [headerHeight, size.height, productData] )

    return (
      <>        
        <SEOHelmet title={"상품 상세"} />
        <div className="contents product">
        {
          showProductDetail &&
          <div className="product_view_wrap" style={{backgroundColor:"#fff"}}>
            <div className="product_view_main">
              <div className="prd_main_slider" style={getMainSliderStyle(size)}>
                <MainImage 
                  imageUrls={ imageUrls }
                  selectedOptionNo={selectedOptionNo}
                />
              </div>
              <TobContent
                setSelectedOptionNo={setSelectedOptionNo}
                productData={productData}
                options={productOptions.flatOptions}
                hasColor={productOptions.hasColor}
                productNo={productNo}
                productGroup={productGroup}
                wish={wish}
                setWish={setWish}
              />
            </div>
            <RelatedProducts
              reset={reset}
              products={relatedProducts}
            />
            {
              productEvents.length > 0 && <Event events={productEvents} />
            }
            <div className="product_cont full">
              <div className="relation_link">
                <ul className="link_inner">
                  {
                    getInfoLinks().map(({
                      name,
                      href,
                      imgUrl,
                      label
                    }) => (
                      <li key={ name }>
                        <a 
                          href={href} 
                          className="link_btn" 
                          rel="noreferrer"
                          target="_blank" 
                          title="새 창 열림"
                        >
                          <i className="ico">
                            <img src={ imgUrl } alt={ name } />
                          </i>
                          <span className="link_txt">{ label }</span>
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            {/* 제품 탭 정보 */}
            <BottomContent 
              contents={contents}
            />
          </div>
        }
        </div>
      </>  
    )
}