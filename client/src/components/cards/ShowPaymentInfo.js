import React from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import Invoice from '../../components/order/Invoice';

import { ReactComponent as PDF } from './pdf.svg';

const ShowPaymentInfo = ({ order, showStatus = true }) => {
    let { user } = useSelector((state) => ({ ...state }));
    return (
        <div className="row pt-3">
            {/* <div className="col-4 payment-info">
            <span className="text">Order Id: </span>
            <span>{order.paymentIntent.id}</span>
        </div> */}
            {/* {' / '} */}

            <div className="col-12 col-md-6 pr-0 col-lg-4 mb-3 payment-info">
                <span className="text">Order Amount:</span>
                <span>
                    {order &&
                        (order.paymentIntent.amount /= 100).toLocaleString(
                            'en-US',
                            {
                                style: 'currency',
                                currency: 'JOD',
                            }
                        )}
                </span>
            </div>
            {/* {' / '} */}
            {/* <div className="col-md-6 pr-0 col-lg-4 mb-4 payment-info">
            <span className="text">Currency: </span>
            <span>{order.paymentIntent.currency.toUpperCase()}</span>
        </div> */}
            {/* {' / '} */}

            {/* {' / '} */}
            <div className="col-12 col-md-6 col-lg-4 mb-3 payment-info">
                <span className="text">Payment:</span>
                <span>
                    {' '}
                    {order && order.paymentIntent.status.toUpperCase()}
                </span>
            </div>
            {/* {' / '} */}
            <div className="col-12 col-md-6 pr-0 col-lg-4 mb-3 payment-info">
                <span className="text">
                    Orderd on:
                    {/* {' / '} */}
                </span>
                <span>
                    {' '}
                    {new Date(
                        order.paymentIntent.created * 1000
                    ).toLocaleString()}
                </span>
            </div>
            {/* {' / '} */}
            <div className="col-12 col-md-6  col-lg-4 mb-3 payment-info">
                <span className="text">Method: </span>
                <span>
                    {order && order.paymentIntent.payment_method_types[0]}
                </span>
            </div>
            {user && user.role === 'subscriber' ? (
                <div className="col-md-6 pr-0 col-lg-4 mb-3 payment-info">
                    {' '}
                    {showStatus && (
                        <>
                            <span className="text">Status:</span>
                            <span> {order && order.orderStatus}</span>
                        </>
                    )}
                </div>
            ) : (
                <div className="col-12 col-md-6 pr-0 col-lg-4 mb-3 payment-info">
                    {' '}
                    <>
                        <span className="text">Ordered By:</span>
                        <span> {order && order.orderdBy.name}</span>
                    </>
                </div>
            )}
            <div className="col-12 col-md-6  col-lg-4 mb-3 payment-info">
                <span className="text">Phone Number:</span>
                <span>{order && order.orderdBy.address[0].phone}</span>
            </div>
            <div className="col-12 text-left mb-3 payment-info">
                <span className="text">Address:</span>
                <span>
                    {' '}
                    {order &&
                        order.orderdBy.address[0].area +
                            ' - ' +
                            order.orderdBy.address[0].city +
                            ' - ' +
                            order.orderdBy.address[0].country}
                </span>
            </div>
        </div>
    );
};

export default ShowPaymentInfo;
