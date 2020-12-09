import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';
import BannerCarousel from '../components/home/banner-carousel/index';
import Banner from '../components/home/banner/index';
const Home = () => {
    return (
        <>
            <div className="pb-5 main-banner">
                <BannerCarousel />
            </div>
            {/* <ProductCardCarousel /> */}
            {/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron
                    text={['Latest Products', 'New Arrivals', 'Best Sellers']}
                />
            </div> */}
            {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                New Arrivals
            </h4> */}
            <div className="pb-5 px-5">
                <NewArrivals />
            </div>
            <div className="pb-5">
                <Banner />
            </div>
            <div className="pb-5 px-5">
                <BestSellers />
            </div>
            {/* <div className="category-list jumbotron">
                <h2 className="text-center pt-3 mb-5 category-list__title">
                    Shop By Category
                </h2>
                {/* <ul className="category-list__list">
                    <li className="category-list__list-item"></li>
                </ul> */}
            {/* <CategoryList /> */}
            {/* </div> */} */}
            {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Sub Categories
            </h4> */}
            {/* <SubList /> */}
        </>
    );
};

export default Home;
