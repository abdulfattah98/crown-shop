import React from 'react';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import { Select } from 'antd';

const { Option } = Select;

const Orders = ({ orders, handleStatusChange }) => {
    const showOrderInTable = (order) => (
        <table className="table text-center order-table">
            <thead className="thead-light">
                <tr className="table-h">
                    <th scope="col">Title</th>
                    {/* <th scope="col">Brand</th> */}
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Color</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i} className="table-b">
                        <td className="name">
                            <b className="d-none d-md-block">
                                {p.product.title}
                            </b>
                            <span className="d-block d-md-none">
                                {p.product.title}
                            </span>
                        </td>
                        {/* <td className="brand d-none d-md-block">
                            {p.product.brand}
                        </td> */}
                        <td className="price">{p.product.price}</td>
                        <td className="count">{p.count}</td>
                        <td className="color">{p.color}</td>
                        <td className="shipping">
                            {p.product.shipping === 'Yes'
                                ? // <CheckCircleOutlined
                                  //     style={{ color: 'green' }}
                                  // />
                                  'Yes'
                                : // <CloseCircleOutlined style={{ color: 'red' }} />
                                  'No'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            {orders.map((order) => (
                <div key={order._id} className="row order">
                    <div className="col-11 col-md-9 col-lg-6 px-0  mx-auto mb-5 order-status">
                        <span className="text">Order Status:</span>

                        <Select
                            style={{ width: '100%' }}
                            placeholder="Set Status"
                            // value={color}
                            onChange={(e) => handleStatusChange(order._id, e)}
                        >
                            <Option value="Not Processed">Not Processed</Option>
                            <Option value="Cash On Delivery">
                                Cash On Delivery
                            </Option>
                            <Option value="Processing">Processing</Option>
                            <Option value="Dispatched">Dispatched</Option>
                            <Option value="Cancelled">Cancelled</Option>
                            <Option value="Completed">Completed</Option>
                        </Select>
                    </div>

                    <div className="col-12 px-0">{showOrderInTable(order)}</div>
                    <ShowPaymentInfo
                        order={order}
                        showStatus={false}
                        handleStatusChange={handleStatusChange}
                    />
                </div>
            ))}
        </>
    );
};

export default Orders;
