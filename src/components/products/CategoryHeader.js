
import React, { useState, useEffect } from 'react';

//util
import { Link, useHistory } from 'react-router-dom';
import categoryLeft from '../../assets/images/category/btn_category_left.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Controller } from 'swiper/core';
import categoryRight from '../../assets/images/category/btn_category_right.svg';

export default function CategoryHeader({category, changeCurrentCategoryByNo}) {

  console.log(category);
  const history = useHistory();
  
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
      window.open('https://www.sony.co.kr/electronics/interchangeable-lens-camera-products/t/interchangeable-lens-cameras', "_blank");
    }

    if (isAvailableMoveAccessoryCompatibility) {
      window.open('https://support.d-imaging.sony.co.jp/www/cscs/accessories/top.php?area=ap&lang=ko', "_blank");
    }

    e.preventDefault();
  };

  return (
    <div className={ category?.depth > 1 ? 'category__header category__header__sub' : 'category__header '} style={{backgroundImage: `url(${backgroundImage})`}}>
      {category?.parent && <a href="#" className="category__header__back" onClick={e => {
        history.goBack();
        e.preventDefault();
      }}>{category.parent.label}</a>}

      <h1 className="category__header__name">{category.label}</h1>

      {category?.depth === 1 &&
      <div className="category__header__menu swiper-container">
        <ul className="swiper-wrapper centered">
          {category?.children.length > 0 && <li className="swiper-slide all category__header__menu--active"><a><span>전체보기</span></a></li>}

          {category?.depth === 1 && category?.children.map(c => {
            return <li className="swiper-slide" style={{backgroundImage: `url(${c.icon})`}} key={`sub-category-${c.categoryNo}`}>
              <Link to={c.url}><span>{c.label}</span></Link>
            </li>
          })}
        </ul>
      </div>
      }

      {rootParent &&
        <div className="category__header__links">
          {rootParent.isAvailableMoveProductCompare && <a href="#" className="category__header__link" onClick={e => {
            openLink({isAvailableMoveProductCompare: true, e});
            e.preventDefault();
          }}>제품 비교</a>}
          {rootParent.isAvailableMoveAccessoryCompatibility && <a href="#" className="category__header__link" onClick={e => {
            openLink({isAvailableMoveAccessoryCompatibility: true, e});
          }}>액세서리 호환성</a>}
          {rootParent.isAvailableMoveESP && <Link to="/esp" className="category__header__link">연장서비스플랜 ESP 보기</Link>}
        </div>
      }

      {category?.depth > 1 &&
      <div className="category__header__menu swiper-container">
        {category?.children.length > 2 && <button type="button" className="swiper-button-prev"><img src={categoryLeft} alt="이전" /></button>}

        {category?.children.length > 0 &&
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


                                    