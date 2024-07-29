import forEachAdjacent from './forEachAdjacent';

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

test('Works', () => {
  let sum = 0;

  forEachAdjacent(matrix, [1, 1], (item) => {
    sum += item;
  });

  expect(sum).toBe(40);
});

test('Works for elements on the side', () => {
  let sum = 0;

  forEachAdjacent(matrix, [0, 1], (item) => {
    sum += item;
  });

  expect(sum).toBe(19);
});

test('Works for corner elements', () => {
  let newArray = [];

  forEachAdjacent(matrix, [0, 0], (item) => {
    newArray.push(item);
  });

  expect(newArray).toEqual([2, 4, 5]);
});
