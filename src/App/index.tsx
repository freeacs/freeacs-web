import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { lazy, Suspense } from 'react';
import Spinner from './shared/spinner';
import { GlobalStateProvider } from './state';
import SecuredRoute from './components/SecuredRoute';

const LoginScreen = lazy(() => import('./screens/Login'));
const SearchScreen = lazy(() => import('./screens/Search'));
const AboutScreen = lazy(() => import('./screens/About'));
const UnitTypeScreen = lazy(() => import('./screens/UnitType'));
const ProfileScreen = lazy(() => import('./screens/Profile'));

function PageContainer() {
  return (
    <GlobalStateProvider>
      <div className="container">
        <Header />
        <div className="container-fluid">
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/login" component={LoginScreen} />
              <SecuredRoute path="/search" component={SearchScreen} />
              <SecuredRoute path="/about-us" component={AboutScreen} />
              <SecuredRoute path="/unittype" component={UnitTypeScreen} />
              <SecuredRoute path="/profile" component={ProfileScreen} />
              <Redirect from="/" to="/search" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </GlobalStateProvider>
  );
}

export default PageContainer;
