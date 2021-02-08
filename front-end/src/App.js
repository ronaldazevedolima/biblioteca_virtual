import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Authors,
  About,
  Collections,
  Login,
  Books,
} from './pages/Index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/books" component={Books} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/authors" component={Authors} />
        <Route exact path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
