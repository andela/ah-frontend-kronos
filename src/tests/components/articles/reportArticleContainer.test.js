/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { ReportComponent } from '../../../components/articles/report/reportComponent';

describe('reportArticleContainer Component', () => {
  let wrapper;

  const storeItems = {};
  const mockStore = configureStore();
  const store = mockStore(storeItems);

  const props = {
    articleSlug: 'sprinters-hello-git-15',
    rateArticle: jest.fn(),
    updateArticle: jest.fn(),
    e: { preventDefault: jest.fn() },
    ratingsReducer: {
      isUpdatingRating: true,
    },
  };

  beforeEach(() => {
    wrapper = shallow(<ReportComponent {...props} />);
    jest.resetAllMocks();
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapperHere = shallow(<ReportComponent store={store} {...props} />);
    expect(toJson(wrapperHere)).toMatchSnapshot();
  });

  it('should set state when onchangeInput is called', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'email',
        value: 'valuer',
      },
    };
    const instance = wrapper.instance();
    instance.onInputChange(event);
    expect(instance.state.email).toBe('valuer');
  });

  it('should change state when closeTheReportForm is called', () => {
    wrapper.state().openTheReportForm = true;
    wrapper.instance().closeTheReportForm();
    expect(wrapper.state().openTheReportForm).toBe(false);
  });

  it('should change state when openReportForm is called', () => {
    wrapper.state().openTheReportForm = false;
    wrapper.instance().openReportForm();
    expect(wrapper.state().openTheReportForm).toBe(true);
  });

  it('should change state when showLoader is called with false', () => {
    wrapper.state().showLoader = false;
    wrapper.instance().showLoaderFunc(wrapper.state().showLoader);
    expect(wrapper.state().showLoader).toBe(false);
  });

  it('should change state when showLoader is called with true', () => {
    wrapper.state().showLoader = true;
    wrapper.instance().showLoaderFunc(wrapper.state().showLoader);
    expect(wrapper.state().showLoader).toBe(true);
  });

  it('should call handleFormSubmission function', async () => {
    const instance = wrapper.instance();
    instance.setState({
      articleSlug: 'sprinters-hello-git-15',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.state().showLoader = true;
    await instance.handleFormSubmission(event);
    expect(instance.state.showLoader).toBe(false);
  });
});
