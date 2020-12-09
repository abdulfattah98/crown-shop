import React, { useState, useEffect } from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
    Tooltip,
} from '@ant-design/icons';
import { RadioButton, RadioGroup } from '@trendmicro/react-radio';
import { showAverage } from '../../functions/rating';
import { Link } from 'react-router-dom';

import Star from '../forms/Star';

import { removeWishlist, addToWishlist } from '../../functions/user';
import { currentUser } from '../../functions/auth';

import { ReactComponent as NotWishlistIcon } from './notwishlist.svg';
import { ReactComponent as DeleteIcon } from './delete.svg';
import { ReactComponent as WishlistIcon } from './wishlist.svg';
import { ReactComponent as MinusIcon } from './minus.svg';
import { ReactComponent as PlusIcon } from './plus.svg';
import { ReactComponent as CartIcon } from './shopping-cart.svg';

const ProductCardRow = ({ p, wishListCard, loadWishlist }) => {
    let dispatch = useDispatch();
    const [counter, setCounter] = useState(1);
    const [currentColor, setCurrentColor] = useState(p.color[0]);
    const [currentImages, setCurrentImages] = useState();
    const [tooltip, setTooltip] = useState('Click to add');

    const { user } = useSelector((state) => ({ ...state }));

    const handlePlus = () => {
        setCounter(counter + 1);
    };
    const handleMinus = () => {
        setCounter(counter - 1);
    };

    const loadcolorimages = (value) => {
        if (!currentImages) {
            const currentImgs = p.images.filter(
                (image) => image.color === value
            );
            setCurrentImages(currentImgs);
        } else {
            return;
        }
    };

    const removetowishPLP = async (id) => {
        await removeWishlist(id, user.token);
        currentUser(user.token)
            .then((res) => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: user.token,
                        role: res.data.role,
                        _id: res.data._id,
                        wishlist: res.data.wishlist,
                    },
                });
            })
            .catch((err) => console.log(err));
    };
    const addtowishPLP = async (id) => {
        await addToWishlist(id, user.token);

        currentUser(user.token)
            .then((res) => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: user.token,
                        role: res.data.role,
                        _id: res.data._id,
                        wishlist: res.data.wishlist,
                    },
                });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadcolorimages(currentColor);
    });
    const changeColor = (e) => {
        console.log(e.target.value);
        setCurrentColor(e.target.value);
        const currentImgs = p.images.filter(
            (image) => image.color === e.target.value
        );
        setCurrentImages(currentImgs);
    };

    const handleRemove = (id) => {
        removeWishlist(id, user.token);
        currentUser(user.token)
            .then((res) => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: user.token,
                        role: res.data.role,
                        _id: res.data._id,
                        wishlist: res.data.wishlist,
                    },
                });
                loadcolorimages(currentColor);
                loadWishlist();
            })
            .catch((err) => console.log(err));
    };

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
                ...p,
                images: currentImages,
                color: currentColor,
                count: counter,
            };
            let sameProduct = false;
            cart.filter((p) => {
                if (
                    p._id === productAddToCart._id &&
                    p.color === productAddToCart.color
                ) {
                    p.count += productAddToCart.count;

                    sameProduct = true;
                }
            });
            if (!sameProduct) {
                cart.push({
                    ...p,
                    images: currentImages,
                    color: currentColor,
                    count: counter,
                });
            }
            handleRemove(productAddToCart._id);

            setCounter(1);
            // push new product to cart
            // remove duplicates

            // save to local storage
            // console.log('unique', unique)
            localStorage.setItem('cart', JSON.stringify(cart));
            // show tooltip
            setTooltip('Added');

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

    return (
        <div className="wishlist__products-product position-relative">
            {!wishListCard &&
            user &&
            user.wishlist.length &&
            user.role === 'subscriber' &&
            user.wishlist.includes(p._id) ? (
                <div
                    className="product__wishlist"
                    style={{ right: '10px', top: '10' }}
                >
                    <WishlistIcon
                        className="product__wishlist-icon"
                        onClick={() => removetowishPLP(p._id)}
                    />
                </div>
            ) : !wishListCard &&
              user &&
              user.role === 'subscriber' &&
              !user.wishlist.includes(p.id) ? (
                <div
                    className="product__wishlist"
                    style={{ right: '10px', top: '10' }}
                >
                    <NotWishlistIcon
                        className="product__wishlist-icon"
                        onClick={() => addtowishPLP(p._id)}
                    />
                </div>
            ) : null}
            <div className="product-image-info">
                <div className="image-container">
                    {p.images.length ? (
                        // <ModalImage
                        //     small={p.images[0].url}
                        //     large={p.images[0].url}
                        // />
                        <Link to={`/product/${p.slug}`}>
                            <img
                                src={
                                    currentImages && currentImages.length
                                        ? currentImages[0].url
                                        : laptop
                                }
                                alt=""
                            />
                        </Link>
                    ) : (
                        <Link to={`/product/${p.slug}`}>
                            <img src={laptop} alt="no image provided" />
                        </Link>
                        // <ModalImage small={laptop} large={laptop} />
                    )}
                </div>
                <div className="product-info">
                    <div className="product-info__brand">{p.brand}</div>
                    <Link to={`/product/${p.slug}`}>
                        <div className="product-info__name">
                            {p.title.length > 40
                                ? p.title.slice(0, 40) + '...'
                                : p.title}
                        </div>
                    </Link>
                    <div className="product-info__rating my-2">
                        {p && p.ratings && p.ratings.length > 0 ? (
                            showAverage(p)
                        ) : (
                            <Star numberOfStars={5} starColor="#ddd" />
                        )}
                    </div>

                    {/* <div className="product-info__shipping">
                        {p.shipping === 'Yes' ? (
                            <>
                                <span>Shipping: </span>
                                <CheckCircleOutlined className="text-success" />
                            </>
                        ) : (
                            <CloseCircleOutlined className="text-danger" />
                        )}
                    </div> */}
                    <div className="product-info__color">
                        <span>Colors: </span>
                        <div className="radio_select_color">
                            <RadioGroup
                                name="radio"
                                value={currentColor}
                                onChange={(e) => changeColor(e)}
                            >
                                {p.color &&
                                    p.color.map((c, index) => {
                                        let v = false;
                                        if (currentColor == c) {
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
                                                    value={c}
                                                ></RadioButton>
                                            </span>
                                        );
                                    })}
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="d-flex align-items-center counter-add--sm">
                        <div className="d-flex d-sm-none counter align-items-center justify-content-start">
                            <div className="product-price">
                                <span className="currency">JD</span>
                                <span className="value">{p.price}</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="product-info__counter--sm d-block d-sm-none counter-add-to-cart--sm">
                        {p && p.quantity >= 1 ? (
                            <div className="d-flex align-items-center">
                                <div className="product-counter mb-3">
                                    <div className="d-flex align-items-center">
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
                                                max={p.quantity}
                                                readOnly
                                            />
                                            <span>
                                                <button
                                                    className="js-qty-selector-plus btnqty "
                                                    type="button"
                                                    onClick={handlePlus}
                                                    disabled={
                                                        counter >= p.quantity
                                                    }
                                                >
                                                    <PlusIcon className="icon-plus" />
                                                </button>
                                            </span>
                                        </div>
                                        {!wishListCard ? (
                                            <div
                                                className="add-to-cart"
                                                onClick={handleAddToCart}
                                            >
                                                <CartIcon className="add-to-cart__icon" />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="out-of-stock--sm">
                                <span>OUT OF STOCK</span>
                            </div>
                        )}
                    </div> */}
                    {wishListCard ? (
                        <div className="product-control d-none d-sm-flex">
                            {wishListCard && p && p.quantity >= 1 ? (
                                <div
                                    className="move-product"
                                    onClick={handleAddToCart}
                                >
                                    <CartIcon className={'icon'} />
                                    <span>Move To Cart</span>
                                </div>
                            ) : null}
                            <div
                                className="remove-product"
                                onClick={() => handleRemove(p._id)}
                            >
                                <DeleteIcon className="icon" />
                                <span>Remove</span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            {wishListCard ? (
                <div className="product-control--sm d-flex d-sm-none">
                    {wishListCard ? (
                        <div>
                            {p && p.quantity >= 1 ? (
                                <div
                                    className="move-product ml-4"
                                    onClick={handleAddToCart}
                                >
                                    <CartIcon className={'icon'} />
                                    <span>Move To Cart</span>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                    <div
                        className="remove-product"
                        onClick={() => handleRemove(p._id)}
                    >
                        <DeleteIcon className="icon" />
                        <span>Remove</span>
                    </div>
                </div>
            ) : null}
            <div className="product__right d-none d-sm-flex flex-sm-column">
                <div className="product-price mb-0">
                    <span className="currency">JD</span>
                    <span className="value">{p.price}</span>
                </div>
                <div>
                    {/* {p && p.quantity >= 1 ? (
                        <div className="d-flex align-items-center">
                            <div className="product-counter mr-3">
                                <div className="">
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
                                                    max={p.quantity}
                                                    readOnly
                                                />
                                                <span>
                                                    <button
                                                        className="js-qty-selector-plus btnqty "
                                                        type="button"
                                                        onClick={handlePlus}
                                                        disabled={
                                                            counter >=
                                                            p.quantity
                                                        }
                                                    >
                                                        <PlusIcon className="icon-plus" />
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                </div>
                            </div>
                            {!wishListCard ? (
                                <div
                                    className="add-to-cart"
                                    onClick={handleAddToCart}
                                >
                                    <CartIcon className="add-to-cart__icon" />
                                </div>
                            ) : null}
                        </div>
                    ) : !wishListCard && p && p.quantity < 1 ? (
                        <div className="out-of-stock">
                            <span>OUT OF STOCK</span>
                        </div>
                    ) : null} */}
                </div>
            </div>
        </div>
    );
};

export default ProductCardRow;
