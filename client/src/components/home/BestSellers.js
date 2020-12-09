import React, { useEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCardCarousel from '../home/product-card-carousel/index';

import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
// import { Pagination } from 'antd';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllProducts();
    }, [page]);

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data));
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        // sort, order, limit
        getProducts('sold', 'desc', page).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    return (
        <div>
            {loading ? (
                <LoadingCard count={3} />
            ) : (
                <ProductCardCarousel>
                    {products &&
                        products.length &&
                        products.map((product) => (
                            <ProductCard
                                caption="Hot"
                                key={product._id}
                                product={product}
                            />
                        ))}
                </ProductCardCarousel>
            )}
        </div>
    );
};

export default BestSellers;
