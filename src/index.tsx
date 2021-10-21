import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store'
import Router from './components/organisms/Router';
import './index.scss';
import './assets/font-awesome/css/all.css';
import 'antd/dist/antd.css';
import DefaultLayout from "./components/templates/DefaultLayout";
import {Home} from "./components/pages";

ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
