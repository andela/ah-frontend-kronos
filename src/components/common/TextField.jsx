import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const {
    name,
    value,
    handleChange,
    placeholder,
    onBlur,
    className,
    rows,
    fieldError,
    required,
  } = props;
  return (
    <div className="form-group">
      <textarea
        name={name}
        onBlur={onBlur}
        rows={rows}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={handleChange}
        required={required}
      />
      <div className="invalid-feedback">{fieldError}</div>
    </div>
  );
};

TextField.defaultProps = {
  fieldError: '',
  required: true,
  onBlur: () => { },
  handleChange: () => { },
  name: '',
  value: '',
  placeholder: '',
  className: '',
  rows: '',
};

TextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  fieldError: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.string,
};


export default TextField;
