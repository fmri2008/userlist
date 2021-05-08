import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../action-creators/types';

const initState = { isUpdating: false, data: null, error: null };

const updateUser = (state = initState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case UPDATE_USER_START:
      return {
        ...state,
        isUpdating: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        data: data,
        error: null,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isUpdating: false,
        data: null,
        error: error,
      };
    default:
      return state;
  }
};

export default updateUser;
