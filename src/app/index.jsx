import 'babel-polyfill';
import 'velocity-animate';
import 'nanoscroller';

import './sass/core';
import './events/setup';
import './utils/polyfills';
import './utils/logger';
import 'config/app.config';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.querySelector('#App'));
