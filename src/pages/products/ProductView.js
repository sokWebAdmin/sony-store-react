import { React ,useState, useEffect, useCallback, useMemo, useContext } from 'react';
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
import "swiper/swiper.scss";

//api
import { getProductDetail, getProductOptions, getProductSearch, getProductsOptions, postProductsGroupManagementCode } from "../../api/product";

//css
import "../../assets/scss/contents.scss"
import "../../assets/scss/product.scss"
import '../../assets/scss/event.scss'

//util
import {useWindowSize} from '../../utils/utils';
import { getInfoLinks, mapContents } from '../../const/productView';
import { getColorChipValues, getMainSliderStyle } from '../../utils/product';


import MainImage from '../../components/products/MainImage';
import TobContent from '../../components/products/ViewTopContent';
import RelatedProducts from '../../components/products/RelatedProducts';
import Event from '../../components/products/Event';
import BottomContent from '../../components/products/ViewBottomContent';
import { useHistory } from 'react-router';
import GlobalContext from '../../context/global.context';
import { useAlert } from '../../hooks';
import Alert from '../../components/common/Alert';

export default function ProductView({ match }) {
  const history = useHistory();
  const { isLogin } = useContext(GlobalContext);
  const productNo = Number(match.params?.productNo) || 0;

  //ui
  const [headerHeight, setHeaderHeight] = useState(0);
  const size = useWindowSize();

  // SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

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
  const [productNos, setProductNos] = useState([]);
  const [contents, setContents] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productEvents, setProductEvents] = useState([]);
  const [wish, setWish] = useState(false);

  const {
    openAlert,
    closeModal,
    alertVisible,
    alertMessage,
  } = useAlert();

  const isInvalidForGradeProduct = hsCode => hsCode && !isLogin;

  // product init data
  const mapProductData = useCallback(([productData, { flatOptions, ...rest }]) => {

    if (isInvalidForGradeProduct(productData.baseInfo.hsCode)) {
      const historyInfo = { pathname: '/member/login', state: { next: `/product-view/${productData.baseInfo.productNo}` } };
      openAlert('접근 불가한 등급상품입니다.', () => () => history.push(historyInfo));
    };

    const hasColor = productData.groupManagementCode || (!productData.groupManagementCode && flatOptions.filter(({ value }) => value.includes('_#')).length > 0)
    setWish(productData.liked);
    setProductData(productData);
    setProductOptions({
      ...rest,
      flatOptions: flatOptions.length > 0 ? flatOptions.map(o => {
        return {
          ...o,
          colors: o.value.includes('_#') ? getColorChipValues(o.value) : null
        }
      }) : [],
      hasColor,
    });
    setContents(mapContents(productData.baseInfo));

    hasColor && setProductGroup(
      _.chain(flatOptions)
       .map(({ images, optionNo, value }) => ({
         img: _.head(images),
         optionNo,
         colors: getColorChipValues(value)
       }))
    )
  }, []);

  const fetchProductData = useCallback(async (productNo) => {
    try {
        const ret = await  Promise.all([
        getProductDetail(productNo),
        getProductOptions(productNo),
      ]);
      mapProductData(ret.map(({ data }) => data));
    } catch(e) {
      history.push('/');
    }
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

  const mapProductGroupInfo = (({ imageUrls, options }) => {
    const { optionNo, value } = _.head(options);
    return {
      images: imageUrls,
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

    const productNos = _.chain(gp)
       .flatMap(({ productNo }) => productNo)
       .join()
       .value()

    fetchProductGroupOptions(productNos);
    setProductNos(() => productNos);

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
    
    setRelatedProducts(
      _.chain(ret.data.items)
       .reject(({ productNo: no }) => no === productNo)
       .map(o => ({
         ...o,
         groupManagementMappingProducts: [
           {
            options: [{ value: o.optionValues }],
            mainImageUrl: _.head(o.imageUrls)
          }
         ]
       }))
       .value()
    );
  }, [productNo]);

  const fetchEvent = useCallback(async productNo => {
    // @TODO 이벤트 api 확인중 완료 후 기획전 변경필요
    const _productNos = productNos?.length > 0 ? productNos : [ productNo ];
    // console.log(_productNos);
    // const test = await Promise.all(productNos?.map(async productNo => await getEventByProductNo({ pathParams: { productNo } })));
    // console.log(test);
    const ret = await getEventByProductNo({ pathParams: { productNo: 102007706 }});
    setProductEvents(ret.data);
  }, [productNos?.length])

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

  const imageUrls = useMemo(() => {
    if (selectedOptionNo > 0) {
      return _.chain(productGroup) 
              .filter(({ optionNo }) => optionNo === selectedOptionNo)
              .flatMap(({ images }) => images)
              .value()
    }

    const images = _.chain(productGroup)
                    .take(1)
                    .flatMap(({ images }) => images)
                    .compact()
                    .value();
                    
    return images?.length > 0 ? images : productData?.baseInfo?.imageUrls
  }, [selectedOptionNo, productGroup, productData?.baseInfo?.imageUrls]);

  //
  const showProductDetail = useMemo(() => (headerHeight > 0 || size.height < 1280) && productData, [headerHeight, size.height, productData] )
  
  const getLinkInnerWidth = () => {
    const width = size.width - 48;
    const $lis = document.querySelectorAll('.link_inner >li');
    const sum = _.chain($lis)
                 .map(el => window.getComputedStyle(el).getPropertyValue('width'))
                 .map(v => parseInt(v))
                 .sum()
                 .value();
    const withPadding = ($lis.length - 1) * 40;
    return width < (sum + withPadding) ? `${ sum + 1 + withPadding}px` : 'auto';
  }

  const getTitle = useMemo(() => {
    if (!productData?.baseInfo?.productName) return;
    const { productName } = productData.baseInfo;

    if (!productData.categories) return productName;

    const categoryCode = _.chain(productData.categories)
                  .take(1)
                  .flatMap(({ categories }) => categories)
                  .map(({ categoryNo }) => categoryNo)
                  .join('/')
                  .value();
    return `${categoryCode}/${productData.baseInfo.productName}`
  
  }, [productData?.baseInfo?.productName])
    return (
      <>        
        <SEOHelmet title={ getTitle } />
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
              <div className="relation_link scroll">
                <ul className="link_inner" style={{ width: getLinkInnerWidth() }}>
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
        {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
      </>  
    )
}