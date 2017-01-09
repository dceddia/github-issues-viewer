import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';
import rootReducer from './redux/reducers';
import App from './containers/App';
import IssueListPage from './containers/IssueListPage';
import IssueDetailPage from './containers/IssueDetailPage';
import './index.css';

let store = createStore(rootReducer, applyMiddleware(thunk));

const routes = (
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={App}>
      <IndexRedirect to="/rails/rails/issues"/>
      <Route path="/:org/:repo/issues">
        <IndexRoute component={IssueListPage}/>
        <Route path=":issueId" component={IssueDetailPage}/>
      </Route>
    </Route>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root')
);
