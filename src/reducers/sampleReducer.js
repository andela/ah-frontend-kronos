const intialState = {};

const test = (state = intialState, action) => {
  switch (action.type) {
    case 'SAMPLE_STRING':
      return 'SUCCESS';

    default:
      return state;
  }
};
export default test;
