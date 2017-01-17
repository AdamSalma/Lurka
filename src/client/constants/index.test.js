import * as consts from '.';

describe('Constants', () => {
  it('contains USER_SAVED_POST', () => {
    expect(consts.USER_SAVED_POST).toEqual('USER_SAVED_POST');
  });

  it('contains USER_SAVED_MEDIA', () => {
    expect(consts.USER_SAVED_MEDIA).toEqual('USER_SAVED_MEDIA');
  });

  it('contains USER_SAVED_BOARD', () => {
    expect(consts.USER_SAVED_BOARD).toEqual('USER_SAVED_BOARD');
  });

  it('contains USER_SAVED_THREAD', () => {
    expect(consts.USER_SAVED_THREAD).toEqual('USER_SAVED_THREAD');
  });

  it('contains USER_LOADED_ARCHIVE', () => {
    expect(consts.USER_LOADED_ARCHIVE).toEqual('USER_LOADED_ARCHIVE');
  });

  it('contains SETTINGS_LOADED', () => {
    expect(consts.SETTINGS_LOADED).toEqual('SETTINGS_LOADED');
  });

  it('contains SETTINGS_SAVED', () => {
    expect(consts.SETTINGS_SAVED).toEqual('SETTINGS_SAVED');
  });

  it('contains SETTING_CHANGED', () => {
    expect(consts.SETTING_CHANGED).toEqual('SETTING_CHANGED');
  });

  it('contains APP_INIT', () => {
    expect(consts.APP_INIT).toEqual('APP_INIT');
  });

  it('contains BOARD_REQUESTED', () => {
    expect(consts.BOARD_REQUESTED).toEqual('BOARD_REQUESTED');
  });

  it('contains BOARD_LOADED', () => {
    expect(consts.BOARD_LOADED).toEqual('BOARD_LOADED');
  });

  it('contains BOARD_DESTROYED', () => {
    expect(consts.BOARD_DESTROYED).toEqual('BOARD_DESTROYED');
  });

  it('contains BOARD_INVALIDATED', () => {
    expect(consts.BOARD_INVALIDATED).toEqual('BOARD_INVALIDATED');
  });

  it('contains BOARD_SCROLLED_TO_BOTTOM', () => {
    expect(consts.BOARD_SCROLLED_TO_BOTTOM).toEqual('BOARD_SCROLLED_TO_BOTTOM');
  });

  it('contains BOARD_LIST_REQUESTED', () => {
    expect(consts.BOARD_LIST_REQUESTED).toEqual('BOARD_LIST_REQUESTED');
  });

  it('contains BOARD_LIST_LOADED', () => {
    expect(consts.BOARD_LIST_LOADED).toEqual('BOARD_LIST_LOADED');
  });

  it('contains BOARD_LIST_INVALIDATED', () => {
    expect(consts.BOARD_LIST_INVALIDATED).toEqual('BOARD_LIST_INVALIDATED');
  });

  it('contains THREAD_REQUESTED', () => {
    expect(consts.THREAD_REQUESTED).toEqual('THREAD_REQUESTED');
  });

  it('contains THREAD_LOADED', () => {
    expect(consts.THREAD_LOADED).toEqual('THREAD_LOADED');
  });

  it('contains THREAD_DESTROYED', () => {
    expect(consts.THREAD_DESTROYED).toEqual('THREAD_DESTROYED');
  });

  it('contains THREAD_SCROLLED_BOTTOM', () => {
    expect(consts.THREAD_SCROLLED_BOTTOM).toEqual('THREAD_SCROLLED_BOTTOM');
  });

  it('contains BOARD_CHANGE', () => {
    expect(consts.BOARD_CHANGE).toEqual('BOARD_CHANGE');
  });

  it('contains THREAD_CHANGE', () => {
    expect(consts.THREAD_CHANGE).toEqual('THREAD_CHANGE');
  });

  it('contains PROVIDER_CHANGE', () => {
    expect(consts.PROVIDER_CHANGE).toEqual('PROVIDER_CHANGE');
  });

  it('contains ADD_FILTER', () => {
    expect(consts.ADD_FILTER).toEqual('ADD_FILTER');
  });

  it('contains REMOVE_FILTER', () => {
    expect(consts.REMOVE_FILTER).toEqual('REMOVE_FILTER');
  });

  it('contains SEARCH_THREAD', () => {
    expect(consts.SEARCH_THREAD).toEqual('SEARCH_THREAD');
  });

  it('contains ALERT_MESSAGE', () => {
    expect(consts.ALERT_MESSAGE).toEqual('ALERT_MESSAGE');
  });

  it('contains PAGE_SCROLL_STARTED', () => {
    expect(consts.PAGE_SCROLL_STARTED).toEqual('PAGE_SCROLL_STARTED');
  });

  it('contains PAGE_SCROLL_ENDED', () => {
    expect(consts.PAGE_SCROLL_ENDED).toEqual('PAGE_SCROLL_ENDED');
  });

  it('contains HEADER_TOGGLED', () => {
    expect(consts.HEADER_TOGGLED).toEqual('HEADER_TOGGLED');
  });

  it('contains BOARD_LIST_ADD_FAVOURITE', () => {
    expect(consts.BOARD_LIST_ADD_FAVOURITE).toEqual('BOARD_LIST_ADD_FAVOURITE');
  });

  it('contains BOARD_LIST_REMOVE_FAVOURITE', () => {
    expect(consts.BOARD_LIST_REMOVE_FAVOURITE).toEqual('BOARD_LIST_REMOVE_FAVOURITE');
  });
  
  it('contains BOARD_SEARCHED', () => {
    expect(consts.BOARD_SEARCHED).toEqual('BOARD_SEARCHED');
  });
  
  it('contains THREAD_INVALIDATED', () => {
    expect(consts.THREAD_INVALIDATED).toEqual('THREAD_INVALIDATED');
  });
  
  it('contains BOARD_SAVED_TO_HISTORY', () => {
    expect(consts.BOARD_SAVED_TO_HISTORY).toEqual('BOARD_SAVED_TO_HISTORY');
  });
  
  it('contains BOARD_LOADED_FROM_HISTORY', () => {
    expect(consts.BOARD_LOADED_FROM_HISTORY).toEqual('BOARD_LOADED_FROM_HISTORY');
  });
  
  it('contains THREAD_SAVED_TO_HISTORY', () => {
    expect(consts.THREAD_SAVED_TO_HISTORY).toEqual('THREAD_SAVED_TO_HISTORY');
  });
  
  it('contains THREAD_LOADED_FROM_HISTORY', () => {
    expect(consts.THREAD_LOADED_FROM_HISTORY).toEqual('THREAD_LOADED_FROM_HISTORY');
  });
  
  it('contains NAVBAR_TOGGLED', () => {
    expect(consts.NAVBAR_TOGGLED).toEqual('NAVBAR_TOGGLED');
  });

});
