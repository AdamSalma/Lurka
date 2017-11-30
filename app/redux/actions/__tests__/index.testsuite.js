import boardTests from './board.subtest';
import boardListTests from './boardlist.subtest';

export default createSuite("Actions", () => {
    boardTests();
    boardListTests();
})
