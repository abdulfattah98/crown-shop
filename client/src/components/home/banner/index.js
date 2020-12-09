import React from 'react';

import IPhone from '../../../images/iphone-lg.png';
import IPhoneSm from '../../../images/iphone-sm.png';

const Banner = () => {
    return (
        <div>
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
        </div>
    );
};

export default Banner;
