import React, { useRef } from 'react';

// react owl carousel 2
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.theme.default.css';

// import iphone from './iphone-lg.png';
import Banner1 from '../../../images/banner1.jpg';
import Banner2 from '../../../images/banner2.jpg';
import Banner3 from '../../../images/banner3.jpg';
import Banner4 from '../../../images/banner4.jpeg';
import Banner1Md from '../../../images/banner1-md.jpg';
import Banner2Md from '../../../images/banner2-md.jpg';
import Banner3Md from '../../../images/banner3-md.jpg';
import Banner4Md from '../../../images/banner4-md.jpeg';
import Banner1Sm from '../../../images/banner1-sm.jpg';
import Banner2Sm from '../../../images/banner2-sm.jpg';
import Banner3Sm from '../../../images/banner3-sm.jpg';
import Banner4Sm from '../../../images/banner4-sm.jpeg';

const BannerCarousel = (props) => {
    const ref = useRef();
    const options = {
        items: 1,
        nav: true,
        rewind: true,
        autoplay: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>",
        ],
    };
    return (
        <OwlCarousel ref={ref} options={options}>
            <div>
                <img
                    src={Banner4}
                    // alt=""
                    className="banner-image d-none d-lg-block"
                />
                <img
                    src={Banner4Md}
                    // alt=""
                    className="banner-image d-none d-md-block d-lg-none"
                />
                <img
                    src={Banner4Sm}
                    // alt=""
                    className="banner-image d-block d-md-none"
                />
            </div>
            <div>
                <img
                    src={Banner1}
                    // alt=""
                    className="banner-image d-none d-lg-block"
                />
                <img
                    src={Banner1Md}
                    // alt=""
                    className="banner-image d-none d-md-block d-lg-none"
                />
                <img
                    src={Banner1Sm}
                    // alt=""
                    className="banner-image d-block d-md-none"
                />
            </div>
            <div>
                <img
                    src={Banner2}
                    // alt=""
                    className="banner-image d-none d-lg-block"
                />
                <img
                    src={Banner2Md}
                    // alt=""
                    className="banner-image d-none d-md-block d-lg-none"
                />
                <img
                    src={Banner2Sm}
                    // alt=""
                    className="banner-image d-block d-md-none"
                />
            </div>
            <div>
                <img
                    src={Banner3}
                    // alt=""
                    className="banner-image d-none d-lg-block"
                />
                <img
                    src={Banner3Md}
                    // alt=""
                    className="banner-image d-none d-md-block d-lg-none"
                />
                <img
                    src={Banner3Sm}
                    // alt=""
                    className="banner-image d-block d-md-none"
                />
            </div>
        </OwlCarousel>
    );
};

export default BannerCarousel;
