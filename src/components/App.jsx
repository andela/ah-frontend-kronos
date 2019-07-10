import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Routes from '../Routes';

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes />
      </div>
    </Provider>
  );
}
