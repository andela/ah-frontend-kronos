import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import comment from './__mocks__/index';
import {
  articleCommentAction,
} from '../../../actions/actionTypes';
import {
  fetchComment, editComment, postComment, deleteComment,
} from '../../../actions/comment/articleCommentAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('comment actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should create an action to show the  comments successfull', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: comment.view.success,
      });
    });
    const expectedActions = [
      {
        type: articleCommentAction.REQUEST_COMMENT_SUCCESS,
        payload: comment.view.success.comment.comments,
      },
    ];
    return store.dispatch(fetchComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action for failure to show the comments', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: comment.view.failure,
      });
    });
    return store.dispatch(fetchComment())
      .then(() => {
        expect(store.getActions()).toStrictEqual([{ payload: undefined, type: 'USERS_REQUEST_COMMENT_FAILURE' }]);
      });
  });

  it('should create an action to edit the comment', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: comment.edit.success,
      });
    });
    const expectedActions = [
      {
        type: articleCommentAction.EDIT_COMMENT_SUCCESS,
        payload: comment.edit.success.comment,
      },
    ];

    return store.dispatch(editComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action for failure to edit the comment', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: comment.edit.failure,
      });
    });
    const expectedActions = [
      {
        type: articleCommentAction.EDIT_COMMENT_FAILURE,
        payload: comment.edit.failure.comment,
      },
    ];
    return store.dispatch(editComment())
      .then(() => {
        expect(store.getActions()).toStrictEqual(expectedActions);
      });
  });
  it('should create an action to create the comment', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: comment.create.success,
      });
    });
    const expectedData = [{
      payload: {
        article: 1,
        author: {
          bio: 'A great software developer at Andela Uganda, supper author of 26 books of programming and preacher of the gospel.',
          created_at: '2019-07-11T19:08:03.617734Z',
          date_of_birth: '2019-07-24',
          first_name: 'Space',
          following: false,
          image: 'url',
          last_name: 'Sprinters',
          username: 'ManuelDominic',
        },
        comment_body: "Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
        comment_on_end: null,
        comment_on_start: null,
        comment_on_text: null,
        created_at: '2019-07-20T19:07:32.235954Z',
        id: 4,
        likes_count: null,
        replies: [],
        updated_at: '2019-07-20T19:07:32.235976Z',
        user_like_status: null,
      },
      type: 'USERS_CREATE_COMMENT_SUCCESS',
    }];
    return store.dispatch(postComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedData);
      });
  });
  it('should create an action for failure to create the comment', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: comment.create.failure,
      });
    });
    return store.dispatch(postComment())
      .then(() => {
        expect(store.getActions()).toStrictEqual([{ payload: undefined, type: 'USERS_CREATE_COMMENT_FAILURE' }]);
      });
  });
  it('should create an action to delete the comment', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: comment.delete.success,
      });
    });
    const expectedActions = [
      {
        type: articleCommentAction.DELETE_COMMENT_SUCCESS,
        payload: comment.delete.success.comment.message,
      },
    ];

    return store.dispatch(deleteComment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action for failure to delete the comment', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: comment.delete.failure,
      });
    });
    const expectedActions = [
      {
        type: articleCommentAction.DELETE_COMMENT_FAILURE,
        payload: undefined,
      },
    ];
    return store.dispatch(deleteComment())
      .then(() => {
        expect(store.getActions()).toStrictEqual(expectedActions);
      });
  });
});
