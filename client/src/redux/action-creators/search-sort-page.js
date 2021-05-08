import {
  SET_SEARCH_TERM,
  SET_SORT_FIELD,
  SET_SORT_DIRECTION,
  SET_PER_PAGE,
  SET_CURR_PAGE,
} from './types';

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  searchTerm,
});

export const setSortField = (sortField) => ({
  type: SET_SORT_FIELD,
  sortField,
});

export const setSortDirection = (sortDirection) => ({
  type: SET_SORT_DIRECTION,
  sortDirection,
});

export const setPerPage = (perPage) => ({
  type: SET_PER_PAGE,
  perPage,
});

export const setCurrPage = (currPage) => ({
  type: SET_CURR_PAGE,
  currPage,
});
