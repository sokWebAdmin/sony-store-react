
import React, { useState, useEffect, useMemo, useRef } from 'react';

//util
import { Link, useHistory } from 'react-router-dom';
import categoryLeft from '../../assets/images/category/btn_category_left.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';
import categoryRight from '../../assets/images/category/btn_category_right.svg';
import { categoriesLinkMap } from '../../const/category';
import { useWindowSize } from '../../utils/utils';

export default function CategoryHeader({category, changeCurrentCategoryByNo}) {
  const history = useHistory();
  const categoryLabel = useMemo(() => {
    const path = category.url.split('/');
    return path[path.length - 1];
  }, [category]);
  
  let backgroundImage = '';
  if (category && category.content) {
    const imageMatch = category.content.match(/(\/\/).+(jpg|png)/g);
    backgroundImage = imageMatch[0] || '';
  }

  let rootParent = category.parent;
  while (rootParent && rootParent.parent) {
    rootParent = category.parent;
  }

  const [currentCategoryNo, setCurrentCategoryNo] = useState(category.categoryNo);

  useEffect(() => {
    setCurrentCategoryNo(category.categoryNo);
  }, [category]);

  useEffect(() => {
    changeCurrentCategoryByNo(currentCategoryNo);
  }, [currentCategoryNo]);

  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);

  const openLink = ({isAvailableMoveProductCompare, isAvailableMoveAccessoryCompatibility, e}) => {
    if (isAvailableMoveProductCompare) {
      window.open(categoriesLinkMap[categoryLabel], "_blank");
    }

    if (isAvailableMoveAccessoryCompatibility) {
      window.open('https://support.d-imaging.sony.co.jp/www/cscs/accessories/top.php?area=ap&lang=ko', "_blank");
    }

    e.preventDefault();
  };

  // 1뎁스 탭
  const categoryHeaderRef = useRef(null);
  const firstDepthCategoryRef = useRef(null);
  const size = useWindowSize();

  const firstDepthCategoryHandler = () => {
    if (!firstDepthCategoryRef?.current) return;

    const list = firstDepthCategoryRef.current.querySelectorAll('.swiper-slide');
    const listCount = list.length - 1;
    
    if (listCount < 1) return;

    const computedStyle = getComputedStyle(list[1]);
    const width = parseInt(computedStyle.width);
    const marginLeft = parseInt(computedStyle.marginLeft);
    const headerWidth = parseInt(getComputedStyle(categoryHeaderRef.current).width);
    const innerWrapper = firstDepthCategoryRef.current.querySelector('.swiper-wrapper');

    const listWidth = width + ((marginLeft + width) * (listCount));
    const centered = headerWidth >= listWidth || headerWidth >= 1064;

    innerWrapper.style.justifyContent = centered ? 'center' : '';
  }

  useEffect(() => {
    firstDepthCategoryHandler();
  }, [size?.width, history?.location.pathname]);

  return (
    <div ref={categoryHeaderRef} className={ category?.depth > 1 ? 'category__header category__header__sub' : 'category__header '} style={{backgroundImage: `url(${backgroundImage})`}}>
      {category?.parent && <a href="#" className="category__header__back" onClick={e => {
        history.goBack();
        e.preventDefault();
      }}>{category.parent.label}</a>}

      <h1 className="category__header__name">{category.label}</h1>

      {category?.depth === 1 &&
      <div className="category__header__menu swiper-container">
        <Swiper
          ref={ firstDepthCategoryRef }
          className="swiper-wrapper"
          slidesPerView="auto"
          resizeObserver={true}
          observer={true}
          observeParents={true}
          on={{
            init: (swiper) => {
              swiper.update();
            },
            resize: (swiper) => {
              swiper.update();
            },
            update: (swiper) => {},
          }}
        >
          {
            category?.children.length > 0 && <SwiperSlide key="all" className="swiper-slide all category__header__menu--active">
              <a><span>전체보기</span></a>
            </SwiperSlide>
          }
          {
            category?.depth === 1 && category?.children.map(c => {
              return <SwiperSlide onClick={() => history.push(c.url)} className="swiper-slide" style={{backgroundImage: `url(${c.icon})`}} key={`sub-category-${c.categoryNo}`}><Link to={c.url}><span>{c.label}</span></Link></SwiperSlide>
            })
          }
        </Swiper>
      </div>
      }
      {rootParent &&
        <div className="category__header__links">
          {rootParent.isAvailableMoveProductCompare && <a href="#" className="category__header__link" onClick={e => {
            openLink({isAvailableMoveProductCompare: true, e});
            e.preventDefault();
          }}>제품 비교</a>}
          {(rootParent.isAvailableMoveAccessoryCompatibility && categoryLabel !== 'audio') && <a href="#" className="category__header__link" onClick={e => {
            openLink({isAvailableMoveAccessoryCompatibility: true, e});
          }}>액세서리 호환성</a>}
          {rootParent.isAvailableMoveESP && <Link to="/esp" className="category__header__link">연장 서비스 플랜 ESP 보기</Link>}
        </div>
      }

      {category?.depth > 1 &&
      <div className="category__header__menu swiper-container">
        {category?.children.length > 2 && <button type="button" className="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>}

        {category?.children.length > 0 &&
        <Swiper
          //centered
          className="swiper-wrapper"
          slidesPerView="auto"
          breakpoints={
            {
              320: {
                allowTouchMove: true,
              },
              1281: {
                allowTouchMove: false,
              }
            }
          }
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          <SwiperSlide className={`swiper-slide all ${currentCategoryNo === category.categoryNo ? "category__header__menu--active" : ""}`}>
            <a href="#" onClick={e => {
              setCurrentCategoryNo(category.categoryNo);
              e.preventDefault();
            }}><span>전체보기</span></a>
          </SwiperSlide>
          {category?.children.map(c => {
            return <SwiperSlide className={`swiper-slide ${currentCategoryNo === c.categoryNo ? "category__header__menu--active" : "" }`} key={`sub-category-${c.categoryNo}`}>
              <a href="#" onClick={e => {
                setCurrentCategoryNo(c.categoryNo);
                e.preventDefault();
              }}><span>{c.label}</span></a>
            </SwiperSlide>
          })}
        </Swiper>
        }

        {category?.children.length > 2 && <button type="button" className="swiper-button-next"><img src={categoryRight} alt="다음" /></button>}
      </div>
      }


    </div>
  );
}


                                    