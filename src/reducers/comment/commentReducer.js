import { articleCommentAction } from '../../actions/actionTypes';
import { initialCommentState } from '../initialState';


export default function (state = initialCommentState, action) {
  switch (action.type) {
    case articleCommentAction.REQUEST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
      };
    case articleCommentAction.REQUEST_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case articleCommentAction.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        delComment: action.payload,
      };
    case articleCommentAction.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case articleCommentAction.EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        editComments: action.payload,
      };
    case articleCommentAction.EDIT_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case articleCommentAction.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        createComments: action.payload,
      };
    case articleCommentAction.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case articleCommentAction.CREATE_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
