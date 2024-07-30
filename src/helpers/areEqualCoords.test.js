import areEqualCoords from './areEqualCoords';

test('Returns error when input is incorrect', () => {
  expect(areEqualCoords([])).toBeInstanceOf(Error);
  expect(areEqualCoords(1)).toBeInstanceOf(Error);
  expect(areEqualCoords()).toBeInstanceOf(Error);
  expect(areEqualCoords([1], [1, 2])).toBeInstanceOf(Error);
});

test('Returns true when coordinates are the same', () => {
  expect(areEqualCoords([1, 1], [1, 1])).toBe(true);
  expect(areEqualCoords([2, 0], [2, 0])).toBe(true);
});

test('Returns false when coordinates are not the same', () => {
  expect(areEqualCoords([1, 1], [2, 1])).toBe(false);
  expect(areEqualCoords([2, 0], [2, 1])).toBe(false);
});
