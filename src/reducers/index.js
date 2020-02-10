import { combineReducers } from 'redux';
import users from './users';
import authUser from './authUser';
import loading from './loading';
import questions from './questions';

export default combineReducers({
  authUser,
  loading,
  users,
  questions,
})
