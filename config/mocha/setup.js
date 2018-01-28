process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

import jsdom from 'jsdom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import ignore from 'ignore-styles'
import {shallow, createSuite, discoverTests} from './helpers';

global.Lurka = {}
global.expect = expect;
global.shallow = shallow;
global.createSuite = createSuite;
global.discoverTests = discoverTests

expect.extend(expectJSX);
ignore(['.sass', '.scss', '.css'])

const dom = new jsdom.JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;
global.navigator = window.navigator;  // velocity-animate
global.CustomEvent = window.CustomEvent;  // custom
// global.global = {}

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});


// Suppresses logging in tests that pass
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


require.extensions['.svg'] = () => 1;
