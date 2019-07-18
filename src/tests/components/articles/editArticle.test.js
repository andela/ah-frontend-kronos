import React from 'react';
import { shallow } from 'enzyme';
import { EditArticle, mapStateToProps, mapDispatchToProps } from '../../../components/articles/EditArticle';

function renderEditArticleForm(args) {
  const defaultProps = {
    actions: { updateArticle: jest.fn() },
    article: {},
    location: {
      state: {
        articleData: {},
      },
    },
  };
  const props = { ...defaultProps, ...args };
  return shallow(<EditArticle {...props} />);
}

describe('create article page', () => {
  const wrapper = renderEditArticleForm();
  const wrapperInst = wrapper.instance();


  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle onChange event', () => {
    wrapper.setState({
      target: {
        name: 'title',
        value: 'new title',
      },
      preventDefault: jest.fn(),
    });
    const wrapperInstance = wrapper.instance();
    const event = {
      target: {
        name: 'title',
        value: 'new title 2',
      },
    };
    jest.spyOn(wrapperInstance, 'handleChange');
    wrapperInstance.handleChange(event);

    expect(wrapperInstance.handleChange).toBeCalled();
  });

  it('should handle submit and clear form after', () => {
    wrapper.setState({
      title: 'article title',
      body: 'article body',
      description: 'article description',
      image: 'https://image.com',
    });

    expect(wrapperInst.state.title).toBe('article title');
    expect(wrapperInst.state.body).toBe('article body');
    expect(wrapperInst.state.description).toBe('article description');
    expect(wrapperInst.state.image).toBe('https://image.com');

    const event = {
      target: {
        type: 'submit',
      },
      preventDefault: jest.fn(),
    };
    wrapperInst.handleSubmit(event);
    expect(wrapperInst.props.actions.updateArticle).toBeCalled();
    expect(wrapperInst.state.title).toBe('');
    expect(wrapperInst.state.body).toBe('');
    expect(wrapperInst.state.description).toBe('');
    expect(wrapperInst.state.image).toBe('');
  });

  it('should map tostate to props', () => {
    const mockedState = {
      article: {
        saving: true,
      },
    };
    const state = mapStateToProps(mockedState);
    expect(state.article.saving).toBe(true);
  });

  it('should map dispatch to the articleSuccess action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).actions.ArticleSuccess();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SAVE_ARTICLE_SUCCESS' });
  });
});
