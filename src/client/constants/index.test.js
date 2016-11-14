import {
	USER_SAVE,
	USER_LOAD,
	BOARD_REQUESTED,
	BOARD_LOADED,
	BOARD_DESTROYED,
  BOARD_LIST_LOADED,
  BOARD_LIST_REQUESTED,
	THREAD_REQUESTED,
	THREAD_LOADED,
	THREAD_DESTROYED,
  THREAD_SCROLLED_BOTTOM
} from '.';

describe('Types', () => {
  it('contains USER_SAVE', () => {
    expect(USER_SAVE).toEqual('USER_SAVE');
  });

  it('contains USER_LOAD', () => {
    expect(USER_LOAD).toEqual('USER_LOAD');
  });

  it('contains BOARD_REQUESTED', () => {
    expect(BOARD_REQUESTED).toEqual('BOARD_REQUESTED');
  });

  it('contains BOARD_LOADED', () => {
    expect(BOARD_LOADED).toEqual('BOARD_LOADED');
  });

  it('contains BOARD_DESTROYED', () => {
    expect(BOARD_DESTROYED).toEqual('BOARD_DESTROYED');
  });

  it('contains BOARD_LIST_LOADED', () => {
    expect(BOARD_LIST_LOADED).toEqual('BOARD_LIST_LOADED');
  });

  it('contains BOARD_LIST_REQUESTED', () => {
    expect(BOARD_LIST_REQUESTED).toEqual('BOARD_LIST_REQUESTED');
  });

  it('contains THREAD_REQUESTED', () => {
    expect(THREAD_REQUESTED).toEqual('THREAD_REQUESTED');
  });

  it('contains THREAD_LOADED', () => {
    expect(THREAD_LOADED).toEqual('THREAD_LOADED');
  });

  it('contains THREAD_DESTROYED', () => {
    expect(THREAD_DESTROYED).toEqual('THREAD_DESTROYED');
  });

  it('contains THREAD_SCROLLED_BOTTOM', () => {
    expect(THREAD_SCROLLED_BOTTOM).toEqual('THREAD_SCROLLED_BOTTOM');
  });
});
