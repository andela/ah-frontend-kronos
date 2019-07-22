import articleReducer from '../../../reducers/articles/articleReducer';
import * as acticleActions from '../../../actions/articles/articleAction';

const initialState = {
  loggedin: true,
  creating: false,
  created: false,
  deleting: false,
  deleted: false,
  article: {},
};
const newArticle = {
  title: 'new title',
  description: 'description',
  body: 'body',
  slug: 'new-title',
};

it('should add a new article when passed ARTICLE_SUCCESS', () => {
  const action = acticleActions.ArticleSuccess(newArticle);

  const newState = articleReducer(initialState, action);
  expect(newState.title).toEqual(newArticle.title);
});

it('should set creating and created to false when passed ARTICLE_FAILURE', () => {
  const action = acticleActions.ArticleFail(newArticle);
  const newState = articleReducer(initialState, action);
  expect(newState.creating).toEqual(false);
  expect(newState.created).toEqual(false);
});

it('should set creating to true when passed ARTICLE_REQUEST', () => {
  const action = acticleActions.ArticleRequest();

  const newState = articleReducer(initialState, action);
  expect(newState.creating).toEqual(true);
});

it('should delete a new article when passed ARTICLE_DELETE_SUCCESS', () => {
  const action = acticleActions.ArticleDeleteSuccess(newArticle.slug);

  const newState = articleReducer(initialState, action);
  expect(newState.deleted).toEqual(true);
});

it('should not delete an article when passed ARTICLE_DELETE_FAILURE', () => {
  const action = acticleActions.ArticleDeleteFail(newArticle.slug);
  const newState = articleReducer(initialState, action);
  expect(newState.deleting).toEqual(false);
  expect(newState.deleted).toEqual(false);
});

it('should not delete an article when passed ARTICLE_DELETE_REQUEST', () => {
  const action = acticleActions.ArticleDeleteRequest();

  const newState = articleReducer(initialState, action);
  expect(newState.deleting).toEqual(true);
});
