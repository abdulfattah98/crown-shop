import React, { useEffect } from 'react';

// react redux
import { useDispatch, useSelector } from 'react-redux';

import firebase from 'firebase';
import AdminNav from '../AdminNav';
import UserNav from '../UserNav';

// react router
import { Link, withRouter, useLocation } from 'react-router-dom';

// antd
import { Badge } from 'antd';

// SVGs
import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as HomeIcon } from './home.svg';
import { ReactComponent as SigninIcon } from './user.svg';
import { ReactComponent as SignupIcon } from './signup.svg';
import { ReactComponent as CartIcon } from '../shopping-cart.svg';
import { ReactComponent as AngleRightIcon } from './angle-right.svg';
import { ReactComponent as WishlistIcon } from './heart.svg';
import { ReactComponent as LogoutIcon } from './logout.svg';

import { cartReducer } from '../../../reducers/cartReducer';
import Wishlist from '../../../pages/user/Wishlist';

const Sidebar = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));
    var wishlist;
    if (user && user.wishlist) {
        wishlist = user.wishlist;
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
    };

    let name = '';
    if (user) {
        const userName = user.name.toString();
        for (let i = 0; i <= userName.length; i++) {
            if (userName[i] !== '.') {
                name += userName[i];
            } else {
                break;
            }
        }
    }

    const renderSide = () => (
        <div className={classes}>
            <div>
                <div className="sidebar__top row">
                    <div className="col-3 col-md-5">
                        <Link to="/" className="d-block">
                            <img
                                src="https://k.nooncdn.com/s/app/2019/noon-bigalog/834d8570fc98b1d548b377b56874b12f3c589710/static/images/noon_logo_black_english.svg"
                                className="sidebar__top-logo"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="d-flex justify-content-end col-3 col-md-5">
                        <CloseIcon
                            className="fas fa-close sidebar__top-close"
                            onClick={props.toggleSidebar}
                        ></CloseIcon>
                    </div>
                </div>
                <ul className="sidebar__main-links">
                    <li className="sidebar__main-links__item">
                        <Link to="/" className="sidebar__main-links__item-link">
                            <div className="icon-container">
                                <HomeIcon className="sidebar__main-links__item-link-icon" />
                            </div>
                            <span className="sidebar__main-links__item-link-text">
                                Home
                            </span>
                        </Link>
                    </li>
                    <li className="sidebar__main-links__item">
                        <Link
                            to={`${
                                user && user.role === 'subscriber'
                                    ? '/user/orders'
                                    : user && user.role === 'admin'
                                    ? '/admin/dashboard'
                                    : '/login'
                            }`}
                            className="sidebar__main-links__item-link"
                        >
                            <div className="icon-container">
                                <SigninIcon className="sidebar__main-links__item-link-icon new-icon" />
                            </div>
                            <span className="sidebar__main-links__item-link-text">
                                {!user ? 'sign in' : 'Account'}
                            </span>
                        </Link>
                    </li>
                    <li className="sidebar__main-links__item">
                        <Link
                            to={`${user ? '/' : '/signup'}`}
                            className="sidebar__main-links__item-link"
                            onClick={logout}
                        >
                            <div className="icon-container position-relative">
                                {!user ? (
                                    <SignupIcon className="sidebar__main-links__item-link-icon" />
                                ) : (
                                    <LogoutIcon className="sidebar__main-links__item-link-icon" />
                                )}
                            </div>
                            <span className="sidebar__main-links__item-link-text">
                                {user ? 'Log Out' : 'sign up'}
                            </span>
                        </Link>
                    </li>
                    {user && user.role === 'admin' ? null : (
                        <li className="sidebar__main-links__item">
                            <Link
                                to="/cart"
                                className="sidebar__main-links__item-link"
                            >
                                <div className="icon-container position-relative">
                                    <CartIcon className="sidebar__main-links__item-link-icon" />
                                    <span
                                        className={`sidebar__main-links__item-badge`}
                                    >
                                        {cart.length}
                                    </span>
                                </div>
                                <span className="sidebar__main-links__item-link-text">
                                    cart
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className="sidebar__categories">
                    <p className="sidebar__categories-text mb-0">
                        all categories
                    </p>
                    <li className="sidebar__categories-item">
                        <Link
                            to="/shop"
                            className="sidebar__categories-item-link"
                        >
                            <span className="link-text">Shop</span>
                            {/* <AngleRightIcon className="link-icon" /> */}
                        </Link>
                    </li>
                    <li className="sidebar__categories-item">
                        <Link
                            to="/category/smart-phone"
                            className="sidebar__categories-item-link"
                        >
                            <span className="link-text">Smartphones</span>
                            <AngleRightIcon className="link-icon" />
                        </Link>
                    </li>
                    <li className="sidebar__categories-item">
                        <Link
                            to={`/category/laptop`}
                            className="sidebar__categories-item-link"
                        >
                            <span className="link-text">Laptops</span>
                            <AngleRightIcon className="link-icon" />
                        </Link>
                    </li>
                    <li className="sidebar__categories-item">
                        <Link
                            to="/category/tablet"
                            className="sidebar__categories-item-link"
                        >
                            <span className="link-text">Tablets</span>
                            <AngleRightIcon className="link-icon" />
                        </Link>
                    </li>
                    <li className="sidebar__categories-item">
                        <Link
                            to="/category/wearable"
                            className="sidebar__categories-item-link"
                        >
                            <span className="link-text">Smartwatches</span>
                            <AngleRightIcon className="link-icon" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );

    useEffect(() => {
        if (props.open) {
            setTimeout(() => {
                props.toggleSidebar();
            }, 1);
        }
    }, [location]);

    let classes = ' d-block d-lg-none';
    if (props.open) {
        classes = 'sidebar translateRight d-block d-lg-none';
    } else {
        classes = 'sidebar translateLeft d-block d-lg-none';
    }
    return (
        <div>
            <div
                onClick={props.toggleSidebar}
                className={`sidebar-outer d-lg-none ${
                    props.open ? 'sidebar-outer-active' : ''
                }`}
            ></div>
            {location.pathname.includes('/user/') ||
            location.pathname.includes('/admin/') ? (
                <>
                    <div
                        className={`dash-sidebar d-block d-md-none ${classes}`}
                    >
                        <div className="dash-sidebar__top row">
                            <div className="col-4 mx-auto mb-4">
                                <Link to="/">
                                    <img
                                        src="https://k.nooncdn.com/s/app/2019/noon-bigalog/834d8570fc98b1d548b377b56874b12f3c589710/static/images/noon_logo_black_english.svg"
                                        className="logo"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="col-12">
                                <h4 className="user-name">{name}</h4>
                            </div>
                        </div>
                        <div className="row dash-sidebar__main ">
                            <div className="col-12 px-0">
                                {user && user.role === 'admin' ? (
                                    <AdminNav side={true} />
                                ) : (
                                    <UserNav side={true} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className=" d-none d-md-block">{renderSide()}</div>
                </>
            ) : (
                renderSide()
            )}
        </div>
    );
};

export default withRouter(Sidebar);
