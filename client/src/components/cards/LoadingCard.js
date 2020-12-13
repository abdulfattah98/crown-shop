import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = ({
    count,
    isPlpFilters,
    isPlpCard,
    isPlPCardList,
    orderLoading,
}) => {
    const cards = () => {
        let totalCards = [];

        for (let i = 0; i < count; i++) {
            totalCards.push(
                <div
                    key={i}
                    className={`${
                        isPlpFilters
                            ? 'col-12 pt-0 pl-0'
                            : isPlpCard
                            ? `col-6 col-md-6 col-lg-4 col-xl-3 mb-3 p-md-2 mb-md-3 h-100 ${
                                  i % 2 === 0 ? 'pl-2 pr-3' : 'pr-2 pl-3'
                              } px-md-3`
                            : isPlPCardList
                            ? 'col-12 mb-3 p-md-2 p-0 mb-md-3 h-100 plp-list-loading'
                            : orderLoading
                            ? 'col-12 mb-3 p-md-2 p-0 mb-md-3 h-100 orders-loading'
                            : 'col-12 col-xl-2 col-md-4 col-lg-3 mb-3 p-3 p-md-2 mb-md-3 h-100'
                    }`}
                >
                    <Card>
                        <Skeleton width={100} active height={100}></Skeleton>
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
