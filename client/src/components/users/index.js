import './index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserRow from '../user-row';
import { getUsers } from '../../redux/action-creators/users';
import { deleteUser } from '../../redux/action-creators/delete-user';
import { debounce } from '../../utils/debounce';
import {
  setSearchTerm,
  setSortField,
  setSortDirection,
  setPerPage,
  setCurrPage,
} from '../../redux/action-creators/search-sort-page';

class Users extends Component {
  componentDidMount() {
    const {
      searchSortPage: {
        searchTerm,
        sortField,
        sortDirection,
        perPage,
        currPage,
      },
      getUsers,
    } = this.props;
    getUsers(searchTerm, sortField, sortDirection, perPage, currPage);
  }

  componentWillUnmount() {
    // new in main
  }

  onSort = (field) => {
    let direction = 1;
    const {
      searchSortPage: {
        searchTerm,
        sortField,
        sortDirection,
        perPage,
        currPage,
      },
      setSortField,
      setSortDirection,
      getUsers,
    } = this.props;
    if (sortField === field && sortDirection === 1) {
      direction = -1;
    }
    setSortField(field);
    setSortDirection(direction);
    getUsers(searchTerm, field, direction, perPage, currPage);
  };

  onDelete = (id) => {
    const {
      searchSortPage: {
        searchTerm,
        sortField,
        sortDirection,
        perPage,
        currPage,
      },
      deleteUser,
    } = this.props;
    deleteUser(id, searchTerm, sortField, sortDirection, perPage, currPage);
  };

  render() {
    const { isLoading, data, error } = this.props.users;
    const { sortField, sortDirection } = this.props.searchSortPage;

    return (
      <div>
        {/* {isLoading ? (
          <div>Loading User List...</div>
        ) : error !== null ? (
          <div>Error loading data</div>
        ) : ( */}
        <table>
          <thead>
            <tr>
              <td>Edit</td>
              <td>Delete</td>
              <td
                className="sortcolumn"
                onClick={() => this.onSort('firstName')}
              >
                First Name
                {sortField !== 'firstName' ? (
                  <span> </span>
                ) : sortDirection === 1 ? (
                  <span>&#8593;</span>
                ) : (
                  <span>&#8595;</span>
                )}
              </td>
              <td
                className="sortcolumn"
                onClick={() => this.onSort('lastName')}
              >
                Last Name
                {sortField !== 'lastName' ? (
                  <span> </span>
                ) : sortDirection === 1 ? (
                  <span>&#8593;</span>
                ) : (
                  <span>&#8595;</span>
                )}
              </td>
              <td className="sortcolumn" onClick={() => this.onSort('sex')}>
                Sex
                {sortField !== 'sex' ? (
                  <span> </span>
                ) : sortDirection === 1 ? (
                  <span>&#8593;</span>
                ) : (
                  <span>&#8595;</span>
                )}
              </td>
              <td className="sortcolumn" onClick={() => this.onSort('age')}>
                Age
                {sortField !== 'age' ? (
                  <span> </span>
                ) : sortDirection === 1 ? (
                  <span>&#8593;</span>
                ) : (
                  <span>&#8595;</span>
                )}
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <UserRow user={user} onDelete={this.onDelete} key={user._id} />
            ))}
          </tbody>
        </table>
        {/* )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  createdUserId: state.createUser?.data?._id,
  updatedUserId: state.updateUser?.data?._id,
  searchSortPage: state.searchSortPage,
});

const debouncedHandler = (dispatch) =>
  debounce((searchTerm, sortField, sortDirection, perPage, currPage) => {
    dispatch(getUsers(searchTerm, sortField, sortDirection, perPage, currPage));
  }, 500);

const mapDispatchToProps = (dispatch) => ({
  getUsers: (searchTerm, sortField, sortDirection, perPage, currPage) =>
    dispatch(getUsers(searchTerm, sortField, sortDirection, perPage, currPage)),
  getUsersDebounced: debouncedHandler(dispatch),
  deleteUser: (id, searchTerm, sortField, sortDirection, perPage, currPage) =>
    dispatch(
      deleteUser(id, searchTerm, sortField, sortDirection, perPage, currPage)
    ),
  setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm)),
  setSortField: (sortField) => dispatch(setSortField(sortField)),
  setSortDirection: (sortDirection) =>
    dispatch(setSortDirection(sortDirection)),
  setPerPage: (perPage) => dispatch(setPerPage(perPage)),
  setCurrPage: (currPage) => dispatch(setCurrPage(currPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
