import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { SignUpForm, mapStateToProps } from '../../../components/auth/registration/SignUpForm';
import Loading from '../../../components/common/Loading';
import { Navigation } from '../../../components/common/navigation/AuthNavigation';

function renderInputField(args) {
  const defaultProps = {
    name: '',
    type: '',
    value: '',
    handleChange: () => { },
    placeholder: '',
    onBlur: () => { },
    className: '',
    fieldError: '',
  };

  const props = { ...defaultProps, ...args };
  return shallow(<Input {...props} />);
}

function renderButtonField(args) {
  const defaultProps = {
    className: '',
    children: '',
  };
  const props = { ...defaultProps, ...args };
  return shallow(<Button {...props} />);
}

function renderSignUpForm(args) {
  const defaultProps = {
    actions: { registerUser: jest.fn() },
    user: {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<SignUpForm {...props} />);
}

function renderLoading() {
  return shallow(<Loading />);
}

function renderNavigation(args) {
  const defaultProps = {
    nextProps: {
      loggedIn: false,
    },
  };
  const props = { ...defaultProps, ...args };
  return shallow(<Navigation {...props} />);
}
it('should render Navigation', () => {
  const wrapper = renderNavigation();
  expect(wrapper).toMatchSnapshot();
});

describe('registration page', () => {
  const wrapper = renderSignUpForm();
  const wrapperInst = wrapper.instance();

  it('should render Navigation', () => {
    const wrapper = renderNavigation();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Loading in form', () => {
    const loader = renderLoading();
    expect(loader).toMatchSnapshot();
  });


  it('should render input field in form', () => {
    const inputfields = renderInputField();
    expect(inputfields.find('input').length).toBe(1);
  });

  it('should render button field in form', () => {
    const button = renderButtonField();
    expect(button.find('button').length).toBe(1);
  });

  it('form contains three input fields and one button', () => {
    const numOfInputs = wrapper.find('Input').length;
    const numOfButtons = wrapper.find('Button').length;
    expect(numOfInputs).toEqual(4);
    expect(numOfButtons).toEqual(1);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle input change', () => {
    const event = {
      target: {
        name: 'username',
        value: 'fred',
      },
    };
    wrapperInst.handleChange(event);
    expect(wrapperInst.state.username).toBe('fred');
  });

  it('should handle submit and clear form after', () => {
    wrapper.setState({
      username: 'fred',
      email: 'email@email.com',
      password: 'password',
      confirmpassword: 'confirmpassword',
    });

    expect(wrapperInst.state.username).toBe('fred');
    expect(wrapperInst.state.email).toBe('email@email.com');
    expect(wrapperInst.state.password).toBe('password');
    expect(wrapperInst.state.confirmpassword).toBe('confirmpassword');

    const event = {
      target: {
        type: 'submit',
      },
      preventDefault: jest.fn(),
    };
    wrapperInst.submitForm(event);
    expect(wrapperInst.props.actions.registerUser).toBeCalled();
    expect(wrapperInst.state.username).toBe('');
    expect(wrapperInst.state.email).toBe('');
    expect(wrapperInst.state.password).toBe('');
    expect(wrapperInst.state.confirmpassword).toBe('');
  });

  it('should map tostate to props', () => {
    const mockedState = {
      user: {
        registering: true,
      },
    };
    const state = mapStateToProps(mockedState);
    expect(state.user.registering).toBe(true);
  });
});
