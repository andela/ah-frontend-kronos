import React from 'react';
import '../assets/scss/Login.scss';
import '../assets/scss/SocialLogin.scss';

import FacebookOption from './social/facebook';
import GoogleOption from './social/google';

const Login = () => (
  <div className="login-clean">
    <form method="post">
      <h2 className="sr-only">Login Form</h2>
      <div className="illustration">
        <i className="icon ion-ios-navigate" />
      </div>
      <div className="social-apps" />
      <div className="text-center social-btn">
        <FacebookOption />
        <br />
        <GoogleOption />
        <br />
      </div>

      <div className="or-seperator">
        <i>OR</i>
      </div>

      <div className="form-group">
        <input type="email" name="email" placeholder="Email" className="form-control" />
      </div>
      <div className="form-group">
        <input type="password" name="password" placeholder="Password" className="form-control" />
      </div>
      <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">
          <a href="articles.html">LOGIN</a>
        </button>
      </div>
      <a href="/resetpassword" className="forgot">
          Forgot your email or password?
      </a>
    </form>
  </div>
);

export default Login;
