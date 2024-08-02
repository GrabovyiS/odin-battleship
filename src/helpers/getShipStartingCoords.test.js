import getShipStartingCoords from './getShipStartingCoords';
import Gameboard from '../data/Gameboard';
import Ship from '../data/Ship';

test('Returns an error when provided gameboard is not a gameboard', () => {
  const gameboard = [];
  const ship = Ship(4);

  expect(getShipStartingCoords(gameboard, ship)).toBeInstanceOf(Error);
});

test('Returns null when ship is not present on the gameboard', () => {
  const gameboard = Gameboard();
  const notOnBoardShip = Ship(4);

  expect(getShipStartingCoords(gameboard, notOnBoardShip)).toBeNull();
});

test('Gets correct starting coords', () => {
  const gameboard = Gameboard();

  const ship1 = Ship(4);
  gameboard.placeShip(ship1, [1, 1], 'ltr');

  const ship2 = Ship(4);
  gameboard.placeShip(ship2, [3, 3], 'ttb');

  expect(getShipStartingCoords(gameboard, ship1)).toEqual([1, 1]);
  expect(getShipStartingCoords(gameboard, ship2)).toEqual([3, 3]);
});
