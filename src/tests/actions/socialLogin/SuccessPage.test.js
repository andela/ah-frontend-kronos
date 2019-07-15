import React from 'react';
import { shallow } from 'enzyme';
import SuccessPage from '../../../components/social/SuccessPage';

// test to check if the App component matches the snapshot
describe('SuccessPage Component', () => {
  it('matches the snapshot', () => {
    const component = shallow(<SuccessPage />);
    expect(component).toMatchSnapshot();
  });
});
