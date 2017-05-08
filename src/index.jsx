import 'babel-polyfill';
import 'velocity-animate';

import './events/setup';
import './styles/global';
import './vendor/polyfills';
import './vendor/nanoscroller';
import '-/config/client.settings';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App';

ReactDOM.render(<App />, document.querySelector('#App'));
