import BOARD_SIZE from '../../data/BOARD_SIZE';
import squareIsShip from '../../helpers/squareIsShip';
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

      // Ship taken from shipyard to gameboard
      square.addEventListener('drop', (e) => {
        e.preventDefault();
        const shipLength = e.dataTransfer.getData('text/plain');
        const coords = e.target.coords;

        // console.log(player.shipyard);
        // console.log(shipLength);
        // player.shipyard.forEach((ship) => {
        //   console.log(ship.length);
        // });

        const ship = player.shipyard.find((ship) => ship.length == shipLength);
        const shipIndex = player.shipyard.findIndex(
          (ship) => ship.length == shipLength,
        );
        if (
          !(
            player.gameboard.placeShip(ship, coords, ship.direction) instanceof
            Error
          )
        ) {
          player.shipyard.splice(shipIndex, 1);

          const shipTakenFromShipyard = new Event('shipTakenFromShipyard');
          playerBoardContainer.dispatchEvent(shipTakenFromShipyard);

          const interactiveBoard = document.querySelector(
            '.board.player-board',
          );

          const interactiveBoardShip = ShipyardShip(
            ship.length,
            ship.direction,
          );

          console.log(ship.direction, coords);

          if (ship.direction === 'ltr') {
            interactiveBoardShip.classList.remove('ship-ttb');
            interactiveBoardShip.classList.add('ship-ltr');
          } else if (ship.direction === 'ttb') {
            interactiveBoardShip.classList.remove('ship-ltr');
            interactiveBoardShip.classList.add('ship-ttb');
          }

          interactiveBoardShip.style.left = `${coords[1] * 50}px`;
          interactiveBoardShip.style.top = `${coords[0] * 50}px`;

          interactiveBoard.appendChild(interactiveBoardShip);
        } else {
          document.querySelectorAll('.dragging').forEach((element) => {
            element.classList.remove('dragging');
          });
        }
        // If it's possible to place it on that square
        // Remove ship from shipyard and re-render it
        // Draw a draggable ship at these coords
        // Store ship in gameboard
      });

      square.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'link';
        console.log('moving');
      });
    }
  }

  styleSunkShips(playerBoardContainer, player.gameboard);

  return playerBoardContainer;
};

export default PlayerBoard;
