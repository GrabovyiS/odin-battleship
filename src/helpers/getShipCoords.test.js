import getShipCoords from './getShipCoords';
import Gameboard from '../data/Gameboard';
import Ship from '../data/Ship';

test('Gets correct coordinates', () => {
  const gameboard = Gameboard();
  const ship1 = Ship(4);
  const ship2 = Ship(4);

  gameboard.placeShip(ship1, [0, 0], 'ltr');
  gameboard.placeShip(ship2, [3, 3], 'ltr');

  expect(getShipCoords(gameboard, ship1)).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
});
