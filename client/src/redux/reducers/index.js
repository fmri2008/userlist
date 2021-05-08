import { combineReducers } from 'redux';
import users from './users';
import createUser from './create-user';
import updateUser from './update-user';
import searchSortPage from './search-sort-page';
import alert from './alert';

const reducers = combineReducers({
  users,
  createUser,
  updateUser,
  searchSortPage,
  alert,
});

export default reducers;
