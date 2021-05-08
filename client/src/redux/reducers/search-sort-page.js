import {
  SET_SEARCH_TERM,
  SET_SORT_FIELD,
  SET_SORT_DIRECTION,
  SET_PER_PAGE,
  SET_CURR_PAGE,
} from '../action-creators/types';

// sortDirection: 0 - not sorted; 1 - ascending; -1 - descending
const initState = {
  searchTerm: '',
  sortField: '',
  sortDirection: 0,
  perPage: 20,
  currPage: 1,
};

const searchSortPage = (state = initState, action) => {
  const {
    type,
    searchTerm,
    sortField,
    sortDirection,
    perPage,
    currPage,
  } = action;

  switch (type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: searchTerm,
      };
    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: sortField,
      };
    case SET_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: sortDirection,
      };
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: perPage,
      };
    case SET_CURR_PAGE:
      return {
        ...state,
        currPage: currPage,
      };
    default:
      return state;
  }
};

export default searchSortPage;
