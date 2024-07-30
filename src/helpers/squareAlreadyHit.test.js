import squareAlreadyHit from './squareAlreadyHit';
import Gameboard from '../data/Gameboard';
import Ship from '../data/Ship';

const ship = Ship(4);
const gameboard = Gameboard();
gameboard.placeShip(ship, [0, 0], 'ttb');
gameboard.receiveAttack([0, 0]);

test('Returns true when already hitz', () => {
  expect(squareAlreadyHit(gameboard, [0, 0])).toBe(true);
});

test('Returns false when not hit yet', () => {
  expect(squareAlreadyHit(gameboard, [1, 1])).toBe(false);
  expect(squareAlreadyHit(gameboard, [9, 2])).toBe(false);
});
