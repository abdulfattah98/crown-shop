import React from 'react';
import StarRating from 'react-star-ratings';

const Star = ({ numberOfStars, starColor, starSize, starSpace }) => (
    <>
        <StarRating
            // changeRating={() => starClick(numberOfStars)}
            numberOfStars={numberOfStars}
            starDimension={`${starSize ? starSize : '18px'}`}
            starSpacing={`${starSpace ? starSpace : '1.5px'}`}
            starHoverColor={`${starColor ? starColor : '#fdcc0d'}`}
            starEmptyColor={`${starColor ? starColor : '#fdcc0d'}`}
        />
        <br />
    </>
);

export default Star;
