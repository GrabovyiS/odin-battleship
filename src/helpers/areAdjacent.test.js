import areAdjacent from './areAdjacent';

test('Return true when adjacent', () => {
  expect(areAdjacent([2, 3], [3, 4])).toBe(true);
});

test('Return false when are not adjacent', () => {
  expect(areAdjacent([2, 3], [4, 5])).toBe(false);
});
