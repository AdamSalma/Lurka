import {receive} from 'pub-sub-es6'
import * as types from './types';
import * as publishers from './publishers';

describe('Event Emitters', () => {
  var dispatched;

  beforeEach(() => {
    dispatched = false
  });

  it('emits APP_READY', () => {
    receive(types.APP_READY, () => {
        dispatched = true;
    });
    publishers.emitAppReady();
    expect(dispatched).toBe(true);
  });

  it('emits TOGGLE_DRAWER', () => {
    receive(types.TOGGLE_DRAWER, () => {
        dispatched = true;
    });
    publishers.emitDrawerToggle();
    expect(dispatched).toBe(true);
  });
});
