import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from './containers/app'
import 'bootstrap/dist/css/bootstrap.min.css';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#root')
);
