/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import ViewArticleRating from '../../../components/articles/rating/ViewArticleRating';

describe('Component: ViewArticleRating', () => {
  test('MyComponent renders with default props', () => {
    const wrapper = shallow(<ViewArticleRating />);
    expect(wrapper).toMatchSnapshot();
  });
});
