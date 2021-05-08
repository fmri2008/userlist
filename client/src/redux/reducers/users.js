import {
  REQUEST_USERS_START,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAIL,
} from '../action-creators/types';

const initState = { isLoading: false, numPages: 0, data: [], error: null };

const users = (state = initState, action) => {
  const { type, users, numPages, error } = action;

  switch (type) {
    case REQUEST_USERS_START:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        numPages: numPages,
        data: users,
        error: null,
      };
    case REQUEST_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        numPages: 0,
        data: [],
        error: error,
      };
    default:
      return state;
  }
};

export default users;
