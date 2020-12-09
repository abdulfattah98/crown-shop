import React, { useRef } from 'react';

// react owl carousel 2
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.theme.default.css';

const ProductCarousel = (props) => {
    const ref = useRef();
    const options = {
        items: 6,
        // margin: 20,
        nav: true,
        dots: false,
        slideBy: 3,
        margin: 10,
        rewind: true,
        autoplay: false,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>",
        ],
        responsive: {
            1200: {
                items: 5.5,
                slideBy: 3,
            },
            1100: {
                items: 5,
                slideBy: 3,
            },
            1024: {
                items: 4.5,
                slideBy: 3,
            },
            768: {
                items: 3.2,
                nav: false,
                slideBy: 3,
            },
            500: {
                items: 2.5,
                slideBy: 1,
            },
            400: {
                items: 1.7,
                slideBy: 1,
            },
            350: {
                items: 1.5,
                slideBy: 1,
            },
            300: {
                items: 1.2,
                slideBy: 1,
            },
            280: {
                nav: false,
                items: 1.1,
                slideBy: 1,
            },
        },
    };
    return (
        <div>
            <OwlCarousel ref={ref} options={options}>
                {props.children}
            </OwlCarousel>
        </div>
    );
};

export default ProductCarousel;
