import React from 'react';
import { shallow } from 'enzyme';
import { ArticleComment, mapStateToProps } from '../../../components/comment/ArticleComment';

// test that ArticleComment component
describe('<ArticleComment />', () => {
  let wrapper;
  const props = {
    comments: {
      comments: [{
        id: 1,
        comment_body: 'Programing is my style',
        created_at: '01/12/2091',
        updated_at: '2019-07-24T16:12:46.624323Z',
        author: {
          image: 'url',
          username: 'testmanuel',
          first_name: 'Dominic',
          last_name: 'Manuel',
          created_at: '2019-07-17T08:36:32.249335Z',
          bio: 'Software developer',
          following: true,
          date_of_birth: '2019-07-18',
        },
        article: 83,
        replies: [],
        comment_on_text: null,
        comment_on_start: null,
        comment_on_end: null,
        user_like_status: null,
        likes_count: null,
      }],
    },
    slug: 'test',
    createComment: jest.fn(),
    getComment: jest.fn(),
    updateComment: jest.fn(),
    removeComment: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };

  beforeAll(() => {
    wrapper = shallow(<ArticleComment {...props} />);
  });

  it('renders without fail', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('it should map state to props', () => {
    const initialState = {
      comments: { comments: {} },
    };
    const state = mapStateToProps(initialState);
    expect(state.comments).toEqual({ comments: { comments: {} } });
  });
  it('should handle change', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'commentBody',
        value: 'Programing is my style',
      },
    };
    const wrapperInst = wrapper.instance();
    wrapperInst.handleChange(event);
    wrapperInst.handleDelete(event);
    wrapperInst.handleCancelEdit();
    wrapperInst.handleValidation(event);
    wrapperInst.handleUpdate(event);
    wrapperInst.handleSubmit(event);
    const expectedData = {
      btnChange: false,
      commentBody: 'Programing is my style',
      commentId: {
        preventDefault: jest.fn(),
        target: {
          name: 'commentBody',
          value: 'Programing is my style',
        },
      },
      commentUpdate: '',
      outPutBtn: true,
      slug: undefined,
    };
    expect(JSON.stringify(
      wrapperInst.state.commentUpdate,
    )).toBe(JSON.stringify(expectedData.commentUpdate));
  });
});
