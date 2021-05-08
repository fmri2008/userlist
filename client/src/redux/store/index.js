import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';

const middleWares = [thunk, logger];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
