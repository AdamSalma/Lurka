import boardTests from './board.test';
import boardListTests from './boardlist.test';

export default createSuite("Actions", () => {
    boardTests();
    boardListTests();
})
