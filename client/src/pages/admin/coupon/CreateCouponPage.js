import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import {
    getCoupons,
    removeCoupon,
    createCoupon,
} from '../../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';

const CreateCouponPage = () => {
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState('');
    const [coupons, setCoupons] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () =>
        getCoupons().then((res) => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(name, expiry, discount);
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false);
                loadAllCoupons(); // load all coupons
                setName('');
                setDiscount('');
                setExpiry('');
                toast.success(`"${res.data.name}" is created`);
            })
            .catch((err) => console.log('create coupon err', err));
    };

    const handleRemove = (couponId) => {
        if (window.confirm('Delete?')) {
            setLoading(true);
            removeCoupon(couponId, user.token)
                .then((res) => {
                    loadAllCoupons(); // load all coupons
                    setLoading(false);
                    toast.error(`Coupon "${res.data.name}" deleted`);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container-fluid dashboard flex-grow-1">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <AdminNav />
                </div>
                <div className="col-12 col-md-9 px-3 pr-md-0 coupon">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="dashboard__page-title">Add Coupon</h4>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 col-12 pl-0">
                                <div className="form-group">
                                    <label className="text-muted">
                                        Coupon Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-12 pl-0">
                                <div className="form-group">
                                    <label className="text-muted">
                                        Discount %
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setDiscount(e.target.value)
                                        }
                                        value={discount}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-12 pl-0">
                                <div className="form-group">
                                    <label className="text-muted">Expiry</label>
                                    <br />
                                    <DatePicker
                                        className="form-control w-100"
                                        selected={new Date()}
                                        value={expiry}
                                        onChange={(date) => setExpiry(date)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5 mt-4">
                            <div className="col-12 pl-0">
                                <button className="form-save-button add-category">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>

                    <br />

                    <h4 className="coupon-amount">{coupons.length} Coupons</h4>

                    <table className="table coupon-table">
                        {/* <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead> */}
                        <thead className="thead-light">
                            <tr className="table-h">
                                <th scope="col">Name</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {coupons.map((c) => (
                                <tr className="table-b" key={c._id}>
                                    <td>{c.name}</td>
                                    <td>
                                        {new Date(
                                            c.expiry
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>{c.discount}%</td>
                                    <td className="delete">
                                        <DeleteOutlined
                                            onClick={() => handleRemove(c._id)}
                                            className="pointer"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;
