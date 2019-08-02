/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import RateArticle from '../../../components/articles/rating/RateArticle';

describe('Component: RateArticle', () => {
  test('MyComponent renders with default props', () => {
    const wrapper = shallow(<RateArticle />);
    expect(wrapper).toMatchSnapshot();
  });
});
