import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { getEventByProductNo } from '../../api/display';
import _ from 'lodash';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';

//api
import {
  getProductDetail,
  getProductOptions,
  getProductSearch,
  getProductsOptions,
  postProductsGroupManagementCode,
} from '../../api/product';

//css
import '../../assets/scss/contents.scss';
import '../../assets/scss/product.scss';
// import '../../assets/scss/event.scss'

//util
import { useWindowSize } from '../../utils/utils';
import { getInfoLinks, mapContents } from '../../const/productView';
import { getColorChipValues, getMainSliderStyle, getSaleStatus, getSaleStatusForOption } from '../../utils/product';

import MainImage from '../../components/products/MainImage';
import TobContent from '../../components/products/ViewTopContent';
import RelatedProducts from '../../components/products/RelatedProducts';
import Event from '../../components/products/Event';
import BottomContent from '../../components/products/ViewBottomContent';
import { useHistory } from 'react-router';
import GlobalContext from '../../context/global.context';
import { useAlert } from '../../hooks';
import Alert from '../../components/common/Alert';
import { getOrderConfigs } from '../../api/order';

const sortOptionsByProductNo = (options, productNo) => {
  const findIdx = options.findIndex(({ productNo: no }) => no === productNo);
  const head = options.splice(findIdx, 1);
  return head.concat(options);
};

export default function ProductView({ match }) {
  const history = useHistory();
  const { isLogin } = useContext(GlobalContext);
  const productNo = Number(match.params?.productNo) || 0;

  //ui
  const [headerHeight, setHeaderHeight] = useState(0);
  const size = useWindowSize();

  // SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  useEffect(() => {
    const header = document.getElementsByClassName('header').clientHeight;
    setHeaderHeight(header);
  }, []);

  //data
  const [selectedOptionNo, setSelectedOptionNo] = useState(0);
  const [productData, setProductData] = useState(null);
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
  const [naverPayBtnKey, setNaverPayBtnKey] = useState(null);
  const [saleStatus, setSaleStatus] = useState('');

  const { openAlert, closeModal, alertVisible, alertMessage } = useAlert();

  const isInvalidForGradeProduct = (hsCode) => hsCode && !isLogin;
  const unescapeProductName = (productData) => {
    productData.baseInfo.productName = _.unescape(productData.baseInfo.productName);
    return productData;
  };

  // product init data
  const mapProductData = useCallback(([productData, { flatOptions, ...rest }]) => {
    if (isInvalidForGradeProduct(productData.baseInfo.hsCode)) {
      const historyInfo = {
        pathname: '/member/login',
        state: { next: `/product-view/${productData.baseInfo.productNo}` },
      };
      openAlert('접근 불가한 등급상품입니다.', () => () => history.push(historyInfo));
    }

    const hasColor =
      productData.groupManagementCode ||
      (!productData.groupManagementCode && flatOptions.filter(({ value }) => value.includes('_#')).length > 0);

    setWish(productData.liked);
    fetchOrderConfigs(!!productData.limitations.naverPayHandling);
    setProductData(unescapeProductName(productData));
    setProductOptions({
      ...rest,
      flatOptions:
        flatOptions.length > 0
          ? flatOptions.map((o) => {
              return {
                ...o,
                colors: o.value.includes('_#') ? getColorChipValues(o.value) : null,
                productNo: productData.baseInfo.productNo,
                forcedSoldOut: o.stockCnt === 0 && o.saleType !== 'SOLD_OUT',
              };
            })
          : [],
      hasColor,
    });
    setContents(mapContents(productData.baseInfo));

    hasColor &&
      setProductGroup(
        _.chain(flatOptions).map(({ images, optionNo, value }) => ({
          img: _.head(images),
          optionNo,
          colors: getColorChipValues(value),
        })),
      );
  }, []);

  const fetchProductData = useCallback(async (productNo) => {
    try {
      const ret = await Promise.all([getProductDetail(productNo), getProductOptions(productNo)]);
      mapProductData(ret.map(({ data }) => data));
    } catch (e) {
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
      .map((o) => ({ ...o, colors: getColorChipValues(o.value) }))
      .value();

    const hasColor = flatOptions?.length > 0;
    const sortedFlatOptions = sortOptionsByProductNo(flatOptions, productNo);

    setProductOptions(() => ({
      flatOptions: sortedFlatOptions,
      hasColor,
    }));
  };

  const mapProductGroupInfo = ({ imageUrls, options }) => {
    const { optionNo, value } = _.head(options);
    return {
      images: imageUrls,
      optionNo,
      colors: getColorChipValues(value),
    };
  };

  const fetchProductGroupData = useCallback(async (groupCode) => {
    const { data } = await postProductsGroupManagementCode({
      groupManagementCodes: [groupCode],
      saleStatus: 'ALL_CONDITIONS',
      isSoldOut: true,
    });

    const gp = sortOptionsByProductNo(
      data.flatMap(({ groupManagementMappingProducts }) => groupManagementMappingProducts),
      productNo,
    );

    setProductGroup(_.chain(gp).map(mapProductGroupInfo).value());

    const productNos = _.chain(gp)
      .flatMap(({ productNo }) => productNo)
      .join()
      .value();

    fetchProductGroupOptions(productNos);
    setProductNos(() => productNos);
  }, []);

  const fetchRelatedProducts = useCallback(
    async (categories) => {
      if (!categories) return;

      const ret = await getProductSearch({
        'order.by': 'POPULAR',
        categoryNos: categories
          .flatMap(({ categories }) => categories)
          .flatMap(({ categoryNo }) => categoryNo)
          .join(),
      });

      setRelatedProducts(
        _.chain(ret.data.items)
          .reject(({ productNo: no }) => no === productNo)
          .filter(({ hsCode }) => !hsCode)
          .map((o) => ({
            ...o,
            productName: _.unescape(o.productName),
            groupManagementMappingProducts: [
              {
                options: [{ value: o.optionValues }],
                mainImageUrl: _.head(o.imageUrls),
              },
            ],
          }))
          .value(),
      );
    },
    [productNo],
  );

  const fetchEvent = useCallback(
    async (productNo) => {
      const query = productNos?.length > 0 ? { params: { productNos } } : { pathParams: { productNo } };

      const ret = await getEventByProductNo(query);
      setProductEvents(ret.data);
    },
    [productNos?.length],
  );

  const fetchOrderConfigs = async (naverPayHandling) => {
    const {
      data: { naverPay },
    } = await getOrderConfigs();
    if (naverPayHandling && naverPay) {
      setNaverPayBtnKey(naverPay.buttonKey);
    }
  };

  useEffect(() => fetchProductData(productNo), [fetchProductData, productNo]);
  useEffect(
    () => productData?.groupManagementCode && fetchProductGroupData(productData.groupManagementCode),
    [fetchProductGroupData, productData?.groupManagementCode, productNo],
  );
  useEffect(() => {
    if (!productData?.categories) return;
    fetchRelatedProducts(productData?.categories);
    fetchEvent(productNo);
  }, [fetchRelatedProducts, fetchEvent, productNo, productData?.categories]);

  const reset = () => {
    setProductData(null);
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
        .value();
    }

    const images = _.chain(productGroup)
      .take(1)
      .flatMap(({ images }) => images)
      .compact()
      .value();

    return images?.length > 0 ? images : productData?.baseInfo?.imageUrls;
  }, [selectedOptionNo, productGroup, productData?.baseInfo?.imageUrls]);

  //
  const getLinkInnerWidth = () => {
    const width = size.width - 48;
    const $lis = document.querySelectorAll('.link_inner >li');
    const sum = _.chain($lis)
      .map((el) => window.getComputedStyle(el).getPropertyValue('width'))
      .map((v) => parseInt(v))
      .sum()
      .value();
    const withPadding = ($lis.length - 1) * 40;
    return width < sum + withPadding ? `${sum + 1 + withPadding}px` : 'auto';
  };

  const getTitle = useMemo(() => {
    if (!productData?.baseInfo?.productName) return;
    const { productName } = productData.baseInfo;

    if (!productData.categories) return productName;

    const categoryCode = _.chain(productData.categories)
      .take(1)
      .flatMap(({ categories }) => categories)
      .map(({ label }) => label)
      .take(2)
      .join(' : ')
      .value();

    return `${categoryCode} : ${productData.baseInfo.productNo} : ${productData.baseInfo.productName}`;
  }, [productData?.baseInfo?.productName]);

  const hasEvents = useMemo(() => productEvents?.length > 0, [productEvents]);

  useEffect(() => {
    if (!productData) return;

    const { status, reservationData, stock, groupManagementCode } = productData;
    if (!groupManagementCode) {
      setSaleStatus(getSaleStatus(status, reservationData, stock.stockCnt, reservationData?.reservationStockCnt));
    } else {
      if (productOptions.flatOptions.length > 1) {
        setSaleStatus(getSaleStatusForOption(productOptions.flatOptions, reservationData));
      }
    }
  }, [productData, productOptions.flatOptions]);

  return (
    <>
      <SEOHelmet title={getTitle} />
      <div className="contents product">
        {productData && (
          <div className="product_view_wrap" style={{ backgroundColor: '#fff' }}>
            <div className="product_view_main">
              <div className="prd_main_slider" style={getMainSliderStyle(size)}>
                <MainImage imageUrls={imageUrls} selectedOptionNo={selectedOptionNo} />
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
                naverPayBtnKey={naverPayBtnKey}
                saleStatus={saleStatus}
              />
            </div>
            <RelatedProducts reset={reset} products={relatedProducts} />
            {hasEvents && <Event events={productEvents} />}
            <div className="product_cont full">
              <div className="relation_link scroll" style={hasEvents ? null : { marginTop: '116px' }}>
                <ul className="link_inner" style={{ width: getLinkInnerWidth() }}>
                  {getInfoLinks().map(({ name, href, imgUrl, label }) => (
                    <li key={name}>
                      <a href={href} className="link_btn" rel="noreferrer" target="_blank" title="새 창 열림">
                        <i className="ico">
                          <img src={imgUrl} alt={name} />
                        </i>
                        <span className="link_txt">{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* 제품 탭 정보 */}
            <BottomContent contents={contents} />
          </div>
        )}
      </div>
      {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
    </>
  );
}
