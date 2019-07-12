import userReducer from '../../../reducers/auth/register/registrationReducer';
import * as registrationActions from '../../../actions/auth/registrationAction';

const initialState = {};
const newUser = {
  email: 'email@example.com',
  username: 'username',
  password: 'password',
};

it('should add a new user when passed REGISTER_SUCCESS', () => {
  const action = registrationActions.registerUserSuccess(newUser);

  const newState = userReducer(initialState, action);
  expect(newState.email).toEqual('email@example.com');
});

it('should add errors when passed REGISTER_FAILURE', () => {
  const errors = {
    error: 'email already exists',
  };
  const action = registrationActions.registerUserFail(errors);
  const newState = userReducer(initialState, action);
  expect(newState.error).toEqual('email already exists');
});

it('should set registering to true when passed REGISTER_REQUEST', () => {
  const status = {
    registering: true,
  };
  const action = registrationActions.registerRequest(status);
  const newState = userReducer(initialState, action);
  expect(newState.registering).toEqual(true);
});
