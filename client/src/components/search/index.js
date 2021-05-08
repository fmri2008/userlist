import React from 'react';
import { connect } from 'react-redux';

import {
  setSearchTerm,
  setCurrPage,
} from '../../redux/action-creators/search-sort-page';
import { getUsers } from '../../redux/action-creators/users';

const Search = ({
  searchSortPage: { searchTerm, sortField, sortDirection, perPage },
  setSearchTerm,
  setCurrPage,
  getUsers,
}) => {
  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    // Changing search term also resets currPage to default = 1
    setCurrPage(1);
    getUsers(value, sortField, sortDirection, perPage, 1);
  };

  return (
    <form>
      <label htmlFor="search">Search</label>
      <input value={searchTerm} onChange={onSearchChange} />
    </form>
  );
};

const mapStateToProps = (state) => ({
  searchSortPage: state.searchSortPage,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm)),
  setCurrPage: (currPage) => dispatch(setCurrPage(currPage)),
  getUsers: (searchTerm, sortField, sortDirection, perPage, currPage) =>
    dispatch(getUsers(searchTerm, sortField, sortDirection, perPage, currPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
