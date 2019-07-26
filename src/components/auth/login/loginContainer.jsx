import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Login from './Login';
import loginUserAction from '../../../actions/auth/loginAction';
import { toastFailure } from '../../../utils/toast';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = async (e) => {
    this.setState({ isLoading: true });
    e.preventDefault();
    const { email, password } = this.state;
    const loginInfo = {
      email,
      password,
    };
    const { loginAction } = this.props;

    if (this.validateEmailPasswordEntry(email, password)) {
      return;
    }

    await loginAction(loginInfo);

    this.setState({ isLoading: false });
    this.handleClearForm();
  }

  validateEmailPasswordEntry(email, password) {
    if ((email === '') || (password === '')) {
      toast.dismiss();
      toastFailure('Both Email & Password Details Required', 'A');
      this.setState({ isLoading: false });
      return true;
    }
    return false;
  }

  handleClearForm() {
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <Login
        handleSubmit={this.handleSubmit}
        onInputChange={this.onInputChange}
        isLoading={isLoading}
      />
    );
  }
}

LoginContainer.propTypes = {
  loginAction: PropTypes.func.isRequired,
};


export const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
});

export default connect(mapStateToProps, { loginAction: loginUserAction })(LoginContainer);
