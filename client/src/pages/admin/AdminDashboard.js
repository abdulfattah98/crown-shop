import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () =>
        getOrders(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then((res) => {
            toast.success('Status updated');
            loadOrders();
        });
    };

    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <AdminNav />
                </div>

                <div className="col-12 col-md-9 px-0 pr-md-0">
                    <h4 className="dashboard__page-title px-3">
                        Admin Dashboard
                    </h4>
                    {/* {JSON.stringify(orders)} */}
                    <Orders
                        orders={orders}
                        handleStatusChange={handleStatusChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
