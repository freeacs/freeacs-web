import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { lazy, Suspense } from 'react';
import Spinner from './shared/spinner';
import { GlobalStateProvider, useGlobalState } from './state';
import SecuredRoute from './components/SecuredRoute';

const LoginScreen = lazy(() => import('./screens/Login'));
const SearchScreen = lazy(() => import('./screens/Search'));
const AboutScreen = lazy(() => import('./screens/About'));
const UnitTypeScreen = lazy(() => import('./screens/UnitType'));
const ProfileScreen = lazy(() => import('./screens/Profile'));
const UnitCreateScreen = lazy(() => import('./screens/Unit'));

function PageContainer() {
  return (
    <GlobalStateProvider>
      <div className="container">
        <Header />
        <div className="container-fluid">
          <AppRouter />
        </div>
      </div>
    </GlobalStateProvider>
  );
}

function AppRouter() {
  const [{ selectedUnitType }] = useGlobalState('context');
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <SecuredRoute path="/search" component={SearchScreen} />
        <SecuredRoute path="/about-us" component={AboutScreen} />
        <SecuredRoute path="/unittype" component={UnitTypeScreen} />
        {selectedUnitType && (
          <>
            <SecuredRoute path="/profile" component={ProfileScreen} />
            <SecuredRoute path="/unit" component={UnitCreateScreen} />
          </>
        )}
        <Redirect from="/" to="/search" />
      </Switch>
    </Suspense>
  );
}

export default PageContainer;
