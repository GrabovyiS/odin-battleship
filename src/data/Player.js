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

  player.sortShipyard = function () {
    this.shipyard.sort((ship1, ship2) =>
      ship1.length < ship2.length ? -1 : 1,
    );
  };

  return player;
};

export default Player;
