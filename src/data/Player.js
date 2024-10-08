import Gameboard from './Gameboard';
import shipyardBigOption from './shipyards/shipyardBigOption';
import Shipyard from './shipyards/Shipyard';
import getRandomCoords from '../helpers/getRandomCoords';

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

  player.populateGameboardRandomly = function () {
    const largeToSmallShipyard = this.shipyard.toReversed();

    for (let i = 0; i < largeToSmallShipyard.length; i++) {
      const currentShip = largeToSmallShipyard[i];

      while (true) {
        currentShip.direction =
          Math.floor(Math.random() * 2) === 1 ? 'ltr' : 'ttb';
        let randomCoords = getRandomCoords();

        if (
          !(
            this.gameboard.placeShip(
              currentShip,
              randomCoords,
              currentShip.direction,
            ) instanceof Error
          )
        ) {
          const shipIndex = this.shipyard.findIndex(
            (ship) => ship === currentShip,
          );
          this.shipyard.splice(shipIndex, 1);

          break;
        }
      }
    }
  };

  return player;
};

export default Player;
