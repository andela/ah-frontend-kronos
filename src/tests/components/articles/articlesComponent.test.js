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
    fetchArticles: jest.fn(),
  };
  const component = shallow(<Articles {...props} />);

  it('should match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('should match state', () => {
    const mockState = { articlesReducer: { articles: [], isFetching: true } };
    const componentProps = mapStateToProps(mockState);
    expect(componentProps).toStrictEqual({ articles: [], isFetching: true });
  });
});
