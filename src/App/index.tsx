import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from './screens/About';
import Search from './screens/Search';
import './index.css';
import { Header } from './components/Header';

function PageContainer() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="container-fluid">
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/about-us" component={About} />
          <Redirect from="/" to="/search" />
        </Switch>
      </div>
    </div>
  );
}

export default PageContainer;
