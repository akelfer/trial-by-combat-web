import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

const store = createStore(reducer)

ReactDOM.render((
  <Provider store={store}>
    <ActionCableProvider url={API_WS_ROOT}>
      <App />
    </ActionCableProvider>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();