import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, children }) => (
  <button
    className={className}
    type="submit"
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
