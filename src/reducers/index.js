import { combineReducers } from 'redux';

/* Reducers */
import ModalReducer from './ModalReducer';
import UserReducer from './UserReducer';

export default combineReducers({ 
  userData: UserReducer,
  modal: ModalReducer
});