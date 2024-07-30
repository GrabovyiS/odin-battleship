import copyBoard from './copyBoard';
import Gameboard from '../data/Gameboard';
import Ship from '../data/Ship';

test('Returns false in case of empty boards', () => {
  expect(copyBoard([])).toBe(false);
  expect(copyBoard([[], []])).toBe(false);
});

const gameboard = Gameboard();
const ship = Ship(4);
gameboard.placeShip(ship, [0, 0], 'ttb');

test('Return a copy and not a reference', () => {
  const copy = copyBoard(gameboard.board);

  copy[0] = null;

  expect(copy[0]).toBeNull();
  expect(gameboard.board[0]).not.toBeNull();
});

test('Returns a correct copy', () => {
  const copy = copyBoard(gameboard.board);

  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy.length; j++) {
      expect(copy[i][j]).toBe(gameboard.board[i][j]);
    }
  }
});
