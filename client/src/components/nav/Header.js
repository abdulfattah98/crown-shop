import React, { useState, useEffect } from 'react';
import { Menu, Badge } from 'antd';
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';
import SearchSm from '../forms/SearchSm';
import Sidebar from './Sidebar/index';

// SVGs
import { ReactComponent as SearchIcon } from './searchIcon.svg';
import { ReactComponent as CartIcon } from './shopping-cart.svg';
import { ReactComponent as MenuIcon } from './menu.svg';
import { ReactComponent as UserIcon } from './Sidebar/user.svg';
import { ReactComponent as AngleUpIcon } from './angle-up.svg';
import { ReactComponent as AngleDownIcon } from './angle-down.svg';
import { ReactComponent as AddressIcon } from './address.svg';
import { ReactComponent as OrdersIcon } from './orders.svg';
import { ReactComponent as NotWishlistIcon } from './notwishlist.svg';
import { ReactComponent as AddProductIcon } from './add-product.svg';
import { ReactComponent as ProductsIcon } from './grid.svg';
import { ReactComponent as AddCouponIcon } from './coupon.svg';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMyAccount, setShowMyAccount] = useState(false);

    const location = useLocation();
    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));
    let history = useHistory();

    const toggleSidebar = () => {
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
    }, [location]);

    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    };

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
        for (let i = 0; i <= userName.length; i++) {
            if (userName[i] !== '.') {
                name += userName[i];
            } else {
                break;
            }
        }
    }

    return (
        // <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        //     <Item key="home" icon={<AppstoreOutlined />}>
        //         <Link to="/">Home</Link>
        //     </Item>

        //     <Item key="shop" icon={<ShoppingOutlined />}>
        //         <Link to="/shop">Shop</Link>
        //     </Item>

        //     <Item key="cart" icon={<ShoppingCartOutlined />}>
        //         <Link to="/cart">
        //             <Badge count={cart.length} offset={[9, 0]}>
        //                 Cart
        //             </Badge>
        //         </Link>
        //     </Item>

        //     {!user && (
        //         <Item
        //             key="register"
        //             icon={<UserAddOutlined />}
        //             className="float-right"
        //         >
        //             <Link to="/register">Register</Link>
        //         </Item>
        //     )}

        //     {!user && (
        //         <Item
        //             key="login"
        //             icon={<UserOutlined />}
        //             className="float-right"
        //         >
        //             <Link to="/login">Login</Link>
        //         </Item>
        //     )}

        //     {user && (
        //         <SubMenu
        //             icon={<SettingOutlined />}
        //             title={user.email && user.email.split('@')[0]}
        //             className="float-right"
        //         >
        //             {user && user.role === 'subscriber' && (
        //                 <Item>
        //                     <Link to="/user/history">Dashboard</Link>
        //                 </Item>
        //             )}

        //             {user && user.role === 'admin' && (
        //                 <Item>
        //                     <Link to="/admin/dashboard">Dashboard</Link>
        //                 </Item>
        //             )}

        //             <Item icon={<LogoutOutlined />} onClick={logout}>
        //                 Logout
        //             </Item>
        //         </SubMenu>
        //     )}

        //     <span className="float-right p-1">
        //         <Search />
        //     </span>
        // </Menu>

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
                                src="https://k.nooncdn.com/s/app/2019/noon-bigalog/834d8570fc98b1d548b377b56874b12f3c589710/static/images/noon_logo_black_english.svg"
                                className="Navbar__logo-logo"
                                alt=""
                            />
                        </Link>
                    </div>
                    <Search />
                    {/* {!user && <Link  to="/register">Register</Link>}
                    {!user && <Link to="/login">Login</Link>} */}

                    {/* <Link to="/shop">Shop</Link> */}
                    {/* <Link to="/cart">Cart {cart.length}</Link>{' '} */}

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
                            to={`/category/smart-phone`}
                        >
                            smartphones
                        </Link>
                    </li>
                    <li className="Navbar__links-item">
                        <Link
                            className="Navbar__links-item-link"
                            to={`/category/laptop`}
                        >
                            laptops
                        </Link>
                    </li>
                    <li className="Navbar__links-item">
                        <Link
                            className="Navbar__links-item-link"
                            to={`/category/tablet`}
                        >
                            tablets
                        </Link>
                    </li>
                    <li className="Navbar__links-item">
                        <Link
                            className="Navbar__links-item-link"
                            to={`/category/wearable`}
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
