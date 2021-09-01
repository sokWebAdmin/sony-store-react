import { React ,useState, useEffect, useContext, useRef } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { getProductListByCategoryNo } from "../../api/product";

//css
import "../../assets/scss/category.scss"

//context
import GlobalContext from '../../context/global.context';

//component
import Product from '../../components/Product';


export default function Products({match}) {
    const {onChangeGlobal} = useContext(GlobalContext)
    const {type} = match.params;

    const [typeName, setTypeName] = useState('');

    //ui
    const [mobileOrderOpen, setMobileOrderOpen] = useState(false);

    //data
    const [categoryNo, setCategoryNo] = useState();
    const [orderBy, setOrderBy] = useState('RECENT_PRODUCT');

    const [totalNum, setTotalNum] = useState();
    const [productList, setProductList] = useState([]);

    useEffect(()=>{
        if(type == "camera"){
            setTypeName("카메라");
            setCategoryNo(60859)
        } else if(type == "videocamera"){
            setTypeName("비디오 카메라");
            setCategoryNo(60865)
        } else if(type == "audio"){
            setTypeName("오디오");
            setCategoryNo(60871)
        } else if(type == "accessory"){
            setTypeName("엑세서리");
            setCategoryNo(60883)
        } else if(type == "playstation"){
            setTypeName("PlayStation®");
            setCategoryNo(60896)
        } else if(type == "test"){
            setCategoryNo(59184)
        }
    },[type])

    useEffect(()=>{
        if(categoryNo){
            _getProductListByCategoryNo(categoryNo)
        }
        setMobileOrderOpen(false);
    },[categoryNo, orderBy])

    const _getProductListByCategoryNo = async(category) =>{
        const response = await getProductListByCategoryNo(category, orderBy);
        if(response.status == 200 && response.data && response.data.items){
            setTotalNum(response.data.totalCount);
            //data-items
            setProductList(response.data.items)

        }
        console.log(response);
    }

    return (
        <>
        <SEOHelmet title={`제품목록:${typeName}`} />

        <div className="category">
        <div className="container">
            <div className="content">

                <div className={`category__header ${type}`}>
                    <h1 className="category__header__name">{typeName}</h1>
                    <div className="category__header__menu swiper-container">
                    <ul className="swiper-wrapper centered">
                        {type == "camera" &&
                            <>
                                <li className="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                                <li className="swiper-slide category__header__menu__camera0">
                                <a href="/products/camera/lens"><span>렌즈교환식 카메라</span></a>
                                </li>
                                <li className="swiper-slide category__header__menu__camera1">
                                <a href="/products/camera/compact"><span>컴팩트 카메라</span></a>
                                </li>
                            </>
                        }

                        {type == "videocamera" &&
                            <>
                                 <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                                <li class="swiper-slide category__header__menu__videocamera0">
                                <a href="/products/videocamera/cinema"><span>시네마 라인 카메라</span></a>
                                </li>
                                <li class="swiper-slide category__header__menu__videocamera1">
                                <a href="/products/videocamera/camcoder"><span>캠코더</span></a>
                                </li>
                                <li class="swiper-slide category__header__menu__videocamera2">
                                <a href="/products/videocamera/actioncam"><span>액션캠</span></a>
                                </li>
                            </>
                        }

                        {type == "audio" &&
                            <>
                                 <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                                <li class="swiper-slide category__header__menu__audio0">
                                <a href="/products/audio/headphone"><span>헤드폰/이어폰</span></a>
                                </li>
                                <li class="swiper-slide category__header__menu__audio1">
                                <a href="/products/audio/speaker"><span>스피커</span></a>
                                </li>
                                <li class="swiper-slide category__header__menu__audio2">
                                <a href="/products/audio/homeaudio"><span>홈 오디오</span></a>
                                </li>
                                <li class="swiper-slide category__header__menu__audio3">
                                <a href="/products/audio/recorder"><span>워크맨/녹음기</span></a>
                                </li>
                            </>
                        }

                        {type == "accessory" &&
                            <>
                                 <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                                <li class="swiper-slide category__header__menu__accessory0">
                                <a href="/products/accessory/camera"><span>카메라 액세서리</span></a>
                                </li>
                                <li class="swiper-slide category__header__menu__accessory1">
                                <a href="/products/accessory/audio"><span>오디오 액세서리</span></a>
                                </li>
                            </>
                        }

                        {type == "playstation" &&
                            <>
                                 <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                                <li class="swiper-slide category__header__menu__playstation0">
                                <a href="/products/playstation/playstation"><span>PlayStation®</span></a>
                                </li>
                                <li class="swiper-slide category__header__menu__playstation1">
                                <a href="/products/playstation/title"><span>게임타이틀 및 주변기기</span></a>
                                </li>
                            </>
                        }
                    </ul>
                    </div>
                </div>

                {/* <!-- item-list-wrapper --> */}
                <div className="product__list__wrapper">
                    <h2 className="list__info">
                    <span className="list__info__name">제품</span>
                    <span className="list__info__num">({totalNum && totalNum})</span>
                    </h2>
                    <div className={`itemsort ${mobileOrderOpen ? "itemsort--open" : ""}`} aria-label="상품 정렬">
                    <button className="itemsort__button" onClick={()=>{
                        setMobileOrderOpen(!mobileOrderOpen)
                    }}>
                        <span className="itemsort__button__label sr-only">정렬기준:</span>
                        <span className="itemsort__button__selected">{orderBy == "RECENT_PRODUCT" ? "최신순" : (orderBy == "TOP_PRICE" ? "높은 가격순" : "낮은 가격순")}</span>
                    </button>
                    <div className="itemsort__drawer">
                        <ul className="itemsort__items">
                        <li className={`itemsort__item ${orderBy == "RECENT_PRODUCT" ? "itemsort__item--active" : ""}`}><a href="#" className="itemsort__item__link" onClick={()=>{
                            setOrderBy("RECENT_PRODUCT")
                        }}>최신순</a></li>
                        <li className={`itemsort__item ${orderBy == "TOP_PRICE" ? "itemsort__item--active" : ""}`}><a href="#" className="itemsort__item__link" onClick={()=>{
                            setOrderBy("TOP_PRICE")
                        }}>높은 가격순</a></li>
                        <li className={`itemsort__item ${orderBy == "DISCOUNTED_PRICE" ? "itemsort__item--active" : ""}`}><a href="#" className="itemsort__item__link" onClick={()=>{
                            setOrderBy("DISCOUNTED_PRICE")
                        }}>낮은 가격순</a></li>
                        </ul>
                    </div>
                    </div>
                            {/* <!-- item-list --> */}
                    <div className="product__list">
                        {
                            productList && productList.map((product, productIndex)=>{
                                
                                return (
                                    <>
                                    {
                                        productIndex == 6 &&
                                        (
                                            <>
                                            {/* 배너 영역 추가 */}
                                                <div className="product product__banner product__banner--shadow" 
                                                    style={{backgroundImage: `url('/images/_tmp/banner_category.jpg')`}}> 
                                                <div className="product__banner__name">ILCE-9M2</div>
                                                <div className="product__banner__title">
                                                <span>스피드와 디테일의</span>
                                                <span>차이가 프로를 만든다</span>
                                                </div>
                                                <div className="product__banner__desc">
                                                <span>전문가의 현장 촬영을 충실하게 지원하기 위해</span>
                                                <span>견고함, 타의 추종을 불허하는 속도 등을 갖추었습니다.</span>
                                                <span>프로 워크플로우가 요구하는 사항을 충족하는 고급 기능을 제공합니다.</span>
                                                </div>
                                                <a href="#" className="product__banner__link">자세히 보기</a>
                                            </div>
                                            {/* <!--  아이템 갯수 css 를 위해 빈 아이템 ".blank" 추가 --> */}
                                            <div className="product blank"></div>
                                            </>
                                        )
                                    }
                                    <Product product={product} key={productIndex} />
                                    </>
                                )
                            })
                        }
                    </div>
            </div>
            </div>
        </div>
        </div>
        </>
    );
}