import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

import { ReactComponent as ViewIcon } from './view.svg';

const Password = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('password');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword('');
                toast.success('Password updated');
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12 col-md-8 col-lg-6 px-0 mb-4 mb-md-0 pr-md-2 pl-md-0">
                    <div className="form-group mb-0">
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
                            type={view}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter new password"
                            disabled={loading}
                            value={password}
                        />
                    </div>
                </div>
                <div
                    className="col-6 col-md-4 col-lg-4 px-0 pl-md-2 pr-md-0"
                    // style={{ height: '40px' }}
                >
                    <button
                        className={`form-save-button add-category submit-pass-button ${
                            !password || password.length < 6 || loading
                                ? 'button-disabled'
                                : ''
                        }`}
                        style={{ height: '37px', padding: '5px 10px' }}
                        disabled={!password || password.length < 6 || loading}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <div className="container-fluid dashboard flex-grow-1">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <UserNav />
                </div>
                {loading ? (
                    <h4 className="text-danger">Loading..</h4>
                ) : (
                    <div className="col-12 col-md-9 px-3 pr-md-0">
                        <h4 className="dashboard__page-title">
                            Password Update
                        </h4>
                        {passwordUpdateForm()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Password;
