/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginFacebook from '../../../actions/socialLogin/FacebookActions';

export class FacebookOption extends Component {
  responseFacebook = (response) => {
    const { LoginFacebook } = this.props;
    LoginFacebook(response.accessToken);
  };

  render() {
    return (
      <div>
        <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          fields="name,email,picture"
          callback={this.responseFacebook}
          icon={<i className="fab fa-facebook-f" />}
          cssClass="my-facebook-button-class"
        />
      </div>
    );
  }
}
FacebookOption.propType = {
  responseFacebook: PropTypes.func,
};
export const mapStateToProps = state => ({
  FacebookAuthState: state.socialLoginReducer,
});

export default connect(
  mapStateToProps,
  { LoginFacebook },
)(FacebookOption);
