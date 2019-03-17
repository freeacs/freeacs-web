import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './index.css';
import { Header } from './components/Header';
import { lazy, Suspense } from 'react';

const SearchScreen = lazy(() => import('./screens/Search'));
const AboutScreen = lazy(() => import('./screens/About'));

function PageContainer() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="container-fluid">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/search" component={SearchScreen} />
            <Route path="/about-us" component={AboutScreen} />
            <Redirect from="/" to="/search" />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default PageContainer;
