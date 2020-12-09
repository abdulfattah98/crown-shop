import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { NavLink, useHistory, Link } from 'react-router-dom';

// import { ReactComponent as UserIcon } from './Sidebar/signin.svg';
import { ReactComponent as OrdersIcon } from './orders.svg';
import { ReactComponent as ChangePasswordIcon } from './password.svg';
import { ReactComponent as WishlistIcon } from './notwishlist.svg';
// import { ReactComponent as AddressIcon } from './address.svg';
import { ReactComponent as LogoutIcon } from '../nav/Sidebar/logout.svg';

const UserNav = ({ side }) => {
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
                        to="/user/orders"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <OrdersIcon
                                    className="icon"
                                    style={{ width: '17px', height: '17px' }}
                                />
                            </div>
                            Orders
                        </div>
                    </NavLink>
                </li>
                <li className="nav-list__item">
                    <NavLink
                        to="/user/wishlist"
                        activeClassName="nav-link-active"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <WishlistIcon
                                    className="icon"
                                    style={{ width: '17px', height: '17px' }}
                                />
                            </div>
                            Wishlist
                        </div>
                    </NavLink>
                </li>

                <li className="nav-list__item">
                    <NavLink
                        to="/user/password"
                        activeClassName="nav-link-active"
                        className="nav-link"
                    >
                        <div className="d-flex align-items-center">
                            <div className="icon-container">
                                <ChangePasswordIcon
                                    className="icon"
                                    style={{ width: '17px', height: '17px' }}
                                />
                            </div>
                            Change Password
                        </div>
                    </NavLink>
                </li>
                {side ? (
                    <li className="nav-list__item">
                        <Link to="/user/password" className="nav-link">
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

export default UserNav;
