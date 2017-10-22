import 'babel-polyfill';
import 'velocity-animate';
import 'nanoscroller';

import 'config/globals';
import './themes';
import './sass/base';
import './events/setup';
import './utils/logger';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

render(App);

// Re-renders the application on src change
if (module.hot) {
  module.hot.accept(() => {
    const NextApp = require('./components/App').default;
    render(NextApp);
  });
}

// Hoisted
function render(App) {
    ReactDOM.render(<App />, document.querySelector('#App'));
}
