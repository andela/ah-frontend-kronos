/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { RateArticleComponentContainer } from '../../../components/articles/rating/RateArticleComponentContainer';

describe('RateArticleComponentContainer Component', () => {
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
    wrapper = shallow(<RateArticleComponentContainer {...props} />);
    jest.resetAllMocks();
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapperHere = shallow(<RateArticleComponentContainer store={store} {...props} />);
    expect(toJson(wrapperHere)).toMatchSnapshot();
  });

  it('should call handleRating function', async () => {
    const instance = wrapper.instance();
    instance.setState({
      articleSlug: 'sprinters-hello-git-15',
    });
    instance.handleRating(5);
    expect(instance.state.isRating).toBe(false);
    expect(instance.state.newRating).toBe(0);

    sessionStorage.setItem('isLoggedIn', true);

    await instance.handleRating(5);
    expect(props.updateArticle).toBeCalledTimes(1);

    wrapper.setProps({
      ratingsReducer: {
        isUpdatingRating: false,
      },
    });
    await instance.handleRating(5);

    expect(props.updateArticle).toBeCalledTimes(1);
  });


  it('should change state when mouse hovered out star', () => {
    wrapper.state().isRating = true;
    wrapper.instance().handleMouseOut();
    expect(wrapper.state().isRating).toBe(false);
  });

  it('should change state when mouse hovered over star', () => {
    expect(wrapper.state().newRating).toBe(0);
    wrapper.instance().handleMouseOver(3);
    expect(wrapper.state().newRating).toBe(3);
  });
});
