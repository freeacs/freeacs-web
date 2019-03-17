import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PageContainer from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateProvider } from './App/shared/redux/store';

render(
  <GlobalStateProvider>
    <BrowserRouter>
      <PageContainer />
    </BrowserRouter>
  </GlobalStateProvider>,
  document.querySelector('#root')
);
