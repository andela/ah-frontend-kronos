import { RegistrationConstants } from '../../actions/auth/actionTypes';
import { initialUser } from './initialState';

export default function userReducer(state = initialUser, action) {
  switch (action.type) {
    case RegistrationConstants.REGISTER_SUCCESS:
      return Object.assign(
        {}, state, action.payload, { registered: true, registering: false },
      );
    case RegistrationConstants.REGISTER_FAILURE:
      return Object.assign(
        {}, state, action.payload, { registered: false, registering: false },
      );
    case RegistrationConstants.REGISTER_REQUEST:
      return Object.assign({ registering: true });
    case 'SAMPLE_STRING':
      return 'SUCCESS';
    default:
      return state;
  }
}
