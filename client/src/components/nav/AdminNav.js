import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { ReactComponent as OrdersIcon } from './orders.svg';
import { ReactComponent as AddProductIcon } from './add-product.svg';
import { ReactComponent as ProductsIcon } from './grid.svg';
import { ReactComponent as AddCategoryIcon } from './category.svg';
import { ReactComponent as AddSubCategoryIcon } from './subcategory.svg';
import { ReactComponent as AddCouponIcon } from './coupon.svg';
// import { ReactComponent as ChangePasswordIcon } from './password.svg';
// import { ReactComponent as UserIcon } from './Sidebar/signin.svg';
import { ReactComponent as LogoutIcon } from '../nav/Sidebar/logout.svg';

const AdminNav = ({ side }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const history = useHistory();
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

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        history.push('/');
    };

    return (
        <nav>
            {side ? null : (
                <div className="header">
                    {/* <div className="icon-container">
                    <UserIcon className="icon" />
                </div> */}
                    <div>
                        <h3 className="name">{name}</h3>
                        <span onClick={logout}>Sign Out</span>
                    </div>
                </div>
            )}
            <ul className="nav-list">
                <li className="nav-list__item">
                    <NavLink
                        activeClassName="nav-link-active"
                        to="/admin/dashboard"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <OrdersIcon
                                    className="icon"
                                    style={{ width: '17px', height: '17px' }}
                                />
                            </div>
                            Dashboard
                        </div>
                    </NavLink>
                </li>

                <li className="nav-list__item">
                    <NavLink
                        activeClassName="nav-link-active"
                        to="/admin/product"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <AddProductIcon
                                    className="icon"
                                    style={{
                                        marginLeft: '3px',
                                        marginTop: '1px',
                                        width: '17px',
                                        height: '17px',
                                    }}
                                />
                            </div>
                            add product
                        </div>
                    </NavLink>
                </li>

                <li className="nav-list__item">
                    <NavLink
                        activeClassName="nav-link-active"
                        to="/admin/products"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <ProductsIcon className="icon" />
                            </div>
                            Products
                        </div>
                    </NavLink>
                </li>

                <li className="nav-list__item">
                    <NavLink
                        activeClassName="nav-link-active"
                        to="/admin/category"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <AddCategoryIcon className="icon" />
                            </div>
                            add Category
                        </div>
                    </NavLink>
                </li>

                <li className="nav-list__item">
                    <NavLink
                        activeClassName="nav-link-active"
                        to="/admin/sub"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <AddSubCategoryIcon className="icon" />
                            </div>
                            add Sub Category
                        </div>
                    </NavLink>
                </li>

                <li className="nav-list__item">
                    <NavLink
                        activeClassName="nav-link-active"
                        to="/admin/coupon"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <AddCouponIcon
                                    className="icon"
                                    style={{ width: '18px', height: '19px' }}
                                />
                            </div>
                            Add Coupon
                        </div>
                    </NavLink>
                </li>
                {side ? (
                    <li className="nav-list__item" onClick={logout}>
                        <Link to="/" className="nav-link">
                            <div className="d-flex align-items-center">
                                <div className="icon-container">
                                    <LogoutIcon
                                        className="icon"
                                        style={{
                                            width: '17px',
                                            height: '17px',
                                        }}
                                    />
                                </div>
                                Sign Out
                            </div>
                        </Link>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

export default AdminNav;
