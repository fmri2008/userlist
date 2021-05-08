import axios from 'axios';

import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../action-creators/types';

const url = 'http://localhost:8888/api';

const updateUserStart = () => ({
  type: UPDATE_USER_START,
});

const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  data,
});

const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  error,
});

export const updateUser = (
  id,
  firstName,
  lastName,
  sex,
  age,
  password,
  history
) => async (dispatch) => {
  try {
    dispatch(updateUserStart);
    const data = {
      firstName,
      lastName,
      sex,
      age,
      password,
    };
    const res = await axios.put(`${url}/users/${id}`, data);
    dispatch(updateUserSuccess(res.data));
    history.push('/');
  } catch (err) {
    dispatch(updateUserFail(err));
  }
};
