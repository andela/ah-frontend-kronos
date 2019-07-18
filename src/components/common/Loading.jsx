import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/scss/Loading.scss';
import loading from '../../assets/gif/loading.gif';

const Loading = ({ className }) => (
  <div className={className}>
    <img alt="loading..." src={loading} />
  </div>
);

Loading.defaultProps = {
  className: 'loader',
};

Loading.propTypes = {
  className: PropTypes.string,
};

export default Loading;
