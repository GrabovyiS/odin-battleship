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

      let counter = 0;
      while (counter < 1000) {
        counter++;
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
          console.log(
            'placed ship',
            currentShip,
            'at these coords',
            randomCoords,
          );

          const shipIndex = this.shipyard.findIndex(
            (ship) => ship === currentShip,
          );
          this.shipyard.splice(shipIndex, 1);

          break;
        }
      }
    }

    console.log(player.shipyard);
    console.table(player.gameboard.board);
  };

  return player;
};

export default Player;
