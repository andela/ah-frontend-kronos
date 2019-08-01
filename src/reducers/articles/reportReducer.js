import { ArticleConstants } from '../../actions/actionTypes';

const reportReducer = (state = {
  isReportedSuccess: false,
}, action) => {
  switch (action.type) {
    case ArticleConstants.ARTICLE_REPORT_FAIL:
      return {
        ...state,
        isReportedSuccess: false,
      };
    case ArticleConstants.ARTICLE_REPORT_SUCCESS:
      return {
        ...state,
        isReportedSuccess: true,
      };
    default:
      return state;
  }
};

export default reportReducer;
