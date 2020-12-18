import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';
import SearchSm from '../forms/SearchSm';
import Sidebar from './Sidebar/index';

import Logo from '../../images/logo.png';

// SVGs
import { ReactComponent as SearchIcon } from './searchIcon.svg';
import { ReactComponent as CartIcon } from './shopping-cart.svg';
import { ReactComponent as MenuIcon } from './menu.svg';
import { ReactComponent as UserIcon } from './Sidebar/user.svg';
import { ReactComponent as AngleUpIcon } from './angle-up.svg';
import { ReactComponent as AngleDownIcon } from './angle-down.svg';
import { ReactComponent as OrdersIcon } from './orders.svg';
import { ReactComponent as NotWishlistIcon } from './notwishlist.svg';
import { ReactComponent as AddProductIcon } from './add-product.svg';
import { ReactComponent as ProductsIcon } from './grid.svg';
import { ReactComponent as AddCouponIcon } from './coupon.svg';

const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMyAccount, setShowMyAccount] = useState(false);

    const location = useLocation();
    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));
    let history = useHistory();
    const body = document.querySelector('body');

    const toggleSidebar = () => {
        if (showSidebar) {
            body.removeAttribute('style');
        } else {
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            body.style.position = 'fixed';
            body.style.msTouchAction = 'none';
            body.style.touchAction = 'none';
        }
        setShowSidebar(!showSidebar);
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    useEffect(() => {
        if (showSearch) {
            setTimeout(() => {
                setShowSearch(false);
            }, 1);
        }
        if (showMyAccount) {
            setTimeout(() => {
                setShowMyAccount(false);
            }, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        history.push('/');
    };

    let name = '';
    if (user) {
        const userName = user.name.toString();
        for (let i = 0; i < userName.length; i++) {
            if (
                userName[i] === ' ' ||
                i > 18 ||
                userName[i] === '.' ||
                userName[i] === '_' ||
                userName[i] === '-'
            ) {
                break;
            } else {
                name += userName[i];
            }
        }
    }

    return (
        <div className="Navbar-outer">
            <header
                className="Navbar"
                style={{
                    boxShadow: `${
                        location.pathname.includes('/shop') ? 'none' : ''
                    }`,
                }}
            >
                <div className="Navbar__container">
                    <div className="Navbar__logo">
                        <MenuIcon
                            className="Navbar__menu d-lg-none"
                            onClick={() => toggleSidebar()}
                        />
                        <Link to="/">
                            <img
                                src={Logo}
                                className="Navbar__logo-logo"
                                alt="crown"
                            />
                        </Link>
                    </div>
                    <Search />
                    <div className="Navbar__right">
                        <div className="Navbar__auth">
                            {user && user.role === 'subscriber' ? (
                                <div
                                    className="dash-cont myAccount user"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        setShowMyAccount(!showMyAccount)
                                    }
                                >
                                    <div className="d-flex align-items-center">
                                        <div>
                                            {' '}
                                            <span
                                                className="d-none d-md-inline-block"
                                                style={{ fontSize: '1rem' }}
                                            >
                                                {name}
                                            </span>
                                            <span
                                                className="d-none d-md-block mt-0"
                                                style={{ fontSize: '1.3rem' }}
                                            >
                                                My Account
                                            </span>
                                        </div>
                                        {showMyAccount ? (
                                            <>
                                                <AngleUpIcon className="user-icon loggedin d-none d-md-block" />
                                            </>
                                        ) : (
                                            <>
                                                <AngleDownIcon className="user-icon loggedin d-none d-md-block" />
                                            </>
                                        )}
                                    </div>
                                    {showMyAccount ? (
                                        <ul className="myAccount__list">
                                            <li className="myAccount__list-item">
                                                <Link to="/user/orders">
                                                    <OrdersIcon className="icon" />
                                                    <span>Orders</span>
                                                </Link>
                                            </li>
                                            <li className="myAccount__list-item">
                                                <Link to="/user/wishlist">
                                                    <NotWishlistIcon className="icon" />
                                                    <span>Wishlist</span>
                                                </Link>
                                            </li>

                                            <li
                                                className="myAccount__list-item"
                                                onClick={logout}
                                            >
                                                <span>Sign Out</span>
                                            </li>
                                        </ul>
                                    ) : null}
                                </div>
                            ) : user && user.role === 'admin' ? (
                                <div
                                    className="dash-cont myAccount"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        setShowMyAccount(!showMyAccount)
                                    }
                                >
                                    <div className="d-flex align-items-center">
                                        <div>
                                            {' '}
                                            <span
                                                className="d-none d-md-inline-block"
                                                style={{ fontSize: '1rem' }}
                                            >
                                                {name}
                                            </span>
                                            <span
                                                className="d-none d-md-block mt-0"
                                                style={{ fontSize: '1.3rem' }}
                                            >
                                                My Account
                                            </span>
                                        </div>
                                        {showMyAccount ? (
                                            <>
                                                <AngleUpIcon className="user-icon loggedin d-none d-md-block" />
                                            </>
                                        ) : (
                                            <>
                                                <AngleDownIcon className="user-icon loggedin d-none d-md-block" />
                                            </>
                                        )}
                                        {/* <UserIcon className="user-icon d-md-none" /> */}
                                    </div>
                                    {showMyAccount ? (
                                        <ul className="myAccount__list">
                                            <li className="myAccount__list-item">
                                                <Link to="/admin/dashboard">
                                                    <OrdersIcon className="icon" />
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li className="myAccount__list-item">
                                                <Link to="/admin/product">
                                                    <AddProductIcon
                                                        className="icon"
                                                        style={{
                                                            marginLeft: '2px',
                                                        }}
                                                    />
                                                    <span>Add Product</span>
                                                </Link>
                                            </li>
                                            <li className="myAccount__list-item">
                                                <Link to="/admin/coupon">
                                                    <AddCouponIcon className="icon" />
                                                    <span>Add Coupon</span>
                                                </Link>
                                            </li>
                                            <li className="myAccount__list-item">
                                                <Link to="/admin/products">
                                                    <ProductsIcon className="icon" />
                                                    <span>Products</span>
                                                </Link>
                                            </li>
                                            <li
                                                className="myAccount__list-item"
                                                onClick={logout}
                                            >
                                                <span>Sign Out</span>
                                            </li>
                                        </ul>
                                    ) : null}
                                </div>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <div className="dash-cont" id="signin">
                                            <UserIcon className="user-icon d-none d-md-block" />
                                            <span className="d-none d-md-block">
                                                Sign In
                                            </span>
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="search-icon-container">
                            <SearchIcon
                                className="Navbar__search-icon--sm"
                                onClick={() => toggleSearch()}
                            />
                        </div>
                        {/* <span onClick={logout}>Logout</span> */}
                        {user && user.role === 'admin' ? null : (
                            <Link to="/cart" className="Navbar__cart">
                                <div className="dash-cont cart">
                                    {/* <span className="d-none d-lg-block">
                                        Cart
                                    </span> */}
                                    <CartIcon className="Navbar__cart-icon" />
                                    <span className={`dash-cont__badge`}>
                                        {cart.length}
                                    </span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
                <div
                    className={`Navbar__search Navbar__search--sm  ${
                        !showSearch ? 'd-none' : ''
                    }`}
                >
                    <SearchSm />
                </div>
                <ol
                    className="Navbar__links d-none d-lg-flex"
                    style={{ borderBottom: '1px solid #ddd' }}
                >
                    <li className="Navbar__links-item">
                        <Link className="Navbar__links-item-link" to="/shop">
                            shop
                        </Link>
                    </li>
                    <li className="Navbar__links-item">
                        <Link
                            className="Navbar__links-item-link"
                            to={`/category/smartphones`}
                        >
                            smartphones
                        </Link>
                    </li>
                    <li className="Navbar__links-item">
                        <Link
                            className="Navbar__links-item-link"
                            to={`/category/laptops`}
                        >
                            laptops
                        </Link>
                    </li>
                    <li className="Navbar__links-item">
                        <Link
                            className="Navbar__links-item-link"
                            to={`/category/tablets`}
                        >
                            tablets
                        </Link>
                    </li>
                    <li className="Navbar__links-item">
                        <Link
                            className="Navbar__links-item-link"
                            to={`/category/smartwatches`}
                        >
                            smartwatches
                        </Link>
                    </li>
                </ol>
            </header>
            <Sidebar open={showSidebar} toggleSidebar={toggleSidebar} />
        </div>
    );
};

export default Header;
