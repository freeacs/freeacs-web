import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from './pages/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalStateProvider} from './state/store';

render(
    <GlobalStateProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalStateProvider>,
    document.querySelector('#root')
);
