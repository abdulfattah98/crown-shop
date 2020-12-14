import React, { useEffect, useState } from 'react';
import { getProducts } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import ProductCardCarousel from '../home/product-card-carousel/index';
import { Card, Skeleton } from 'antd';

import LoadingCard from '../cards/LoadingCard';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    // const body = document.querySelector('body');

    useEffect(() => {
        // const owl = document.querySelector('.owl-carousel');

        // owl.addEventListener('drag.owl.carousel', function (event) {
        //     body.style.overflow = 'hidden';
        // });

        // owl.addEventListener('dragged.owl.carousel', function (event) {
        //     body.removeAttribute('style');
        // });
        loadAllProducts();
        // getProductsCount();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        // sort, order, limit
        getProducts('createdAt', 'desc', 1).then((res) => {
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
                <ProductCardCarousel>{NewArrivals}</ProductCardCarousel>
            )}
        </div>
    );
};

export default NewArrivals;
