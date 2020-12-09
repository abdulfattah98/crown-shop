import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p, starSize, starSpace, starColor) => {
    if (p && p.ratings && p.ratings.length) {
        let ratingsArray = p && p.ratings;
        let total = [];
        let length = ratingsArray.length;
        // console.log("length", length);

        ratingsArray.map((r) => total.push(r.star));
        let totalReduced = total.reduce((p, n) => p + n, 0);
        // console.log("totalReduced", totalReduced);

        let highest = length * 5;
        // console.log("highest", highest);

        let result = (totalReduced * 5) / highest;
        // console.log("result", result);

        return (
            <div className="text-center d-flex align-items-center mb-2">
                <span>
                    <StarRating
                        starDimension={`${starSize ? starSize : '18px'}`}
                        starSpacing={`${starSpace ? starSpace : '1.5px'}`}
                        starRatedColor={`${starColor ? starColor : '#fdcc0d'}`}
                        starEmptyColor={starColor}
                        rating={result}
                        editing={false}
                    />{' '}
                </span>
            </div>
        );
    }
};
