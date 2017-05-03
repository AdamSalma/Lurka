import expect from 'expect';
import expectJSX from 'expect-jsx';
import {shallow} from './helpers';
import '../config/client.settings'

expect.extend(expectJSX);

global.expect = expect;
global.shallow = shallow;
