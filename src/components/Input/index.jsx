import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    name,
    type,
    value,
    handleChange,
    placeholder,
    onBlur,
    className,
    fieldError,
  } = props;
  return (
    <div className="form-group">
      <input
        className={className}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={onBlur}
        required
      />
      <div className="invalid-feedback">{fieldError}</div>

    </div>
  );
};
Input.defaultProps = {
  fieldError: '',
  onBlur: () => {},
  handleChange: () => {},
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  className: PropTypes.string.isRequired,
  fieldError: PropTypes.string,
};

export default Input;
