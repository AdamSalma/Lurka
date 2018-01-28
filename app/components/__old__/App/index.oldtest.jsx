import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';

describe("App", () => {
  before(() => {
    global.$ = require('jquery');
    require('nanoscroller');
    require('velocity-animate');
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('shallow render test', () => {
    shallow(<App />);
  });
})
