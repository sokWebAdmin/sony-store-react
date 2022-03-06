import React, { useEffect, useMemo, useState } from 'react';

//SEO
import SEOHelmet from '../../components/SEOHelmet';

//css
import '../../assets/scss/category.scss';

//utils
import CategoryHeader from '../../components/products/CategoryHeader';
import ProductList from '../../components/products/ProductList';
import {
    getCategoryByKey,
    useCategoryState,
    useGetCategoryByKey,
} from '../../context/category.context';

export default function Category({ match, history }) {
    const category = useGetCategoryByKey('url', match.url);

    const { categories } = useCategoryState();

    if (categories.length > 0 && !category) {
        history.replace('/404');
    }

    const [currentCategory, setCurrentCategory] = useState(null);

    if (category && !currentCategory) {
        setCurrentCategory(category);
    }

    const changeCurrentCategoryByNo = (categoryNo) => {
        const tempCategory = getCategoryByKey(
            [category],
            'categoryNo',
            categoryNo,
        );

        if (tempCategory) {
            setCurrentCategory(tempCategory);
        }
    };

    return (
        <>
            <SEOHelmet title={`제품목록:${category?.label || ''}`} />

            <div className='category'>
                <div className='container'>
                    <div className='content'>
                        {category && (
                            <>
                                <CategoryHeader
                                    category={category}
                                    changeCurrentCategoryByNo={
                                        changeCurrentCategoryByNo
                                    }
                                ></CategoryHeader>
                                <ProductList
                                    category={currentCategory}
                                ></ProductList>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
