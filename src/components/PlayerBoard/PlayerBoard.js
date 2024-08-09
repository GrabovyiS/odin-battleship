import BOARD_SIZE from '../../data/BOARD_SIZE';
import getLiftedShip from '../../helpers/getLiftedShip';
import getShipStartingCoords from '../../helpers/getShipStartingCoords';
import placeDraggableShip from '../../helpers/placeDraggableShip';
import squareIsShip from '../../helpers/squareIsShip';
import styleBoardShip from '../../helpers/styleBoardShip';
import styleSunkShips from '../../helpers/styleSunkShips';
import ShipyardShip from '../PlayerShipyard/ShipyardShip';

const PlayerBoard = (player) => {
  const playerBoardContainer = document.createElement('div');
  playerBoardContainer.classList.add('board');
  playerBoardContainer.classList.add('player-board');

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const square = document.createElement('div');
      square.classList.add(`i_${i}_j:_${j}`);
      square.classList.add('square');
      playerBoardContainer.appendChild(square);
      square.coords = [i, j];

      const currentSquareState = player.gameboard.hitsBoard[i][j];
      if (squareIsShip(player.gameboard, [i, j])) {
        square.classList.add('allied-ship');
      }

      if (currentSquareState === null) {
        square.classList.add('unhit-square');
      } else if (currentSquareState === 'missed') {
        square.classList.add('missed-square');
      } else if (currentSquareState === 'hit') {
        square.classList.add('hit-square');
      }

      square.addEventListener('drop', (e) => {
        e.preventDefault();
        const coords = e.target.coords;
        const shipLength = e.dataTransfer.getData('text/plain');

        const liftedShip = getLiftedShip(player);
        const liftedShipInitialCoords = getShipStartingCoords(
          player.gameboard,
          liftedShip,
        );

        let droppingShip;
        let droppingShipIndex;

        if (!liftedShip) {
          droppingShip = player.shipyard.find(
            (ship) => ship.length == shipLength,
          );
          droppingShipIndex = player.shipyard.findIndex(
            (ship) => ship.length == shipLength,
          );
        } else {
          droppingShip = liftedShip;
          droppingShipIndex = player.shipyard.findIndex(
            (ship) => ship === liftedShip,
          );
        }

        if (liftedShip) {
          player.shipyard.splice(droppingShipIndex, 1);
          player.gameboard.deleteShip(liftedShip);
        }

        if (
          !(
            player.gameboard.placeShip(
              droppingShip,
              coords,
              droppingShip.direction,
            ) instanceof Error
          )
        ) {
          if (!liftedShip) {
            const shipTakenFromShipyard = new Event('shipTakenFromShipyard');
            playerBoardContainer.dispatchEvent(shipTakenFromShipyard);
            player.shipyard.splice(droppingShipIndex, 1);
          }

          const interactiveBoard = document.querySelector(
            '.board.player-board',
          );

          const interactiveBoardShip = ShipyardShip(
            droppingShip,
            droppingShip.direction,
            player,
          );

          styleBoardShip(interactiveBoardShip, coords, droppingShip.direction);

          interactiveBoard.appendChild(interactiveBoardShip);
        } else {
          if (liftedShip) {
            player.gameboard.placeShip(
              liftedShip,
              liftedShipInitialCoords,
              liftedShip.direction,
            );
            placeDraggableShip(player, liftedShip, liftedShipInitialCoords);
          }
        }
      });

      square.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'link';
      });
    }
  }

  styleSunkShips(playerBoardContainer, player.gameboard);

  return playerBoardContainer;
};

export default PlayerBoard;
