/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/scss/Landing.scss';

export default function RateArticle({ handleRating, handleMouseOver }) {
  return (
    <div className="ratings-div">
      <span id="star1" onClick={handleRating(1)} onMouseOver={handleMouseOver(1)} className="fa fa-star rating-star rate-star" />
      <span id="star2" onClick={handleRating(2)} onMouseOver={handleMouseOver(2)} className="fa fa-star rating-star rate-star" />
      <span id="star3" onClick={handleRating(3)} onMouseOver={handleMouseOver(3)} className="fa fa-star rating-star rate-star" />
      <span id="star4" onClick={handleRating(4)} onMouseOver={handleMouseOver(4)} className="fa fa-star rating-star rate-star" />
      <span id="star5" onClick={handleRating(5)} onMouseOver={handleMouseOver(5)} className="fa fa-star rating-star rate-star" />
    </div>
  );
}

RateArticle.propTypes = {
  handleRating: PropTypes.func,
  handleMouseOver: PropTypes.func,
};

RateArticle.defaultProps = {
  handleRating: () => {},
  handleMouseOver: () => {},
};
