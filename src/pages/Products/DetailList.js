import { React ,useState, useEffect, useContext, useRef } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//lib
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';


//api
import { getProductListByCategoryNo } from "../../api/product";

//css
import "../../assets/scss/category.scss"

//lib-css
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import "swiper/swiper.scss"

//context
import GlobalContext from '../../context/global.context';

//component
import Product from '../../components/Product';

//img
import categoryLeft from '../../assets/images/category/btn_category_left.svg';
import categoryRight from '../../assets/images/category/btn_category_right.svg';

export default function Products({match}) {
    const {onChangeGlobal} = useContext(GlobalContext)
    const {type, detail_type} = match.params;
    
    const [typeName, setTypeName] = useState('');
    const [detailTypeName, setDetailTypeName] = useState('');
    const [detailTypeClass, setDetailTypeClass] = useState('');

    //ui
    const [mobileOrderOpen, setMobileOrderOpen] = useState(false);

    //data
    const [categoryNo, setCategoryNo] = useState();
    const [orderBy, setOrderBy] = useState('RECENT_PRODUCT');

    const [subCategory, setSubCategory] = useState(0);

    const [totalNum, setTotalNum] = useState();
    const [productList, setProductList] = useState([]);

    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

    useEffect(()=>{
        if(detail_type == "lens"){
            setDetailTypeName("렌즈교환식 카메라");
            setDetailTypeClass('camera1');
            setCategoryNo(60860)
        } else if(detail_type == "compact"){
            setDetailTypeName("컴팩트 카메라");
            setDetailTypeClass('camera2');
            setCategoryNo(60862)
        } else if(detail_type == "cinema"){
            setDetailTypeName("시네마 라인 카메라");
            setDetailTypeClass('videocamera1');
            setCategoryNo(60866)
        } else if(detail_type == "camcoder"){
            setDetailTypeName("캠코더");
            setDetailTypeClass('videocamera2');
            setCategoryNo(60867)
        } else if(detail_type == "actioncam"){
            setDetailTypeName("액션캠");
            setDetailTypeClass('videocamera3');
            setCategoryNo(60868)
        } else if(detail_type == "headphone"){
            setDetailTypeName("헤드폰/이어폰");
            setDetailTypeClass('audio1');
            setCategoryNo(60872)
        } else if(detail_type == "speaker"){
            setDetailTypeName("스피커");
            setDetailTypeClass('audio2');
            setCategoryNo(60873)
        } else if(detail_type == "homeaudio"){
            setDetailTypeName("홈오디오");
            setDetailTypeClass('audio3');
            setCategoryNo(60874)
        } else if(detail_type == "recorder"){
            setDetailTypeName("워크맨/녹음기");
            setDetailTypeClass('audio4');
            setCategoryNo(60875)
        } else if(detail_type == "camera"){
            setDetailTypeName("카메라 엑세서리");
            setDetailTypeClass('accessory1');
            setCategoryNo(60884)
        } else if(detail_type == "audio"){
            setDetailTypeName("오디오 엑세서리");
            setDetailTypeClass('accessory2');
            setCategoryNo(60885)
        } else if(detail_type == "playstation"){
            setDetailTypeName("PlayStation®");
            setDetailTypeClass('playstation1');
            setCategoryNo(60897)
        } else if(detail_type == "title"){
            setDetailTypeName("게임타이틀 및 주변기기");
            setDetailTypeClass('playstation2');
            setCategoryNo(60898)
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


    useEffect(()=>{
        if(subCategory == 0){
            _getProductListByCategoryNo(categoryNo)
        } else{
            _getProductListByCategoryNo(subCategory)
        }
        setMobileOrderOpen(false);
    },[categoryNo, orderBy, subCategory])

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
        <SEOHelmet title={`제품세부목록:${detailTypeName}`} />
        <div className="category">
        <div className="container">
            <div className="content">

            <div className={`category__header category__header__sub ${detailTypeClass}`}>
                    <a href={`/products/${type}`} className="category__header__back">{typeName}</a>
                    <h1 className="category__header__name">{detailTypeName}</h1>
                    {
                        detail_type == "lens" &&
                         <div className="category__header__links">
                            <a href="#" className="category__header__link">제품 비교</a>
                            <a href={`/esp`} className="category__header__link">연장서비스플랜 ESP 보기</a>
                        </div>
                    }
                    <div className="category__header__menu swiper-container">
                        {detail_type == "lens" &&
                         <>
                         <button type="button" className="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                         <Swiper
                            //centered
                            className="swiper-wrapper centered"
                            slidesPerView="auto"
                            breakpoints={
                                {
                                    320: {
                                        allowTouchMove: true
                                    },
                                    1281: {
                                        allowTouchMove: false
                                    }
                                }
                            }
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                         >
                            
                         <SwiperSlide className={`swiper-slide all ${subCategory == 0 ? "category__header__menu--active" : ""}`}>
                             <a href="#" onClick={()=>{
                                setSubCategory(0)
                            }}><span>전체보기</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60863 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60863)
                            }}><span>카메라</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60864 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60864)
                            }}><span>렌즈</span></a>
                            </SwiperSlide>
                         </Swiper>
                        <button type="button" className="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                        </>
                        }

                        {detail_type == "camcoder" && 
                            <>
                             <button type="button" className="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                             <Swiper
                                //centered
                                slidesPerView="auto"
                                breakpoints={
                                    {
                                        320: {
                                            allowTouchMove: true
                                        },
                                        1281: {
                                            allowTouchMove: false
                                        }
                                    }
                                }
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                            >
                                <SwiperSlide className={`swiper-slide all ${subCategory == 0 ? "category__header__menu--active" : ""}`}>
                             <a href="#" onClick={()=>{
                                setSubCategory(0)
                            }}><span>전체보기</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60869 ? "category__header__menu--active" : "" }`}>
                                    <a href="#" onClick={()=>{
                                setSubCategory(60869)
                            }}><span>4K 핸디캠</span></a>
                                </SwiperSlide>
                                <SwiperSlide className={`swiper-slide ${subCategory == 60870 ? "category__header__menu--active" : "" }`}>
                                    <a href="#" onClick={()=>{
                                setSubCategory(60870)
                            }}><span>HD 핸디캠</span></a>
                                </SwiperSlide>
                            </Swiper>
                            <button type="button" className="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                            </>
                        }

                        {detail_type == "headphone" && 
                            <>
                            <button type="button" className="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                            <Swiper
                                //centered
                                slidesPerView="auto"
                                breakpoints={
                                    {
                                        320: {
                                            allowTouchMove: true
                                        },
                                        1281: {
                                            allowTouchMove: false
                                        }
                                    }
                                }
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                            >

<SwiperSlide className={`swiper-slide all ${subCategory == 0 ? "category__header__menu--active" : ""}`}>
                             <a href="#" onClick={()=>{
                                setSubCategory(0)
                            }}><span>전체보기</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60878 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60878)
                            }}><span>헤드폰 앰프</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60876 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60876)
                            }}><span>무선 이어폰</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60877 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60877)
                            }}><span>유선 이어폰</span></a>
                            </SwiperSlide>
                           </Swiper>
                           <button type="button" className="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                           </>
                        }

                        {detail_type == "speaker" && 
                            <>
                            <button type="button" className="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                            <Swiper
                                //centered
                                slidesPerView="auto"
                                breakpoints={
                                    {
                                        320: {
                                            allowTouchMove: true
                                        },
                                        1281: {
                                            allowTouchMove: false
                                        }
                                    }
                                }
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                            >
                            <SwiperSlide className={`swiper-slide all ${subCategory == 0 ? "category__header__menu--active" : ""}`}>
                             <a href="#" onClick={()=>{
                                setSubCategory(0)
                            }}><span>전체보기</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60879 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60879)
                            }}><span>무선 스피커</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60880 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60880)
                            }}><span>카오디오</span></a>
                            </SwiperSlide>
                           </Swiper>
                           <button type="button" className="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                           </>
                        }

                    {detail_type == "recorder" && 
                            <>
                            <button type="button" className="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                            <Swiper
                                //centered
                                slidesPerView="auto"
                                breakpoints={
                                    {
                                        320: {
                                            allowTouchMove: true
                                        },
                                        1281: {
                                            allowTouchMove: false
                                        }
                                    }
                                }
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                            >
                            <SwiperSlide className={`swiper-slide all ${subCategory == 0 ? "category__header__menu--active" : ""}`}>
                             <a href="#" onClick={()=>{
                                setSubCategory(0)
                            }}><span>전체보기</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60881 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60881)
                            }}><span>MP3 플레이어</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60882 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60882)
                            }}><span>녹음기</span></a>
                            </SwiperSlide>
                           </Swiper>
                           <button type="button" className="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                           </>
                        }

                    {detail_type == "camera" && 
                            <>
                            <button type="button" className="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>
                            <Swiper
                                //centered
                                slidesPerView="auto"
                                breakpoints={
                                    {
                                        320: {
                                            allowTouchMove: true
                                        },
                                        1281: {
                                            allowTouchMove: false
                                        }
                                    }
                                }
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                            >
                            <SwiperSlide className={`swiper-slide all ${subCategory == 0 ? "category__header__menu--active" : ""}`}>
                             <a href="#" onClick={()=>{
                                setSubCategory(0)
                            }}><span>전체보기</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60886 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60886)
                            }}><span>메모리카드/SSD</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60887 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60887)
                            }}><span>배터리/충전기/어댑터</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60888 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60888)
                            }}><span>세로그립</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60889 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60889)
                            }}><span>플래시/조명</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60890 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60890)
                            }}><span>마이크</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60891 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60891)
                            }}><span>뷰파인더/모니터</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60888 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60888)
                            }}><span>세로그립</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60894 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60894)
                            }}><span>케이스/커버/스트랩</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60899 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60899)
                            }}><span>액세서리 키트</span></a>
                            </SwiperSlide>
                            <SwiperSlide className={`swiper-slide ${subCategory == 60895 ? "category__header__menu--active" : "" }`}>
                            <a href="#" onClick={()=>{
                                setSubCategory(60895)
                            }}><span>기타</span></a>
                            </SwiperSlide>
                           </Swiper>
                           <button type="button" className="swiper-button-next"><img src={categoryRight} alt="다음" /></button>
                           </>
                        }
                    
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
                            productList.map((product, productIndex)=>{
                                
                                return (
                                    <>
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