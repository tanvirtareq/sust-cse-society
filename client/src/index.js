import React from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,  compose} from 'redux';
// import { BrowserRouter } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";

import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App'


const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
, document.getElementById('root'));
