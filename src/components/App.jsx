import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Welcome from './Welcome';

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Welcome />
      </div>
    </Provider>
  );
}
