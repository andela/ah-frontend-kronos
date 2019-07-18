import socialLoginreducer from '../../../reducers/auth/socialLoginReducer';

describe('FacebookReducer', () => {
  const initialState = { FacebookToken: null, isFacebookLoggedIn: false, logged_in: false };

  it('should return FACEBOOK_AUTH_SUCCESS', () => {
    const FacebookAuthSuccessAction = {
      type: 'FACEBOOK_AUTH_SUCCESS',
    };
    const successState = {
      isFacebookLoggedIn: true,
      logged_in: true,
    };
    expect(socialLoginreducer(initialState, FacebookAuthSuccessAction)).toEqual(successState);
    expect(socialLoginreducer(initialState, FacebookAuthSuccessAction)).toEqual(successState);
  });
  it('should return FACEBOOK_AUTH_FAIL', () => {
    const FacebookAuthFailAction = {
      type: 'FACEBOOK_AUTH_FAIL',
    };

    expect(socialLoginreducer(initialState, FacebookAuthFailAction)).toEqual(initialState);
  });
  it('should return FACEBOOK_AUTHENTICATION', () => {
    const FacebookAuthAction = {
      type: 'FACEBOOK_AUTHENTICATION',
    };
    const successState = {
      isAuthenticating: true,
      isFacebookLoggedIn: false,
      FacebookToken: null,
      logged_in: false,
    };

    expect(socialLoginreducer(initialState, FacebookAuthAction)).toEqual(successState);
  });
});
describe('GoogleReducer', () => {
  const initialState = { GoogleToken: null, isGoogleLoggedIn: false };

  it('should return GOOGLE_AUTH_SUCCESS', () => {
    const GoogleAuthSuccessAction = {
      type: 'GOOGLE_AUTH_SUCCESS',
    };
    const successState = {
      isGoogleLoggedIn: true,
      logged_in: true,
    };
    expect(socialLoginreducer(initialState, GoogleAuthSuccessAction)).toEqual(successState);
  });
  it('should return GOOGLE_AUTH_FAIL', () => {
    const GoogleAuthFailAction = {
      type: 'GOOGLE_AUTH_FAIL',
    };

    expect(socialLoginreducer(initialState, GoogleAuthFailAction)).toEqual(initialState);
  });
  it('should return GOOGLE_AUTHENTICATION', () => {
    const GoogleAuthenticationAction = {
      type: 'GOOGLE_AUTHENTICATION',
    };
    const successState = {
      GoogleToken: null,
      isGoogleLoggedIn: false,
    };

    expect(socialLoginreducer(initialState, GoogleAuthenticationAction)).toEqual(successState);
  });
});
