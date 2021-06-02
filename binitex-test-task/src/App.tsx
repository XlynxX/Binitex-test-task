import './App.css';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Component } from 'react';

// Pages
import MainPage from './pages';
import NotFoundPage from './pages/NotFoundPage';
import test from './pages/test';

class App extends Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route exact path='/404' component={NotFoundPage}/>
          <Route exact path='/Stats' component={test}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    );
  }
}

export default App;
