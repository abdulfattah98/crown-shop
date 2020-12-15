import React from 'react';
import { Link } from 'react-router-dom';

import IPhone from '../../../images/iphone-lg.gif';
import IPhoneSm from '../../../images/iphone-sm.gif';

const Banner = () => {
    return (
        <div>
            <Link to="/category/smart-phone">
                <img
                    src={IPhone}
                    alt="iphone banner"
                    className="banner-image w-100 d-none d-md-block"
                />
                <img
                    src={IPhoneSm}
                    alt="iphone banner sm"
                    className="banner-image w-100 d-block d-md-none"
                />
            </Link>
        </div>
    );
};

export default Banner;
