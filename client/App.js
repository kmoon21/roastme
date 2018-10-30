import React from 'react';

import MainScreen from './components/mainScreen'

// Imports to setup Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './components/reducer';

// setup redux store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

const App = () => (
  <Provider store={store}>
    <MainScreen />
  </Provider>
)

export default App;
