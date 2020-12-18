import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ViewIcon } from './view.svg';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState('password');

    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const antIcon = <LoadingOutlined style={{ fontSize: 25 }} spin />;

    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        if (name && /^[A-z]*((\s)*[A-z])*$/.test(name) && name.length <= 18) {
        } else {
            if (!name) {
                toast.error('Name must not be empty');
                nameRef.current.classList.add('notValid');
                e.preventDefault();
                return;
            } else if (name.length > 18) {
                toast.error('Name must not be more than 18 characters');
                nameRef.current.classList.add('notValid');
                e.preventDefault();
                return;
            } else {
                toast.error('Name must be only (letters, _) ');
                nameRef.current.classList.add('notValid');
                e.preventDefault();
                return;
            }
        }
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

        // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
            `Email is sent to ${email}. Click the link to complete your registration.`
        );
        // save user email in local storage
        window.localStorage.setItem('emailForRegistration', email);
        window.localStorage.setItem('passwordForRegistration', password);
        window.localStorage.setItem('nameForRegistration', name);
        // clear state
        setEmail('');
        setPassword('');
        setName('');
        setLoading(false);
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit} noValidate>
            <div className="row">
                <div className="col-12">
                    <div className="form-group register-form-group">
                        <input
                            ref={nameRef}
                            type="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => {
                                if (
                                    [...nameRef.current.classList].includes(
                                        'notValid'
                                    )
                                ) {
                                    nameRef.current.classList.remove(
                                        'notValid'
                                    );
                                }
                                setName(e.target.value);
                            }}
                            placeholder="Name"
                            autoFocus
                        />
                    </div>

                    <div className="form-group register-form-group">
                        <input
                            ref={emailRef}
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => {
                                if (
                                    [...emailRef.current.classList].includes(
                                        'notValid'
                                    )
                                ) {
                                    emailRef.current.classList.remove(
                                        'notValid'
                                    );
                                }
                                setEmail(e.target.value);
                            }}
                            placeholder="email"
                            autoFocus
                        />
                    </div>

                    <div className="form-group register-form-group position-relative">
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
                                    passwordRef.current.classList.remove(
                                        'notValid'
                                    );
                                }
                                setPassword(e.target.value);
                            }}
                            placeholder="password"
                        />
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <button
                        disabled={loading ? true : false}
                        type="submit"
                        className="login-register-button regbutton w-100"
                    >
                        {loading ? (
                            <Spin indicator={antIcon} />
                        ) : (
                            <div className="text"> Register</div>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        // <div className="container p-5">
        //   <div className="row">
        //     <div className="col-md-6 offset-md-3">
        //       <h4>Register</h4>
        //       {registerForm()}
        //     </div>
        //   </div>
        // </div>

        <div className="row py-5 flex-grow-1  px-3 justify-content-center">
            <div className="col col-sm-6 col-md-5 col-lg-4 login-form log-reg-form-container">
                <div className="py-5">
                    <div className="login-form__header">
                        <h2 className="subtitle">Create an account</h2>
                    </div>
                    <div className="text-center cont_div_register mb-3">
                        Already have an account?
                        <Link to="/login" className="link_register">
                            Sign In
                        </Link>
                    </div>

                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;
