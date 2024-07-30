import areCrossAdjacent from './areCrossAdjacent';

test('Return true when cross adjacent', () => {
  expect(areCrossAdjacent([2, 3], [2, 4])).toBe(true);
  expect(areCrossAdjacent([2, 3], [3, 3])).toBe(true);
  expect(areCrossAdjacent([2, 3], [1, 3])).toBe(true);
  expect(areCrossAdjacent([2, 4], [3, 4])).toBe(true);
});

test('Return false when are not cross adjacent', () => {
  expect(areCrossAdjacent([2, 3], [3, 4])).toBe(false);
  expect(areCrossAdjacent([2, 3], [4, 5])).toBe(false);
  expect(areCrossAdjacent([2, 3], [2, 5])).toBe(false);
  expect(areCrossAdjacent([2, 3], [2, 3])).toBe(false);
});
