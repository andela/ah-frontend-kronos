import articlesLikeReducer from '../../../reducers/articles/articleLikeDislikeReducer';
import * as likeDislikeActions from '../../../actions/articles/likeDislikeAction';


const initialState = {
  liking: false,
  disliking: false,
};


it('should set liking to true article when passed ARTICLE_LIKE_SUCCESS', () => {
  const action = likeDislikeActions.ArticleLikeSuccess({});

  const newState = articlesLikeReducer(initialState, action);
  expect(newState.liking).toEqual(true);
});

it('should set liking to false when passed ARTICLE_LIKE_FAILURE', () => {
  const action = likeDislikeActions.ArticleLikeFail({});
  const newState = articlesLikeReducer(initialState, action);
  expect(newState.liking).toEqual(false);
});

it('should set disliking to true when passed ARTICLE_DISLIKE_SUCCESS', () => {
  const action = likeDislikeActions.ArticleDislikeSuccess({});
  const newState = articlesLikeReducer(initialState, action);
  expect(newState.disliking).toEqual(true);
});

it('should set disliking to false when passed ARTICLE_DISLIKE_FAILURE', () => {
  const action = likeDislikeActions.ArticleDislikeFail({});
  const newState = articlesLikeReducer(initialState, action);
  expect(newState.disliking).toEqual(false);
});
