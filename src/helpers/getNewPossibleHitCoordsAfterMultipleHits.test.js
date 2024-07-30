import getNewPossibleHitCoordsAfterMultipleHits from './getNewPossibleHitCoordsAfterMultipleHits';

test('Return an error if there are less then 2 hits', () => {
  expect(getNewPossibleHitCoordsAfterMultipleHits([[1, 2]])).toBeInstanceOf(
    Error,
  );
});

test('Does not return coords out of bounds', () => {
  expect(
    getNewPossibleHitCoordsAfterMultipleHits([
      [0, 0],
      [0, 1],
    ]),
  ).toEqual([[0, 2]]);
});

test('Returns correct coords for ltr ships', () => {
  expect(
    getNewPossibleHitCoordsAfterMultipleHits([
      [0, 1],
      [0, 2],
    ]),
  ).toEqual([
    [0, 0],
    [0, 3],
  ]);
});

test('Returns correct coords for ttb ships', () => {
  expect(
    getNewPossibleHitCoordsAfterMultipleHits([
      [1, 0],
      [2, 0],
    ]),
  ).toEqual([
    [0, 0],
    [3, 0],
  ]);
});
