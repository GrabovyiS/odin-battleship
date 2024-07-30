import squareIsShip from './squareIsShip';
import Gameboard from '../data/Gameboard';
import Ship from '../data/Ship';

const ship = Ship(4);
const gameboard = Gameboard();
gameboard.placeShip(ship, [0, 0], 'ttb');

test('Returns true when there is a ship', () => {
  expect(squareIsShip(gameboard, [0, 0])).toBe(true);
  expect(squareIsShip(gameboard, [2, 0])).toBe(true);
});

test('Returns false when there is not', () => {
  expect(squareIsShip(gameboard, [1, 1])).toBe(false);
  expect(squareIsShip(gameboard, [9, 2])).toBe(false);
});
