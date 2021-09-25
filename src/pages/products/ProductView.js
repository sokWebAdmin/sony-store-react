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

//context
import GlobalContext from '../../context/global.context';

//util
import {useWindowSize} from '../../utils/utils';
import { getInfoLinks, mapContents } from '../../const/productView';
import { getMainSliderStyle } from '../../utils/product';


import MainImage from '../../components/products/MainImage';
import TobContent from '../../components/products/ViewTopContent';
import RelatedProducts from '../../components/products/RelatedProducts';
import Event from '../../components/products/Event';
import BottomContent from '../../components/products/ViewBottomContent';




export default function ProductView({ match, ...props }) {
  const { productNo } = match.params;

  //ui
  const [headerHeight, setHeaderHeight] = useState(0);
  const size = useWindowSize();
  const [selectedOptionNo, setSelectedOptionNo] = useState(0);

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  useEffect(()=>{
    const header = document.getElementsByClassName("header").clientHeight;
    setHeaderHeight(header);
  },[]);

  //data
  const [productData, setProductData] = useState();
  const [productOptions, setProductOptions] = useState({
    flatOptions: [],
    hasColor: false,
  });
  const [productGroup, setProductGroup] = useState([]);
  const [productColors, setProductColors] = useState([])
  const [contents, setContents] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productEvents, setProductEvents] = useState([]);

  // product init data
  const mapProductData = useCallback(([productData, { flatOptions, ...rest }]) => {
    setProductData(productData);
    setProductOptions({
      ...rest,
      flatOptions: flatOptions.length > 0 ? [_.head(flatOptions)] : []
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
    
    const flatOptions = data.optionInfos.flatMap(({ options }) => options).map(({ children, ...rest }) => ({ ...rest}));
    const hasColor = flatOptions?.length > 0;
    
    setProductOptions({
      flatOptions,
      hasColor,
    });

    if (!hasColor) return;
    const nos = flatOptions.flatMap(({ optionNo }) => optionNo);
    const values = flatOptions.map(({ value }) => value.split('_'));
    
    setProductColors(
      _.chain()
       .range(nos.length)
       .map(i => ([nos[i], values[i]]))
       .value()
    )
  }
  // @TODO 101988965 컬러 테스트 상품 번호
  const fetchProductGroupData = useCallback( async (groupCode) => {
    const { data } = await postProductsGroupManagementCode({
      groupManagementCodes: [ groupCode ],
      saleStatus: 'ALL_CONDITIONS',
      isSoldOut: true,
    });
    setProductGroup(_.chain(data)
       .flatMap(({ groupManagementMappingProducts })=> groupManagementMappingProducts)
       .map((o) => ({
         imgUrl: o.mainImageUrl,
         optionNo: _.head(o.options).optionNo
       }))
       .groupBy('optionNo')
       .value())
    fetchProductGroupOptions(data.flatMap(({ groupManagementMappingProducts }) => groupManagementMappingProducts).flatMap(({ productNo }) => productNo).join());
  }, [])

  const fetchRelatedProducts = useCallback(async (categories) => {
    if (!categories) return;
    
    const ret = await getProductSearch({
      'order.by': 'POPULAR',
      categoryNos: categories
                      .flatMap(({ categories }) => categories)
                      .flatMap(({ categoryNo }) => categoryNo)
                      .join()
    });
    setRelatedProducts(ret.data.items);
  }, []);

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
  useEffect(() => {
    if (selectedOptionNo > 0) {
      console.log(_.head(productGroup[selectedOptionNo]).imgUrl, 'asdf;lakdfja;sdfj')
      console.log(selectedOptionNo, productGroup, 'productGroup');
    }
  }, [selectedOptionNo])

  const reset = () => {
    setProductData();
    setProductOptions({
      flatOptions: [],
      hasColor: false,
    });
    setProductColors([]);
    setContents([]);
    setRelatedProducts([]);
    setProductEvents([]);
    setSelectedOptionNo(0);
  };

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
                {/* 
                  @todo optionNo 옵션번호가 아니라
                  선택된 옵션의 imageUrl 을 넘겨주기
                */}
                <MainImage 
                  imageUrls={ 
                    selectedOptionNo > 0 
                      ? 
                      [_.head(productGroup[selectedOptionNo]).imgUrl]
                      :
                      productData.baseInfo?.imageUrls 
                  }
                  selectedOptionNo={selectedOptionNo}
                />
              </div>
              <TobContent
                setSelectedOptionNo={setSelectedOptionNo}
                baseInfo={productData.baseInfo}
                deliveryFee={productData.deliveryFee}
                price={productData.price}
                options={productOptions.flatOptions}
                hasColor={productOptions.hasColor}
                productNo={productNo}
                productColors={productColors}
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