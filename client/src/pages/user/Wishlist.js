import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getWishlist } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { currentUser } from '../../functions/auth';
import LoadingCard from '../../components/cards/LoadingCard';

import { Link } from 'react-router-dom';
// import { DeleteOutlined } from '@ant-design/icons';
import ProductCardRow from '../../components/cards/ProductCardRow';

// import { ReactComponent as NoWishlistIcon } from './nowishlist.svg';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();

    useEffect(() => {
        loadWishlist();
        setLoading(true);

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
                        wishlist: wishlist,
                    },
                });
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            // console.log(res);
            setWishlist(res.data.wishlist);
            setLoading(false);
        });

    return (
        <div className="container-fluid dashboard flex-grow-1">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <UserNav />
                </div>
                <div className="col-12 col-md-9 px-3 pr-md-0">
                    <h4 className="dashboard__page-title">Wishlist</h4>
                    {/* <Link to={`/product/${p.slug}`}>{p.title}</Link> */}
                    {/* <span
                                onClick={() => handleRemove(p._id)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span> */}
                    {loading ? (
                        <LoadingCard isPlPCardList={true} count={8} />
                    ) : (
                        <div className="wishlist h-100">
                            {wishlist.length ? (
                                <div className="wishlist__products">
                                    {wishlist.map((p) => {
                                        return (
                                            <ProductCardRow
                                                loadWishlist={loadWishlist}
                                                key={p._id}
                                                p={p}
                                                wishListCard={true}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 mb-5">
                                    <div className="text-center">
                                        <h4 className="no-thing__title">
                                            You don't have wishlist yet
                                        </h4>
                                        <p className="no-thing__subtitle">
                                            What are you waiting for? Start
                                            shopping!
                                        </p>
                                        <button
                                            className="form-save-button no-thing-button"
                                            // style={{ width: 'unset' }}
                                        >
                                            <Link to="/shop">
                                                CONTINUE SHOPPING
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
