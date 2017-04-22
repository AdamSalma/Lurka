import * as types from '.';

describe('Types', () => {
  it('contains USER_SAVED_POST', () => {
    expect(types.USER_SAVED_POST).toEqual('USER_SAVED_POST');
  });

  it('contains USER_SAVED_MEDIA', () => {
    expect(types.USER_SAVED_MEDIA).toEqual('USER_SAVED_MEDIA');
  });

  it('contains USER_SAVED_BOARD', () => {
    expect(types.USER_SAVED_BOARD).toEqual('USER_SAVED_BOARD');
  });

  it('contains USER_SAVED_THREAD', () => {
    expect(types.USER_SAVED_THREAD).toEqual('USER_SAVED_THREAD');
  });

  it('contains USER_LOADED_ARCHIVE', () => {
    expect(types.USER_LOADED_ARCHIVE).toEqual('USER_LOADED_ARCHIVE');
  });

  it('contains SETTINGS_LOADED', () => {
    expect(types.SETTINGS_LOADED).toEqual('SETTINGS_LOADED');
  });

  it('contains SETTINGS_SAVED', () => {
    expect(types.SETTINGS_SAVED).toEqual('SETTINGS_SAVED');
  });

  it('contains SETTING_CHANGED', () => {
    expect(types.SETTING_CHANGED).toEqual('SETTING_CHANGED');
  });

  it('contains APP_READY', () => {
    expect(types.APP_READY).toEqual('APP_READY');
  });

  it('contains BOARD_REQUESTED', () => {
    expect(types.BOARD_REQUESTED).toEqual('BOARD_REQUESTED');
  });

  it('contains BOARD_LOADED', () => {
    expect(types.BOARD_LOADED).toEqual('BOARD_LOADED');
  });

  it('contains BOARD_DESTROYED', () => {
    expect(types.BOARD_DESTROYED).toEqual('BOARD_DESTROYED');
  });

  it('contains BOARD_INVALIDATED', () => {
    expect(types.BOARD_INVALIDATED).toEqual('BOARD_INVALIDATED');
  });

  it('contains BOARD_LIST_REQUESTED', () => {
    expect(types.BOARD_LIST_REQUESTED).toEqual('BOARD_LIST_REQUESTED');
  });

  it('contains BOARD_LIST_LOADED', () => {
    expect(types.BOARD_LIST_LOADED).toEqual('BOARD_LIST_LOADED');
  });

  it('contains BOARD_LIST_INVALIDATED', () => {
    expect(types.BOARD_LIST_INVALIDATED).toEqual('BOARD_LIST_INVALIDATED');
  });

  it('contains THREAD_REQUESTED', () => {
    expect(types.THREAD_REQUESTED).toEqual('THREAD_REQUESTED');
  });

  it('contains THREAD_LOADED', () => {
    expect(types.THREAD_LOADED).toEqual('THREAD_LOADED');
  });

  it('contains THREAD_DESTROYED', () => {
    expect(types.THREAD_DESTROYED).toEqual('THREAD_DESTROYED');
  });

  it('contains THREAD_SCROLLED_BOTTOM', () => {
    expect(types.THREAD_SCROLLED_BOTTOM).toEqual('THREAD_SCROLLED_BOTTOM');
  });

  it('contains BOARD_CHANGE', () => {
    expect(types.BOARD_CHANGE).toEqual('BOARD_CHANGE');
  });

  it('contains THREAD_CHANGE', () => {
    expect(types.THREAD_CHANGE).toEqual('THREAD_CHANGE');
  });

  it('contains PROVIDER_CHANGE', () => {
    expect(types.PROVIDER_CHANGE).toEqual('PROVIDER_CHANGE');
  });

  it('contains ALERT_MESSAGE', () => {
    expect(types.ALERT_MESSAGE).toEqual('ALERT_MESSAGE');
  });

  it('contains PAGE_SCROLL_STARTED', () => {
    expect(types.PAGE_SCROLL_STARTED).toEqual('PAGE_SCROLL_STARTED');
  });

  it('contains PAGE_SCROLL_ENDED', () => {
    expect(types.PAGE_SCROLL_ENDED).toEqual('PAGE_SCROLL_ENDED');
  });

  it('contains HEADER_TOGGLED', () => {
    expect(types.HEADER_TOGGLED).toEqual('HEADER_TOGGLED');
  });

  it('contains HEADER_PANEL_CLOSED', () => {
    expect(types.HEADER_PANEL_CLOSED).toEqual('HEADER_PANEL_CLOSED');
  });

  it('contains HEADER_PANEL_OPENED', () => {
    expect(types.HEADER_PANEL_OPENED).toEqual('HEADER_PANEL_OPENED');
  });

  it('contains BOARD_LIST_ADD_FAVOURITE', () => {
    expect(types.BOARD_LIST_ADD_FAVOURITE).toEqual('BOARD_LIST_ADD_FAVOURITE');
  });

  it('contains BOARD_LIST_REMOVE_FAVOURITE', () => {
    expect(types.BOARD_LIST_REMOVE_FAVOURITE).toEqual('BOARD_LIST_REMOVE_FAVOURITE');
  });

  it('contains THREAD_INVALIDATED', () => {
    expect(types.THREAD_INVALIDATED).toEqual('THREAD_INVALIDATED');
  });

  it('contains BOARD_CACHE_SAVED', () => {
    expect(types.BOARD_CACHE_SAVED).toEqual('BOARD_CACHE_SAVED');
  });

  it('contains BOARD_CACHE_LOADED', () => {
    expect(types.BOARD_CACHE_LOADED).toEqual('BOARD_CACHE_LOADED');
  });

  it('contains BOARD_CACHE_CLEARED', () => {
    expect(types.BOARD_CACHE_CLEARED).toEqual('BOARD_CACHE_CLEARED');
  });

  it('contains THREAD_CACHE_SAVED', () => {
    expect(types.THREAD_CACHE_SAVED).toEqual('THREAD_CACHE_SAVED');
  });

  it('contains THREAD_CACHE_LOADED', () => {
    expect(types.THREAD_CACHE_LOADED).toEqual('THREAD_CACHE_LOADED');
  });

  it('contains THREAD_CACHE_CLEARED', () => {
    expect(types.THREAD_CACHE_CLEARED).toEqual('THREAD_CACHE_CLEARED');
  });

  it('contains THREAD_MONITOR_ADDED', () => {
    expect(types.THREAD_MONITOR_ADDED).toEqual('THREAD_MONITOR_ADDED');
  });

  it('contains THREAD_MONITOR_DELETED', () => {
    expect(types.THREAD_MONITOR_DELETED).toEqual('THREAD_MONITOR_DELETED');
  });

  it('contains THREAD_MONITOR_UPDATED', () => {
    expect(types.THREAD_MONITOR_UPDATED).toEqual('THREAD_MONITOR_UPDATED');
  });

  it('contains NAVBAR_TOGGLED', () => {
    expect(types.NAVBAR_TOGGLED).toEqual('NAVBAR_TOGGLED');
  });

  it('contains DRAWER_TOGGLED', () => {
    expect(types.DRAWER_TOGGLED).toEqual('DRAWER_TOGGLED');
  });

});
