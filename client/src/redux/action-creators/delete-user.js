import axios from 'axios';

import { getUsers } from './users';
import {
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../action-creators/types';

const url = 'http://localhost:8888/api';

const deleteUserStart = () => ({
  type: DELETE_USER_START,
});

const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
});

const deleteUserFail = (error) => ({
  type: DELETE_USER_FAIL,
  error,
});

export const deleteUser = (
  id,
  searchTerm,
  sortField,
  sortDirection,
  perPage,
  currPage
) => async (dispatch) => {
  try {
    console.log('action creator: searchTerm = ' + searchTerm);
    dispatch(deleteUserStart());
    await axios.delete(url + '/users/' + id);
    dispatch(deleteUserSuccess());
    dispatch(getUsers(searchTerm, sortField, sortDirection, perPage, currPage));
  } catch (err) {
    dispatch(deleteUserFail());
  }
};
