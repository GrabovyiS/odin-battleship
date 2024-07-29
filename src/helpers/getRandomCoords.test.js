import getRandomCoords from './getRandomCoords';
import { BOARD_SIZE } from '../data/Gameboard';

const randomCoords = [];

for (let i = 0; i < 10000; i++) {
  randomCoords.push(getRandomCoords());
}

test('Only returns coords withing board size', () => {
  expect(
    randomCoords.every(
      (coords) =>
        coords[0] >= 0 &&
        coords[0] <= BOARD_SIZE - 1 &&
        coords[1] >= 0 &&
        coords[1] <= BOARD_SIZE - 1,
    ),
  ).toBe(true);
});

test('Returns min coords', () => {
  expect(randomCoords.some((coords) => coords[0] === 0)).toBe(true);
  expect(randomCoords.some((coords) => coords[1] === 0)).toBe(true);
});

test('Returns coords between max and min', () => {
  expect(
    randomCoords.some((coords) => coords[0] === Math.round(BOARD_SIZE / 2)),
  ).toBe(true);
  expect(
    randomCoords.some((coords) => coords[1] === Math.round(BOARD_SIZE / 2)),
  ).toBe(true);
});

test('Returns max coords', () => {
  expect(randomCoords.some((coords) => coords[0] === BOARD_SIZE - 1)).toBe(
    true,
  );
  expect(randomCoords.some((coords) => coords[1] === BOARD_SIZE - 1)).toBe(
    true,
  );
});
