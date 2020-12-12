import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';
// import Wishlist from './user/Wishlist';

import { ReactComponent as EmptyCartIcon } from './orders-empty.svg';

const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const saveOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        userCart(cart, user.token)
            .then((res) => {
                console.log('CART POST RES', res);
                if (res.data.ok) history.push('/checkout');
            })
            .catch((err) => console.log('cart save err', err));
    };

    const saveCashOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        dispatch({
            type: 'COD',
            payload: true,
        });
        userCart(cart, user.token)
            .then((res) => {
                console.log('CART POST RES', res);
                if (res.data.ok) history.push('/checkout');
            })
            .catch((err) => console.log('cart save err', err));
    };

    const showCartItems = () => (
        // <table className="table table-bordered">
        //     <thead className="thead-light">
        //         <tr>
        //             <th scope="col">Image</th>
        //             <th scope="col">Title</th>
        //             <th scope="col">Price</th>
        //             <th scope="col">Brand</th>
        //             <th scope="col">Color</th>
        //             <th scope="col">Count</th>
        //             <th scope="col">Shipping</th>
        //             <th scope="col">Remove</th>
        //         </tr>
        //     </thead>

        //     {cart.map((p) => (
        //         <ProductCardInCheckout key={p._id} p={p} />
        //     ))}
        // </table>
        <div className="cart__products">
            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} p={p} />
            ))}
        </div>
    );

    return (
        <div className="px-0 px-md-2 py-5">
            <div className="cart">
                {!cart.length ? (
                    <div className="row">
                        <div className="col-12" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-center">
                                <EmptyCartIcon className="empty-cart-icon" />
                            </div>
                            <div className="text-center">
                                <h4 className="no-thing__title">
                                    You don't have any cart items yet
                                </h4>
                                <p className="no-thing__subtitle">
                                    What are you waiting for? Start shopping!
                                </p>
                                <button
                                    className="form-save-button no-thing-button"
                                    // style={{ width: 'unset' }}
                                >
                                    <Link to="/shop">CONTINUE SHOPPING</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8 col-12 px-3 mb-5 mb-lg-0">
                            <h3 className="cart__header">
                                Cart{' '}
                                <span className="text-muted">
                                    ({cart.length} items)
                                </span>
                            </h3>

                            {cart.length ? showCartItems() : null}
                        </div>
                        {cart.length ? (
                            <div className="col-lg-4 col-12 pr-0 cart__right">
                                <h4 className="right-title">Order Summary</h4>
                                <p className="right-subtitle">Products</p>
                                {cart.map((c, i) => (
                                    <div key={i}>
                                        <p className="product-in-summary">
                                            {c.title}{' '}
                                            <span
                                                style={{
                                                    marginRight: '4px',
                                                    color: '#ff4a4a',
                                                }}
                                            >
                                                X {c.count}
                                            </span>{' '}
                                            ={' '}
                                            <span
                                                style={{
                                                    color: '#38ae04',
                                                }}
                                            >
                                                JD{c.price * c.count}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                                <hr className="my-4" />
                                <h4 className="total my-4">
                                    Total:{' '}
                                    <b style={{ color: '#38ae04' }}>
                                        {getTotal()}
                                    </b>
                                    <span
                                        style={{
                                            fontWeight: '300',
                                            color: '#38ae04',
                                            fontSize: '17px',
                                        }}
                                    >
                                        JD
                                    </span>
                                </h4>
                                <div className="payment-buttons row">
                                    {user ? (
                                        <>
                                            <div className="payment col-12 col-md-6 col-lg-12 col-xl-6  px-0  px-lg-0 pr-xl-3 my-md-0 my-4 mb-lg-4 pl-md-0 pr-md-3">
                                                <button
                                                    onClick={saveOrderToDb}
                                                    className="online"
                                                    disabled={!cart.length}
                                                >
                                                    Proceed to Checkout
                                                </button>
                                            </div>

                                            <div className="col-12 col-md-6 col-lg-12 col-xl-6 px-lg-0  px-0 pr-md-0 pl-md-3 pl-xl-0">
                                                <button
                                                    onClick={saveCashOrderToDb}
                                                    className="cash"
                                                    disabled={!cart.length}
                                                >
                                                    Pay Cash on Delivery
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <button className="login-to-pay">
                                            <div className="col-6 pl-0">
                                                <Link
                                                    to={{
                                                        pathname: '/login',
                                                        state: { from: 'cart' },
                                                    }}
                                                >
                                                    Login to Checkout
                                                </Link>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
