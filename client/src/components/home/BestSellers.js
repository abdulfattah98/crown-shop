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
                <>
                    <div className="d-none d-xl-block">
                        <LoadingCard count={6} />
                    </div>
                    <div className="d-none d-lg-block d-xl-none">
                        <LoadingCard count={4} />
                    </div>
                    <div className="d-none d-md-block d-lg-none">
                        <LoadingCard count={3} />
                    </div>
                    <div className="d-block d-md-none">
                        <LoadingCard count={1} />
                    </div>
                </>
            ) : (
                <ProductCardCarousel>
                    {products.map((product) => (
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
