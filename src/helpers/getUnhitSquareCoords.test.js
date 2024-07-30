import Gameboard from '../data/Gameboard';
import getUnhitSquareCoords from './getUnhitSquareCoords';
import coordsOutOfBoardBounds from './coordsOutOfBoardBounds';
import areEqualCoords from './areEqualCoords';

test('Gets random coords within board size when without passed in set of squares to choose from', () => {
  const gameboard = Gameboard();
  const randomCoords = getUnhitSquareCoords(gameboard);
  expect(coordsOutOfBoardBounds(randomCoords)).toBe(false);
});

test('Gets coords from passed in set', () => {
  const gameboard = Gameboard();
  const set = [
    [1, 2],
    [3, 4],
  ];

  const randomCoords = getUnhitSquareCoords(gameboard, set);
  expect(set.some((item) => areEqualCoords(item, randomCoords))).toBe(true);
});

test('Gets unhit coords from passed in set', () => {
  const gameboard = Gameboard();
  gameboard.receiveAttack([1, 2]);
  const set = [
    [1, 2],
    [3, 4],
  ];

  const randomCoords = getUnhitSquareCoords(gameboard, set);
  expect(areEqualCoords(randomCoords, [3, 4])).toBe(true);
});
