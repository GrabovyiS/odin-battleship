import BOARD_SIZE from '../../data/BOARD_SIZE';
import squareIsShip from '../../helpers/squareIsShip';
import styleSunkShips from '../../helpers/styleSunkShips';

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
    }
  }

  styleSunkShips(playerBoardContainer, player.gameboard);

  return playerBoardContainer;
};

export default PlayerBoard;
