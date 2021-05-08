import './index.css';
import React from 'react';

import Alert from '../alert';
import Search from '../search';
import Users from '../users';
import Pagination from '../pagination';

const Home = (props) => {
  return (
    <div className="wrapper">
      <div className="header">
        <h2>Users</h2>
        <Alert />
      </div>
      <Search />
      <Users />
      <Pagination />
      <button
        className="new-user-btn"
        onClick={() => props.history.push('/add')}
      >
        Create New Users
      </button>
    </div>
  );
};

export default Home;
