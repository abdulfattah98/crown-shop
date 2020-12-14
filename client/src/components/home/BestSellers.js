import React, { useEffect, useState } from 'react';
import { getProducts } from '../../functions/product';
import ProductCardCarousel from '../home/product-card-carousel/index';

import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
// import { Pagination } from 'antd';

import { Card, Skeleton } from 'antd';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line

    useEffect(() => {
        loadAllProducts();
        // getProductsCount();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        // sort, order, limit
        getProducts('sold', 'desc', 1).then((res) => {
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
                        <ProductCardCarousel>
                            <Card
                                style={{
                                    height: '300px',
                                    width: '233px',
                                    paddingTop: '130px',
                                }}
                            >
                                <Skeleton
                                    width={100}
                                    height={100}
                                    active
                                ></Skeleton>
                            </Card>
                            <Card
                                style={{
                                    height: '300px',
                                    width: '233px',
                                    paddingTop: '130px',
                                }}
                            >
                                <Skeleton
                                    width={100}
                                    height={100}
                                    active
                                ></Skeleton>
                            </Card>
                            <Card
                                style={{
                                    height: '300px',
                                    width: '233px',
                                    paddingTop: '130px',
                                }}
                            >
                                <Skeleton
                                    width={100}
                                    height={100}
                                    active
                                ></Skeleton>
                            </Card>
                        </ProductCardCarousel>
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
