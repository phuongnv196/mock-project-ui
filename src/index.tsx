import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store'
import Router from './components/organisms/Router';
import './index.scss';
import './assets/font-awesome/css/all.css';
import 'antd/dist/antd.css';
import * as dotenv from 'dotenv';
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../../.env") });
ReactDOM.render(
    <Provider store={store}>
        <Router></Router>
    </Provider>,
    document.getElementById('root')
);
reportWebVitals();
