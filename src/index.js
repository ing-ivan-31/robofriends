import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './Containers/App'
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { searchRobots } from './reducers';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(searchRobots, applyMiddleware(logger));



ReactDOM.render(<Provider store={store}>
                <App /> 
                </Provider> , document.getElementById('root'));
registerServiceWorker();