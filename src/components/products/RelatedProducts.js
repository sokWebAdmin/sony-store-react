import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
    Controller,
} from 'swiper/core';

import Product from 'components/products/Product';
import { useCategoryState } from 'context/category.context';

const RelatedProducts = ({ products, reset }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Controller]);
    const { categories } = useCategoryState();

    return (
        <div className='product_cont first recommend'>
            <div className='slide_box together_prd_slider swiper-container'>
                <h2 className='title'>함께 구매하시면 좋은 추천 제품</h2>
                <Swiper
                    className='swiper-wrapper product_List'
                    slidesPerView={2}
                    spaceBetween={10}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    breakpointsinverse={'true'}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                >
                    <>
                        {products.map((product) => (
                            <SwiperSlide key={product.productNo}>
                                <Product
                                    product={product}
                                    categories={categories}
                                    reset={reset}
                                    micro={true}
                                />
                            </SwiperSlide>
                        ))}
                    </>
                </Swiper>
                <div className='swiper-button-next'>다음</div>
                <div className='swiper-button-prev'>이전</div>
            </div>
        </div>
    );
};

RelatedProducts.propTypes = {
    products: PropTypes.array.isRequired,
    reset: PropTypes.func.isRequired,
};

export default RelatedProducts;
