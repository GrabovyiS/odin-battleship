import Player from './Player';
import Ship from './Ship';

test('Player shipyard resets', () => {
  const player = Player();
  const startingShipyard = player.shipyard;

  player.shipyard = null;
  player.resetShipyard();

  player.shipyard = 'abacadaba';
  player.resetShipyard();

  expect(JSON.stringify(startingShipyard)).toEqual(
    JSON.stringify(player.shipyard),
  );
});

test('Sorts shipyard', () => {
  const player = Player();

  player.shipyard.push(Ship(5));
  player.shipyard.push(Ship(1));
  player.sortShipyard();

  expect(player.shipyard[4].length).toEqual(1);
  expect(player.shipyard[11].length).toEqual(5);
});
