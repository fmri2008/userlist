import {
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from '../action-creators/types';

const initState = { isSaving: false, data: null, error: null };

const createUser = (state = initState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case CREATE_USER_START:
      return {
        ...state,
        isSaving: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isSaving: false,
        data: data,
        error: null,
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        isSaving: false,
        data: null,
        error: error,
      };
    default:
      return state;
  }
};

export default createUser;
