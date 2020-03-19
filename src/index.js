import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

/* Redux Reducer */
import UserReducer from './reducers/UserReducer';

/* Routes */
import Routes from './routes';

/* Styles */
import './assets/scss/index.scss';
/* APP Componente */
import App from './App';

const reducers = combineReducers({
  userData: UserReducer,
  isLogged: () => ({logged: false})
});

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Routes />
  </Provider>
, document.getElementById('root'));
