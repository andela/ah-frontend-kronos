import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

// test to check if the App component matches the snapshot
describe('App Component', () => {
  it('matches the snapshot', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
