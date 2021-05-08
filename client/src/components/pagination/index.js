import './index.css';
import React from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../redux/action-creators/users';
import {
  setPerPage,
  setCurrPage,
} from '../../redux/action-creators/search-sort-page';

const Pagination = ({
  searchSortPage: { searchTerm, sortField, sortDirection, perPage, currPage },
  users: { numPages },
  getUsers,
  setPerPage,
  setCurrPage,
}) => {
  const onClickPageNum = (pageNum) => {
    setCurrPage(pageNum);
    getUsers(searchTerm, sortField, sortDirection, perPage, pageNum);
  };

  const onSelectPageNum = (e) => {
    const { value } = e.target;
    onClickPageNum(Number(value));
  };

  const onChangePerPage = (e) => {
    const { value } = e.target;
    setPerPage(Number(value));
    setCurrPage(1); // reset to the first page
    getUsers(searchTerm, sortField, sortDirection, Number(value), 1);
  };

  const pageNums = [];
  const allPageNums = [];
  let minIndex = Math.max(1, currPage - 2);
  let maxIndex = Math.min(numPages, currPage + 2);
  if (currPage - 3 < 0) {
    minIndex = 1;
    maxIndex = Math.min(numPages, 5);
  }
  if (currPage + 3 > numPages) {
    minIndex = Math.max(1, numPages - 4);
    maxIndex = numPages;
  }
  for (let i = minIndex; i <= maxIndex; i++) {
    pageNums.push(i);
  }
  for (let i = 1; i <= numPages; i++) {
    allPageNums.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <div className="perpage">
        <label htmlFor="perPage">Records Per Page&nbsp;&nbsp;</label>
        <select value={perPage} onChange={onChangePerPage}>
          <option value="10" default>
            10
          </option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="pagination">
        {currPage === 1 ? (
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        ) : (
          <div className="arrow" onClick={() => onClickPageNum(1)}>
            &#8606;&nbsp;
          </div>
        )}
        {currPage === 1 ? (
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        ) : (
          <div className="arrow" onClick={() => onClickPageNum(currPage - 1)}>
            &#8592;
          </div>
        )}
        {pageNums.map((pageNum) => (
          <div
            className={pageNum === currPage ? 'currpage' : 'page'}
            key={pageNum}
            onClick={() => onClickPageNum(pageNum)}
          >
            {pageNum}
          </div>
        ))}
        {currPage === numPages ? (
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        ) : (
          <div className="arrow" onClick={() => onClickPageNum(currPage + 1)}>
            &#8594;&nbsp;
          </div>
        )}
        {currPage === numPages ? (
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        ) : (
          <div className="arrow" onClick={() => onClickPageNum(numPages)}>
            &#8608;
          </div>
        )}
      </div>
      <div className="goto-page">
        <label>Go To Page&nbsp;&nbsp;</label>
        <select onChange={onSelectPageNum} value={currPage}>
          {allPageNums.map((pageNum) => (
            <option key={pageNum} value={pageNum}>
              {pageNum}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  searchSortPage: state.searchSortPage,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: (searchTerm, sortField, sortDirection, perPage, currPage) =>
    dispatch(getUsers(searchTerm, sortField, sortDirection, perPage, currPage)),
  setPerPage: (perPage) => dispatch(setPerPage(perPage)),
  setCurrPage: (currPage) => dispatch(setCurrPage(currPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
