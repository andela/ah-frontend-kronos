import React from 'react';
import { shallow } from 'enzyme';

import { AuthorProfile } from '../../../components/profile/authorProfile';

describe('<AuthorProfile />', () => {
  let wrapper;
  const testProfile = {
    firstname: 'kronos',
    lastname: 'manuel',
    username: 'devfest',
    bio: 'Programing is my style',
    image: '',
  };
  const authorProfileProps = {
    match: {
      params: { username: testProfile.username },
    },
    authorProfile: { ...testProfile },
    fetchAuthorProfile: jest.fn(),
    followAuthorAction: jest.fn(),
    unfollowAuthorAction: jest.fn(),
    fetchFollowing: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<AuthorProfile {...authorProfileProps} />);
  });
  it('renders without fail', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
