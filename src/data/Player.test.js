import Player from './Player';

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
