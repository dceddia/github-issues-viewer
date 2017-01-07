import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import rootReducer from './redux/reducers';
import App from './containers/App';
import IssueListPage from './containers/IssueListPage';
import IssueDetailPage from './containers/IssueDetailPage';
import './index.css';

let store = createStore(rootReducer, applyMiddleware(thunk));

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IssueListPage}/>
      <Route path="/issue/:issueId" component={IssueDetailPage}/>
    </Route>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root')
);
