import 'babel-polyfill';
import 'velocity-animate'
import './styles/global';
import './vendor/polyfills';
import './vendor/nanoscroller';
import './config/globalSettings';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App';

ReactDOM.render(<App />, document.querySelector('#App'));
