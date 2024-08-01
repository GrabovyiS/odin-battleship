import Gameboard from './Gameboard';
import shipyardBigOption from './shipyards/shipyardBigOption';
import Shipyard from './shipyards/Shipyard';

const Player = () => {
  const player = {};

  player.gameboard = Gameboard();
  player.shipyard = Shipyard(shipyardBigOption);

  player.resetShipyard = function () {
    player.shipyard = Shipyard(shipyardBigOption);
  };

  return player;
};

export default Player;
