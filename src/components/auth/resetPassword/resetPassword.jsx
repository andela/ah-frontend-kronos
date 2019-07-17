import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../common/Loading';

export default function resetPassword(props) {
  const { handleEmailSubmit, onInputChange, isSubmittingResetPassword } = props;
  return (
    <div className="login-clean">
      <form onSubmit={handleEmailSubmit}>
        <div className="illustration">
          <i className="icon ion-ios-navigate" />
        </div>
        {
        isSubmittingResetPassword
          ? <Loading />
          : (
            <div>
              <h3 className="reset-header">
                Password Reset
              </h3>
              <p>
                We will send you an email with a reset password link.
              </p>
              <div className="form-group">
                <input type="email" onChange={onInputChange} name="email" placeholder="Enter Email Address" className="form-control" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  SEND ME RESET A LINK
                </button>
              </div>
            </div>
          )
      }

      </form>
    </div>

  );
}

resetPassword.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  handleEmailSubmit: PropTypes.func.isRequired,
  isSubmittingResetPassword: PropTypes.bool,
};

resetPassword.defaultProps = {
  isSubmittingResetPassword: false,
};
