import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, children }) => (
  <div className="form-group">
    <button
      className={className}
      type="submit"
    >
      {children}
    </button>
  </div>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
