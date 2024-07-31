import BOARD_SIZE from '../../data/BOARD_SIZE';
import squareIsShip from '../../helpers/squareIsShip';
import getShipCoords from '../../helpers/getShipCoords';
import getSquareElement from '../../helpers/getSquareElement';

const PlayerBoard = (player) => {
  const playerBoard = document.createElement('div');
  playerBoard.classList.add('board');
  playerBoard.classList.add('player-board');

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const square = document.createElement('div');
      square.classList.add(`i_${i}_j:_${j}`);
      square.classList.add('square');
      playerBoard.appendChild(square);
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
    }
  }

  // This part is for finding and styling sunk ships
  const squares = playerBoard.childNodes;
  for (const square of squares) {
    const [i, j] = square.coords;
    const currentSquareState = player.gameboard.hitsBoard[i][j];

    // sunk
    if (currentSquareState === 'hit' && player.gameboard.board[i][j].isSunk()) {
      const shipCoords = getShipCoords(
        player.gameboard,
        player.gameboard.board[i][j],
      );

      // 1x1 ship
      if (shipCoords.length === 1) {
        console.log(shipCoords, square);
        square.classList.add('killed-bottom-square');
        square.classList.add('killed-top-square');
        // not 1x1 ship
      } else {
        if (shipCoords[0][0] - shipCoords[1][0] === 0) {
          // x is the same, direction is ltr
          shipCoords.sort((coords1, coords2) =>
            coords1[1] < coords2[1] ? -1 : 1,
          );

          console.log(shipCoords);

          for (let i = 0; i < shipCoords.length; i++) {
            let shipCoord = shipCoords[i];
            const squareElement = getSquareElement(playerBoard, shipCoord);
            if (i === 0) {
              squareElement.classList.add('killed-left-square');
            }
            if (i === shipCoords.length - 1) {
              squareElement.classList.add('killed-right-square');
            }
            squareElement.classList.add('killed-ltr-middle-square');
          }
        } else if (shipCoords[0][1] - shipCoords[1][1] === 0) {
          // y is the same, direction is ttb
          shipCoords.sort((coords1, coords2) =>
            coords1[0] < coords2[0] ? -1 : 1,
          );

          for (let i = 0; i < shipCoords.length; i++) {
            let shipCoord = shipCoords[i];
            const squareElement = getSquareElement(playerBoard, shipCoord);
            if (i === 0) {
              squareElement.classList.add('killed-top-square');
            }
            if (i === shipCoords.length - 1) {
              squareElement.classList.add('killed-bottom-square');
            }
            squareElement.classList.add('killed-ttb-middle-square');
          }
        }
      }

      console.log(shipCoords);
    }
  }

  return playerBoard;
};

export default PlayerBoard;
