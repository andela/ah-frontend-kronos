import reportReducer from '../../../reducers/articles/reportReducer';
import { ArticleConstants } from '../../../actions/actionTypes';

const initialState = {};


describe('Article Rating Reducer', () => {
  it('tests inititial state of article rating reducer', () => {
    const newState = reportReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });


  it('tests successful executes of an articles rating', () => {
    const newState = reportReducer(initialState,
      {
        type: ArticleConstants.ARTICLE_REPORT_FAIL,
      });

    expect(newState.isReportedSuccess).toEqual(false);
  });

  it('tests successful executes of an articles rating', () => {
    const newState = reportReducer(initialState,
      {
        type: ArticleConstants.ARTICLE_REPORT_SUCCESS,
      });

    expect(newState.isReportedSuccess).toEqual(true);
  });
});
