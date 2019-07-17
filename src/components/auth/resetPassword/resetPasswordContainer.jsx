import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResetPassword from './resetPassword';
import resetPasswordAction from '../../../actions/auth/resetPasswordAction';
import '../../../assets/scss/Login.scss';

export class resetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleEmailSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const resetEmailInfo = {
      email,
    };
    const { resetAction } = this.props;
    resetAction(resetEmailInfo);
    this.handleClearForm();
  }

  handleClearForm() {
    this.setState({
      email: '',
    });
  }

  render() {
    const { resetPasswordReducer } = this.props;
    const { isSubmittingResetPassword } = resetPasswordReducer;
    return (
      <ResetPassword
        handleEmailSubmit={this.handleEmailSubmit}
        onInputChange={this.onInputChange}
        isSubmittingResetPassword={isSubmittingResetPassword}
      />
    );
  }
}

resetPasswordContainer.propTypes = {
  resetAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  resetPasswordReducer: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
  resetPasswordReducer: state.resetPasswordReducer,
});

export default connect(
  mapStateToProps,
  { resetAction: resetPasswordAction },
)(resetPasswordContainer);
