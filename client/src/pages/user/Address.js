import React from 'react';
import UserNav from '../../components/nav/UserNav';

const Address = () => {
    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="col-3">
                    <UserNav />
                </div>
                <h4 className="dashboard__page-title">Addresses</h4>
                <div className="col-9 text-center"></div>
            </div>
        </div>
    );
};

export default Address;
