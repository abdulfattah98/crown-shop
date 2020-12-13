import React from 'react';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import BannerCarousel from '../components/home/banner-carousel/index';
import Banner from '../components/home/banner/index';
const Home = () => {
    return (
        <>
            <div className="pb-5 main-banner">
                <BannerCarousel />
            </div>
            <div className="pb-5 px-3 new-arrival">
                <NewArrivals />
            </div>
            <div className="pb-5">
                <Banner />
            </div>
            <div className="pb-5 px-3 best-seller">
                <BestSellers />
            </div>
        </>
    );
};

export default Home;
