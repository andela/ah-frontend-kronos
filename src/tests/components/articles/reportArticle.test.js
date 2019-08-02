/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import ReportArticle from '../../../components/articles/report/reportArticle';


describe('<ReportArticle />', () => {
  it('should match snapshot when loading', () => {
    const props = {
      showLoader: true,
      handleFormSubmission: jest.fn(),
      closeTheReportForm: jest.fn(),
      onInputChange: jest.fn(),

    };
    const wrapper = shallow(<ReportArticle {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when not loading', () => {
    const props = {
      showLoader: false,
      handleFormSubmission: jest.fn(),
      closeTheReportForm: jest.fn(),
      onInputChange: jest.fn(),

    };
    const wrapper = shallow(<ReportArticle {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
