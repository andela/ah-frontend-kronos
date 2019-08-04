import reducer from '../../../reducers/comment/commentReducer';
import { articleCommentAction } from '../../../actions/actionTypes';

describe('edit reducer initial state', () => {
  const initialState = {
    comments: [],
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle success to edit comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.EDIT_COMMENT_SUCCESS,
          payload: {},
        },
      ),
    ).toEqual({
      editComments: {},
    });
  });
  it('should handle failure to edit comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.EDIT_COMMENT_FAILURE,
          payload: {},
        },
      ),
    ).toEqual({
      error: {},
    });
  });
});

describe('create reducer initial state', () => {
  const initialState = {
    comments: [],
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle success to create comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.CREATE_COMMENT_SUCCESS,
          payload: {},
        },
      ),
    ).toEqual({
      createComments: {},
    });
  });
  it('should handle failure to create comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.CREATE_COMMENT_FAILURE,
          payload: {},
        },
      ),
    ).toEqual({
      error: {},
    });
  });
  it('should handle error to create comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.CREATE_COMMENT_ERROR,
          payload: {},
        },
      ),
    ).toEqual({
      error: {},
    });
  });
});

describe('delete reducer initial state', () => {
  const initialState = {
    comments: [],
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle success to delete comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.DELETE_COMMENT_SUCCESS,
          payload: {},
        },
      ),
    ).toEqual({
      delComment: {},
    });
  });
  it('should handle failure to delete comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.DELETE_COMMENT_FAILURE,
          payload: {},
        },
      ),
    ).toEqual({
      error: {},
    });
  });
});

describe('view reducer initial state', () => {
  const initialState = {
    comments: [],
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle success to view comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.REQUEST_COMMENT_SUCCESS,
          payload: {},
        },
      ),
    ).toEqual({
      comments: {},
    });
  });
  it('should handle failure to view comment', () => {
    expect(
      reducer(
        {},
        {
          type: articleCommentAction.REQUEST_COMMENT_FAILURE,
          payload: {},
        },
      ),
    ).toEqual({
      error: {},
    });
  });
});
