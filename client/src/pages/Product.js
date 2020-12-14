import React, { useEffect, useState } from 'react';
import { getProduct, productStar } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import { getRelated } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import ProductCarousel from '../components/home/product-card-carousel/index';
import LoadingCard from '../components/cards/LoadingCard';

const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);
    const [loading, setLoading] = useState(true);
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect(() => {
        loadSingleProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
    });

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);
            // load related
            getRelated(res.data._id).then((res) => {
                setRelated(res.data);
                setLoading(false);
            });
        });
    };

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        productStar(name, newRating, user.token).then((res) => {
            loadSingleProduct(); // if you want to show updated rating in real time
        });
    };
    return (
        <>
            {loading ? (
                <div className="row">
                    <div className="col-12 col-lg-12 px-0 col-xl-12">
                        <LoadingCard isPdpCard={true} count={1} />
                    </div>
                </div>
            ) : (
                <div className="related-products">
                    <div className="bg-white" style={{ padding: '0 15px' }}>
                        {product ? (
                            <SingleProduct
                                product={product}
                                onStarClick={onStarClick}
                                star={star}
                            />
                        ) : null}
                    </div>

                    {related.length ? (
                        <>
                            <div className="row">
                                <div className="col-12 text-center pt-5 pb-5">
                                    <h3
                                        style={{
                                            fontSize: '20px',
                                            color: '#404553',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Related Products
                                    </h3>
                                </div>
                            </div>

                            <div className="pb-5" style={{ padding: '0 15px' }}>
                                <ProductCarousel>
                                    {related && related.length > 0
                                        ? related.map((r) => (
                                              <ProductCard
                                                  key={r._id}
                                                  product={r}
                                              />
                                          ))
                                        : null}
                                </ProductCarousel>
                            </div>
                        </>
                    ) : null}
                </div>
            )}
        </>
    );
};

export default Product;
