/* eslint-disable no-shadow */
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginGoogle from '../../../actions/socialLogin/GoogleActions';

export class GoogleOption extends Component {
  responseGoogle = (response) => {
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line react/prop-types
    const { LoginGoogle } = this.props;
    const accessToken = LoginGoogle(response.tokenId);
    return accessToken;
  };

  render() {
    return (
      <div className="social-apps">
        <GoogleLogin
          clientId={process.env.GOOGLE_APP_ID}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </div>
    );
  }
}

GoogleOption.propType = {
  LoginGoogle: PropTypes.func,
};

export const mapStateToProps = state => ({
  googleAuthState: state.socialLoginReducer,
});

export default connect(
  mapStateToProps,
  { LoginGoogle },
)(GoogleOption);
