import expect from 'expect';
import expectJSX from 'expect-jsx';
import {shallow, createSuite} from './helpers';
import '../config/client.settings'

expect.extend(expectJSX);

global.expect = expect;
global.shallow = shallow;
global.createSuite = createSuite
