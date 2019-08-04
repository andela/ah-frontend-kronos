export const initialSocialAuthenticationState = {
  FacebookToken: null,
  isFacebookLoggedIn: false,
  GoogleToken: null,
  isGoogleLoggedIn: false,
  logged_in: false,
};

export const initialRegistrationState = {
  registering: false,
  registered: false,
  message: '',
};

export const initialArticleState = {
  creating: false,
  deleting: false,
  deleted: false,
  created: false,
  article: {},
};

export const initialLikeDislikeArticleState = {
  liking: false,
  disliking: false,
};

export const initialArticlesState = {
  isFetching: true,
  articles: [],
};

export const initialPaginationState = {
  isFetching: true,
  articles: [],
  next: null,
  previous: null,
};


export const initialUser = {
  isUserLoggedIn: false,
  isLoggingIn: null,
};

export const initialProfileState = {
  profile: {},
  isLoading: false,
  editSuccess: false,
  isFollowing: false,
};
