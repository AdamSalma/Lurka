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

  it('emits TOGGLE_SETTINGS', () => {
    receive(types.TOGGLE_SETTINGS, () => {
        dispatched = true;
    });
    publishers.emitSettingsToggle();
    expect(dispatched).toBe(true);
  });
});
