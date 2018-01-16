import React from 'react';
import ReactDOM from 'react-dom';
import Board from '..';

describe("Integration", () => {
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
