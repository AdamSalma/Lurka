import * as types from './types';

export default createSuite('Types', () => {
  it('contains APP_READY', () => {
    expect(types.APP_READY).toEqual('APP_READY');
  });

  it('contains TOGGLE_SETTINGS', () => {
    expect(types.TOGGLE_SETTINGS).toEqual('TOGGLE_SETTINGS');
  });

  it('contains TOGGLE_CONTENT_VIEW', () => {
    expect(types.TOGGLE_CONTENT_VIEW).toEqual('TOGGLE_CONTENT_VIEW');
  });

  it('contains OPEN_MEDIA_REEL', () => {
    expect(types.OPEN_MEDIA_REEL).toEqual('OPEN_MEDIA_REEL');
  });

  it('contains THREAD_OPEN', () => {
    expect(types.THREAD_OPEN).toEqual('THREAD_OPEN');
  });

  it('contains THREAD_CLOSE', () => {
    expect(types.THREAD_CLOSE).toEqual('THREAD_CLOSE');
  });

  it('contains THREAD_MOVE', () => {
    expect(types.THREAD_MOVE).toEqual('THREAD_MOVE');
  });

  it('contains SUB_HEADER_TOGGLE', () => {
    expect(types.SUB_HEADER_TOGGLE).toEqual('SUB_HEADER_TOGGLE');
  });

  it('contains RESET_BOARD', () => {
    expect(types.RESET_BOARD).toEqual('RESET_BOARD');
  });

  it('contains MODAL_OPEN', () => {
    expect(types.MODAL_OPEN).toEqual('MODAL_OPEN');
  });

  it('contains MODAL_CLOSE', () => {
    expect(types.MODAL_CLOSE).toEqual('MODAL_CLOSE');
  });

  it('contains SHRINK_HEADER', () => {
    expect(types.SHRINK_HEADER).toEqual('SHRINK_HEADER');
  });

  it('contains EXPAND_HEADER', () => {
    expect(types.EXPAND_HEADER).toEqual('EXPAND_HEADER');
  });

  it('contains HEADER_TOGGLED', () => {
    expect(types.HEADER_TOGGLED).toEqual('HEADER_TOGGLED');
  });

  it('contains OPEN_HEADER_PANEL', () => {
    expect(types.OPEN_HEADER_PANEL).toEqual('OPEN_HEADER_PANEL');
  });

  it('contains CLOSE_HEADER_PANEL', () => {
    expect(types.CLOSE_HEADER_PANEL).toEqual('CLOSE_HEADER_PANEL');
  });

  it('contains HEADER_PANEL_OPENED', () => {
    expect(types.HEADER_PANEL_OPENED).toEqual('HEADER_PANEL_OPENED');
  });

  it('contains HEADER_PANEL_CLOSED', () => {
    expect(types.HEADER_PANEL_CLOSED).toEqual('HEADER_PANEL_CLOSED');
  });

  it('contains UPDATE_WATCH_ENTITY', () => {
    expect(types.UPDATE_WATCH_ENTITY).toEqual('UPDATE_WATCH_ENTITY');
  });

  it('contains POST_TOGGLE', () => {
    expect(types.POST_TOGGLE).toEqual('POST_TOGGLE');
  });

  it('contains THEME_CHANGE', () => {
    expect(types.THEME_CHANGE).toEqual('THEME_CHANGE');
  });

  it('contains OPEN_CONTEXT_MENU', () => {
    expect(types.OPEN_CONTEXT_MENU).toEqual('OPEN_CONTEXT_MENU');
  });

  it('contains CLOSE_CONTEXT_MENU', () => {
    expect(types.CLOSE_CONTEXT_MENU).toEqual('CLOSE_CONTEXT_MENU');
  });
})
