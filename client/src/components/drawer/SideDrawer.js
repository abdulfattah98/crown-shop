import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import laptop from '../../images/laptop.png';

import { CheckCircleOutlined } from '@ant-design/icons';

const SideDrawer = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    useEffect(() => {
        if (drawer) {
            setTimeout(() => {
                dispatch({
                    type: 'SET_VISIBLE',
                    payload: false,
                });
            }, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const body = document.querySelector('body');
    useEffect(() => {
        if (drawer) {
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            body.style.position = 'fixed';
            body.style.msTouchAction = 'none';
            body.style.touchAction = 'none';
        } else {
            body.removeAttribute('style');
        }
    });

    return (
        <Drawer
            className="text-center"
            // title={`Cart / ${cart.length} Product`}
            placement="right"
            closable={false}
            onClose={() => {
                dispatch({
                    type: 'SET_VISIBLE',
                    payload: false,
                });
            }}
            visible={drawer}
        >
            {cart.map((p) => (
                <div key={`${p._id} color ${p.color}`} className="drawer">
                    {p.images[0] ? (
                        <div className="d-flex align-items-center product-container">
                            <div className="image-container">
                                <img src={p.images[0].url} alt={p._id} />
                                <span className="pcs">{p.count}</span>
                            </div>
                            <div className="details">
                                <p className="name">{p.title}</p>
                                <span className="notif">
                                    Added To Cart{' '}
                                    <CheckCircleOutlined className="icon" />
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <div className="image-container">
                                <img src={laptop} alt={p._id} />
                            </div>
                            <div className="details">
                                <p className="name">{p.title}</p>
                                <span className="notif">
                                    Added To Cart{' '}
                                    <CheckCircleOutlined className="icon" />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* <Link to="/cart">
                <button
                    onClick={() =>
                        dispatch({
                            type: 'SET_VISIBLE',
                            payload: false,
                        })
                    }
                    className="text-center btn btn-primary btn-raised btn-block"
                >
                    Go To Cart
                </button>
            </Link> */}
            <div className="drawer-cart-total">
                <span className="title">Cart Total</span>
                <span className="value">JD {getTotal()}</span>
            </div>
            <div className="drawer-buttons">
                <button className="button-checkout">
                    <Link to="/cart">CART</Link>
                </button>
                <button
                    className="button-continue"
                    onClick={() =>
                        dispatch({
                            type: 'SET_VISIBLE',
                            payload: false,
                        })
                    }
                >
                    CONTINUE SHOPPING
                </button>
            </div>
        </Drawer>
    );
};

export default SideDrawer;
