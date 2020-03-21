import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';

/* Routes */
import Routes from './routes';

/* Styles */
import './assets/scss/index.scss';
import Popup from './templates/Popup';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
      <Popup />
    </PersistGate>
  </Provider>
, document.getElementById('root'));
