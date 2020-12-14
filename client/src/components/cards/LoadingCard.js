import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = ({
    count,
    isPlpFilters,
    isPlpCard,
    isPlPCardList,
    orderLoading,
    isPdpCard,
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
                            : isPdpCard
                            ? 'col-12 col-md-6 h-100 px-0 pdp-loading'
                            : 'col-12 col-xl-2 col-md-4 col-lg-3 mb-3 p-3 p-md-2 mb-md-3 h-100'
                    }`}
                >
                    <Card
                        className={`${
                            isPdpCard && i === 0
                                ? 'first'
                                : isPdpCard && i === 1
                                ? 'last'
                                : ''
                        }`}
                    >
                        {isPdpCard ? (
                            <>
                                <Skeleton
                                    // width={100}

                                    active
                                    title={true}
                                    height={100}
                                ></Skeleton>
                                <Skeleton
                                    // width={100}
                                    active
                                    className="mb-4"
                                    title={true}
                                    height={100}
                                ></Skeleton>
                                <Skeleton
                                    // width={100}
                                    active
                                    className="d-none d-md-block"
                                    title={false}
                                    height={100}
                                ></Skeleton>
                            </>
                        ) : (
                            <Skeleton
                                width={100}
                                active
                                height={100}
                            ></Skeleton>
                        )}
                    </Card>
                </div>
            );
        }

        return totalCards;
    };

    return (
        <div
            // style={{ height: `${isPdpCard ? '440px' : ''}` }}
            className={`row skeleton-card pb-5 ${
                isPlpFilters
                    ? 'plp-filters-loading'
                    : isPdpCard
                    ? 'bg-white'
                    : ''
            }`}
        >
            {isPdpCard ? (
                <div className="col-12 col-md-6 bg-white h-100 pt-4 pl-4 pr-4">
                    <div className="row h-100 gallery-loading">
                        <div className="col-lg-3 col-12 overflow-hidden thumbs-container order-1 order-lg-0">
                            <div className="thumb">&nbsp;</div>
                            <div className="thumb">&nbsp;</div>
                            <div className="thumb">&nbsp;</div>
                            <div className="thumb">&nbsp;</div>
                        </div>
                        <div className="col-lg-9 col-12 order-0 order-lg-1 main-image mb-4">
                            &nbsp;
                        </div>
                    </div>
                </div>
            ) : null}
            {cards()}
        </div>
    );
};

export default LoadingCard;
