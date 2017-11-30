import path from 'path';
import paths from 'config/paths';
import glob from 'glob';


var reactDomTestUtils = path.join(paths.app_modules, 'react-dom/test-utils')
const { createRenderer } = require(reactDomTestUtils);


export const shallow = (component) => {
  const renderer = createRenderer();

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
