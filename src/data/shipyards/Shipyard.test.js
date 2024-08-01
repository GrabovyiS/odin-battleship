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
  const ship1 = Ship(1);
  const ship2 = Ship(2);
  const ship3 = Ship(3);
  expectedShipyard.push(ship1);
  expectedShipyard.push(ship2);
  expectedShipyard.push(ship3);

  expect(JSON.stringify(shipyard)).toEqual(JSON.stringify(expectedShipyard));
});

test('Returns sorted array of correct ships with unsorted input', () => {
  let shipyard = Shipyard(optionsUnsorted);

  let expectedShipyard = [];
  const ship1 = Ship(1);
  const ship2 = Ship(2);
  const ship3 = Ship(3);
  expectedShipyard.push(ship1);
  expectedShipyard.push(ship2);
  expectedShipyard.push(ship3);

  expect(JSON.stringify(shipyard)).toEqual(JSON.stringify(expectedShipyard));
});
