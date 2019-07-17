import React from 'react';
import { shallow } from 'enzyme';

import { Article, mapStateToProps } from '../../../components/articles/articleComponent';

describe('Article Component', () => {
  const testArticle = {
    title: 'My life',
    body: 'Life',
    slug: 'My-life',
    description: 'test description',
    author: { username: 'author' },
  };

  const singleArticleProps = {
    match: {
      params: { slug: testArticle.slug },
    },
    article: { ...testArticle },
    getSingleArticle: jest.fn(),
    isFetching: false,
  };
  const component = shallow(<Article {...singleArticleProps} />);

  it('should match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('should return article', () => {
    const mockState = { singleArticleReducer: { article: testArticle, isFetching: false } };
    const singleArticleProps = mapStateToProps(mockState);
    expect(singleArticleProps).toStrictEqual({ article: testArticle, isFetching: false });
  });
  it('should display loader while fetching', () => {
    component.setProps({ isFetching: true });
    expect(component.find('Loading').exists()).toBe(true);
  });
});
