import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsDetailsPage from './pages/CommentPage';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/news/:id" component={NewsDetailsPage} />
    </Switch>
  </Router>
);

export default Routes;
