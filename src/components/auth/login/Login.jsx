import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/scss/Login.scss';
import '../../../assets/scss/SocialLogin.scss';
import Loading from '../../common/Loading';

import FacebookOption from '../../social/facebook';
import GoogleOption from '../../social/google';

export default function Login(props) {
  const { handleSubmit, onInputChange, isLoading } = props;
  return (
    <div className="login-clean">
      <form onSubmit={handleSubmit}>
        <h2 className="sr-only">Login Form</h2>
        <div className="illustration">
          <i className="icon ion-ios-navigate" />
        </div>
        <div className="social-apps" />
        <div className="text-center social-btn">
          <FacebookOption />
          <br />
          <GoogleOption />
          <div className="or-seperator">
            <span className="or">- OR - </span>
          </div>
        </div>


        {isLoading
          ? <Loading />
          : (
            <div>
              <div className="form-group">
                <input id="email" type="email" name="email" onChange={onInputChange} placeholder="Email" className="form-control" />
              </div>
              <div className="form-group">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={onInputChange}
                  placeholder="Password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Login
                </button>
              </div>
            </div>
          )}
        <a href="www.google.com" className="forgot">
          Forgot your email or password?
        </a>
      </form>
    </div>
  );
}


Login.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Login.defaultProps = {
  isLoading: false,
};
