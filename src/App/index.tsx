import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import { lazy, Suspense } from 'react';
import Spinner from './shared/spinner';
import { GlobalStateProvider } from './state';

const SearchScreen = lazy(() => import('./screens/Search'));
const AboutScreen = lazy(() => import('./screens/About'));

function PageContainer() {
  return (
    <GlobalStateProvider>
      <div className="container-fluid">
        <Header />
        <div className="container-fluid">
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/search" component={SearchScreen} />
              <Route path="/about-us" component={AboutScreen} />
              <Redirect from="/" to="/search" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </GlobalStateProvider>
  );
}

export default PageContainer;
