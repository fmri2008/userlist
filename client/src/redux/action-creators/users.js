import axios from 'axios';

import {
  REQUEST_USERS_START,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAIL,
} from './types';

const url = 'http://localhost:8888/api';

const requestUsersStart = () => ({
  type: REQUEST_USERS_START,
});

const requestUsersSuccess = (numPages, users) => ({
  type: REQUEST_USERS_SUCCESS,
  numPages,
  users,
});

const requestUsersFail = (error) => ({
  type: REQUEST_USERS_FAIL,
  error,
});

export const getUsers = (
  searchTerm,
  sortField,
  sortDirection,
  perPage,
  currPage
) => {
  return (dispatch) => {
    dispatch(requestUsersStart());
    axios
      .get(
        `${url}/users?searchterm=${searchTerm}&sortfield=${sortField}&sortdirection=${sortDirection}&perpage=${perPage}&currpage=${currPage}`
      )
      .then((res) => {
        dispatch(
          requestUsersSuccess(
            res.data.numPages,
            res.data.pagedSortedFilteredUsers
          )
        );
      })
      .catch((err) => {
        dispatch(requestUsersFail(err));
      });
  };
};
