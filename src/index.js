import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import './index.css';
import App from './App';
import Callback from './components/Callback';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './stores/configureStore';
import { tryAuth } from './modules/auth';


const store = configureStore();
const history = createHistory()

injectTapEventPlugin();

store.dispatch(tryAuth());

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <BrowserRouter history={history}>
        <Route path="/" component={App}/>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
