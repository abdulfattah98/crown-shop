import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Laptop from '../../images/laptop.png';
import StarRating from 'react-star-ratings';
import Star from '../forms/Star';
import RatingModal from '../modal/RatingModal';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { showAverage } from '../../functions/rating';
import { useSelector, useDispatch } from 'react-redux';
import Gallery from './Gallery';
import { RadioButton, RadioGroup } from '@trendmicro/react-radio';
// import { currentUser } from '../../functions/auth';
import { addToWishlist, removeWishlist } from '../../functions/user';

import { ReactComponent as NotWishlistIcon } from './notwishlist.svg';
import { ReactComponent as WishlistIcon } from './wishlist.svg';
import { ReactComponent as MinusIcon } from './minus.svg';
import { ReactComponent as PlusIcon } from './plus.svg';

// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
    // let theColor =
    const [currentColor, setCurrentColor] = useState('');
    const [currentImages, setCurrentImages] = useState();
    const [counter, setCounter] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    // const ref = useRef('');

    // redux
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    // router

    const { title, images, description, _id, brand } = product;

    const handleAddToCart = () => {
        // create cart array

        let cart = [];
        if (typeof window !== 'undefined') {
            // if cart is in local storage GET it
            if (!localStorage.getItem('cart')) {
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            cart = JSON.parse(localStorage.getItem('cart'));

            const productAddToCart = {
                ...product,
                images: currentImages,
                color: currentColor,
                count: counter,
            };
            let sameProduct = false;
            let outofstock = false;
            cart.filter((p) => {
                console.log(p);
                if (
                    p._id === productAddToCart._id &&
                    p.color === productAddToCart.color
                ) {
                    let value = p.count + productAddToCart.count;
                    if (value <= p.quantity) {
                        p.count = value;
                        sameProduct = true;
                    } else {
                        toast.error(
                            'Sorry, there is insufficient stock for your cart.'
                        );

                        outofstock = true;
                        return 0;
                    }
                }
                return 0;
            });
            if (!sameProduct && !outofstock) {
                cart.push({
                    ...product,
                    images: currentImages,
                    color: currentColor,
                    count: counter,
                });
            }
            setCounter(1);
            // push new product to cart
            // remove duplicates

            // save to local storage
            // console.log('unique', unique)
            localStorage.setItem('cart', JSON.stringify(cart));
            // show tooltip

            // add to reeux state
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            });
            // show cart items in side drawer
            dispatch({
                type: 'SET_VISIBLE',
                payload: true,
            });
        }
    };

    const removetowish = async (id) => {
        dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
                ...user,
                wishlist: user.wishlist.filter((w) => w !== id),
            },
        });
        await removeWishlist(id, user.token);
    };
    const addtowish = async (id) => {
        dispatch({
            type: 'LOGGED_IN_USER',
            payload: { ...user, wishlist: [...user.wishlist, id] },
        });
        await addToWishlist(id, user.token);
    };

    // const handleAddToWishlist = (e) => {
    //     e.preventDefault();
    //     addToWishlist(product._id, user.token).then((res) => {
    //         console.log('ADDED TO WISHLIST', res.data);
    //         toast.success('Added to wishlist');
    //         // history.push('/user/wishlist');
    //     });
    // };

    const loadcolorimages = (value) => {
        if (!images) {
            const currentImgs = images.filter((image) => image.color === value);
            setCurrentImages(currentImgs);
        } else {
            return;
        }
    };

    useEffect(() => {
        setCounter(1);
        if (product && product.color && !currentColor.length) {
            setCurrentColor(product.color[0]);
            loadcolorimages(product.color[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    useEffect(() => {
        if (product && images) {
            const currentImgs = images.filter(
                (image) => image.color === product.color[0]
            );
            setCurrentColor(product.color[0]);
            setCurrentImages(currentImgs);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    const handlePlus = () => {
        setCounter(counter + 1);
    };
    const handleMinus = () => {
        setCounter(counter - 1);
    };

    const changeColor = (e) => {
        setCurrentColor(e.target.value);
        const currentImgs = images.filter(
            (image) => image.color === e.target.value
        );
        setCurrentImages(currentImgs);
    };
    const { color } = product;
    return (
        <div className="product-details row">
            <div className="col-12 col-md-6">
                {currentImages && currentImages.length ? (
                    <Gallery images={currentImages} />
                ) : (
                    <Card
                        cover={
                            <img
                                src={Laptop}
                                alt={currentImages}
                                className="mb-3 card-image"
                            />
                        }
                    ></Card>
                )}
            </div>

            <div className=" col-12 col-md-6 pr-0 single-details-container">
                <span className="product-brand">{brand}</span>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="w-100">
                        <h1 className="product-name">{title}</h1>
                    </div>
                    {user && user.role === 'subscriber' ? (
                        <div>
                            {user && user.wishlist.includes(product._id) ? (
                                <div
                                    className="product-wishlist"
                                    onClick={() => removetowish(product._id)}
                                >
                                    <WishlistIcon className="product-wishlist__icon" />
                                </div>
                            ) : user && !user.wishlist.includes(product.id) ? (
                                <div
                                    className="product-wishlist"
                                    onClick={() => addtowish(product._id)}
                                >
                                    <NotWishlistIcon className="product-wishlist__icon" />
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
                <div className="product-price">
                    <span className="currency">JD</span>
                    <span className="value">{product.price}</span>
                </div>
                <div className="product-rating">
                    {product &&
                    product.ratings &&
                    product.ratings.length > 0 ? (
                        showAverage(product, '20px', '2px')
                    ) : product && product.ratings ? (
                        <Star
                            numberOfStars={5}
                            starSize="20px"
                            starSpace="2px"
                            starColor="#ddd"
                        />
                    ) : null}
                    <span
                        className="rate"
                        data-toggle="modal"
                        data-target="#ratingModal"
                        onClick={() => {
                            if (user) {
                                setModalVisible(true);
                            }
                        }}
                    >
                        {user && user.role === 'subscriber' ? (
                            'Leave rating'
                        ) : !user ? (
                            <Link to="/login">Login to leave rating</Link>
                        ) : null}
                    </span>

                    <RatingModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        title="Leave Your Rating"
                    >
                        <StarRating
                            name={_id}
                            numberOfStars={5}
                            rating={star}
                            changeRating={onStarClick}
                            isSelectable={true}
                            starDimension="25px"
                            starRatedColor="#fdcc0d"
                            starHoverColor="#fdcc0d"
                        />
                    </RatingModal>
                </div>
                <div className="product-description">{description}</div>

                <div className="d-flex align-items-center">
                    <div className="radio_select_color-detail">
                        <RadioGroup
                            name="radio"
                            value={currentColor}
                            onChange={(e) => changeColor(e)}
                        >
                            {color &&
                                color.map((c, index) => {
                                    let v = false;
                                    if (currentColor === c) {
                                        v = true;
                                    }
                                    return (
                                        <span
                                            key={c}
                                            className={`color-select ${c} ${
                                                v ? 'currentColor' : ''
                                            }`}
                                            title={c}
                                        >
                                            <RadioButton
                                                onClick={() => {
                                                    if (window) {
                                                        window.scrollTo(0, 0);
                                                    }
                                                }}
                                                value={c}
                                            ></RadioButton>
                                        </span>
                                    );
                                })}
                        </RadioGroup>
                    </div>
                    <div className="product-shipping ">
                        {product.shipping === 'Yes' ? (
                            <>
                                <span>Shipping: </span>
                                <CheckCircleOutlined className="text-success" />
                            </>
                        ) : (
                            <CloseCircleOutlined className="text-danger" />
                        )}
                    </div>
                    {product.quantity > 1 ? (
                        <div className="product-available d-none d-sm-flex d-md-none d-lg-flex">
                            <span>Only {product.quantity} available</span>
                            <CheckCircleOutlined className="icon" />
                        </div>
                    ) : null}
                </div>

                {product.quantity > 1 ? (
                    <div className="d-flex d-sm-none d-md-flex d-lg-none align-items-center mt-5 justify-content-start">
                        <div className="product-available ml-0">
                            <span>Only {product.quantity} available</span>
                            <CheckCircleOutlined className="icon" />
                        </div>
                    </div>
                ) : null}

                {user && user.role === 'subscriber' ? (
                    <div className="product__bottom-details">
                        {product && product.quantity > 0 ? (
                            <>
                                <div className="">
                                    <div className="qty-selector input-group js-qty-selector">
                                        <span>
                                            <button
                                                className="js-qty-selector-minus btnqty"
                                                type="button"
                                                onClick={handleMinus}
                                                disabled={counter <= 1}
                                            >
                                                <MinusIcon className="icon-minus" />
                                            </button>
                                        </span>
                                        <input
                                            type="text"
                                            maxLength="3"
                                            className="js-qty-selector-input "
                                            size="1"
                                            value={counter}
                                            name="qty"
                                            min="1"
                                            max={product.quantity}
                                            readOnly
                                        />
                                        <span>
                                            <button
                                                className="js-qty-selector-plus btnqty "
                                                type="button"
                                                onClick={handlePlus}
                                                disabled={
                                                    counter >= product.quantity
                                                }
                                            >
                                                <PlusIcon className="icon-plus" />
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="add-to-cart"
                                    onClick={handleAddToCart}
                                >
                                    add to cart
                                </button>
                            </>
                        ) : (
                            <div className="out-of-stock">OUT OF STOCK</div>
                        )}
                    </div>
                ) : user && user.role === 'admin' ? null : (
                    <div className="product__bottom-details">
                        {product && product.quantity > 0 ? (
                            <>
                                <div className="">
                                    <div className="qty-selector input-group js-qty-selector">
                                        <span>
                                            <button
                                                className="js-qty-selector-minus btnqty"
                                                type="button"
                                                onClick={handleMinus}
                                                disabled={counter <= 1}
                                            >
                                                <MinusIcon className="icon-minus" />
                                            </button>
                                        </span>
                                        <input
                                            type="text"
                                            maxLength="3"
                                            className="js-qty-selector-input "
                                            size="1"
                                            value={counter}
                                            name="qty"
                                            min="1"
                                            max={product.quantity}
                                            readOnly
                                        />
                                        <span>
                                            <button
                                                className="js-qty-selector-plus btnqty "
                                                type="button"
                                                onClick={handlePlus}
                                                disabled={
                                                    counter >= product.quantity
                                                }
                                            >
                                                <PlusIcon className="icon-plus" />
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="add-to-cart"
                                    onClick={handleAddToCart}
                                >
                                    add to cart
                                </button>
                            </>
                        ) : (
                            <div className="out-of-stock">OUT OF STOCK</div>
                        )}
                    </div>
                )}
                {/* <Card
                    actions={[
                        <Tooltip placement="top" title={tooltip}>
                            <a
                                onClick={handleAddToCart}
                                disabled={product.quantity < 1}
                            >
                                <ShoppingCartOutlined className="text-danger" />
                                <br />
                                {product.quantity < 1
                                    ? 'Out of Stock'
                                    : 'Add To Cart'}
                            </a>
                        </Tooltip>,

                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card> */}
            </div>
        </div>
    );
};

export default SingleProduct;
