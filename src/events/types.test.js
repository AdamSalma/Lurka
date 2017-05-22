import * as types from './types';

describe('Event Types', () => {
  it('contains TOGGLE_DRAWER', () => {
    expect(types.TOGGLE_DRAWER).toEqual('TOGGLE_DRAWER');
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

  it('contains SUB_HEADER_TOGGLE', () => {
    expect(types.SUB_HEADER_TOGGLE).toEqual('SUB_HEADER_TOGGLE');
  });
})
