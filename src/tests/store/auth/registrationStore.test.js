import { createStore } from 'redux';
import rootReducer from '../../../reducers/rootReducer';
import * as registrationActions from '../../../actions/auth/registrationAction';

it('should handle registering users', () => {
  const store = createStore(rootReducer, {});
  const responseData = {
    message: 'successful registration',
    registered: true,
    registering: false,
  };

  // act
  const action = registrationActions.registerUserSuccess(responseData);
  store.dispatch(action);

  // expect
  const expectedResponse = store.getState().user;
  expect(expectedResponse).toEqual(responseData);
});

it('test', () => {
  expect(true).toEqual(true);
});
