import Gameboard from './Gameboard';
import shipyardBig from './shipyards/shipyardBig';

const Player = () => {
  const player = {};

  player.gameboard = Gameboard();
  player.shipyard = Object.assign({}, shipyardBig);

  player.resetShipyard = function () {
    player.shipyard = Object.assign({}, shipyardBig);
  };

  return player;
};

export default Player;
