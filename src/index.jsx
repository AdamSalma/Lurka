import 'babel-polyfill';
import 'velocity-animate';
import 'nanoscroller';

import './sass/base.scss';
import './events/setup';
import './utils/polyfills';
import '-/config/client.settings';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App';

ReactDOM.render(<App />, document.querySelector('#App'));
