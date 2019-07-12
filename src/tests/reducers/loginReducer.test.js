import loginReducer from '../../reducers/auth/login/loginReducer';


describe('reducer initial state', () => {
  it('should handle LOGIN_USER_FAILED', () => {
    expect(
      loginReducer(
        {
          isUserLoggedIn: false,
          token: '',
          username: '',
        },
        {
          type: 'LOGIN_USER_FAILED',
          payload: {
            errors: {
              error: [
                'error message here',
              ],
            },
          },
        },
      ),
    ).toEqual({
      isUserLoggedIn: false,
      token: '',
      username: '',
      errors: 'error message here',
    });
  });
});
