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
    required,
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
        required={required}
      />
      <div className="invalid-feedback">{fieldError}</div>

    </div>
  );
};
Input.defaultProps = {
  fieldError: '',
  onBlur: () => {},
  handleChange: () => {},
  required: true,
  value: '',
  name: '',
  placeholder: '',
  className: '',
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  fieldError: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
