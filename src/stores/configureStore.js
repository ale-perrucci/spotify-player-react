import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const router = routerMiddleware(browserHistory);

const createStoreWithMiddleware = applyMiddleware(router, thunk)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}