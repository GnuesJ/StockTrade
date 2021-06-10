import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store.js';
import styles from './scss/application.scss';

console.log(store.getState());
render(
  // console.log(store)
  // wrap the App in the Provider Component and pass in the store
  // <App />,
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

{/* <Provider store={store}>
    <App />
  </Provider>, */}