import Gameboard from './Gameboard';
import shipyardBig from './shipyards/shipyardBig';
import Shipyard from './shipyards/Shipyard';

const Player = () => {
  const player = {};

  player.gameboard = Gameboard();
  player.shipyard = Shipyard(shipyardBig);

  player.resetShipyard = function () {
    player.shipyard = Shipyard(shipyardBig);
  };

  return player;
};

export default Player;
