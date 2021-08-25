/**
 * 추후에 백엔드 연동하면서 카테고리 번호 사용하도록 변경. 
 * 임시.
 */

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

//img
import categoryLeft from '../../assets/images/category/btn_category_left.svg';
import categoryRight from '../../assets/images/category/btn_category_right.svg';

export default function Products({match}) {
    const {onChangeGlobal} = useContext(GlobalContext)
    const {type, detail_type} = match.params;
    
    const [typeName, setTypeName] = useState('');
    const [detailTypeName, setDetailTypeName] = useState('');
    const [detailTypeClass, setDetailTypeClass] = useState('');

    useEffect(()=>{
        if(detail_type == "lens"){
            setDetailTypeName("렌즈교환식 카메라");
            setDetailTypeClass('camera1');
        } else if(detail_type == "compact"){
            setDetailTypeName("컴팩트 카메라");
            setDetailTypeClass('camera2');
        } else if(detail_type == "cinema"){
            setDetailTypeName("시네마 라인 카메라");
            setDetailTypeClass('videocamera1');
        } else if(detail_type == "camcoder"){
            setDetailTypeName("캠코더");
            setDetailTypeClass('videocamera2');
        } else if(detail_type == "actioncam"){
            setDetailTypeName("액션캠");
            setDetailTypeClass('videocamera3');
        } else if(detail_type == "headphone"){
            setDetailTypeName("헤드폰/이어폰");
            setDetailTypeClass('audio1');
        } else if(detail_type == "speaker"){
            setDetailTypeName("스피커");
            setDetailTypeClass('audio2');
        } else if(detail_type == "homeaudio"){
            setDetailTypeName("홈오디오");
            setDetailTypeClass('audio3');
        } else if(detail_type == "recorder"){
            setDetailTypeName("워크맨/녹음기");
            setDetailTypeClass('audio4');
        } else if(detail_type == "camera"){
            setDetailTypeName("카메라 엑세서리");
            setDetailTypeClass('accessory1');
        } else if(detail_type == "audio"){
            setDetailTypeName("오디오 엑세서리");
            setDetailTypeClass('accessory2');
        } else if(detail_type == "playstation"){
            setDetailTypeName("PlayStation®");
            setDetailTypeClass('playstation1');
        } else if(detail_type == "title"){
            setDetailTypeName("게임타이틀 및 주변기기");
            setDetailTypeClass('playstation2');
        }
    },[detail_type])

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
        <SEOHelmet title={`제품세부목록:${detailTypeName}`} />
        <div className="category">
        <div className="container">
            <div className="content">

            <div class={`category__header category__header__sub ${detailTypeClass}`}>
                    <a href={`/products/${type}`} class="category__header__back">{typeName}</a>
                    <h1 className="category__header__name">{detailTypeName}</h1>
                    {
                        detail_type == "lens" &&
                         <div class="category__header__links">
                            <a href="#" class="category__header__link">제품 비교</a>
                            <a href="#" class="category__header__link">연장서비스플랜 ESP 보기</a>
                        </div>
                    }
                    <div className="category__header__menu swiper-container">
                        {detail_type == "lens" &&
                         <>
                         <button type="button" class="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                        <ul class="swiper-wrapper centered">
                            <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                            <li class="swiper-slide">
                            <a href="#"><span>카메라</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>렌즈</span></a>
                            </li>
                        </ul>
                        <button type="button" class="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                        </>
                        }

                        {detail_type == "camcoder" && 
                            <>
                             <button type="button" class="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                             <ul class="swiper-wrapper centered">
                                <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                                <li class="swiper-slide">
                                <a href="#"><span>4K 핸디캠</span></a>
                                </li>
                                <li class="swiper-slide">
                                <a href="#"><span>HD 핸디캠</span></a>
                                </li>
                            </ul>
                            <button type="button" class="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                            </>
                        }

                        {detail_type == "headphone" && 
                            <>
                            <button type="button" class="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                            <ul class="swiper-wrapper centered">
                            <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                            <li class="swiper-slide">
                            <a href="#"><span>헤드폰 앰프</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>무선 이어폰</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>유선 이어폰</span></a>
                            </li>
                           </ul>
                           <button type="button" class="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                           </>
                        }

                        {detail_type == "speaker" && 
                            <>
                            <button type="button" class="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                            <ul class="swiper-wrapper centered">
                            <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                            <li class="swiper-slide">
                            <a href="#"><span>무선 스피커</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>카오디오</span></a>
                            </li>
                           </ul>
                           <button type="button" class="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                           </>
                        }

                    {detail_type == "recorder" && 
                            <>
                            <button type="button" class="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                            <ul class="swiper-wrapper centered">
                            <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                            <li class="swiper-slide">
                            <a href="#"><span>MP3 플레이어</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>녹음기</span></a>
                            </li>
                           </ul>
                           <button type="button" class="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                           </>
                        }

                    {detail_type == "recorder" && 
                            <>
                            <button type="button" class="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                            <ul class="swiper-wrapper centered">
                            <li class="swiper-slide all category__header__menu--active"><a href="#"><span>전체보기</span></a></li>
                            <li class="swiper-slide">
                            <a href="#"><span>메모리카드/SSD</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>배터리/충전기/어댑터</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>세로그립</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>플래시/조명</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>마이크</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>뷰파인더/모니터</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>세로그립</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>케이스/커버/스트랩</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>액세서리 키트</span></a>
                            </li>
                            <li class="swiper-slide">
                            <a href="#"><span>기타</span></a>
                            </li>
                           </ul>
                           <button type="button" class="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                           </>
                        }
                    
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
        </div>
        </>
    );
}