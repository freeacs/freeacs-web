import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store  from './store'
import App from './containers/app'
import 'sanitize.css/sanitize.css'
import './index.css'

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);