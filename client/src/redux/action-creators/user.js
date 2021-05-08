import axios from 'axios';

import {
  REQUEST_USER_START,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAIL,
} from './types';

const url = 'http://localhost:8888/api';

const requestUserStart = () => ({
  type: REQUEST_USER_START,
});

const requestUserSuccess = (data) => ({
  type: REQUEST_USER_SUCCESS,
  data,
});

const requestUserFail = (error) => ({
  type: REQUEST_USER_FAIL,
  error,
});

// export const getUser = (id) => async (dispatch) => {
//   try {
//     dispatch(requestUserStart());
//     const res = await axios.get(url + '/users/' + id);
//     dispatch(requestUserSuccess(res.data));
//   } catch(err) {
//     dispatch(requestUserFail(err));
//   }
// };
export const getUser = (id) => (dispatch) => {
  dispatch(requestUserStart);
  axios
    .get(url + '/users/' + id)
    .then((res) => {
      dispatch(requestUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(requestUserFail(err));
    });
};
