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
    deleteArticle: jest.fn(),
    likingArticle: jest.fn(),
    isFetching: false,
  };
  const component = shallow(<Article {...singleArticleProps} />);

  it('should match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('should return article', () => {
    const mockState = { singleArticleReducer: { article: testArticle, isFetching: false } };
    const singleArticleProps = mapStateToProps(mockState);
    expect(singleArticleProps).toEqual({ article: testArticle, isFetching: false });
  });
  it('should display loader while fetching', () => {
    component.setProps({ isFetching: true });
    expect(component.find('Loading').exists()).toBe(true);
  });

  it('should handle delete of an article', () => {
    const wrapperInst = component.instance();
    wrapperInst.handleSubmit();
    expect(wrapperInst.props.deleteArticle).toBeCalled();
  });

  it('should handle like of an article when like button is pressed', () => {
    component.setState({
      slug: 'article-slug',
    });


    const mockedEvent = { target: { value: 'true' } };

    const wrapperInst = component.instance();
    wrapperInst.handleLikes(mockedEvent);
    expect(wrapperInst.props.likingArticle).toBeCalled();
  });

  it('should handle dislike of an article when dislike button is pressed', () => {
    component.setState({
      slug: 'article-slug',
    });
    const mockedEvent = { target: { value: 'false' } };
    const wrapperInst = component.instance();
    wrapperInst.handleLikes(mockedEvent);
    expect(wrapperInst.props.likingArticle).toBeCalled();
  });
});
