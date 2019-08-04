import React from 'react';

import PropTypes from 'prop-types';
import '../../assets/scss/Pagination.scss';


const Pagination = ({
  next, previous, currentPage, totalNumberOfPages, handlePagination,
}) => (
  <div className="btn-pagination">
    <button type="button" name="previous" disabled={previous === null} onClick={() => { handlePagination(previous, -1); }}>Previous</button>
    <span>
      {`${currentPage}/${totalNumberOfPages}`}
      {'  pages'}
    </span>
    <button type="button" name="next" disabled={next === null} onClick={() => { handlePagination(next, +1); }}>Next</button>
  </div>
);

export default Pagination;

Pagination.defaultProps = {
  next: null,
  previous: null,
};

Pagination.propTypes = {
  next: PropTypes.string,
  previous: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
};
