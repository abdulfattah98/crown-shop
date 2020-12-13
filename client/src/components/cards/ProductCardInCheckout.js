import React, { useEffect, useState } from 'react';
import laptop from '../../images/laptop.png';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import Star from '../forms/Star';

import { addToWishlist } from '../../functions/user';
import { currentUser } from '../../functions/auth';

import { ReactComponent as DeleteIcon } from './delete.svg';
import { ReactComponent as WishlistIcon } from './notwishlist.svg';
import { ReactComponent as MinusIcon } from './minus.svg';
import { ReactComponent as PlusIcon } from './plus.svg';

const ProductCardInCheckout = ({ p }) => {
    const { user } = useSelector((state) => ({ ...state }));

    let dispatch = useDispatch();
    const [counter, setCounter] = useState(p ? p.count : 1);

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
                return handleRemove(p._id);
            })
            .catch((err) => console.log(err));
    };

    const handlePlus = () => {
        setCounter(counter + 1);
    };

    useEffect(() => {
        handleQuantityChange(counter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    const handleQuantityChange = (value) => {
        let count = value < 1 ? 1 : value;

        if (count > p.quantity) {
            toast.error(`Max available quantity: ${p.quantity}`);
            return;
        }

        let cart = [];

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.map((product, i) => {
                if (product._id === p._id && p.color === product.color) {
                    cart[i].count = count;
                }
                return 0;
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            });
        }
    };

    const handleMinus = () => {
        setCounter(counter - 1);
    };

    const handleRemove = () => {
        let cart = [];

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            // [1,2,3,4,5]
            cart.map((product, i) => {
                if (product._id === p._id && p.color === product.color) {
                    cart.splice(i, 1);
                }
                return 0;
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            });
        }
    };

    return (
        <div className="cart__products-product">
            <div className="product-image-info">
                <div className="image-container">
                    {p.images.length ? (
                        // <ModalImage
                        //     small={p.images[0].url}
                        //     large={p.images[0].url}
                        // />
                        <Link to={`/product/${p.slug}`}>
                            <img src={p.images[0].url} alt={p.title} />
                        </Link>
                    ) : (
                        <Link to={`/product/${p.slug}`}>
                            <img src={laptop} alt={`${p.title}`} />
                        </Link>
                        // <ModalImage small={laptop} large={laptop} />
                    )}
                </div>
                <div className="product-info">
                    <div className="product-info__brand">{p.brand}</div>
                    <div className="product-info__name">
                        <Link to={`/product/${p.slug}`}>
                            {p.title.length > 40
                                ? p.title.slice(0, 40) + '...'
                                : p.title}
                        </Link>
                    </div>
                    <div className="d-flex d-sm-none price-counter-sm align-items-center justify-content-start">
                        <div className="product-price">
                            <span className="currency">JD</span>
                            <span className="value">{p.price}</span>
                        </div>
                    </div>
                    <div className="product-info__rating mb-2 mt-2">
                        {p && p.ratings && p.ratings.length > 0 ? (
                            showAverage(p)
                        ) : (
                            <Star numberOfStars={5} starColor="#ddd" />
                        )}
                    </div>
                    <div className="product-info__shipping">
                        {p.shipping === 'Yes' ? (
                            <>
                                <span>Shipping: </span>
                                <CheckCircleOutlined className="text-success" />
                            </>
                        ) : (
                            <CloseCircleOutlined className="text-danger" />
                        )}
                    </div>
                    <div className="product-info__color">
                        <span>Color: </span>
                        <span
                            className="color"
                            style={{ backgroundColor: `${p.color}` }}
                        >
                            &nbsp;
                        </span>
                    </div>
                    <div className="product-info__counter--sm d-block d-sm-none">
                        <div className="product-counter">
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
                                                        counter >= p.quantity
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
                    </div>
                    <div className="product-control d-none d-sm-flex">
                        {user ? (
                            <div
                                className="move-product"
                                onClick={() => addtowish(p._id)}
                            >
                                <WishlistIcon className="icon" />
                                <span>Move To Wishlist</span>
                            </div>
                        ) : null}
                        <div className="remove-product" onClick={handleRemove}>
                            <DeleteIcon className="icon" />
                            <span>Remove</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-control--sm d-flex d-sm-none">
                {user ? (
                    <div
                        className="move-product"
                        onClick={() => addtowish(p._id)}
                    >
                        <WishlistIcon className="icon" />
                        <span>Move To Wishlist</span>
                    </div>
                ) : null}
                <div className="remove-product" onClick={handleRemove}>
                    <DeleteIcon className="icon" />
                    <span>Remove</span>
                </div>
            </div>
            <div className="product__right d-none d-sm-flex flex-column">
                <div className="product-price">
                    <span className="currency">JD</span>
                    <span className="value">{p.price}</span>
                </div>
                <div className="product-counter">
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
                                            disabled={counter >= p.quantity}
                                        >
                                            <PlusIcon className="icon-plus" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div>
        // <tbody>
        //     <tr>
        //         <td>
        //             <div style={{ width: '100px', height: 'auto' }}>
        //                 {p.images.length ? (
        //                     <ModalImage
        //                         small={p.images[0].url}
        //                         large={p.images[0].url}
        //                     />
        //                 ) : (
        //                     <ModalImage small={laptop} large={laptop} />
        //                 )}
        //             </div>
        //         </td>
        //         <td>{p.title}</td>
        //         <td>${p.price}</td>
        //         <td>{p.brand}</td>
        //         <td>
        //             <select
        //                 onChange={handleColorChange}
        //                 name="color"
        //                 className="form-control"
        //             >
        //                 {p.color ? (
        //                     <option value={p.color}>{p.color}</option>
        //                 ) : (
        //                     <option>Select</option>
        //                 )}
        //                 {colors
        //                     .filter((c) => c !== p.color)
        //                     .map((c) => (
        //                         <option key={c} value={c}>
        //                             {c}
        //                         </option>
        //                     ))}
        //             </select>
        //         </td>
        //         <td className="text-center">
        //             <input
        //                 type="number"
        //                 className="form-control"
        //                 value={p.count}
        //                 min="1"
        //                 max={p.quantity}
        //                 onChange={handleQuantityChange}
        //             />
        //         </td>
        //         <td className="text-center">
        //             {p.shipping === 'Yes' ? (
        //                 <CheckCircleOutlined className="text-success" />
        //             ) : (
        //                 <CloseCircleOutlined className="text-danger" />
        //             )}
        //         </td>
        //         <td className="text-center">
        //             <CloseOutlined
        //                 onClick={handleRemove}
        //                 className="text-danger pointer"
        //             />
        //         </td>
        //     </tr>
        // </tbody>
    );
};

export default ProductCardInCheckout;
