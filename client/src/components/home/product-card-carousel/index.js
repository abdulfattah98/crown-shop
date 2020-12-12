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
        rewind: false,
        mergeFit: true,

        margin: 10,
        autoplay: false,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>",
        ],
        responsive: {
            1200: {
                items: 5,
                slideBy: 3,
            },
            1100: {
                items: 5,
                slideBy: 3,
            },
            1024: {
                items: 4,
                slideBy: 3,
            },
            768: {
                items: 3,
                nav: false,
                slideBy: 3,
            },
            500: {
                items: 2,
                slideBy: 1,
            },
            0: {
                items: 1,
                slideBy: 1,
                stagePadding: 50,
                margin: 25,
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
