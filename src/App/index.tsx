import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from './screens/About';
import Search from './screens/Search';
import './index.css';
import { Header } from './components/Header';
import { Suspense } from 'react';

function PageContainer() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="container-fluid">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/about-us" component={About} />
            <Redirect from="/" to="/search" />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default PageContainer;
