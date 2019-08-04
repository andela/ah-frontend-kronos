import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';

import Pagination from '../../components/articles/pagination';

describe('<Pagination />', () => {
  const handlePagination = () => {};
  const wrapper = shallow(<Pagination
    currentPage={1}
    totalNumberOfPages={1}
    handlePagination={handlePagination}
  />);

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
