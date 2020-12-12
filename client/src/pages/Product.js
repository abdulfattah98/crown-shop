import React, { useEffect, useState } from 'react';
import { getProduct, productStar } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import { getRelated } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';

const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

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
            getRelated(res.data._id).then((res) => setRelated(res.data));
        });
    };

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        console.table(newRating, name);
        productStar(name, newRating, user.token).then((res) => {
            console.log('rating clicked', res.data);
            loadSingleProduct(); // if you want to show updated rating in real time
        });
    };
    return (
        <div className="">
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

                    <div className="row pb-5" style={{ padding: '0 15px' }}>
                        {related && related.length > 0
                            ? related.map((r, idx) => (
                                  <div
                                      key={r._id}
                                      className={`col-6 col-md-4 col-lg-3 col-xl-2 my-3 px-md-3 ${
                                          idx % 2 === 0
                                              ? 'pl-0 pr-2'
                                              : 'pr-0 pl-2'
                                      }`}
                                  >
                                      <ProductCard product={r} />
                                  </div>
                              ))
                            : null}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Product;
