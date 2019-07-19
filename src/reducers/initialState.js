const initialSocialAuthenticationState = {
  FacebookToken: null,
  isFacebookLoggedIn: false,
  GoogleToken: null,
  isGoogleLoggedIn: false,
  logged_in: false,
};

export const initialRegistrationlState = {
  registering: false,
  registered: false,
  message: '',
};

export const initialArticleState = {
  creating: false,
  created: false,
  article: {},
};


export default initialSocialAuthenticationState;
