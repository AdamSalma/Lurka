import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,
} from '../../types';

import {
  fetchBoardList
} from '..';


const mock = new MockAdapter(Axios)
mock.onAny('/api').reply(200);

const dispatch = expect.createSpy();

const provider = "4chan"

describe('Actions', () => {

  it('creates BOARD_LIST_REQUESTED', () => {
    const fn = fetchBoardList(provider);
    expect(fn).toBeA('function');
    const getState = () => ({ boardList: { items: {}, didInvalidate: null } });

    fn(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: BOARD_LIST_REQUESTED });

    // expect(dispatch).toHaveBeenCalledWith({ type: BOARD_LIST_REQUESTED });
  });

  // it('creates BOARD_REQUESTED action', () => {
  //   const fn = fetchBoard({ provider: '4chan' });
  //   expect(fn).toBeA('function');
  //   const dispatch = expect.createSpy();
  //   const getState = () => ({ provider: '4chan' });
  //   fn(dispatch, getState);
  //   expect(dispatch).toHaveBeenCalledWith({ type: BOARD_LIST_REQUESTED });
  // });

  // it('creates STOP_LOADING action', () => {
  //   expect(stopLoading()).toEqual({
  //     type: STOP_LOADING
  //   });
  // });
});
