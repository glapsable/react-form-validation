import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import AddEventPage from '../components/AddEventPage';
import SuccessPage from '../components/SuccessPage';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={AddEventPage} exact />
        <Route path="/success" component={SuccessPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
