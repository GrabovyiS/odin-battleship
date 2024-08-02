import ShipyardShip from './ShipyardShip';

const PlayerShipyard = (player) => {
  const playerShipyardContainer = document.createElement('div');
  playerShipyardContainer.classList.add('shipyard');

  for (const ship of player.shipyard) {
    const shipElement = ShipyardShip(ship, 'ltr', player);
    playerShipyardContainer.appendChild(shipElement);
  }

  return playerShipyardContainer;
};

export default PlayerShipyard;
