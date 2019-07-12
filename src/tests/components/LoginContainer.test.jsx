import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';
import { mapStateToProps, LoginContainer } from '../../components/auth/login/loginContainer';

describe('loginContainer Component', () => {
  let wrapper;
  const props = {
    loginAction: jest.fn(),
    isUserLoggedIn: true,
    user: { auth_token: 'fjjfj', username: 'sjjs', email: 'jdjdj' },
    e: { preventDefault: jest.fn() },
  };

  beforeEach(() => {
    wrapper = shallow(<LoginContainer {...props} />);
    jest.resetAllMocks();
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should set state when onchangeInput is called', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'email',
        value: 'valuer',
      },
    };
    const instance = wrapper.instance();
    instance.onInputChange(event);
    expect(instance.state.email).toBe('valuer');
  });

  it('should call handleSubmit function', async () => {
    const instance = wrapper.instance();
    instance.setState({
      email: 'manorldsapiens@gmail.com',
      password: 'Jakejake123',
    });
    const event = {
      preventDefault: jest.fn(),
    };

    jest.spyOn(instance, 'handleClearForm');
    await instance.handleSubmit(event);
    expect(props.loginAction).toHaveBeenCalled();
    expect(instance.handleClearForm).toHaveBeenCalled();
  });

  it('should not call loginAction() function without data', async () => {
    const instance = wrapper.instance();
    instance.setState({
      email: '',
      password: '',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    jest.spyOn(instance, 'handleClearForm');
    await instance.handleSubmit(event);
    expect(props.loginAction).not.toHaveBeenCalled();
    expect(instance.handleClearForm).not.toHaveBeenCalled();
  });


  it('should clear local state when form is submitted', () => {
    const event = {
      setState: jest.fn(),
    };
    wrapper.instance().handleClearForm(event);
    expect(wrapper.instance().state.email).toBe('');
  });

  it('should validate when no password and email are entered into the form', () => {
    const instance = wrapper.instance();

    instance.setState({ email: '', password: '', isLoading: true });
    jest.spyOn(toast, 'error');
    instance.validateEmailPasswordEntry('', '');
    expect(instance.state.isLoading).toBe(false);
  });

  it('should validate when correct password and email are entered into the form', () => {
    const instance = wrapper.instance();
    instance.setState({ email: 'manorldsapiens@gmail.com', password: 'Jakejake123', isLoading: true });
    jest.spyOn(toast, 'error');
    instance.validateEmailPasswordEntry('manorldsapiens@gmail.com', 'Jakejake123');
    expect(instance.state.isLoading).toBe(true);
  });

  it('Testing mapStateToProps', () => {
    const initialState = {
      loginReducer: {},
    };
    expect(mapStateToProps(initialState)).toEqual({
      loginReducer: {},
    });
  });
});
