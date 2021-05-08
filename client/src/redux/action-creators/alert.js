import { SET_ALERT, REMOVE_ALERT } from '../action-creators/types';

const setAlert = (msg) => ({
  type: SET_ALERT,
  msg,
});

const removeAlert = () => ({
  type: REMOVE_ALERT,
});

export const showAlert = (msg, timeout = 2000) => (dispatch) => {
  dispatch(setAlert(msg));
  setTimeout(() => dispatch(removeAlert()), timeout);
};
