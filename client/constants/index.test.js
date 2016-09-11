import {
	USER_SAVE,
	USER_LOAD,
	BOARD_REQUEST,
	BOARD_LOADED,
	BOARD_DESTROY,
  BOARD_LIST_LOADED,
  BOARD_LIST_REQUEST,
	THREAD_REQUEST,
	THREAD_LOADED,
	THREAD_DESTROY,
  THREAD_POST_LOAD
} from '.';

describe('Types', () => {
  it('contains USER_SAVE', () => {
    expect(USER_SAVE).toEqual('USER_SAVE');
  });

  it('contains USER_LOAD', () => {
    expect(USER_LOAD).toEqual('USER_LOAD');
  });

  it('contains BOARD_REQUEST', () => {
    expect(BOARD_REQUEST).toEqual('BOARD_REQUEST');
  });

  it('contains BOARD_LOADED', () => {
    expect(BOARD_LOADED).toEqual('BOARD_LOADED');
  });

  it('contains BOARD_DESTROY', () => {
    expect(BOARD_DESTROY).toEqual('BOARD_DESTROY');
  });

  it('contains BOARD_LIST_LOADED', () => {
    expect(BOARD_LIST_LOADED).toEqual('BOARD_LIST_LOADED');
  });

  it('contains BOARD_LIST_REQUEST', () => {
    expect(BOARD_LIST_REQUEST).toEqual('BOARD_LIST_REQUEST');
  });

  it('contains THREAD_REQUEST', () => {
    expect(THREAD_REQUEST).toEqual('THREAD_REQUEST');
  });

  it('contains THREAD_LOADED', () => {
    expect(THREAD_LOADED).toEqual('THREAD_LOADED');
  });

  it('contains THREAD_DESTROY', () => {
    expect(THREAD_DESTROY).toEqual('THREAD_DESTROY');
  });

  it('contains THREAD_POST_LOAD', () => {
    expect(THREAD_POST_LOAD).toEqual('THREAD_POST_LOAD');
  });
});
