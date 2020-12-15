import React, { useState, useEffect, useRef } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ViewIcon } from './view.svg';
import {
    createOrUpdateUser,
    createOrUpdateUserGoogle,
} from '../../functions/auth';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('password');

    const emailRef = useRef();
    const passwordRef = useRef();

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) history.push('/');
        }
    }, [user, history]);

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        // check if intended
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res.data.role === 'admin') {
                history.push('/admin/dashboard');
            } else {
                history.push('/');
            }
        }
    };

    const handleSubmit = async (e) => {
        if (/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) && email) {
        } else {
            if (!email) {
                toast.error('Email must not be empty');
                emailRef.current.classList.add('notValid');
                e.preventDefault();
                return;
            } else {
                toast.error('Email is not valid');
                emailRef.current.classList.add('notValid');
                e.preventDefault();
                return;
            }
        }
        if (password && password.length > 6) {
        } else {
            toast.error('Password must be at least 6 digits');
            passwordRef.current.classList.add('notValid');
            e.preventDefault();
            return;
        }
        e.preventDefault();
        setLoading(true);
        console.table(email, password);
        try {
            const result = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            // console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            console.log(idTokenResult);
            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                            wishlist: res.data.wishlist,
                            address: res.data.address,
                        },
                    });
                    roleBasedRedirect(res);
                })
                .catch((err) => console.log(err));

            history.push('/');
        } catch (error) {
            //console.log(error);
            //toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUserGoogle(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                                wishlist: res.data.wishlist,
                                address: res.data.address,
                            },
                        });
                        roleBasedRedirect(res);
                    })
                    .catch((err) => console.log(err));
                // history.push("/");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <input
                    ref={emailRef}
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                        if (
                            [...emailRef.current.classList].includes('notValid')
                        ) {
                            emailRef.current.classList.remove('notValid');
                        }
                        setEmail(e.target.value);
                    }}
                    placeholder="email"
                    autoFocus
                />
            </div>

            <div className="form-group position-relative">
                <ViewIcon
                    className="view-icon"
                    onClick={() => {
                        if (view === 'password') {
                            setView('text');
                        } else {
                            setView('password');
                        }
                    }}
                />
                <input
                    ref={passwordRef}
                    type={view}
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                        if (
                            [...passwordRef.current.classList].includes(
                                'notValid'
                            )
                        ) {
                            passwordRef.current.classList.remove('notValid');
                        }
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
            </div>

            <div className="w-100 text-right cont-div_for">
                <Link to="/forgot/password" className="forgget_pass">
                    Forgot Password
                </Link>
            </div>
            <button
                onClick={handleSubmit}
                className="login-register-button w-100"
                // size="large"
            >
                <div className="text">Sign In</div>
            </button>
        </form>
    );

    return (
        <div className="row py-5 flex-grow-1 px-3 justify-content-center">
            <div className="col col-sm-6 col-md-5 col-lg-4  login-form">
                <div className="py-5">
                    <div className="login-form__header">
                        {loading ? (
                            <h4 className="text-danger">Loading...</h4>
                        ) : (
                            <>
                                <h2 className="title">Welcome back!</h2>
                                <h2 className="subtitle">
                                    Sign in to your account
                                </h2>
                            </>
                        )}
                    </div>
                    <div className="text-center cont_div_register mb-3">
                        Don't have an account?
                        <Link to="/register" className="link_register">
                            Sign Up
                        </Link>
                    </div>

                    {loginForm()}

                    <button
                        onClick={googleLogin}
                        className="mb-3 mt-3 login-register-button google-button"
                    >
                        <span className="button-inner">
                            <span className="google-icon">
                                <i class="fab fa-google"></i>
                            </span>
                            <span className="text">Sign In With Google</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
