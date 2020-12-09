import React, { useState, useEffect } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { removeWishlist, addToWishlist } from '../../functions/user';
import { currentUser } from '../../functions/auth';
//SVGs
import { ReactComponent as CartIcon } from './shopping-cart.svg';
import { ReactComponent as NotWishlistIcon } from './notwishlist.svg';
import { ReactComponent as WishlistIcon } from './wishlist.svg';
import { ReactComponent as MinusIcon } from './minus.svg';
import { ReactComponent as PlusIcon } from './plus.svg';

import Wishlist from '../../pages/user/Wishlist';
import { RadioButton, RadioGroup } from '@trendmicro/react-radio';

import Star from '../forms/Star';

const { Meta } = Card;

const ProductCard = ({ product, caption }) => {
    const [tooltip, setTooltip] = useState('Click to add');

    const [currentColor, setCurrentColor] = useState(product.color[0]);
    const [currentImages, setCurrentImages] = useState();
    const [counter, setCounter] = useState(1);

    // redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

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
    const removetowish = (id) => {
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
            })
            .catch((err) => console.log(err));
    };
    const addtowish = async (id) => {
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

    const loadcolorimages = (value) => {
        if (!currentImages) {
            const currentImgs = images.filter((image) => image.color === value);
            setCurrentImages(currentImgs);
        } else {
            return;
        }
    };

    useEffect(() => {
        loadcolorimages(currentColor);
    });

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

    // destructure
    const { images, title, description, slug, price, color } = product;
    //setCurrentImages(images);

    let productName = title;
    if (title.length > 35) {
        productName = `${title.slice(0, 35)}...`;
    }
    return (
        // <>
        //   {product && product.ratings && product.ratings.length > 0 ? (
        //     showAverage(product)
        //   ) : (
        //     <div className="text-center pt-1 pb-3">No rating yet</div>
        //   )}

        //   <Card
        //     cover={
        //       <img
        //         src={images && images.length ? images[0].url : laptop}
        //         style={{ height: "150px", objectFit: "cover" }}
        //         className="p-1"
        //       />
        //     }
        //     actions={[
        //       <Link to={`/product/${slug}`}>
        //         <EyeOutlined className="text-warning" /> <br /> View Product
        //       </Link>,
        //       <Tooltip title={tooltip}>
        //         <a onClick={handleAddToCart} disabled={product.quantity < 1}>
        //           <ShoppingCartOutlined className="text-danger" /> <br />
        //           {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
        //         </a>
        //       </Tooltip>,
        //     ]}
        //   >
        //     <Meta
        //       title={`${title} - $${price}`}
        //       description={`${description && description.substring(0, 40)}...`}
        //     />
        //   </Card>
        // </>

        <div className="product">
            <Link to={`product/${slug}`}>
                <div className="product__image-container">
                    {product.images.length ? (
                        // <ModalImage
                        //     small={p.images[0].url}
                        //     large={p.images[0].url}
                        // />
                        <img
                            src={
                                currentImages && currentImages.length
                                    ? currentImages[0].url
                                    : laptop
                            }
                            alt=""
                        />
                    ) : (
                        <img src={laptop} alt="no image provided" />
                        // <ModalImage small={laptop} large={laptop} />
                    )}
                </div>
            </Link>
            <div className="product__details">
                <Link to={`product/${slug}`}>
                    <span className="product__name">{productName}</span>
                </Link>

                <div className="mb-4">
                    {product &&
                    product.ratings &&
                    product.ratings.length > 0 ? (
                        showAverage(product)
                    ) : (
                        <Star numberOfStars={5} starColor="#ddd" />
                    )}
                </div>
                <div className="product-colors">
                    <div className="radio_select_color">
                        <RadioGroup
                            name="radio"
                            value={currentColor}
                            onChange={(e) => changeColor(e)}
                        >
                            {color &&
                                color.map((c, index) => {
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
                <div className="product-price mb-0">
                    <span className="product-price-currency">JD</span>
                    <span className="product-price-value">{price}</span>
                </div>

                {/* <div className="product__bottom">
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
                            <div
                                className="add-to-cart"
                                onClick={handleAddToCart}
                            >
                                <CartIcon className="add-to-cart__icon" />
                            </div>
                        </>
                    ) : (
                        <div className="out-of-stock">
                            <span>OUT OF STOCK</span>
                        </div>
                    )}
                </div> */}
                {user &&
                user.role === 'subscriber' &&
                user.wishlist.length &&
                user.wishlist.includes(product._id) ? (
                    <div className="product__wishlist">
                        <WishlistIcon
                            className="product__wishlist-icon"
                            onClick={() => removetowish(product._id)}
                        />
                    </div>
                ) : user &&
                  user.role === 'subscriber' &&
                  !user.wishlist.includes(product.id) ? (
                    <div className="product__wishlist">
                        <NotWishlistIcon
                            className="product__wishlist-icon"
                            onClick={() => addtowish(product._id)}
                        />
                    </div>
                ) : null}
                <div className="product__arrival">
                    {caption === 'New Arrival' ? (
                        <span className="font-weight-bold">NEW ARRIVAL</span>
                    ) : (
                        <span className="font-weight-bold">Best Seller</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
