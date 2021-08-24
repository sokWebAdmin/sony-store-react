import { React ,useState, useEffect, useContext, useRef } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//api
import { sampleApi } from "../../api/sample";

//css
import "../../assets/scss/category.scss"

//context
import GlobalContext from '../../context/global.context';

//util
import { wonComma } from '../../utils/utils';

//dummy
import {productList} from '../../dummy/products';

export default function Products({match}) {
    const {onChangeGlobal} = useContext(GlobalContext)
    const {type} = match.params;

    const [typeName, setTypeName] = useState('');

    useEffect(()=>{
        if(type == "camera"){
            setTypeName("카메라");
        } else if(type == "videocamera"){
            setTypeName("비디오 카메라");
        } else if(type == "audio"){
            setTypeName("오디오");
        } else if(type == "accessory"){
            setTypeName("엑세서리");
        } else if(type == "playstation"){
            setTypeName("PlayStation®");
        }
    },[type])

    return (
        <>
        <SEOHelmet title={`제품목록:${typeName}`} />

        <div className="container">
            <div className="content">

                <div className={`category__header ${type}`}>
                    <h1 className="category__header__name">{typeName}</h1>
                    <div className="category__header__menu swiper-container">
                    <ul className="swiper-wrapper centered">
                        {type == "camera" &&
                            <>
                                <li className="swiper-slide all category__header__menu--active"><a href="/products/camera/all"><span>전체보기</span></a></li>
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
                                 <li class="swiper-slide all category__header__menu--active"><a href="/products/videocamera/all"><span>전체보기</span></a></li>
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
                                 <li class="swiper-slide all category__header__menu--active"><a href="/products/audio/all"><span>전체보기</span></a></li>
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
                                 <li class="swiper-slide all category__header__menu--active"><a href="/products/accessory/all"><span>전체보기</span></a></li>
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
                                 <li class="swiper-slide all category__header__menu--active"><a href="/products/playstation/all"><span>전체보기</span></a></li>
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
                    <span className="list__info__num">(60)</span>
                    </h2>
                    <div className="itemsort" aria-label="상품 정렬">
                    <button className="itemsort__button">
                        <span className="itemsort__button__label sr-only">정렬기준:</span>
                        <span className="itemsort__button__selected">최신순</span>
                    </button>
                    <div className="itemsort__drawer">
                        <ul className="itemsort__items">
                        <li className="itemsort__item itemsort__item--active"><a href="#" className="itemsort__item__link">최신순</a></li>
                        <li className="itemsort__item"><a href="#" className="itemsort__item__link">높은 가격순</a></li>
                        <li className="itemsort__item"><a href="#" className="itemsort__item__link">낮은 가격순</a></li>
                        </ul>
                    </div>
                    </div>
                            {/* <!-- item-list --> */}
                    <div className="product__list">
                        {
                            productList.map((product, productIndex)=>{
                                
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
                                    <div className="product">
                                        { product.badge !== "" && (
                                            product.badge == "best" ?     
                                                <span className={`badge__text badge__text__best`}>BEST</span> :
                                                ( product.badge == "event" ? <span className={`badge__text badge__text__event`}>EVENT</span> : <span className={`badge__text badge__text__hot`}>HOT</span> )
                                        )}
                                        <div className="product__pic">
                                        <a href="/product-view/1" className="product__pic__link">
                                            {
                                                product.images && product.images.map((image, imageIndex)=>{
                                                    return (
                                                        <img src={image.src} alt={image.alt} className={`product__pic__img ${imageIndex == 0 && "product__pic__img--visible"}`} />
                                                    )
                                                })
                                            }
                                        </a>
                                        </div>
                                        <div className="colorchip">
                                        <span className="sr-only">전체 색상</span>
                                            {
                                                product.colors && product.colors.map((color, colorIndex) =>{
                                                    return (
                                                        <span className={`colorchip__item ${colorIndex == 0 && "colorchip__item--active"}`}>
                                                            <span className="colorchip__item__label" style={{backgroundColor:`#${color.code}`}}>
                                                                <span className="sr-only">{color.label}</span>
                                                            </span>
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                        <a href="/product-view/1" className="product__title">
                                        <strong className="product__title__name">{product.title}</strong>
                                        { product.badge_label !== "" && (
                                            product.badge_label == "reserve" ?     
                                                <span className="badge__label badge__label__reserve">예약판매</span> :
                                                ( product.badge_label == "outstock" ? <span className={`badge__label badge__label__outofstock`}>일시품절</span> : (
                                                    product.badge_label == "soldout" ? <span className={`badge__label badge__label__soldout`}>품절</span> : 
                                                    <span className={`badge__label badge__label__release`}>출시예정</span>
                                                ) )
                                        )}
                                        
                                        </a>
                                        <a href="/product-view/1" className="product__info">
                                            {product.info}
                                        </a>
                                        <div className="product__price">
                                        <span className="product__price__num">{wonComma(product.price)}</span>
                                            {/* 원 단위 콤마 필수  */}
                                        <span className="product__price__unit">원</span>
                                        </div>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>
            </div>
            </div>
        </div>
        </>
    );
}