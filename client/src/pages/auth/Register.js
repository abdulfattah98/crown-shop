import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            toast.error('Name is required');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }
        if (!email) {
            toast.error('Email  is required');
            return;
        }

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
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label className="label_form">Name</label>
                        <input
                            type="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="label_form">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
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
                            placeholder="password"
                        />
                    </div>
                </div>
                <br />
                <div className="offset-3 col-6">
                    <button
                        type="submit"
                        className="online login_btn_page w-100"
                    >
                        Register
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

        <div className="row">
            <div className="col col-sm-6 offset-sm-3 col-md-4 offset-md-4 login-form">
                <div className="py-5">
                    <div className="login-form__header">
                        {loading ? (
                            <h4 className="text-danger">Loading...</h4>
                        ) : (
                            <>
                                <h2 className="subtitle">Create an account</h2>
                            </>
                        )}
                    </div>
                    <div className="text-center cont_div_register">
                        Already have an account?
                        <Link to="/login" className="link_register">
                            Sign Up
                        </Link>
                    </div>

                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;
