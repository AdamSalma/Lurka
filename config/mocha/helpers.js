import React from 'react';

import path from 'path';
import paths from 'config/paths';
import glob from 'glob';
import ReactTestRenderer from 'react-test-renderer';



export const shallow = (Component) => {
  const renderer = ReactTestRenderer.create(Component);

  renderer.render(component);

  return {
    output: renderer.getRenderOutput(),
    renderer
  };
};


export const createSuite = (name, testRunner) => {
    return describe.bind(null, name, testRunner);
}

export const jsdom = require('mocha-jsdom');

export const discoverTests = (cwd, ...pattern) => {
    if (Object.prototype.toString.call(pattern) === '[object Array]') {
        pattern = `{${pattern.join(',')}}`;
    }

    var files = glob.sync(pattern, {cwd: cwd})
    throw new Error(files);
}

export const injectMockStore = (Component) => {
  return 
}
