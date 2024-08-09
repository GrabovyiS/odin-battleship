import getLiftedShip from './getLiftedShip';
import Player from '../data/Player';
import Ship from '../data/Ship';

test('Gets lifted ship', () => {
  const player = Player();

  // Lifted ship temporarily exists in both gameboard and shipyard
  const liftedShip = Ship(3);
  player.gameboard.placeShip(liftedShip, [0, 0], 'ltr');
  player.shipyard.push(liftedShip);

  player.gameboard.placeShip(Ship(2), [0, 0], 'ltr');
  player.gameboard.placeShip(Ship(2), [5, 5], 'ltr');
  player.gameboard.placeShip(Ship(2), [5, 9], 'ttb');

  expect(getLiftedShip(player)).toBe(liftedShip);
});

test('Return null when there is no lifted ship', () => {
  const player = Player();

  const gameBoardShip = Ship(3);
  const shipyardShip = Ship(2);

  player.shipyard.push(shipyardShip);
  player.gameboard.placeShip(gameBoardShip, [0, 0], 'ltr');

  expect(getLiftedShip(player)).toBeNull();
});
