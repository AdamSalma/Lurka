import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// var x = shallow(<App />);
// var x = render(<App />).children();
// console.error(Object.keys(x));
// for (let u in x) {
//   console.error(u);
// }
// console.error(x);
// throw new Error();
describe("App", () => {
  // before(() => {
  //   global.$ = require('jquery');
  //   require('nanoscroller');
  //   require('velocity-animate');
  // });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
  });

  it('mounts without crashing', () => {
    const div = document.createElement('div');
    var wrapper = mount(<App />, {attachTo: div});
    wrapper.detach()
  });

  it('shallow render test', () => {
    shallow(<App />);
  });
});
