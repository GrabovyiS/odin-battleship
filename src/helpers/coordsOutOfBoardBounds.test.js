import coordsOutOBoardfBounds from './coordsOutOfBoardBounds';

test('Returns an error when not provided with an array of coordinates', () => {
  expect(coordsOutOBoardfBounds()).toBeInstanceOf(Error);
});

test('Returns an error when provided with coords array of wrong length', () => {
  expect(coordsOutOBoardfBounds([0])).toBeInstanceOf(Error);
});

test('Return true when out of bounds', () => {
  expect(coordsOutOBoardfBounds([9, 10])).toBe(true);
  expect(coordsOutOBoardfBounds([-1, 8])).toBe(true);
  expect(coordsOutOBoardfBounds([-1, 10])).toBe(true);
  expect(coordsOutOBoardfBounds([-1, -10])).toBe(true);
  expect(coordsOutOBoardfBounds([10, 10])).toBe(true);
});

test('Return false when not out of bounds', () => {
  expect(coordsOutOBoardfBounds([1, 1])).toBe(false);
  expect(coordsOutOBoardfBounds([0, 0])).toBe(false);
  expect(coordsOutOBoardfBounds([9, 9])).toBe(false);
});
