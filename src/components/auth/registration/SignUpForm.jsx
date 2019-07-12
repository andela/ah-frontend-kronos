import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as registrationActions from '../../../actions/auth/registrationAction';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Loading from '../../common/Loading';
import '../../../assets/scss/signup.scss';

export class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
      confirmpassword: '',
      confirmPasswordError: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.validateFormData = this.validateFormData.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => { this.validateFormData(); });
  }

  validateFormData() {
    const {
      email,
      username,
      password,
      confirmpassword,
    } = this.state;

    // eslint-disable-next-line no-useless-escape
    const passwordValidation = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
    // eslint-disable-next-line no-useless-escape
    const usernameValidation = new RegExp('^([a-zA-Z\d]+[-_])*[a-zA-Z\d*]+$');

    this.setState({
      emailError: email.length > 3 ? null : 'Email must be longer than 3 characters',
      usernameError: username.length > 3 && usernameValidation.test(username) ? null : 'Username should be 4 characters and cannot be integers, have white spaces or symbol',
      passwordError: passwordValidation.test(password) ? null : 'Password should be 8 to more characters with atleast a number, capital and small letter.',
      confirmPasswordError: confirmpassword === password ? null : 'Passwords don\'t match',
    });
  }


  submitForm(event) {
    event.preventDefault();
    const { email, username, password } = this.state;
    const { actions } = this.props;
    const newUser = { email, username, password };
    actions.registerUser(newUser);
    this.handleClearForm();
  }

  handleClearForm() {
    this.setState({
      email: '',
      username: '',
      password: '',
      confirmpassword: '',
    });
  }

  render() {
    const {
      email,
      username,
      password,
      confirmpassword,
      emailError,
      usernameError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    const { user } = this.props;

    return (
      <div className="register-photo">
        <div className="form-container">
          <div className="image-holder" />
          <form onSubmit={this.submitForm}>
            <h2 className="text-center">
              <strong>Create </strong>
            an account
            </h2>
            {user.registering ? <Loading />
              : (
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    handleChange={this.handleChange}
                    onBlur={this.validateFormData}
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    fieldError={emailError}
                  />
                  <Input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    handleChange={this.handleChange}
                    onBlur={this.validateFormData}
                    className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                    fieldError={usernameError}
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    handleChange={this.handleChange}
                    onBlur={this.validateFormData}
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    fieldError={passwordError}
                  />
                  <Input
                    name="confirmpassword"
                    type="password"
                    placeholder="Password (Confirm)"
                    value={confirmpassword}
                    handleChange={this.handleChange}
                    onBlur={this.validateFormData}
                    className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                    fieldError={confirmPasswordError}
                  />

                </div>
              )


          }
            <div className="form-group">
              <Link to="/" className="already">Changed your mind? Cancel registration.</Link>
            </div>
            <Button className="btn btn-primary btn-block">Signup</Button>
            <Link to="/login" className="already">You already have an account? Login here.</Link>
          </form>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  actions: PropTypes.shape({ registerUser: PropTypes.func }).isRequired,
  user: PropTypes.shape({ registerUser: PropTypes.func }).isRequired,
};

export const mapStateToProps = state => ({
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(registrationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
