import ShipyardShip from '../components/PlayerShipyard/ShipyardShip';
import styleBoardShip from './styleBoardShip';

const placeDraggableShip = (player, ship, coords) => {
  const returningShip = ShipyardShip(ship, ship.direction, player);

  styleBoardShip(returningShip, coords, player.direction);

  const interactiveBoard = document.querySelector('.board.player-board');
  interactiveBoard.appendChild(returningShip);
};

export default placeDraggableShip;
