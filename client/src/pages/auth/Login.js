import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    createOrUpdateUser,
    createOrUpdateUserGoogle,
} from '../../functions/auth';

const Login = ({ history }) => {
    const [email, setEmail] = useState('abood.alkasaji81@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [loading, setLoading] = useState(false);

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
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
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

            // history.push("/");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
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
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="label_form">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                />
            </div>

            <div className="form-group">
                <label className="label_form">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                />
            </div>

            <div className="w-100 text-center cont-div_for">
                <Link to="/forgot/password" className="forgget_pass">
                    Forgot Password
                </Link>
            </div>
            <Button
                onClick={handleSubmit}
                type="primary"
                className="online login_btn_page w-100"
                icon={<MailOutlined />}
                // size="large"
                disabled={!email || password.length < 6}
            >
                Login with Email/Password
            </Button>
        </form>
    );

    return (
        <div className="row">
            <div className="col col-sm-6 offset-sm-3 col-md-4 offset-md-4 login-form">
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
                    <div className="text-center cont_div_register">
                        Don't have an account?
                        <Link to="/register" className="link_register">
                            Sign Up
                        </Link>
                    </div>

                    {loginForm()}

                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3 mt-3"
                        block
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Login with Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
