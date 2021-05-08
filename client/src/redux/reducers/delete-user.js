import {
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../action-creators/types';

const initState = { isDeleting: false, error: null };

const deleteUser = (state = initState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case DELETE_USER_START:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        error: null,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        isDeleting: false,
        error: error,
      };
    default:
      return state;
  }
};

export default deleteUser;
