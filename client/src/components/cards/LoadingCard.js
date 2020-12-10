import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = ({ count, isPlpFilters, isPlpCard }) => {
    const cards = () => {
        let totalCards = [];

        for (let i = 0; i < count; i++) {
            totalCards.push(
                <div
                    className={`${
                        isPlpFilters
                            ? 'col-12 pt-2'
                            : isPlpCard
                            ? 'col-6 col-md-4 col-lg-4 col-xl-3 mb-3 p-3 p-md-2 mb-md-3 h-100'
                            : 'col-12 col-xl-2 col-md-4 col-lg-3 mb-3 p-3 p-md-2 mb-md-3 h-100'
                    }`}
                >
                    <Card key={i}>
                        <Skeleton width={100} height={100} active></Skeleton>
                    </Card>
                </div>
            );
        }

        return totalCards;
    };

    return (
        <div
            className={`row skeleton-card pb-5 ${
                isPlpFilters ? 'plp-filters-loading' : ''
            }`}
        >
            {cards()}
        </div>
    );
};

export default LoadingCard;
