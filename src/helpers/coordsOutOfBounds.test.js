import Gameboard from '../data/Gameboard';
import coordsOutOfBounds from './coordsOutOfBounds';

test('Returns an error when not provided with an array', () => {
  expect(coordsOutOfBounds(null, [0, 0])).toBeInstanceOf(Error);
});

test('Returns an error when not provided with an array of coordinates', () => {
  expect(coordsOutOfBounds([1, 2])).toBeInstanceOf(Error);
});

test('Returns an error when provided with 1d array instead of a board', () => {
  expect(coordsOutOfBounds([1, 2], [0])).toBeInstanceOf(Error);
});

const gameboard = Gameboard();

test('Returns an error when provided with coords array of wrong length', () => {
  expect(coordsOutOfBounds(gameboard.board, [0])).toBeInstanceOf(Error);
});

test('Return true when out of bounds', () => {
  expect(coordsOutOfBounds(gameboard.board, [9, 10])).toBe(true);
  expect(coordsOutOfBounds(gameboard.board, [-1, 8])).toBe(true);
  expect(coordsOutOfBounds(gameboard.board, [-1, 10])).toBe(true);
  expect(coordsOutOfBounds(gameboard.board, [-1, -10])).toBe(true);
  expect(coordsOutOfBounds(gameboard.board, [10, 10])).toBe(true);
});

test('Return false when not out of bounds', () => {
  expect(coordsOutOfBounds(gameboard.board, [1, 1])).toBe(false);
  expect(coordsOutOfBounds(gameboard.board, [0, 0])).toBe(false);
  expect(coordsOutOfBounds(gameboard.board, [9, 9])).toBe(false);
});
