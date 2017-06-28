// Tests are imported here to be executed under the same suite
import boardTests from './board.subtest';
import boardListTests from './boardlist.subtest';

describe('Actions', () => {
  boardTests();
  boardListTests();
});
