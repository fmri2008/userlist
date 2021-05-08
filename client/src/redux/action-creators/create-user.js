import axios from 'axios';

import {
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from './types';

const url = 'http://localhost:8888/api';

const createUserStart = () => ({
  type: CREATE_USER_START,
});

const createUserSuccess = (data) => ({
  type: CREATE_USER_SUCCESS,
  data,
});

const createUserFail = (error) => ({
  type: CREATE_USER_FAIL,
  error,
});

export const createUser = (
  firstName,
  lastName,
  sex,
  age,
  password,
  history
) => async (dispatch) => {
  try {
    dispatch(createUserStart);
    const data = {
      firstName,
      lastName,
      sex,
      age,
      password,
    };
    const res = await axios.post(url + '/users', data);
    dispatch(createUserSuccess(res.data));
    history.push('/');
  } catch (err) {
    dispatch(createUserFail(err));
  }
};
