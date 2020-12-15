import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    const emailRef = useRef();

    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history]);

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
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('');
                setLoading(false);
                toast.success('Check your email for password reset link');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log('ERROR MSG IN FORGOT PASSWORD', error);
            });
    };

    const forgotForm = () => {
        return (
            <form className="text-center" onSubmit={handleSubmit} noValidate>
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
                <br />
                <button className="login-register-button regbutton forgot-width">
                    Send
                </button>
            </form>
        );
    };

    return (
        // <div className="container col-md-6 offset-md-3 p-5">
        //   {loading ? (
        //     <h4 className="text-danger">Loading</h4>
        //   ) : (
        //     <h4>Forgot Password</h4>
        //   )}

        // </div>
        <div className="row py-5  flex-grow-1 px-3 justify-content-center">
            <div className="col col-sm-6 align-items-center col-md-5 col-lg-4 login-form log-reg-form-container forgetPassword">
                <div className="py-5 w-100">
                    <div className="login-form__header">
                        {loading ? (
                            <h4 className="text-danger">Loading...</h4>
                        ) : (
                            <>
                                <h2 className="subtitle">
                                    Please enter your email
                                </h2>
                            </>
                        )}
                    </div>
                    {forgotForm()}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
