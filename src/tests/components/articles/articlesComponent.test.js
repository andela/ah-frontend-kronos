import React from 'react';
import { shallow } from 'enzyme';

import { Articles, mapStateToProps } from '../../../components/articles/articlesComponent';

describe('Article Component', () => {
  const props = {
    articles: [
      {
        title: 'My life',
        body: 'Life',
        slug: 'My-life',
        description: 'test description',
        author: { username: 'author' },
      },
    ],
    count: 2,
    currentPage: 1,
    next: 'http//:hello',
    previous: 'http//:great',
    url: 'http//:great',
    totalNumberOfPages: 3,
    allArticles: jest.fn(),
    componentDidMount: jest.fn(),
    handlePagination: jest.fn(),
    componentWillReceiveProps: jest.fn(),
  };
  const component = shallow(<Articles {...props} />);

  it('should match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('should match state', () => {
    const mockState = {
      articlesReducer: {
        articles: [], isFetching: true, count: 1, next: 'hello', previous: 'great',
      },
    };
    const componentProps = mapStateToProps(mockState);
    expect(componentProps).toStrictEqual({
      articles: [],
      count: 1,
      isFetching: true,
      next: 'hello',
      previous: 'great',
    });
  });
  it('componentWillRecieveProps', () => {
    const wrapper = shallow(<Articles {...props} />);
    wrapper.setProps({
      count: 2,
    });
    expect(props.count).toBe(2);
  });
  it('should handle pagination if totalNumberOfPages less the pageChange', () => {
    const wrapper = shallow(<Articles {...props} />);
    wrapper.setState({
      currentPage: 3,
    });
    wrapper.instance().handlePagination(props.url, 3);
    expect(props.totalNumberOfPages).toBe(3);
  });
  it('should handle pagination if currentPage and pageChange are less than 1', () => {
    const wrapper = shallow(<Articles {...props} />);
    wrapper.setState({
      currentPage: 1,
    });
    wrapper.instance().handlePagination(props.url, -1);
    expect(props.currentPage).toBe(1);
  });
  it('should handle pagination if currentPage and pageChange are equal to totalNumberOfPages', () => {
    const wrapper = shallow(<Articles {...props} />);
    wrapper.setState({
      currentPage: 1,
      totalNumberOfPages: 4,
    });
    wrapper.instance().handlePagination(props.url, 2);
    expect(props.currentPage).toBe(1);
  });
});
