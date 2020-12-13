import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import LoadingCard from '../../components/cards/LoadingCard';

import { Link } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
// import { toast } from 'react-toastify';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';

const History = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setLoading(true);
        loadUserOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
            setOrders(res.data);
            setLoading(false);
        });

    const showOrderInTable = (order) => (
        <table className="table order-table">
            <thead className="thead-light">
                <tr className="table-h">
                    <th scope="col">Title</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Price</th>
                    <th scope="col">Color</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr className="table-b" key={i}>
                        <td className="name">
                            <b>{p.product.title}</b>
                        </td>
                        <td className="brand">{p.product.brand}</td>
                        <td className="brand">{p.product.price}</td>
                        <td className="brand">{p.color}</td>
                        <td className="brand">{p.count}</td>
                        <td className="brand">
                            {p.product.shipping === 'Yes' ? (
                                <CheckCircleOutlined
                                    style={{ color: 'green' }}
                                />
                            ) : (
                                <CloseCircleOutlined style={{ color: 'red' }} />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const showEachOrders = () =>
        orders.reverse().map((order, i) => (
            <div key={i} className="order">
                {showOrderInTable(order)}
                <ShowPaymentInfo order={order} />
            </div>
        ));

    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <UserNav />
                </div>
                <div className="col-12 col-md-9 px-3 pr-md-0">
                    <h4 className="dashboard__page-title">Orders</h4>
                    {loading ? (
                        <LoadingCard orderLoading={true} count={8} />
                    ) : (
                        <div className="text-center h-100">
                            {orders.length ? (
                                showEachOrders()
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 mb-5">
                                    <div className="text-center">
                                        <h4 className="no-thing__title">
                                            You don't have any orders yet
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

export default History;
