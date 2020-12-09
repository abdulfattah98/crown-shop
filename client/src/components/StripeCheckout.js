import React, { useState, useEffect, useRef } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { Link } from 'react-router-dom';
import { createOrder, emptyUserCart } from '../functions/user';
// import Cardpayment from '../components/cardpayment';
import Card from 'react-credit-cards';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './utils';
const StripeCheckout = ({ history }) => {
    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({ ...state }));

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [issuer, setIssuer] = useState('');
    const [focused, setFocused] = useState('');
    const [formData, setFormData] = useState('');

    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        createPaymentIntent(user.token, coupon).then((res) => {
            console.log('create payment intent', res.data);
            setClientSecret(res.data.clientSecret);
            // additional response received on successful payment
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            setPayable(res.data.payable);
        });
    }, []);

    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            // this.setState({ issuer });
            setIssuer(issuer);
        }
    };

    const handleInputFocus = ({ target }) => {
        // this.setState({
        //     focused: target.name,
        // });
        setFocused(target.name);
    };

    const handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
            setNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
            setExpiry(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
            setCvc(target.value);
        } else if (target.name === 'name') {
            setName(target.value);
        }

        if (number.length && expiry.length && name.length && cvc.length) {
            setDisabled(false);
        }

        // this.setState({ [target.name]: target.value });
    };

    const handleSubmit = async (e) => {
        const formData = [...e.target.elements]
            .filter((d) => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        // this.setState({ formData });
        setFormData(formData);
        // form.reset();

        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(Card),
                billing_details: {
                    name: e.target.name.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            // here you get result after successful payment
            // create order and save in database for admin to process
            createOrder(payload, user.token).then((res) => {
                if (res.data.ok) {
                    // empty cart from local storage
                    if (typeof window !== 'undefined')
                        localStorage.removeItem('cart');
                    // empty cart from redux
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: [],
                    });
                    // reset coupon to false
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false,
                    });
                    // empty cart from database
                    emptyUserCart(user.token);
                }
            });
            // empty user cart from redux store and local storage
            console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (e) => {
        // listen for changes in the card element
        // and display any errors as the custoemr types their card details
        setDisabled(e.empty); // disable pay button if errors
        setError(e.error ? e.error.message : ''); // show error message
    };

    return (
        <>
            <div key="Payment">
                <div className="App-payment">
                    <div className="row">
                        <div className="col-12 mb-5 mb-lg-0 col-lg-6">
                            <Card
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focused}
                                callback={handleCallback}
                            />
                        </div>
                        <div className="col-12 col-lg-6 m-auto m-lg-0 pl-0 pr-0">
                            {' '}
                            <form
                                className="m-auto m-lg-0"
                                id="payment-form"
                                onSubmit={handleSubmit}
                            >
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="number"
                                        className="form-control"
                                        placeholder="Card Number"
                                        pattern="[\d| ]{16,22}"
                                        required
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Name"
                                        required
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-6 pl-0">
                                        <input
                                            type="tel"
                                            name="expiry"
                                            className="form-control"
                                            placeholder="Expiry"
                                            pattern="\d\d/\d\d"
                                            required
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                        />
                                    </div>
                                    <div className="col-6 pr-0">
                                        <input
                                            type="tel"
                                            name="cvc"
                                            className="form-control"
                                            placeholder="CVC"
                                            pattern="\d{3,4}"
                                            required
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                        />
                                    </div>
                                </div>
                                <input
                                    type="hidden"
                                    name="issuer"
                                    value={issuer}
                                />
                                <div className="form-actions">
                                    <button
                                        className="stripe-button mt-4"
                                        disabled={processing || disabled}
                                    >
                                        <span id="button-text">
                                            {processing ? (
                                                <div
                                                    className="spinner"
                                                    id="spinner"
                                                ></div>
                                            ) : (
                                                'Pay'
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <CardElement
                    id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                /> */}

            {/* <br />
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            <br />
            <p
                className={
                    succeeded ? 'result-message' : 'result-message hidden'
                }
            >
                Payment Successful.{' '}
                <Link to="/user/orders">See it in your purchase history.</Link>
            </p> */}
        </>
    );
};

export default StripeCheckout;
