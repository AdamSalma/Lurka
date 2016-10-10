import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    BOARD_REQUEST, 
    BOARD_LOADED, 
    BOARD_DESTROY,
    BOARD_LIST_REQUEST,
    BOARD_LIST_LOADED,
    BOARD_CHANGE
} from '../constants';

import {
  fetchBoard,
  fetchBoardList
} from './BoardActions';


const mock = new MockAdapter(Axios)
mock.onAny('/provider').reply(200);

// Test vars
const dispatch = expect.createSpy();
const provider = "4chan"
const board = "g";

describe('Actions', () => {

  it('creates BOARD_LIST_REQUEST action', () => {
    const fn = fetchBoardList({ provider });
    expect(fn).toBeA('function');
    const getState = () => ({ provider: '4chanddd' });
    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: BOARD_LIST_REQUEST });
  });

  // it('creates BOARD_REQUEST action', () => {
  //   const fn = fetchBoard({ provider: '4chan' });
  //   expect(fn).toBeA('function');
  //   const dispatch = expect.createSpy();
  //   const getState = () => ({ provider: '4chan' });
  //   fn(dispatch, getState);
  //   expect(dispatch).toHaveBeenCalledWith({ type: BOARD_LIST_REQUEST });
  // });

  // it('creates STOP_LOADING action', () => {
  //   expect(stopLoading()).toEqual({
  //     type: STOP_LOADING
  //   });
  // });
});
