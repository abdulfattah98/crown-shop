import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    getUserCart,
    emptyUserCart,
    saveUserAddress,
    applyCoupon,
    createCashOrderForUser,
} from '../functions/user';
import MapPicker from 'react-google-map-picker';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';

import { ReactComponent as LocateIcon } from './locate.svg';

import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DefaultLocation = { lat: 31.950450627829785, lng: 35.91271972656252 };
const DefaultZoom = 11;

const Checkout = ({ history }) => {
    const [products, setProducts] = useState([]);
    const [Addrescomponet, setAddrescomponet] = useState({
        country: '',
        city: '',
        area: '',
        name: '',
        phone: '',
        personName: '',
    });
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState([]);
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [mapInfo, setMapInfo] = useState({
        country: '',
        city: '',
        area: '',
    });
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    let country = '';
    let city = '';
    let area = '';
    let streetName = '';

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    // discount price
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');

    const dispatch = useDispatch();
    const { user, COD } = useSelector((state) => ({ ...state }));
    const couponTrueOrFalse = useSelector((state) => state.coupon);

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            console.log('user cart res', JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        });
    }, []);
    const handleChange = (e, name) => {
        if (!e.target) {
            setAddrescomponet({ ...Addrescomponet, [name]: e });
        } else {
            setAddrescomponet({
                ...Addrescomponet,
                [e.target.name]: e.target.value,
            });
        }
    };
    function handleChangeLocation(lat, lng) {
        console.log(lat, lng);
        axios
            .get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAQNvqdWwnrqSkXiCyUNryFx7vvpqSj3k4`
            )
            .then((data) => {
                const result = data.data.results[0].address_components;
                city = '';
                country = '';
                streetName = '';
                area = '';
                for (let i = 0; i < result.length; i++) {
                    if (result[i].types.indexOf('route') >= 0) {
                        if (result[i].long_name !== 'Unnamed Road') {
                            streetName = result[i].long_name;
                        }
                    }
                    if (result[i].types.indexOf('locality') >= 0) {
                        city = result[i].long_name;
                    }

                    if (result[i].types.indexOf('country') >= 0) {
                        country = result[i].long_name;
                    }
                    if (result[i].types.indexOf('sublocality') >= 0) {
                        area = result[i].long_name;
                    }
                }
                let format = '';
                if (streetName.length && area.length) {
                    format = `${streetName} - ${area}`;
                } else if (!streetName.length && area.length) {
                    format = `${area}`;
                } else if (streetName.length && !area.length) {
                    format = `${streetName}`;
                }

                setMapInfo({ country, city, area: format });
            });
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }
    // function handleResetLocation() {
    //     setDefaultLocation({ ...DefaultLocation });
    //     setZoom(DefaultZoom);
    // }

    const emptyCart = () => {
        // remove from local storage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('cart');
        }
        // remove from redux
        dispatch({
            type: 'ADD_TO_CART',
            payload: [],
        });
        // remove from backend
        emptyUserCart(user.token).then((res) => {
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0);
            setCoupon('');
            toast.success('Cart is emapty. Contniue shopping.');
        });
    };

    const saveAddressToDb = (e) => {
        e.preventDefault();
        const addressSaved = {
            name: Addrescomponet.name,
            phone: Addrescomponet.phone,
            area: mapInfo.area,
            city: mapInfo.city,
            country: mapInfo.country,
        };
        console.log(addressSaved);
        saveUserAddress(user.token, addressSaved).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success('Address saved');
            }
        });
    };

    const applyDiscountCoupon = () => {
        console.log('send coupon to backend', coupon);
        applyCoupon(user.token, coupon).then((res) => {
            console.log('RES ON COUPON APPLIED', res.data);
            if (res.data) {
                setTotalAfterDiscount(res.data);
                // update redux coupon applied true/false
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: true,
                });
            }
            // error
            if (res.data.err) {
                setDiscountError(res.data.err);
                // update redux coupon applied true/false
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: false,
                });
            }
        });
    };

    async function handleResetLocation() {
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                console.log(position.coords.latitude);
                let geolocation = {
                    lat: parseFloat(position.coords.latitude),
                    lng: parseFloat(position.coords.longitude),
                };
                handleChangeLocation(
                    position.coords.latitude,
                    position.coords.longitude
                );
                //setDefaultLocation({ ...location });
                // setZoom(17);
                setDefaultLocation({ ...geolocation });
                // setZoom(16);
            },
            (err) => console.log(err)
        );
    }

    const showAddress = () => (
        <>
            {/* <ReactQuill theme="snow" value={address} onChange={setAddress} /> */}
            <form>
                <div className="row">
                    <div className="col-12 mb-4 col-md-6 pl-0 pr-0 px-md-3 pr-0 px-md-3">
                        <div className="form-group">
                            <label>Address Name</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="eg. Home"
                                name="name"
                                onChange={(e) => handleChange(e)}
                                value={Addrescomponet.name}
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-4 col-md-6 pl-0 pr-0 px-md-3">
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                value={Addrescomponet.phone}
                                className="form-control"
                                type="text"
                                placeholder=""
                                name="phone"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>

                    <div className=" pl-0 pr-0 px-md-3 mt-4 mb-5 col-12 position-relative">
                        <span
                            className="locate-icon-container"
                            onClick={handleResetLocation}
                            title="My Location"
                        >
                            <LocateIcon />
                        </span>
                        <MapPicker
                            className="map"
                            defaultLocation={defaultLocation}
                            zoom={zoom}
                            style={{ height: '300px' }}
                            onChangeLocation={handleChangeLocation}
                            onChangeZoom={handleChangeZoom}
                            apiKey="AIzaSyAQNvqdWwnrqSkXiCyUNryFx7vvpqSj3k4"
                        />
                    </div>
                    <div className="col-12 mb-4 col-md-4 pl-0 pr-0 px-md-3">
                        <div className="form-group">
                            <label>Area</label>
                            <input
                                value={mapInfo.area}
                                className="form-control"
                                type="text"
                                placeholder=""
                                name="area"
                                onChange={(e) =>
                                    setMapInfo({
                                        ...mapInfo,
                                        area: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-4 col-md-4 pl-0 pr-0 px-md-3">
                        <div className="form-group">
                            <label>City</label>
                            <input
                                value={mapInfo.city}
                                className="form-control"
                                type="text"
                                placeholder=""
                                name="city"
                                onChange={(e) =>
                                    setMapInfo({
                                        ...mapInfo,
                                        city: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-4 col-md-4 pl-0 pr-0 px-md-3">
                        <div className="form-group">
                            <label>Country</label>
                            <input
                                value={mapInfo.country}
                                className="form-control"
                                type="text"
                                placeholder=""
                                name="country"
                                onChange={(e) =>
                                    setMapInfo({
                                        ...mapInfo,
                                        country: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 pl-0 pr-0 px-md-3 my-4 text-left text-md-right">
                    <button
                        type="submit"
                        className="form-save-button add-category"
                        onClick={saveAddressToDb}
                        style={{ width: '150px' }}
                    >
                        Save Location
                    </button>
                </div>
            </form>
        </>
    );

    const showProductSummary = () =>
        products.map((p, i) => (
            <div key={i}>
                <p className="product-in-summary">
                    {p.product.title}{' '}
                    <span
                        style={{
                            marginRight: '4px',
                            color: '#ff4a4a',
                        }}
                    >
                        X {p.count}
                    </span>{' '}
                    ={' '}
                    <span
                        style={{
                            color: '#38ae04',
                        }}
                    >
                        JD{p.price * p.count}
                    </span>
                </p>
            </div>
        ));

    const showApplyCoupon = () => (
        <>
            <div className="row">
                <div className="col-12 pl-0 pr-0 pr-md-3">
                    <input
                        onChange={(e) => {
                            setCoupon(e.target.value);
                            setDiscountError('');
                        }}
                        value={coupon}
                        type="text"
                        className="form-control coupon-input"
                    />

                    <button
                        onClick={applyDiscountCoupon}
                        className="coupon-button"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    );

    const createCashOrder = () => {
        createCashOrderForUser(user.token, COD, couponTrueOrFalse).then(
            (res) => {
                console.log('USER CASH ORDER CREATED RES ', res);
                // empty cart form redux, local Storage, reset coupon, reset COD, redirect
                if (res.data.ok) {
                    // empty local storage
                    if (typeof window !== 'undefined')
                        localStorage.removeItem('cart');
                    // empty redux cart
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: [],
                    });
                    // empty redux coupon
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false,
                    });
                    // empty redux COD
                    dispatch({
                        type: 'COD',
                        payload: false,
                    });
                    // mepty cart from backend
                    emptyUserCart(user.token);
                    // redirect
                    setTimeout(() => {
                        history.push('/user/orders');
                    }, 1000);
                }
            }
        );
    };

    return (
        <div className="p-0 py-5">
            <div className="row checkout">
                <div className="col-12 col-md-8">
                    <h4 className="checkout__header">Delivery Address</h4>

                    {showAddress()}
                </div>

                <div className="col-12 col-md-4 checkout__right-c">
                    <h4 className="right-title">Order Summary</h4>
                    <p className="right-subtitle">
                        Products ({products.length})
                    </p>
                    {showProductSummary()}
                    <hr className="my-4" />
                    <h4 className="mb-3">Got Coupon?</h4>
                    {showApplyCoupon()}
                    <br />
                    {discountError && (
                        <p className="bg-danger p-2">{discountError}</p>
                    )}

                    {totalAfterDiscount <= 0 && (
                        <h4 className="total">
                            Total: <b style={{ color: '#38ae04' }}>{total}</b>
                            <span
                                style={{
                                    fontWeight: '300',
                                    color: '#38ae04',
                                    fontSize: '17px',
                                }}
                            >
                                JD
                            </span>
                        </h4>
                    )}

                    {totalAfterDiscount > 0 && (
                        <>
                            <h4 className="total">
                                Total:{' '}
                                <div
                                    style={{ fontSize: '15px' }}
                                    className="d-inline-block position-relative"
                                >
                                    <b
                                        style={{
                                            color: 'rgb(126 129 138)',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {total}
                                    </b>
                                    <span
                                        style={{
                                            fontWeight: '300',
                                            color: 'rgb(126 129 138)',
                                            fontSize: '15px',
                                        }}
                                    >
                                        JD
                                    </span>
                                    <span className="line_dis"></span>
                                </div>
                                &nbsp;
                                <b style={{ color: '#38ae04' }}>
                                    {parseInt(totalAfterDiscount)}
                                </b>
                                <span
                                    style={{
                                        fontWeight: '300',
                                        color: '#38ae04',
                                        fontSize: '17px',
                                    }}
                                >
                                    JD
                                </span>
                                &nbsp; &nbsp;
                            </h4>
                            <span className="discount-amount">
                                <CheckCircleOutlined />
                                {(
                                    ((total - parseInt(totalAfterDiscount)) /
                                        total) *
                                    100
                                ).toFixed(0)}
                                % discount applied
                            </span>
                        </>
                    )}
                    <div className="payment-buttons mt-4 row">
                        <div className="col-12 col-lg-6 px-0 pl-lg-0 pr-lg-3 mb-4">
                            {COD ? (
                                <button
                                    title={`${
                                        !addressSaved || !products.length
                                            ? 'Please fill the form'
                                            : 'place order'
                                    }`}
                                    className={`${
                                        !addressSaved || !products.length
                                            ? 'online button-disabled'
                                            : 'online'
                                    }`}
                                    disabled={!addressSaved || !products.length}
                                    onClick={createCashOrder}
                                >
                                    Place Order
                                </button>
                            ) : (
                                <button
                                    title={`${
                                        !addressSaved || !products.length
                                            ? 'Please fill the form'
                                            : 'place order'
                                    }`}
                                    className={`${
                                        !addressSaved || !products.length
                                            ? 'online button-disabled'
                                            : 'online'
                                    }`}
                                    disabled={!addressSaved || !products.length}
                                    onClick={() => history.push('/payment')}
                                >
                                    Place Order
                                </button>
                            )}
                        </div>
                        <div className="col-12 col-lg-6 px-0 pr-lg-0 pl-lg-3">
                            <button
                                disabled={!products.length}
                                onClick={emptyCart}
                                className="cash"
                            >
                                Empty Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
