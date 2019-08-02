/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { PropTypes } from 'prop-types';
import '../../../assets/scss/Landing.scss';


const isCheckedClass = (position, rating) => {
  let ratingClass = 'fa fa-star rating-star';

  ratingClass = position <= rating ? ratingClass.concat(' checked') : ratingClass;
  return ratingClass;
};
const ViewArticleRating = ({
  rating, handleRating, handleMouseOver, handleMouseOut,
}) => {
  const ratingslist = [1, 2, 3, 4, 5];
  return ratingslist.map((theRating, index) => (
    <span
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      onClick={() => handleRating(theRating)}
      onMouseOver={() => handleMouseOver(theRating)}
      onMouseOut={handleMouseOut}
      className={isCheckedClass(theRating, rating)}
    />
  ));
};

export default ViewArticleRating;

ViewArticleRating.propTypes = {
  rating: PropTypes.number,
  handleRating: PropTypes.func,
  handleMouseOver: PropTypes.func,
  handleMouseOut: PropTypes.func,
};

ViewArticleRating.defaultProps = {
  rating: 0,
  handleRating: () => {},
  handleMouseOver: () => {},
  handleMouseOut: () => {},
};
