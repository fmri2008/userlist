import { SET_ALERT, REMOVE_ALERT } from '../action-creators/types';

const alert = (state = null, action) => {
  const { type, msg } = action;

  switch (type) {
    case SET_ALERT:
      return msg;
    case REMOVE_ALERT:
      return null;
    default:
      return state;
  }
};

export default alert;
