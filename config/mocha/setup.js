import jsdom from 'jsdom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createSuite, discoverTests} from './helpers';
import { configure, shallow, mount, render } from 'enzyme';
import ReactTestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-15';


process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

expect.extend(expectJSX);
configure({ adapter: new Adapter() });

/**
 * Setup testing utils
 */
global.Lurka = {}
global.expect = expect;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.createSuite = createSuite;


/**
 * Setup stubs
 */
const dom = new jsdom.JSDOM('<html><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;
global.navigator = window.navigator;  // velocity-animate
global.CustomEvent = window.CustomEvent;  // custom

global.$ = require('jquery');
require('nanoscroller');
require('velocity-animate');


/**
 * Prevent mocha tests from breaking when trying to require styles/svg
 */
function noop() {
    return {};
};

require.extensions['.svg'] = noop;
require.extensions['.png'] = noop;
require.extensions['.sass'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.css'] = noop;
console.group = console.groupEnd = () => undefined;


/**
 * Suppresses logging in tests that pass
 */
var util = require('util');
var log = require('fs').createWriteStream('stdout.log');

console.log = console.info = function(t) {
  var out;
  if (t && ~t.indexOf('%')) {
    out = util.format.apply(util, arguments);
    process.stdout.write(out + '\n');
    return;
  } else {
    out = Array.prototype.join.call(arguments, ' ');
  }
  out && log.write(out + '\n');
};


/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on('unhandledRejection', err => {
  throw err;
});
