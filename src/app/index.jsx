import 'babel-polyfill';
import 'velocity-animate';
import 'nanoscroller';

import './sass/base';
import './events/setup';
import './utils/polyfills';  // TODO: not needed. Remove
import './utils/logger';
import 'config/app.config';  // TODO: Replace window reference with import
import './containers/App/ThemeService';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.querySelector('#App'));
