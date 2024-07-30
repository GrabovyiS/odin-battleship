import Gameboard from '../data/Gameboard';
import Ship from '../data/Ship';
import getDiffSquareCoords from './getChangedSquareCoords';

const gameboard = Gameboard();
const oldBoard = [];
for (let i = 0; i < gameboard.hitsBoard.length; i++) {
  oldBoard.push(gameboard.hitsBoard[i].slice());
}
gameboard.receiveAttack([0, 0]);

test('Gets coords of the changed square', () => {
  const changedSquare = getDiffSquareCoords(oldBoard, gameboard.hitsBoard);
  expect(changedSquare[0] === 0 && changedSquare[1] === 0).toBe(true);
});
