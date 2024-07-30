import Gameboard from '../data/Gameboard';
import Ship from '../data/Ship';
import Player from '../data/Player';
import ComputerPlayer from '../data/ComputerPlayer';
import shootAndGetNextHit from './shootAndGetNextHit';

test('Gets coordinates of next hit on ttb ship', () => {
  const opponent = Player();
  const ship = Ship(4);
  opponent.gameboard.placeShip(ship, [0, 0], 'ttb');

  const computerPlayer = ComputerPlayer(opponent);

  const nextShotCoords = shootAndGetNextHit(computerPlayer);
  expect(
    (nextShotCoords[0] === 0 && nextShotCoords[1] === 0) ||
      (nextShotCoords[0] === 1 && nextShotCoords[1] === 0) ||
      (nextShotCoords[0] === 2 && nextShotCoords[1] === 0) ||
      (nextShotCoords[0] === 3 && nextShotCoords[1] === 0),
  ).toBe(true);
});

test('Gets coordinates of next hit on ltr ship', () => {
  const opponent = Player();
  const ship = Ship(4);
  opponent.gameboard.placeShip(ship, [0, 4], 'ltr');

  const computerPlayer = ComputerPlayer(opponent);

  const nextShotCoords = shootAndGetNextHit(computerPlayer);
  expect(
    (nextShotCoords[0] === 0 && nextShotCoords[1] === 4) ||
      (nextShotCoords[0] === 0 && nextShotCoords[1] === 5) ||
      (nextShotCoords[0] === 0 && nextShotCoords[1] === 6) ||
      (nextShotCoords[0] === 0 && nextShotCoords[1] === 7),
  ).toBe(true);
});
