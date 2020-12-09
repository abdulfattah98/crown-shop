import React, { useEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import ProductCardCarousel from '../home/product-card-carousel/index';

import LoadingCard from '../cards/LoadingCard';
// import { Pagination } from 'antd';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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
        getProducts('createdAt', 'desc', page).then((res) => {
            setProducts(res.data);

            setLoading(false);
        });
    };

    const NewArrivals = products.map((product) => (
        <ProductCard
            product={product}
            caption="New Arrival"
            key={product._id}
        />
    ));

    return (
        <div>
            {loading ? (
                <LoadingCard count={3} />
            ) : (
                <ProductCardCarousel>{NewArrivals}</ProductCardCarousel>
            )}
        </div>
    );
};

export default NewArrivals;
