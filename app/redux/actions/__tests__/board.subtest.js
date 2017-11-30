import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as types from '~/redux/types';

import fetchBoard, {
  requestBoard,
  receiveBoard,
  invalidateBoard,
  setBoard,
  shouldRequestBoard,
  boardCachedAndRecent,
  loadBoardFromCache,
} from '../api/fetchBoard';

const mock = new MockAdapter(Axios)
mock.onAny('/api').reply(200);

const dispatch = expect.createSpy();
const mockState = {
  board: {

  }
}

const boardID = "g"

export default createSuite('Board', () => {
  // it('creates BOARD_REQUESTED', () => {
  //   const fn = fetchBoard(boardID);
  //   expect(fn).toBeA('function');
  //   const getState = () => ({ boardList: { items: {}, didInvalidate: null } });

  //   fn(dispatch, getState);
  //   expect(dispatch).toHaveBeenCalledWith({ type: BOARD_REQUESTED });

  //   // expect(dispatch).toHaveBeenCalledWith({ type: BOARD_REQUESTED });
  // });

  it('creates BOARD_REQUESTED action', () => {
    expect(requestBoard(boardID)).toEqual({
      type: types.BOARD_REQUESTED,
      payload: boardID
    });
  });

  it('creates BOARD_LOADED action', () => {
    expect(receiveBoard({})).toInclude({
      type: types.BOARD_LOADED
    });
  });

  it('creates BOARD_INVALIDATED action', () => {
    expect(invalidateBoard("")).toEqual({
      type: types.BOARD_INVALIDATED,
      error: ""
    });
  });

  it('creates BOARD_CHANGE action', () => {
    expect(setBoard(boardID)).toEqual({
      type: types.BOARD_CHANGE,
      payload: boardID
    });
  });

  it('should allow a board fetch', () => {
    var mockState = {
      board: {
        receivedAt: 0
      },
      settings: {
        internal: {
          requestThrottle: 9999
        }
      }
    }
    expect(shouldRequestBoard(mockState)).toBe(true);
  });


  it('should reject a board fetch', () => {
    var mockState = {
      board: {
        receivedAt: Date.now()
      },
      settings: {
        internal: {
          requestThrottle: 9999
        }
      }
    }
    expect(shouldRequestBoard(mockState)).toBe(false);
  });
})

// it('creates BOARD_REQUESTED action', () => {
//   const fn = fetchBoard({ provider: '4chan' });
//   expect(fn).toBeA('function');
//   const dispatch = expect.createSpy();
//   const getState = () => ({ provider: '4chan' });
//   fn(dispatch, getState);
//   expect(dispatch).toHaveBeenCalledWith({ type: BOARD_REQUESTED });
// });

