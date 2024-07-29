import Shipyard from './Shipyard';
import Ship from '../Ship';

const optionsSorted = [
  {
    length: 1,
    count: 1,
  },
  {
    length: 2,
    count: 1,
  },
  {
    length: 3,
    count: 1,
  },
];

const optionsUnsorted = [
  {
    length: 1,
    count: 1,
  },
  {
    length: 3,
    count: 1,
  },
  {
    length: 2,
    count: 1,
  },
];

test('Returns array of correct ships with sorted input', () => {
  let shipyard = Shipyard(optionsSorted);

  let expectedShipyard = [];
  expectedShipyard.push(Ship(1));
  expectedShipyard.push(Ship(2));
  expectedShipyard.push(Ship(3));

  expect(JSON.stringify(shipyard)).toEqual(JSON.stringify(expectedShipyard));
});

test('Returns sorted array of correct ships with unsorted input', () => {
  let shipyard = Shipyard(optionsUnsorted);

  let expectedShipyard = [];
  expectedShipyard.push(Ship(1));
  expectedShipyard.push(Ship(2));
  expectedShipyard.push(Ship(3));

  expect(JSON.stringify(shipyard)).toEqual(JSON.stringify(expectedShipyard));
});
