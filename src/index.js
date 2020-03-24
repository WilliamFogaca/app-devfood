import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';

/* Routes */
import Routes from './routes/Routes';

/* Styles */
import './assets/scss/index.scss';
import Popup from './templates/Popup';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes />
      <Popup />
    </PersistGate>
  </Provider>
, root);
